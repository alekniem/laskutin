<?php

namespace Tests\Models;

use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    public function testCorrectAttributesExist()
    {
        $customer = Customer::factory()->create();
        $attributeNames = array_keys($customer->toArray());
        sort($attributeNames);

        $expected = [
            'address_line_one',
            'address_line_two',
            'created_at',
            'id',
            'name',
            'updated_at',
        ];

        $this->assertEquals($expected, $attributeNames);
    }

    public function testInvoices()
    {
        $customer = Customer::factory()->has(Invoice::factory()->count(5))->create();

        $invoices = $customer->invoices;

        $this->assertCount(5, $invoices);

        foreach ($invoices as $invoice) {
            $this->assertInstanceOf(Invoice::class, $invoice);
            $this->assertEquals($customer->id, $invoice->customer_id);
        }
    }
}
