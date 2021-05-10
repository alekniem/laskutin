<?php

namespace Tests\InvoiceGenerator;

use App\InvoiceGenerator\FileOperation;
use App\InvoiceGenerator\InvoiceGenerator;
use App\InvoiceGenerator\LatexGenerator;
use App\InvoiceGenerator\PdfGenerator;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\MockObject\MockObject;
use Tests\TestCase;

class InvoiceGeneratorTest extends TestCase
{
    use RefreshDatabase;

    public function testGeneratePdf()
    {
        $invoice = Invoice::factory()->create();

        $invoiceTemplateFilename = 'INVOICE TEMPLATE FILENAME';
        $lineTemplateFilename = 'LINE TEMPLATE FILENAME';
        $invoiceTemplateCode = 'INVOICE TEMPLATE CODE';
        $lineTemplateCode = 'LINE TEMPLATE CODE';
        $latexCode = 'LATEX CODE';
        $directory = '/foo/bar';
        $uniquePart = '12345';
        $texFilename = '/foo/bar/invoice_' . $invoice->id . '_12345.tex';
        $pdfFilename = '/foo/bar/invoice_' . $invoice->id . '_12345.pdf';

        $loadFileCallback = function ($filename) use ($invoiceTemplateFilename, $lineTemplateFilename, $invoiceTemplateCode, $lineTemplateCode) {
            if ($filename === $invoiceTemplateFilename) {
                return $invoiceTemplateCode;
            }
            if ($filename === $lineTemplateFilename) {
                return $lineTemplateCode;
            }
            $this->fail('Invalid filename');
        };

        /** @var FileOperation&MockObject $fileOperation */
        $fileOperation = $this->getMockBuilder(FileOperation::class)->getMock();
        $fileOperation
            ->expects($this->exactly(2))
            ->method('loadFile')
            ->will($this->returnCallback($loadFileCallback));
        $fileOperation
            ->expects($this->once())
            ->method('saveFile')
            ->with($texFilename, $latexCode);

        /** @var LatexGenerator&MockObject $latexGenerator */
        $latexGenerator = $this->getMockBuilder(LatexGenerator::class)->disableOriginalConstructor()->getMock();
        $latexGenerator
            ->expects($this->once())
            ->method('generate')
            ->with($invoice, $invoiceTemplateCode, $lineTemplateCode)
            ->willReturn($latexCode);

        /** @var PdfGenerator&MockObject $pdfGenerator */
        $pdfGenerator = $this->getMockBuilder(PdfGenerator::class)->getMock();
        $pdfGenerator
            ->expects($this->once())
            ->method('generate')
            ->with($directory, $texFilename);

        $generator = new InvoiceGenerator();
        $generator->overrideDirectory($directory);
        $generator->overrideUniquePart($uniquePart);
        $generator->overrideInvoiceTemplateFilename($invoiceTemplateFilename);
        $generator->overrideLineTemplateFilename($lineTemplateFilename);
        $generator->overrideFileOperation($fileOperation);
        $generator->overrideLatexGenerator($latexGenerator);
        $generator->overridePdfGenerator($pdfGenerator);

        $this->assertEquals($pdfFilename, $generator->generatePdf($invoice));
    }
}
