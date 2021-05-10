<?php

namespace App\Http\Requests;

use App\Rules\ReferenceNumberRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'invoice_date' => 'required_with:due_date|date',
            'due_date' => 'required_with:invoice_date|date|after:invoice_date',
            'invoice_number' => 'required_with:invoice_date|string',
            'reference_number' => ['required_with:invoice_date', 'string', new ReferenceNumberRule()],

            'biller_name' => 'required_with:biller_address_line_one|string',
            'biller_address_line_one' => 'required_with:biller_name|string',
            'biller_address_line_two' => 'required_with:biller_name|string',
            'biller_email' => 'required_with:biller_name|email',
            'biller_phone_number' => 'required_with:biller_name|string',
            'biller_business_identity_code' => 'required_with:biller_name|string',
            'biller_bank_name' => 'required_with:biller_name|string',
            'biller_bank_iban' => 'required_with:biller_name|string',
            'biller_bank_bic' => 'required_with:biller_name|string',
            'biller_pdf_title' => 'required_with:biller_name|string',
            'biller_pdf_author' => 'required_with:biller_name|string',

            'customer_name' => 'required_with:customer_address_line_one|string',
            'customer_address_line_one' => 'required_with:customer_name|string',
            'customer_address_line_two' => 'required_with:customer_name|string',
        ];
    }
}
