<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceLineRequest;
use App\Http\Resources\InvoiceLineResource;
use App\Models\InvoiceLine;

class InvoiceLineController extends Controller
{
    /**
     * Get the names of the selected attributes of the invoice line.
     */
    public static function indexAttributes()
    {
        return [
            'id',
            'invoice_id',
            'description',
            'amount',
            'vat_percent',
            'vat_amount',
            'total_amount',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InvoiceLineResource::collection(InvoiceLine::all(self::indexAttributes()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\InvoiceLineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InvoiceLineRequest $request)
    {
        $validatedData = $request->validated();

        $invoiceLine = new InvoiceLine($validatedData);
        $invoiceLine->save();

        return response()->json(['message' => 'Ok', 'id' => $invoiceLine->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$invoiceLine = InvoiceLine::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        return new InvoiceLineResource($invoiceLine);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\InvoiceLineRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InvoiceLineRequest $request, $id)
    {
        $validatedData = $request->validated();

        if (!$invoiceLine = InvoiceLine::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $invoiceLine->update($validatedData);

        return response()->json(['message' => 'Ok', 'id' => $invoiceLine->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$invoiceLine = InvoiceLine::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $invoiceLine->delete();

        return response()->json(['message' => 'Ok']);
    }
}
