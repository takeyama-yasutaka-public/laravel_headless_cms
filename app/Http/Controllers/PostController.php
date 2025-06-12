<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use TeamTNT\Scout\Engines\TNTSearchEngine;
use App\Services\VercelWebhookService;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $queryText = $request->query('q');

        if (!empty($queryText)) {
            $queryTextNormalized = str_replace('　', ' ', $queryText);
            $ids = Post::search($queryTextNormalized)->get()->pluck('id')->toArray();

            $query = Post::with('categories')
                ->whereIn('id', $ids)
                ->orderByDesc('date');
        } else {
            $query = Post::with('categories')
                ->orderByDesc('date');
        }

        $posts = $query->paginate(10)->appends(['q' => $queryText]);

        return Inertia::render('Post/Index', [
            'posts' => $posts,
            'query' => $queryText,
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/Create', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request, VercelWebhookService $vercel)
    {
        $validated = $request->validate($this->getValidationRules());

        $validated['date'] = $this->parseDate($request->input('date'));
        $validated['eyecatch'] = $this->cleanEyecatch($request->input('eyecatch'));
        $validated['is_draft'] = $request->input('is_draft', false);

        $post = Post::create($validated);
        $post->categories()->sync($validated['categories'] ?? []);

        if (!$post->is_draft) {
            $vercel->trigger();
        }

        return redirect()->route('posts.index')->with('success', '投稿を保存しました');
    }

    public function edit(Post $post)
    {
        $post->load('categories');

        return Inertia::render('Post/Edit', [
            'post' => $post,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Post $post, VercelWebhookService $vercel)
    { 
        $request->validate($this->getValidationRules());

        $validated = [
            'title' => $request->input('title'),
            'date' => $this->parseDate($request->input('date')),
            'content' => $request->input('content'),
            'is_draft' => $request->boolean('is_draft'),
            'categories' => $request->input('categories', []),
            'eyecatch' => $this->cleanEyecatch($request->input('eyecatch')),
        ];

        $isNowDraft = (bool) $validated['is_draft'];
        $wasDraft = (bool) $post->is_draft;

        $post->update($validated);
        $post->categories()->sync($validated['categories'] ?? []);

        if ($wasDraft !== $isNowDraft) {
            $vercel->trigger();
        } elseif (!$isNowDraft && !$wasDraft) {
            $vercel->trigger();
        }

        return redirect()->route('posts.index')->with('success', '投稿を更新しました');
    }
    
    public function destroy(Post $post, VercelWebhookService $vercel)
    {
        if ($post->eyecatch && \Storage::disk('public')->exists($post->eyecatch)) {
            \Storage::disk('public')->delete($post->eyecatch);
        }

        $wasDraft = $post->is_draft;

        $post->categories()->detach();
        $post->delete();

        if (!$wasDraft) {
            $vercel->trigger();
        }

        return redirect()->route('posts.index')->with('success', '投稿を削除しました');
    }
    
    private function cleanEyecatch(?string $url): ?string
    {
        if (!$url) return null;

        $path = parse_url($url, PHP_URL_PATH);
        return str_starts_with($path, '/storage/')
            ? $path
            : '/storage/' . ltrim(str_replace('public/', '', $path), '/');
    }

    private function parseDate(?string $date): ?string
    {
        return $date ? date('Y-m-d', strtotime($date)) : null;
    }

    private function getValidationRules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'content' => 'required|string',
            'eyecatch' => 'required|string',
            'categories' => 'array',
        ];
    }
}
