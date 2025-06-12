<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Post extends Model
{
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    protected $fillable = [
        'title',
        'date',
        'content',
        'eyecatch',
        'is_draft',
    ];

    use Searchable;

    public function toSearchableArray(): array
    {
        $fulltext = $this->generateFulltext();

        return [
            'id' => $this->id,
            'fulltext' => $fulltext,
        ];
    }

    private function generateFulltext(): string
    {
        $raw = $this->title . ' ' . $this->content;
    
        if ($this->relationLoaded('categories') || $this->categories) {
            $raw .= ' ' . $this->categories->pluck('name')->implode(' ');
        }
    
        $raw = preg_replace('/<\/?(h[1-6]|p|li|ul|ol)>/i', "\n", $raw);
        $raw = preg_replace('/<br[^>]*?>/i', "\n", $raw);
        $text = strip_tags($raw);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        $text = preg_replace('/(<\?php|\?>|import|from|export|class|function|const|public|private|protected|return|=>|==|===|{|}|\(|\)|\[|\]|@|\$|;|::|->|,)/u', ' ', $text);
        $text = preg_replace('/\s+/u', ' ', $text);
        $text = trim($text);
    
        return $text;
    }
}
