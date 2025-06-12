<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Carbon;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $limit = (int) $request->query('limit', 10);
        $categories = Category::limit($limit)->get();
    
        return response()->json([
            'contents' => $categories->map(fn($cat) => [
                'id' => (string) $cat->id,
                'createdAt' => $this->iso($cat->created_at),
                'updatedAt' => $this->iso($cat->updated_at),
                'publishedAt' => $this->iso($cat->created_at),
                'revisedAt' => $this->iso($cat->updated_at),
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]),
            'totalCount' => Category::count(),
            'offset' => 0,
            'limit' => $limit,
        ]);
    }

    private function iso($date)
    {
        return Carbon::parse($date)->toIso8601String();
    }
}
