<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillerRequest extends FormRequest
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
            'name' => 'required|string',
            'address_line_one' => 'required|string',
            'address_line_two' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'business_identity_code' => 'required|string',
            'bank_name' => 'required|string',
            'bank_iban' => 'required|string',
            'bank_bic' => 'required|string',
            'pdf_title' => 'required|string',
            'pdf_author' => 'required|string',
        ];
    }
}
