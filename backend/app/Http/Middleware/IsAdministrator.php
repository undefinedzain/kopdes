<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdministrator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->roles()->where('name', 'ADMINISTRATOR')->exists()) {
            return $next($request);
        }

        return response()->json([
            'message' => 'Unauthorized. Only administrators can access this resource.'
        ], 403);
    }

}
