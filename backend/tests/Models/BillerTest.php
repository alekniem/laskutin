<?php

namespace Tests\Models;

use App\Models\Biller;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillerTest extends TestCase
{
    use RefreshDatabase;

    public function testCorrectAttributesExist()
    {
        $biller = Biller::factory()->create();
        $attributeNames = array_keys($biller->toArray());
        sort($attributeNames);

        $expected = [
            'address_line_one',
            'address_line_two',
            'bank_bic',
            'bank_iban',
            'bank_name',
            'business_identity_code',
            'created_at',
            'email',
            'id',
            'name',
            'pdf_author',
            'pdf_title',
            'phone_number',
            'updated_at',
        ];

        $this->assertEquals($expected, $attributeNames);
    }

    public function testInvoices()
    {
        $biller = Biller::factory()->has(Invoice::factory()->count(5))->create();

        $invoices = $biller->invoices;

        $this->assertCount(5, $invoices);

        foreach ($invoices as $invoice) {
            $this->assertInstanceOf(Invoice::class, $invoice);
            $this->assertEquals($biller->id, $invoice->biller_id);
        }
    }
}
