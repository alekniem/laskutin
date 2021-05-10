<?php

namespace Tests\Http;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PdfInvoiceControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs(User::factory()->create());
    }

    private function makeRequest($invoiceId, $attachmentFilename)
    {
        $response = $this->json('GET', '/api/pdfInvoice/' . $invoiceId);

        $file = $response->getFile();
        $fileSize = $file->getSize();
        $pdfFilename = $file->getPathname();
        $auxFilename = preg_replace('@\.pdf$@', '.aux', $pdfFilename);
        $logFilename = preg_replace('@\.pdf$@', '.log', $pdfFilename);
        $texFilename = preg_replace('@\.pdf$@', '.tex', $pdfFilename);

        $response->assertStatus(200);
        $response->assertHeader('Access-Control-Expose-Headers', 'X-Pdf-Filename');
        $response->assertHeader('Content-Disposition', 'attachment; filename=' . $attachmentFilename);
        $response->assertHeader('Content-Length', $fileSize);
        $response->assertHeader('Content-Type', 'application/pdf');
        $response->assertHeader('X-Pdf-Filename', $attachmentFilename);

        $this->assertFileExists($pdfFilename);
        $this->assertFileExists($auxFilename);
        $this->assertFileExists($logFilename);
        $this->assertFileExists($texFilename);

        $this->assertTrue(unlink($pdfFilename));
        $this->assertTrue(unlink($auxFilename));
        $this->assertTrue(unlink($logFilename));
        $this->assertTrue(unlink($texFilename));

        $this->assertFileDoesNotExist($pdfFilename);
        $this->assertFileDoesNotExist($auxFilename);
        $this->assertFileDoesNotExist($logFilename);
        $this->assertFileDoesNotExist($texFilename);
    }

    public function testFetchAction()
    {
        $invoice = Invoice::factory()->create();

        $this->makeRequest($invoice->id, $invoice->invoice_number . '.pdf');
    }

    public function testFetchAction_MissingInvoiceNumber()
    {
        $invoice = Invoice::factory()->state(['invoice_number' => ''])->create();

        $this->makeRequest($invoice->id, 'invoice.pdf');
    }

    public function testFetchAction_InvalidInvoiceDate()
    {
        // Format of "invoice_date" must be "Y-m-d" (not "j.n.Y").
        $invoice = Invoice::factory()->state(['invoice_date' => '1.1.1970'])->create();

        $response = $this->json('GET', '/api/pdfInvoice/' . $invoice->id);
        $response->assertStatus(422);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertExactJson(['message' => 'Invalid date']);
    }
}
