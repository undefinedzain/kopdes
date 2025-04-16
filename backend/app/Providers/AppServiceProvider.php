<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Notifications\ResetPassword;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        ResetPassword::createUrlUsing(function ($notifiable, string $token) {
            return 'https://merahputih.kop.id/reset-password?token=' . $token . '&email=' . urlencode($notifiable->email);
        });

        // ResetPassword::createUrlUsing(function ($notifiable, string $token) {
        //     return 'http://127.0.0.1:8000/reset-password?token=' . $token . '&email=' . urlencode($notifiable->email);
        // });

        
    }
}
