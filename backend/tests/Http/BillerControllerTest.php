<?php

namespace Tests\Http;

use App\Http\Controllers\BillerController;
use App\Models\Biller;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillerControllerTest extends TestCase
{
    use ControllerTestingTrait;
    use RefreshDatabase;

    protected function modelClass()
    {
        return Biller::class;
    }

    protected function modelFactory()
    {
        return Biller::factory();
    }

    protected function modelFind($id)
    {
        return Biller::find($id);
    }

    protected function modelFirst()
    {
        return Biller::first();
    }

    protected function modelWhere($id)
    {
        return Biller::where('id', $id);
    }

    protected function indexAttributes()
    {
        return BillerController::indexAttributes();
    }

    protected function apiUrl($id = null)
    {
        if ($id !== null)
            return '/api/biller/' . $id;
        else
            return '/api/biller';
    }

    protected function changeInputData(array &$inputData, $skipName = null)
    {
        if ($skipName !== 'name') {
            $this->assertArrayHasKey('name', $inputData);
            $inputData['name'] .= 'CHANGED';
        } else {
            $this->assertArrayHasKey('address_line_one', $inputData);
            $inputData['address_line_one'] .= 'CHANGED';
        }
    }

    public function storeInvalidValueProvider()
    {
        return [
            ['name', null, 'The name field is required.'],
            ['name', '', 'The name field is required.'],
            ['name', 12345, 'The name must be a string.'],

            ['address_line_one', null, 'The address line one field is required.'],
            ['address_line_one', '', 'The address line one field is required.'],
            ['address_line_one', 12345, 'The address line one must be a string.'],

            ['address_line_two', null, 'The address line two field is required.'],
            ['address_line_two', '', 'The address line two field is required.'],
            ['address_line_two', 12345, 'The address line two must be a string.'],

            ['email', null, 'The email field is required.'],
            ['email', '', 'The email field is required.'],
            ['email', 'INVALID', 'The email must be a valid email address.'],

            ['phone_number', null, 'The phone number field is required.'],
            ['phone_number', '', 'The phone number field is required.'],
            ['phone_number', 12345, 'The phone number must be a string.'],

            ['business_identity_code', null, 'The business identity code field is required.'],
            ['business_identity_code', '', 'The business identity code field is required.'],
            ['business_identity_code', 12345, 'The business identity code must be a string.'],

            ['bank_name', null, 'The bank name field is required.'],
            ['bank_name', '', 'The bank name field is required.'],
            ['bank_name', 12345, 'The bank name must be a string.'],

            ['bank_iban', null, 'The bank iban field is required.'],
            ['bank_iban', '', 'The bank iban field is required.'],
            ['bank_iban', 12345, 'The bank iban must be a string.'],

            ['bank_bic', null, 'The bank bic field is required.'],
            ['bank_bic', '', 'The bank bic field is required.'],
            ['bank_bic', 12345, 'The bank bic must be a string.'],

            ['pdf_title', null, 'The pdf title field is required.'],
            ['pdf_title', '', 'The pdf title field is required.'],
            ['pdf_title', 12345, 'The pdf title must be a string.'],

            ['pdf_author', null, 'The pdf author field is required.'],
            ['pdf_author', '', 'The pdf author field is required.'],
            ['pdf_author', 12345, 'The pdf author must be a string.'],
        ];
    }

    public function updateInvalidValueProvider()
    {
        return $this->storeInvalidValueProvider();
    }
}
