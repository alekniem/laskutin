<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillerRequest;
use App\Http\Resources\BillerResource;
use App\Models\Biller;

class BillerController extends Controller
{
    /**
     * Get the names of the selected attributes of the biller.
     */
    public static function indexAttributes()
    {
        return [
            'id',
            'name',
            'address_line_one',
            'address_line_two',
            'email',
            'phone_number',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BillerResource::collection(Biller::all(self::indexAttributes()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\BillerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BillerRequest $request)
    {
        $validatedData = $request->validated();

        $biller = new Biller($validatedData);
        $biller->save();

        return response()->json(['message' => 'Ok', 'id' => $biller->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$biller = Biller::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        return new BillerResource($biller);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\BillerRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BillerRequest $request, $id)
    {
        $validatedData = $request->validated();

        if (!$biller = Biller::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $biller->update($validatedData);

        return response()->json(['message' => 'Ok', 'id' => $biller->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$biller = Biller::find($id))
            return response()->json(['message' => 'Invalid id'], 422);

        $biller->delete();

        return response()->json(['message' => 'Ok']);
    }
}
