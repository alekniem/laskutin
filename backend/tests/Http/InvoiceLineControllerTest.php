<?php

namespace Tests\Http;

use App\Http\Controllers\InvoiceLineController;
use App\Models\InvoiceLine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceLineControllerTest extends TestCase
{
    use ControllerTestingTrait;
    use RefreshDatabase;

    protected function modelClass()
    {
        return InvoiceLine::class;
    }

    protected function modelFactory()
    {
        return InvoiceLine::factory();
    }

    protected function modelFind($id)
    {
        return InvoiceLine::find($id);
    }

    protected function modelFirst()
    {
        return InvoiceLine::first();
    }

    protected function modelWhere($id)
    {
        return InvoiceLine::where('id', $id);
    }

    protected function indexAttributes()
    {
        return InvoiceLineController::indexAttributes();
    }

    protected function apiUrl($id = null)
    {
        if ($id !== null)
            return '/api/invoiceLine/' . $id;
        else
            return '/api/invoiceLine';
    }

    protected function changeInputData(array &$inputData, $skipName = null)
    {
        if ($skipName !== 'description') {
            $this->assertArrayHasKey('description', $inputData);
            $inputData['description'] .= 'CHANGED';
        } else {
            $this->assertArrayHasKey('amount', $inputData);
            $inputData['amount'] += 1;
        }
    }

    public function storeInvalidValueProvider()
    {
        return [
            ['invoice_id', null, 'The invoice id field is required.'],
            ['invoice_id', '', 'The invoice id field is required.'],
            ['invoice_id', 'INVALID', 'The invoice id must be an integer.'],

            ['description', null, 'The description field is required.'],
            ['description', '', 'The description field is required.'],
            ['description', 12345, 'The description must be a string.'],

            ['amount', 'INVALID', 'The amount must be an integer.'],

            ['vat_percent', 'INVALID', 'The vat percent must be an integer.'],

            ['vat_amount', 'INVALID', 'The vat amount must be an integer.'],

            ['total_amount', 'INVALID', 'The total amount must be an integer.'],
        ];
    }

    public function updateInvalidValueProvider()
    {
        return $this->storeInvalidValueProvider();
    }
}
