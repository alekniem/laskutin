<?php

namespace App\InvoiceGenerator;

use Illuminate\Support\ServiceProvider;

class InvoiceGeneratorServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\InvoiceGenerator\Formatter',
            'App\InvoiceGenerator\FormatterFinnish'
        );

        $this->app->instance(
            'invoiceTemplateFilename',
            __DIR__ . '/Template/fi/invoice.tex'
        );

        $this->app->instance(
            'lineTemplateFilename',
            __DIR__ . '/Template/fi/invoiceLine.tex'
        );
    }
}
