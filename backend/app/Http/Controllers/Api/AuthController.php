<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use App\Models\UserRole;
use Illuminate\Support\Carbon;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'phone'    => 'required|string|unique:users,phone',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'phone'    => $request->phone,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registration successfull!',
                'user' => $user,
                'token' => $token
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'An error occurred during registration.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function registerNPAK(Request $request)
    {
        try {
            $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users,email',
                'phone'    => 'required|string|unique:users,phone',
                'password' => 'required|string|min:6|confirmed',
                'npak'     => 'required',
            ]);

            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'phone'    => $request->phone,
                'password' => Hash::make($request->password),
            ]);

            $cooperativeId = null;

            UserRole::insert([
                'role_positionId' => 568, // Penanggung Jawab NPAK
                'userId' => $user->id,
                'cooperativeId' => $cooperativeId,
                'npak'            => $request->npak, 
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now()
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Registration successfull!',
                'user' => $user,
                'token' => $token
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'An error occurred during registration.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = User::where('email', $request->email)
                ->with(['roles.role', 'roles.institution'])
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials.',
                ], 401);
            }

            $cooperative = $user->cooperative;

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful.',
                'user' => $user,
                'cooperative' => $cooperative,
                'token' => $token
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'An error occurred during login.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successfull.',
        ]);
    }

    public function profile(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.',
                ], 404);
            }

            return response()->json([
                'message' => 'User profile retrieved successfully.',
                'user' => $user
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the profile.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:100',
                'email' => 'sometimes|required|email|max:255|unique:users,email,' . $user->id,
                'phone' => 'sometimes|required|string|min:10|max:16',
                'password' => 'nullable|string|min:6|confirmed', // gunakan password_confirmation di body
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update data user
            if ($request->filled('name')) $user->name = $request->name;
            if ($request->filled('email')) $user->email = $request->email;
            if ($request->filled('phone')) $user->phone = $request->phone;
            if ($request->filled('password')) $user->password = bcrypt($request->password);

            $user->save();

            return response()->json([
                'message' => 'Profile updated successfully',
                'data' => $user
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to update profile',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        Log::info('Status Password Reset', ['status' => $status]);

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link has been sent to your email.']);
        } elseif ($status === Password::RESET_THROTTLED) {
            return response()->json(['message' => 'Too many reset attempts. Please try again later.'], 429);
        }

        return response()->json(['message' => 'Failed to send password reset link.'], 500);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password successfully reset.',
            ]);
        }

        return response()->json([
            'message' => 'Reset password failed.',
            'error' => __($status),
        ], 400);
    }


}