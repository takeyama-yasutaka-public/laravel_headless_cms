<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Services\VercelWebhookService;

class WeeklyPostRanking extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:weekly-post-ranking';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $start = now()->subYear();
        $end = now();

        $ranking = DB::table('page_views')
            ->select('post_id', DB::raw('COUNT(*) as pv'))
            ->whereBetween('viewed_at', [$start, $end])
            ->groupBy('post_id')
            ->orderByDesc('pv')
            ->limit(5)
            ->get();

        DB::table('post_rankings')->truncate();

        foreach ($ranking as $item) {
            DB::table('post_rankings')->insert([
                'post_id' => $item->post_id,
                'pv' => $item->pv,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->info('✅ 人気記事ランキング更新完了');

        app(VercelWebhookService::class)->trigger();
    }
}
