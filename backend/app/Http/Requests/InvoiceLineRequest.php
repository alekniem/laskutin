<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceLineRequest extends FormRequest
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
            'invoice_id' => 'required|integer',
            'description' => 'required|string',
            'amount' => 'nullable|integer',
            'vat_percent' => 'nullable|integer',
            'vat_amount' => 'nullable|integer',
            'total_amount' => 'nullable|integer',
        ];
    }
}
