<?php

namespace Tests\InvoiceGenerator;

use App\InvoiceGenerator\Formatter;
use App\InvoiceGenerator\LatexGenerator;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class LatexGeneratorTest extends TestCase
{
    use RefreshDatabase;

    public function testGenerate()
    {
        $invoice = Invoice::factory()->has(InvoiceLine::factory()->count(3))->create();
        $formatter = App::make('App\InvoiceGenerator\Formatter');
        $invoiceTemplate = $this->getInvoiceTemplate();
        $lineTemplate = $this->getLineTemplate();
        $latexGenerator = new LatexGenerator();
        $expected = $this->getInvoiceCode($invoice, $formatter);
        $actual = $latexGenerator->generate($invoice, $invoiceTemplate, $lineTemplate);

        $this->assertEquals($expected, $actual);
    }

    protected function getInvoiceCode(Invoice $invoice, Formatter $formatter)
    {
        return trim("
            THIS IS INVOICE TEMPLATE
            {$this->getInvoiceLinesCode($invoice,$formatter)}
            {$formatter->formatMoney($invoice->amount_sum)}
            {$formatter->formatMoney($invoice->vat_amount_sum)}
            {$formatter->formatMoney($invoice->total_amount_sum)}

            {$formatter->formatDate($invoice->invoice_date)}
            {$formatter->formatDate($invoice->due_date)}
            $invoice->invoice_number
            $invoice->formatted_reference_number

            $invoice->biller_name
            $invoice->biller_address_line_one
            $invoice->biller_address_line_two
            $invoice->biller_email
            $invoice->biller_phone_number
            $invoice->biller_business_identity_code
            $invoice->biller_bank_name
            $invoice->biller_bank_iban
            $invoice->biller_bank_bic
            $invoice->biller_pdf_title
            $invoice->biller_pdf_author

            $invoice->customer_name
            $invoice->customer_address_line_one
            $invoice->customer_address_line_two
        ");
    }

    protected function getInvoiceTemplate()
    {
        return trim('
            THIS IS INVOICE TEMPLATE
            %<<invoiceLines>>
            <<amountS>>
            <<vatS>>
            <<totalS>>

            <<invoiceDate>>
            <<dueDate>>
            <<invoiceNumber>>
            <<referenceNumber>>

            <<billerName>>
            <<billerAddressLineOne>>
            <<billerAddressLineTwo>>
            <<billerEmail>>
            <<billerPhoneNumber>>
            <<billerBusinessIdentityCode>>
            <<billerBankName>>
            <<billerBankIban>>
            <<billerBankBic>>
            <<metadataTitle>>
            <<metadataAuthor>>

            <<customerName>>
            <<customerAddressLineOne>>
            <<customerAddressLineTwo>>
        ');
    }

    protected function getInvoiceLinesCode(Invoice $invoice, Formatter $formatter)
    {
        $result = '';
        foreach ($invoice->invoiceLines as $invoiceLine) {
            $result .= $this->getLineCode($invoiceLine, $formatter);
        }
        return trim($result);
    }

    protected function getLineCode(InvoiceLine $invoiceLine, Formatter $formatter)
    {
        return trim("
            THIS IS LINE TEMPLATE
            $invoiceLine->description
            {$formatter->formatMoney($invoiceLine->amount)}
            $invoiceLine->vat_percent
            {$formatter->formatMoney($invoiceLine->vat_amount)}
            {$formatter->formatMoney($invoiceLine->total_amount)}
        ") . "\n";
    }

    protected function getLineTemplate()
    {
        return trim('
            THIS IS LINE TEMPLATE
            <<description>>
            <<amount>>
            <<vatP>>
            <<vat>>
            <<total>>
        ') . "\n";
    }
}
