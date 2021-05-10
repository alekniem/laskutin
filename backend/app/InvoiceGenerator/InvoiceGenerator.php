<?php

namespace App\InvoiceGenerator;

use App\Models\Invoice;
use Illuminate\Support\Facades\App;

class InvoiceGenerator
{
    private $directory = null;
    private $uniquePart = null;

    private $invoiceTemplateCode = null;
    private $lineTemplateCode = null;
    private $invoiceTemplateFilename = null;
    private $lineTemplateFilename = null;

    private $fileOperation = null;
    private $latexGenerator = null;
    private $pdfGenerator = null;

    public function __construct()
    {
        $this->directory = sys_get_temp_dir();
        $this->uniquePart = uniqid();

        $this->invoiceTemplateFilename = App::make('invoiceTemplateFilename');
        $this->lineTemplateFilename = App::make('lineTemplateFilename');

        $this->fileOperation = new FileOperation();
        $this->latexGenerator = new LatexGenerator();
        $this->pdfGenerator = new PdfGenerator();
    }

    /**
     * Generate PDF file for the invoice and return the name of the file.
     *
     * @param  Invoice  $invoice
     *
     * @return string  Filename of the PDF file
     *
     * @throws Exception  If error occurs
     */
    public function generatePdf(Invoice $invoice): string
    {
        $latexCode = $this->latexGenerator->generate(
            $invoice,
            $this->getInvoiceTemplateCode(),
            $this->getLineTemplateCode()
        );

        $texFilename = $this->getFilename($invoice, 'tex');
        $pdfFilename = $this->getFilename($invoice, 'pdf');

        $this->fileOperation->saveFile($texFilename, $latexCode);

        $this->pdfGenerator->generate($this->directory, $texFilename);

        return $pdfFilename;
    }

    protected function getFilename(Invoice $invoice, $suffix): string
    {
        $result = '';
        if ($this->directory) {
            $result .= $this->directory . DIRECTORY_SEPARATOR;
        }
        $result .= 'invoice_' . $invoice->id;
        if ($this->uniquePart) {
            $result .= '_' . $this->uniquePart;
        }
        $result .= '.' . $suffix;
        return $result;
    }

    protected function getInvoiceTemplateCode(): string
    {
        if (!$this->invoiceTemplateCode) {
            $this->invoiceTemplateCode = $this->fileOperation->loadFile(
                $this->invoiceTemplateFilename
            );
        }
        return $this->invoiceTemplateCode;
    }

    protected function getLineTemplateCode(): string
    {
        if (!$this->lineTemplateCode) {
            $this->lineTemplateCode = $this->fileOperation->loadFile(
                $this->lineTemplateFilename
            );
        }
        return $this->lineTemplateCode;
    }

    /** This is for testing only. */
    public function overrideDirectory($directory)
    {
        $this->directory = $directory;
    }

    /** This is for testing only. */
    public function overrideUniquePart($uniquePart)
    {
        $this->uniquePart = $uniquePart;
    }

    /** This is for testing only. */
    public function overrideInvoiceTemplateFilename($filename)
    {
        $this->invoiceTemplateFilename = $filename;
    }

    /** This is for testing only. */
    public function overrideLineTemplateFilename($filename)
    {
        $this->lineTemplateFilename = $filename;
    }

    /** This is for testing only. */
    public function overrideFileOperation(FileOperation $fileOperation)
    {
        $this->fileOperation = $fileOperation;
    }

    /** This is for testing only. */
    public function overrideLatexGenerator(LatexGenerator $latexGenerator)
    {
        $this->latexGenerator = $latexGenerator;
    }

    /** This is for testing only. */
    public function overridePdfGenerator(PdfGenerator $pdfGenerator)
    {
        $this->pdfGenerator = $pdfGenerator;
    }
}
