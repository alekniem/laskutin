<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Biller;
use App\Models\Customer;
use App\Models\Invoice;
use DateTime;

class InvoiceController extends Controller
{
    /**
     * Get the names of the selected attributes of the invoice.
     */
    public static function indexAttributes()
    {
        return [
            'id',
            'biller_name',
            'customer_name',
            'invoice_date',
            'due_date',
            'invoice_number',
            'reference_number',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InvoiceResource::collection(Invoice::all(self::indexAttributes()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInvoiceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInvoiceRequest $request)
    {
        $validatedData = $request->validated();

        $invoiceDate = new DateTime($validatedData['invoice_date']);
        $dueDate = new DateTime($validatedData['due_date']);

        $validatedData['invoice_date'] = $invoiceDate->format('Y-m-d');
        $validatedData['due_date'] = $dueDate->format('Y-m-d');

        $existingInvoiceNumbers = Invoice::getExistingInvoiceNumbers($invoiceDate);
        $invoiceNumber = Invoice::generateInvoiceNumber($invoiceDate, $existingInvoiceNumbers);
        $referenceNumber = Invoice::generateReferenceNumber($invoiceNumber);

        $validatedData['invoice_number'] = $invoiceNumber;
        $validatedData['reference_number'] = $referenceNumber;

        $biller = Biller::find($validatedData['biller_id']);

        $billerAttributes = [
            'name',
            'address_line_one',
            'address_line_two',
            'email',
            'phone_number',
            'business_identity_code',
            'bank_name',
            'bank_iban',
            'bank_bic',
            'pdf_title',
            'pdf_author',
        ];

        foreach ($billerAttributes as $attribute) {
            $validatedData['biller_' . $attribute] = $biller->$attribute;
        }

        $customer = Customer::find($validatedData['customer_id']);

        $customerAttributes = [
            'name',
            'address_line_one',
            'address_line_two',
        ];

        foreach ($customerAttributes as $attribute) {
            $validatedData['customer_' . $attribute] = $customer->$attribute;
        }

        $invoice = new Invoice($validatedData);
        $invoice->save();

        return response()->json(['message' => 'Ok', 'id' => $invoice->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$invoice = Invoice::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        return new InvoiceResource($invoice);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInvoiceRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInvoiceRequest $request, $id)
    {
        $validatedData = $request->validated();

        if (!$invoice = Invoice::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $invoice->update($validatedData);

        return response()->json(['message' => 'Ok', 'id' => $invoice->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$invoice = Invoice::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $invoice->delete();

        return response()->json(['message' => 'Ok']);
    }
}
