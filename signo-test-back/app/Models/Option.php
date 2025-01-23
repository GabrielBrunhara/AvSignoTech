<?php

// app/Models/Option.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'option_text',
        'votes_count',
    ];

    /**
     * The survey that owns the option.
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * The votes associated with the option.
     */
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
