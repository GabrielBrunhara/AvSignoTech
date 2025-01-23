<?php

// app/Models/Survey.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
    ];

    /**
     * The options associated with the survey.
     */
    public function options()
    {
        return $this->hasMany(Option::class);
    }

    /**
     * The votes associated with the survey.
     */
    public function votes()
    {
        return $this->hasManyThrough(Vote::class, Option::class);
    }
}
