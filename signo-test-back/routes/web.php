    <?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\SurveyController;
    use App\Http\Controllers\OptionController;
    use App\Http\Controllers\VoteController;

    // Rota raiz para retornar as enquetes em formato JSON
    Route::get('/', [SurveyController::class, 'index'])->name('home');

    // Rotas para Enquetes (CRUD)
    Route::get('surveys/{id}', [SurveyController::class, 'show'])->name('surveys.show')->withoutMiddleware(['web']);
    Route::post('surveys', [SurveyController::class, 'store'])->name('surveys.store')->withoutMiddleware(['web']);
    Route::put('surveys/{id}', [SurveyController::class, 'update'])->name('surveys.update')->withoutMiddleware(['web']);
    Route::delete('surveys/{id}', [SurveyController::class, 'destroy'])->name('surveys.destroy')->withoutMiddleware(['web']);


    // Rota para Votação
    Route::post('surveys/{survey}/vote/{option}', [VoteController::class, 'vote'])->name('vote')->withoutMiddleware(['web']);
