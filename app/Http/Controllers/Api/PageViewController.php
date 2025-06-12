<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PageViewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'session_id' => 'required|string|max:255',
        ]);

        $now = now();

        DB::table('page_views')->insert([
            'post_id' => $request->post_id,
            'session_id' => $request->session_id,
            'viewed_at' => $now,
        ]);

        return response()->json(['message' => 'view recorded']);
    }
}