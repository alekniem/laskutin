<?php

namespace App\InvoiceGenerator;

use App\Models\Invoice;
use App\Models\InvoiceLine;
use Illuminate\Support\Facades\App;

class LatexGenerator
{
    private $formatter = null;
    private $invoiceTemplate = null;
    private $lineTemplate = null;

    public function __construct()
    {
        $this->formatter = App::make('App\InvoiceGenerator\Formatter');
    }

    /**
     * Generate LaTeX code for the invoice.
     *
     * @param  Invoice  $invoice
     * @param  string  $invoiceTemplate  LaTeX template code for invoice
     * @param  string  $lineTemplate  LaTeX template code for invoice lines
     *
     * @return string  LaTeX code
     *
     * @throws Exception  If error occurs
     */
    public function generate(Invoice $invoice, string $invoiceTemplate, string $lineTemplate): string
    {
        $this->invoiceTemplate = $invoiceTemplate;
        $this->lineTemplate = $lineTemplate;

        return $this->getInvoiceCode($invoice);
    }

    protected function getInvoiceCode(Invoice $invoice): string
    {
        $template = $this->invoiceTemplate;
        $patterns = [];
        $replacements = [];
        foreach ($this->getInvoiceValues($invoice) as $key => $value) {
            $patterns[] = '@' . $key . '@';
            $replacements[] = $value;
        }
        return trim(preg_replace($patterns, $replacements, $template));
    }

    protected function getLinesCode(Invoice $invoice): string
    {
        $result = '';
        foreach ($invoice->invoiceLines as $invoiceLine) {
            $template = $this->lineTemplate;
            $patterns = [];
            $replacements = [];
            foreach ($this->getLineValues($invoiceLine) as $key => $value) {
                $patterns[] = '@' . $key . '@';
                $replacements[] = $value;
            }
            $result .= preg_replace($patterns, $replacements, $template);
        }
        return trim($result);
    }

    protected function getInvoiceValues(Invoice $invoice): array
    {
        $result = [];
        $result['%<<invoiceLines>>'] = $this->getLinesCode($invoice);
        $result['<<amountS>>'] = $this->formatter->formatMoney($invoice->amount_sum);
        $result['<<vatS>>'] = $this->formatter->formatMoney($invoice->vat_amount_sum);
        $result['<<totalS>>'] = $this->formatter->formatMoney($invoice->total_amount_sum);

        $result['<<invoiceDate>>'] = $this->formatter->formatDate($invoice->invoice_date);
        $result['<<dueDate>>'] = $this->formatter->formatDate($invoice->due_date);
        $result['<<invoiceNumber>>'] = $invoice->invoice_number;
        $result['<<referenceNumber>>'] = $invoice->formatted_reference_number;

        $result['<<billerName>>'] = $invoice->biller_name;
        $result['<<billerAddressLineOne>>'] = $invoice->biller_address_line_one;
        $result['<<billerAddressLineTwo>>'] = $invoice->biller_address_line_two;
        $result['<<billerEmail>>'] = $invoice->biller_email;
        $result['<<billerPhoneNumber>>'] = $invoice->biller_phone_number;
        $result['<<billerBusinessIdentityCode>>'] = $invoice->biller_business_identity_code;
        $result['<<billerBankName>>'] = $invoice->biller_bank_name;
        $result['<<billerBankIban>>'] = $invoice->biller_bank_iban;
        $result['<<billerBankBic>>'] = $invoice->biller_bank_bic;
        $result['<<metadataTitle>>'] = $invoice->biller_pdf_title;
        $result['<<metadataAuthor>>'] = $invoice->biller_pdf_author;

        $result['<<customerName>>'] = $invoice->customer_name;
        $result['<<customerAddressLineOne>>'] = $invoice->customer_address_line_one;
        $result['<<customerAddressLineTwo>>'] = $invoice->customer_address_line_two;

        return $result;
    }

    protected function getLineValues(InvoiceLine $invoiceLine): array
    {
        $result = [];
        $result['<<description>>'] = $invoiceLine->description;
        $result['<<amount>>'] = $this->formatter->formatMoney($invoiceLine->amount);
        $result['<<vatP>>'] = $invoiceLine->vat_percent;
        $result['<<vat>>'] = $this->formatter->formatMoney($invoiceLine->vat_amount);
        $result['<<total>>'] = $this->formatter->formatMoney($invoiceLine->total_amount);

        return $result;
    }
}
