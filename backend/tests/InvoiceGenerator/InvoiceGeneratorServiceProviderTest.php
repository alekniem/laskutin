<?php

namespace Tests\InvoiceGenerator;

use Illuminate\Support\Facades\App;
use Tests\TestCase;

class InvoiceGeneratorServiceProviderTest extends TestCase
{
    public function testRegister()
    {
        $this->assertInstanceOf(
            'App\InvoiceGenerator\FormatterFinnish',
            App::make('App\InvoiceGenerator\Formatter')
        );

        $dir = strtr(__DIR__, array('tests/' => 'app/'));

        $this->assertEquals(
            $dir . '/Template/fi/invoice.tex',
            App::make('invoiceTemplateFilename')
        );

        $this->assertEquals(
            $dir . '/Template/fi/invoiceLine.tex',
            App::make('lineTemplateFilename')
        );
    }
}
