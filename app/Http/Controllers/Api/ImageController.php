<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index()
    {
        $files = Storage::disk('public')->files('images');
        
        usort($files, function ($a, $b) {
            $timeA = Storage::disk('public')->lastModified($a);
            $timeB = Storage::disk('public')->lastModified($b);
            return $timeB <=> $timeA;
        });

        return response()->json(['images' => $files]);
    }

    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $request->file('image')->store('images', 'public');
            return response()->json(['message' => 'Uploaded']);
        }
        return response()->json(['error' => 'No file'], 400);
    }

    public function destroy(Request $request)
    {
        $path = $request->input('path');
        if (!$path) {
            return response()->json(['error' => 'No path'], 400);
        }

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Deleted']);
        }

        return response()->json(['error' => 'File not found'], 404);
    }
}