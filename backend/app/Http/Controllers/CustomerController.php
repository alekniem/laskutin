<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Get the names of the selected attributes of the customer.
     */
    public static function indexAttributes()
    {
        return [
            'id',
            'name',
            'address_line_one',
            'address_line_two',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CustomerResource::collection(Customer::all(self::indexAttributes()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {
        $validatedData = $request->validated();

        $customer = new Customer($validatedData);
        $customer->save();

        return response()->json(['message' => 'Ok', 'id' => $customer->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$customer = Customer::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        return new CustomerResource($customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\CustomerRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerRequest $request, $id)
    {
        $validatedData = $request->validated();

        if (!$customer = Customer::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $customer->update($validatedData);

        return response()->json(['message' => 'Ok', 'id' => $customer->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$customer = Customer::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $customer->delete();

        return response()->json(['message' => 'Ok']);
    }
}
