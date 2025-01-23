<?php

// app/Models/Vote.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'option_id',
    ];

    /**
     * The survey that the vote belongs to.
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * The option that the vote belongs to.
     */
    public function option()
    {
        return $this->belongsTo(Option::class);
    }
}
