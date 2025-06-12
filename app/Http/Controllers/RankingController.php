<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RankingController extends Controller
{
    public function index()
    {
        $rankings = DB::table('post_rankings')
            ->join('posts', 'posts.id', '=', 'post_rankings.post_id')
            ->select('posts.id', 'posts.title', 'post_rankings.pv')
            ->orderByDesc('post_rankings.pv')
            ->get();

        return Inertia::render('Ranking/Index', [
            'rankings' => $rankings,
        ]);
    }
}
