<?php

namespace Tests\Models;

use App\Models\Invoice;
use App\Models\InvoiceLine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceLineTest extends TestCase
{
    use RefreshDatabase;

    public function testCorrectAttributesExist()
    {
        $invoiceLine = InvoiceLine::factory()->create();
        $attributeNames = array_keys($invoiceLine->toArray());
        sort($attributeNames);

        $expected = [
            'amount',
            'created_at',
            'description',
            'id',
            'invoice_id',
            'total_amount',
            'updated_at',
            'vat_amount',
            'vat_percent',
        ];

        $this->assertEquals($expected, $attributeNames);
    }

    public function testInvoice()
    {
        $invoiceLine = InvoiceLine::factory()->create();
        $invoice = $invoiceLine->invoice;

        $this->assertInstanceOf(Invoice::class, $invoice);
        $this->assertEquals($invoiceLine->invoice_id, $invoice->id);
    }
}
