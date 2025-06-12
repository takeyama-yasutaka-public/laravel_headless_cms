<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RankingController extends Controller
{
    public function index()
    {
        $ranking = DB::table('post_rankings')
            ->join('posts', 'post_rankings.post_id', '=', 'posts.id')
            ->where('is_draft', false)
            ->orderByDesc('pv')
            ->limit(5)
            ->get();

        return response()->json([
            'ranking' => $ranking
        ]);
    }
}
