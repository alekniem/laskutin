<?php

namespace Tests\Http;

use App\Http\Controllers\InvoiceController;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InvoiceControllerTest extends TestCase
{
    use ControllerTestingTrait;
    use RefreshDatabase;

    protected function modelClass()
    {
        return Invoice::class;
    }

    protected function modelFactory()
    {
        return Invoice::factory();
    }

    protected function modelFind($id)
    {
        return Invoice::find($id);
    }

    protected function modelFirst()
    {
        return Invoice::first();
    }

    protected function modelWhere($id)
    {
        return Invoice::where('id', $id)->with('invoiceLines');
    }

    protected function indexAttributes()
    {
        return InvoiceController::indexAttributes();
    }

    protected function apiUrl($id = null)
    {
        if ($id !== null)
            return '/api/invoice/' . $id;
        else
            return '/api/invoice';
    }

    protected function changeInputData(array &$inputData, $skipName = null)
    {
        if ($skipName !== 'biller_name') {
            $this->assertArrayHasKey('biller_name', $inputData);
            $inputData['biller_name'] .= 'CHANGED';
        } else {
            $this->assertArrayHasKey('biller_address_line_one', $inputData);
            $inputData['biller_address_line_one'] .= 'CHANGED';
        }
    }

    public function storeInvalidValueProvider()
    {
        return [
            ['biller_id', null, 'The biller id field is required.'],
            ['biller_id', '', 'The biller id field is required.'],
            ['biller_id', 'INVALID', 'The selected biller id is invalid.'],
            ['biller_id', 12345, 'The selected biller id is invalid.'],

            ['customer_id', null, 'The customer id field is required.'],
            ['customer_id', '', 'The customer id field is required.'],
            ['customer_id', 'INVALID', 'The selected customer id is invalid.'],
            ['customer_id', 12345, 'The selected customer id is invalid.'],

            ['invoice_date', null, 'The invoice date field is required.'],
            ['invoice_date', '', 'The invoice date field is required.'],
            ['invoice_date', 'INVALID', 'The invoice date is not a valid date.'],

            ['due_date', null, 'The due date field is required.'],
            ['due_date', '', 'The due date field is required.'],
            ['due_date', 'INVALID', ['The due date is not a valid date.', 'The due date must be a date after invoice date.']],
            ['due_date', '1970-01-01', 'The due date must be a date after invoice date.'],
        ];
    }

    public function updateInvalidValueProvider()
    {
        return [
            ['invoice_date', null, 'The invoice date field is required when due date is present.'],
            ['invoice_date', '', 'The invoice date field is required when due date is present.'],
            ['invoice_date', 'INVALID', 'The invoice date is not a valid date.'],

            ['due_date', null, 'The due date field is required when invoice date is present.'],
            ['due_date', '', 'The due date field is required when invoice date is present.'],
            ['due_date', 'INVALID', ['The due date is not a valid date.', 'The due date must be a date after invoice date.']],
            ['due_date', '1970-01-01', 'The due date must be a date after invoice date.'],

            ['invoice_number', null, 'The invoice number field is required when invoice date is present.'],
            ['invoice_number', '', 'The invoice number field is required when invoice date is present.'],
            ['invoice_number', 12345, 'The invoice number must be a string.'],

            ['reference_number', null, 'The reference number field is required when invoice date is present.'],
            ['reference_number', '', 'The reference number field is required when invoice date is present.'],
            ['reference_number', 12345, ['The reference number must be a string.', 'The reference number has invalid control number.']],
            ['reference_number', '12345', 'The reference number has invalid control number.'],

            ['biller_name', null, 'The biller name field is required when biller address line one is present.'],
            ['biller_name', '', 'The biller name field is required when biller address line one is present.'],
            ['biller_name', 12345, 'The biller name must be a string.'],

            ['biller_address_line_one', null, 'The biller address line one field is required when biller name is present.'],
            ['biller_address_line_one', '', 'The biller address line one field is required when biller name is present.'],
            ['biller_address_line_one', 12345, 'The biller address line one must be a string.'],

            ['biller_address_line_two', null, 'The biller address line two field is required when biller name is present.'],
            ['biller_address_line_two', '', 'The biller address line two field is required when biller name is present.'],
            ['biller_address_line_two', 12345, 'The biller address line two must be a string.'],

            ['biller_email', null, 'The biller email field is required when biller name is present.'],
            ['biller_email', '', 'The biller email field is required when biller name is present.'],
            ['biller_email', 'INVALID', 'The biller email must be a valid email address.'],

            ['biller_phone_number', null, 'The biller phone number field is required when biller name is present.'],
            ['biller_phone_number', '', 'The biller phone number field is required when biller name is present.'],
            ['biller_phone_number', 12345, 'The biller phone number must be a string.'],

            ['biller_business_identity_code', null, 'The biller business identity code field is required when biller name is present.'],
            ['biller_business_identity_code', '', 'The biller business identity code field is required when biller name is present.'],
            ['biller_business_identity_code', 12345, 'The biller business identity code must be a string.'],

            ['biller_bank_name', null, 'The biller bank name field is required when biller name is present.'],
            ['biller_bank_name', '', 'The biller bank name field is required when biller name is present.'],
            ['biller_bank_name', 12345, 'The biller bank name must be a string.'],

            ['biller_bank_iban', null, 'The biller bank iban field is required when biller name is present.'],
            ['biller_bank_iban', '', 'The biller bank iban field is required when biller name is present.'],
            ['biller_bank_iban', 12345, 'The biller bank iban must be a string.'],

            ['biller_bank_bic', null, 'The biller bank bic field is required when biller name is present.'],
            ['biller_bank_bic', '', 'The biller bank bic field is required when biller name is present.'],
            ['biller_bank_bic', 12345, 'The biller bank bic must be a string.'],

            ['biller_pdf_title', null, 'The biller pdf title field is required when biller name is present.'],
            ['biller_pdf_title', '', 'The biller pdf title field is required when biller name is present.'],
            ['biller_pdf_title', 12345, 'The biller pdf title must be a string.'],

            ['biller_pdf_author', null, 'The biller pdf author field is required when biller name is present.'],
            ['biller_pdf_author', '', 'The biller pdf author field is required when biller name is present.'],
            ['biller_pdf_author', 12345, 'The biller pdf author must be a string.'],

            ['customer_name', null, 'The customer name field is required when customer address line one is present.'],
            ['customer_name', '', 'The customer name field is required when customer address line one is present.'],
            ['customer_name', 12345, 'The customer name must be a string.'],

            ['customer_address_line_one', null, 'The customer address line one field is required when customer name is present.'],
            ['customer_address_line_one', '', 'The customer address line one field is required when customer name is present.'],
            ['customer_address_line_one', 12345, 'The customer address line one must be a string.'],

            ['customer_address_line_two', null, 'The customer address line two field is required when customer name is present.'],
            ['customer_address_line_two', '', 'The customer address line two field is required when customer name is present.'],
            ['customer_address_line_two', 12345, 'The customer address line two must be a string.'],
        ];
    }
}
