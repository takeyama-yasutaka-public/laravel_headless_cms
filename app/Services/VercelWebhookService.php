<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VercelWebhookService
{
    public function trigger()
    {
        $url = config('services.vercel.webhook_url');

        if (!$url) {
            Log::warning('Vercel Webhook URL が設定されていません。');
            return;
        }

        Http::post($url);
        Log::info('Vercel Webhook を実行しました。');
    }
}
