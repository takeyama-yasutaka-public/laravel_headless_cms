<?php

namespace App\Services;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Illuminate\Support\Facades\Log;

class ImageSizeHtmlFormatter
{
    public static function addImageSizes(string $html): string
    {
        libxml_use_internal_errors(true);

        $dom = new \DOMDocument();
        $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

        $images = $dom->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');

            if (str_starts_with($src, '/storage/images/')) {
                $normalizedSrc = ltrim(preg_replace('#/+#', '/', $src), '/');
                $publicPath = public_path($normalizedSrc);

                if (file_exists($publicPath)) {
                    try {
                        $manager = new ImageManager(new GdDriver());
                        $image = $manager->read($publicPath);

                        $naturalWidth = $image->width();
                        $naturalHeight = $image->height();

                        $existingWidth = $img->getAttribute('width');
                        $existingHeight = $img->getAttribute('height');

                        if (!$existingWidth && !$existingHeight) {
                            $img->setAttribute('width', $naturalWidth);
                            $img->setAttribute('height', $naturalHeight);
                        } elseif ($existingWidth && !$existingHeight) {
                            $scaledHeight = intval(($existingWidth / $naturalWidth) * $naturalHeight);
                            $img->setAttribute('height', $scaledHeight);
                        } elseif (!$existingWidth && $existingHeight) {
                            $scaledWidth = intval(($existingHeight / $naturalHeight) * $naturalWidth);
                            $img->setAttribute('width', $scaledWidth);
                        }
                        
                        $img->setAttribute('src', asset($src));

                    } catch (\Exception $e) {
                        Log::warning("❌ 画像読み込みエラー: {$e->getMessage()}");
                    }
                }
            }
        }
        
        $anchors = $dom->getElementsByTagName('a');

        foreach ($anchors as $a) {
            $href = $a->getAttribute('href');
            if ($href && !preg_match('/^https?:\/\//', $href) && !str_starts_with($href, '/')) {
                $a->setAttribute('href', 'http://' . $href);
            }
        }

        $body = $dom->getElementsByTagName('body')->item(0);
        $innerHTML = '';

        foreach ($body->childNodes as $child) {
            $innerHTML .= $dom->saveHTML($child);
        }

        return $innerHTML;
    }
}