<?php

namespace App\Http\Controllers;

use App\InvoiceGenerator\InvoiceGenerator;
use App\Models\Invoice;
use Exception;

class PdfInvoiceController extends Controller
{
    public function fetch(Invoice $invoice)
    {
        try {
            $invoiceGenerator = new InvoiceGenerator();
            $pdfFilename = $invoiceGenerator->generatePdf($invoice);

            $name = ($invoice->invoice_number)
                ? $invoice->invoice_number . '.pdf'
                : 'invoice.pdf';

            return response()->download(
                $pdfFilename,
                $name,
                [
                    'Access-Control-Expose-Headers' => 'X-Pdf-Filename',
                    'X-Pdf-Filename' => $name,
                ]
            );
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
