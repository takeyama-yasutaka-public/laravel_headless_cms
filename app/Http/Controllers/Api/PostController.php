<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Carbon;
use App\Services\ImageSizeHtmlFormatter;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $limit = (int) $request->query('limit', 10);
        $offset = (int) $request->query('offset', 0);
        $category = $request->query('category');
        $month = $request->query('month');

        $query = Post::with('categories')
            ->where('is_draft', false)
            ->orderBy('date', 'desc');

        if ($category) {
            $query->whereHas('categories', function ($q) use ($category) {
                $q->where('categories.slug', $category)
                  ->orWhere('categories.id', $category);
            });
        }
        
        if ($month) {
            [$year, $monthNum] = explode('_', $month);
    
            $start = Carbon::createFromDate($year, $monthNum, 1)->startOfMonth();
            $end = Carbon::createFromDate($year, $monthNum, 1)->endOfMonth();
    
            $query->whereBetween('date', [$start, $end]);
        }

        $totalCount = $query->count();
        $posts = $query->skip($offset)->take($limit)->get();

        return response()->json([
            'contents' => $posts->map(fn($post) => $this->transform($post)),
            'totalCount' => $totalCount,
            'offset' => $offset,
            'limit' => $limit,
        ]);
    }

    public function show(Request $request, Post $post)
    {
        $draftKey = $request->query('draftKey');
        $validPreview = $draftKey === config('app.draft_key');
    
        if ($post->is_draft && !$validPreview) {
            abort(404);
        }
    
        $post->load('categories');
    
        return response()->json($this->transform($post));
    }

    private function transform(Post $post)
    {
        return [
            'id' => $post->uuid ? (string) $post->uuid : (string) $post->id,
            'createdAt' => $this->iso($post->created_at),
            'updatedAt' => $this->iso($post->updated_at),
            'publishedAt' => $this->iso($post->created_at),
            'revisedAt' => $this->iso($post->updated_at),
            'title' => $post->title,
            'date' => $this->iso($post->date),
            'content' => ImageSizeHtmlFormatter::addImageSizes($post->content),
            'eyecatch' => $post->eyecatch ? [
                'url' => asset($post->eyecatch),
                'height' => 720,
                'width' => 1080,
            ] : null,
            'category' => $post->categories->map(fn($cat) => [
                'id' => (string) $cat->uuid ?? (string) $cat->id,
                'createdAt' => $this->iso($cat->created_at),
                'updatedAt' => $this->iso($cat->updated_at),
                'publishedAt' => $this->iso($cat->created_at),
                'revisedAt' => $this->iso($cat->updated_at),
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]),
            'is_draft' => $post->is_draft,
        ];
    }

    private function iso($date)
    {
        return Carbon::parse($date)->toIso8601String();
    }

    public function search(Request $request)
    {
        $limit = (int) $request->query('limit', 10);
        $offset = (int) $request->query('offset', 0);
        $q = $request->query('q', '');

        if (!$q) {
            return response()->json([
                'contents' => [],
                'totalCount' => 0,
                'offset' => $offset,
                'limit' => $limit,
            ]);
        }

        $normalizedQuery = str_replace('　', ' ', $q);

        $ids = Post::search($normalizedQuery)->get()->pluck('id')->toArray();
    
        if (empty($ids)) {
            return response()->json([
                'contents' => [],
                'totalCount' => 0,
                'offset' => $offset,
                'limit' => $limit,
            ]);
        }

        $query = Post::with('categories')
            ->whereIn('id', $ids)
            ->where('is_draft', false)
            ->orderBy('date', 'desc');

        $totalCount = $query->count();
        $posts = $query->skip($offset)->take($limit)->get();

        return response()->json([
            'contents' => $posts->map(fn($post) => $this->transform($post)),
            'totalCount' => $totalCount,
            'offset' => $offset,
            'limit' => $limit,
        ]);
    }
}
