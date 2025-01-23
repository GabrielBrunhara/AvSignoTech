<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = Survey::with('options')
            ->withCount(['votes as total_votes' => function ($query) {
                $query->select(DB::raw('count(distinct votes.id)'));
            }])
            ->orderBy('end_date')
            ->get();

        return response()->json($surveys);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'options' => 'required|array|min:3',
            'options.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(),], 422);
        }

        DB::beginTransaction();

        try {
            $survey = Survey::create([
                'title' => $request->title,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            foreach ($request->options as $optionText) {
                Option::create([
                    'survey_id' => $survey->id,
                    'option_text' => $optionText,
                ]);
            }

            DB::commit();

            return response()->json($survey->load('options'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create survey'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $survey = Survey::findOrFail($id);

        $validator = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'options' => 'required|array|min:3',
            'options.*' => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            $survey->update([
                'title' => $request->title,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            $survey->options()->delete();

            $newOptions = collect($request->options)->map(function ($optionText) use ($survey) {
                return [
                    'survey_id' => $survey->id,
                    'option_text' => $optionText,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            Option::insert($newOptions->toArray());

            DB::commit();

            return response()->json($survey->load('options'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update survey', 'message' => $e->getMessage()], 500);
        }
    }
    public function show(Request $request, $id)
    {
        $survey = Survey::with('options')
            ->withCount(['votes as total_votes' => function ($query) {
                $query->select(DB::raw('count(distinct votes.id)'));
            }])
            ->findOrFail($id);

        return response()->json($survey);
    }


    public function destroy($id)
    {
        try {
            $survey = Survey::findOrFail($id);
            $survey->options()->delete();
            $survey->delete();

            return response()->json(['message' => 'Survey deleted successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create survey'], 500);
        }
    }
}
