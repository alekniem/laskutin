<?php

namespace Tests\Http;

use App\Http\Controllers\CustomerController;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    use ControllerTestingTrait;
    use RefreshDatabase;

    protected function modelClass()
    {
        return Customer::class;
    }

    protected function modelFactory()
    {
        return Customer::factory();
    }

    protected function modelFind($id)
    {
        return Customer::find($id);
    }

    protected function modelFirst()
    {
        return Customer::first();
    }

    protected function modelWhere($id)
    {
        return Customer::where('id', $id);
    }

    protected function indexAttributes()
    {
        return CustomerController::indexAttributes();
    }

    protected function apiUrl($id = null)
    {
        if ($id !== null)
            return '/api/customer/' . $id;
        else
            return '/api/customer';
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
        ];
    }

    public function updateInvalidValueProvider()
    {
        return $this->storeInvalidValueProvider();
    }
}
