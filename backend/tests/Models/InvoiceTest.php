<?php

namespace Tests\Models;

use App\Models\Biller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use DateTime;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function testCorrectAttributesExist()
    {
        $invoice = Invoice::factory()->create();
        $attributeNames = array_keys($invoice->toArray());
        sort($attributeNames);

        $expected = [
            'amount_sum',
            'biller_address_line_one',
            'biller_address_line_two',
            'biller_bank_bic',
            'biller_bank_iban',
            'biller_bank_name',
            'biller_business_identity_code',
            'biller_email',
            'biller_id',
            'biller_name',
            'biller_pdf_author',
            'biller_pdf_title',
            'biller_phone_number',
            'created_at',
            'customer_address_line_one',
            'customer_address_line_two',
            'customer_id',
            'customer_name',
            'due_date',
            'formatted_reference_number',
            'id',
            'invoice_date',
            'invoice_number',
            'reference_number',
            'total_amount_sum',
            'updated_at',
            'vat_amount_sum',
        ];

        $this->assertEquals($expected, $attributeNames);
    }

    public function testBiller()
    {
        $invoice = Invoice::factory()->create();
        $biller = $invoice->biller;

        $this->assertInstanceOf(Biller::class, $biller);
        $this->assertEquals($invoice->biller_id, $biller->id);
    }

    public function testCustomer()
    {
        $invoice = Invoice::factory()->create();
        $customer = $invoice->customer;

        $this->assertInstanceOf(Customer::class, $customer);
        $this->assertEquals($invoice->customer_id, $customer->id);
    }

    public function testInvoiceLines()
    {
        $invoice = Invoice::factory()->has(InvoiceLine::factory()->count(3))->create();

        $invoiceLines = $invoice->invoiceLines;

        $this->assertCount(3, $invoiceLines);

        foreach ($invoiceLines as $invoiceLine) {
            $this->assertInstanceOf(InvoiceLine::class, $invoiceLine);
            $this->assertEquals($invoice->id, $invoiceLine->invoice_id);
        }
    }

    public function testGetAmountSumAttribute()
    {
        $invoice = Invoice::factory()
            ->has(
                InvoiceLine::factory()
                    ->count(3)
                    ->state(new Sequence(
                        ['amount' => 100],
                        ['amount' => 1000],
                        ['amount' => 10000],
                    ))
            )
            ->create();

        $this->assertEquals(11100, $invoice->amount_sum);
    }

    public function testGetVatAmountSumAttribute()
    {
        $invoice = Invoice::factory()
            ->has(
                InvoiceLine::factory()
                    ->count(3)
                    ->state(new Sequence(
                        ['vat_amount' => 24],
                        ['vat_amount' => 240],
                        ['vat_amount' => 2400],
                    ))
            )
            ->create();

        $this->assertEquals(2664, $invoice->vat_amount_sum);
    }

    public function testGetTotalAmountSumAttribute()
    {
        $invoice = Invoice::factory()
            ->has(
                InvoiceLine::factory()
                    ->count(3)
                    ->state(new Sequence(
                        ['total_amount' => 124],
                        ['total_amount' => 1240],
                        ['total_amount' => 12400],
                    ))
            )
            ->create();

        $this->assertEquals(13764, $invoice->total_amount_sum);
    }

    public function referenceNumberProvider()
    {
        return [
            ['',           ''],
            ['1',         '1'],
            ['12',       '12'],
            ['123',     '123'],
            ['1234',   '1234'],
            ['12345', '12345'],

            ['123456',         '1 23456'],
            ['1234567',       '12 34567'],
            ['12345678',     '123 45678'],
            ['123456789',   '1234 56789'],
            ['1234567890', '12345 67890'],

            ['12345678901',         '1 23456 78901'],
            ['123456789012',       '12 34567 89012'],
            ['1234567890123',     '123 45678 90123'],
            ['12345678901234',   '1234 56789 01234'],
            ['123456789012345', '12345 67890 12345'],

            ['1234567890123456',         '1 23456 78901 23456'],
            ['12345678901234567',       '12 34567 89012 34567'],
            ['123456789012345678',     '123 45678 90123 45678'],
            ['1234567890123456789',   '1234 56789 01234 56789'],
            ['12345678901234567890', '12345 67890 12345 67890'],
        ];
    }

    /**
     * @dataProvider referenceNumberProvider
     */
    public function testGetFormattedReferenceNumberAttribute($referenceNumber, $formatted)
    {
        $invoice = new Invoice();
        $invoice->reference_number = $referenceNumber;
        $this->assertEquals($formatted, $invoice->formatted_reference_number);
    }

    public function testSetReferenceNumberAttribute()
    {
        $invoice = new Invoice();
        $invoice->reference_number = "  AB1234\n\n56\t78 9 ";
        $this->assertEquals('AB123456789', $invoice->reference_number);
    }

    public function testCleanReferenceNumber()
    {
        $this->assertEquals('AB123456789', Invoice::cleanReferenceNumber("  AB1234\n\n56\t78 9 "));
    }

    public function testGetExistingInvoiceNumbers()
    {
        $ymd = '2020-04-01';
        $invoiceDate = new DateTime($ymd);

        $this->assertEquals([], Invoice::getExistingInvoiceNumbers($invoiceDate));

        Invoice::factory()->state(['invoice_date' => $ymd])->create();
        Invoice::factory()->state(['invoice_date' => $ymd])->create();
        Invoice::factory()->state(['invoice_date' => $ymd])->create();
        Invoice::factory()->state(['invoice_date' => $ymd])->create();
        Invoice::factory()->state(['invoice_date' => $ymd])->create();

        $prefix = '200401';
        $expected = [
            $prefix . '001',
            $prefix . '002',
            $prefix . '003',
            $prefix . '004',
            $prefix . '005',
        ];

        $this->assertEquals($expected, Invoice::getExistingInvoiceNumbers($invoiceDate));
    }

    public function testGenerateInvoiceNumber()
    {
        $invoiceDate = new DateTime('2020-04-01');
        $existingInvoiceNumbers = [];
        $prefix = '200401';
        $suffixes = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'];

        foreach ($suffixes as $suffix) {
            $expected = $prefix . $suffix;
            $generatedInvoiceNumber = Invoice::generateInvoiceNumber($invoiceDate, $existingInvoiceNumbers);
            $existingInvoiceNumbers[] = $generatedInvoiceNumber;
            $this->assertEquals($expected, $generatedInvoiceNumber);
        }
    }

    public function testGenerateInvoiceNumberFailure()
    {
        $invoiceDate = new DateTime('2020-04-01');
        $existingInvoiceNumbers = [];

        for ($i = 1; $i <= 999; $i++) {
            $existingInvoiceNumbers[] = '200401' . str_pad($i, 3, '0', STR_PAD_LEFT);
        }

        $this->assertFalse(Invoice::generateInvoiceNumber($invoiceDate, $existingInvoiceNumbers));
    }

    public function testGenerateReferenceNumber()
    {
        $referenceNumbers = [
            '2004010010',
            '2004010023',
            '2004010036',
            '2004010049',
            '2004010052',
            '2004010065',
            '2004010078',
            '2004010081',
            '2004010094',
            '2004010104',
        ];

        foreach ($referenceNumbers as $expected) {
            $invoiceNumber = substr($expected, 0, -1);
            $generatedReferenceNumber = Invoice::generateReferenceNumber($invoiceNumber);
            $this->assertEquals($expected, $generatedReferenceNumber);
        }
    }
}
