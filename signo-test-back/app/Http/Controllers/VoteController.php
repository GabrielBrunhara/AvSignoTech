<?php

// app/Http/Controllers/VoteController.php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\Option;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function vote($surveyId, $optionId)
    {
        $survey = Survey::findOrFail($surveyId);
        $option = Option::findOrFail($optionId);
        $currentDate = now()->toDateString();

        if ($survey->start_date <= $currentDate && $survey->end_date >= $currentDate) {
            $vote = Vote::create([
                'survey_id' => $survey->id,
                'option_id' => $option->id,
            ]);

            $option->increment('votes_count');

            return response()->json([
                'message' => 'Vote registered successfully!',
                'votes_count' => $option->votes_count,
            ]);
        }

        return response()->json(['message' => 'Survey is not active!'], 400);
    }
}
