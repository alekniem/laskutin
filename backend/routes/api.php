<?php

use App\Http\Controllers\BillerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\InvoiceLineController;
use App\Http\Controllers\PdfInvoiceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResources([
    'biller' => BillerController::class,
    'customer' => CustomerController::class,
    'invoice' => InvoiceController::class,
    'invoiceLine' => InvoiceLineController::class,
]);

Route::get('pdfInvoice/{invoice}', [PdfInvoiceController::class, 'fetch'])->name('pdfInvoice.fetch');
