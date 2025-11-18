<?php

use Inertia\Inertia;
use App\Models\Product;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;

Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth'])->name('dashboard');
Route::get('/', function () {
    return Inertia::render('Home/Index', [
        'canRegister' => Features::enabled(Features::registration()),
        'products' => Product::all()
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');

    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::put('/cart/{product}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{product}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
});

require __DIR__ . '/settings.php';
