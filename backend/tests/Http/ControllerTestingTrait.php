<?php

namespace Tests\Http;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

trait ControllerTestingTrait
{
    protected function setUp(): void
    {
        parent::setUp();

        Sanctum::actingAs(User::factory()->create());
    }

    protected function errorResponse($attributeName, $error)
    {
        $error = (array) $error;

        return [
            'message' => 'The given data was invalid.',
            'errors' => [
                $attributeName => $error,
            ],
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Test INDEX action
    |--------------------------------------------------------------------------
    */

    public function testIndexAction()
    {
        $id1 = $this->modelFactory()->create()->id;
        $id2 = $this->modelFactory()->create()->id;
        $id3 = $this->modelFactory()->create()->id;

        $attributes = $this->indexAttributes();

        $expected = [
            0 => $this->modelWhere($id1)->first($attributes)->toArray(),
            1 => $this->modelWhere($id2)->first($attributes)->toArray(),
            2 => $this->modelWhere($id3)->first($attributes)->toArray(),
        ];

        $response = $this->json('GET', $this->apiUrl());
        $response->assertStatus(200);
        $response->assertExactJson($expected);
    }

    public function testIndexAction_NoData()
    {
        $expected = [];

        $response = $this->json('GET', $this->apiUrl());
        $response->assertStatus(200);
        $response->assertExactJson($expected);
    }

    /*
    |--------------------------------------------------------------------------
    | Test STORE action
    |--------------------------------------------------------------------------
    */

    public function testStoreAction()
    {
        $inputData = $this->modelFactory()->make()->toArray();

        $this->assertNull($this->modelFirst());

        $response = $this->json('POST', $this->apiUrl(), $inputData);
        $response->assertStatus(200);

        $savedData = $this->modelFirst()->toArray();

        $id = $savedData['id'];
        unset($savedData['id']);
        unset($savedData['created_at']);
        unset($savedData['updated_at']);

        $response->assertExactJson(['message' => 'Ok', 'id' => $id]);

        $this->assertEquals($inputData, $savedData);
    }

    /**
     * @dataProvider storeInvalidValueProvider
     */
    public function testStoreAction_InvalidValue($attributeName, $value, $error)
    {
        $inputData = $this->modelFactory()->make()->toArray();

        $this->assertArrayHasKey($attributeName, $inputData);

        if ($value === null)
            unset($inputData[$attributeName]);
        else
            $inputData[$attributeName] = $value;

        $response = $this->json('POST', $this->apiUrl(), $inputData);
        $response->assertStatus(422);
        $response->assertExactJson($this->errorResponse($attributeName, $error));
    }

    /*
    |--------------------------------------------------------------------------
    | Test SHOW action
    |--------------------------------------------------------------------------
    */

    public function testShowAction()
    {
        $id = $this->modelFactory()->create()->id;

        $expected = $this->modelWhere($id)->first()->toArray();

        $response = $this->json('GET', $this->apiUrl($id));
        $response->assertStatus(200);
        $response->assertExactJson($expected);
    }

    public function testShowAction_InvalidId()
    {
        $response = $this->json('GET', $this->apiUrl('INVALID'));
        $response->assertStatus(422);
        $response->assertExactJson(['message' => 'Invalid id']);
    }

    /*
    |--------------------------------------------------------------------------
    | Test UPDATE action
    |--------------------------------------------------------------------------
    */

    public function testUpdateAction()
    {
        $inputData = $this->modelFactory()->create()->toArray();

        $this->changeInputData($inputData);

        $id = $inputData['id'];
        unset($inputData['id']);
        unset($inputData['created_at']);
        unset($inputData['updated_at']);

        $response = $this->json('PUT', $this->apiUrl($id), $inputData);
        $response->assertStatus(200);
        $response->assertExactJson(['message' => 'Ok', 'id' => $id]);

        $savedData = $this->modelFind($id)->toArray();
        unset($savedData['id']);
        unset($savedData['created_at']);
        unset($savedData['updated_at']);

        $this->assertEquals($inputData, $savedData);
    }

    /**
     * @dataProvider updateInvalidValueProvider
     */
    public function testUpdateAction_InvalidValue($attributeName, $value, $error)
    {
        $inputData = $this->modelFactory()->create()->toArray();

        $this->assertArrayHasKey($attributeName, $inputData);

        if ($value === null)
            unset($inputData[$attributeName]);
        else
            $inputData[$attributeName] = $value;

        $this->changeInputData($inputData, $attributeName);

        $id = $inputData['id'];
        unset($inputData['id']);
        unset($inputData['created_at']);
        unset($inputData['updated_at']);

        $response = $this->json('PUT', $this->apiUrl($id), $inputData);
        $response->assertStatus(422);
        $response->assertExactJson($this->errorResponse($attributeName, $error));
    }

    public function testUpdateAction_InvalidId()
    {
        $inputData = $this->modelFactory()->make()->toArray();

        $response = $this->json('PUT', $this->apiUrl('INVALID'), $inputData);
        $response->assertStatus(422);
        $response->assertExactJson(['message' => 'Invalid id']);
    }

    /*
    |--------------------------------------------------------------------------
    | Test DESTROY action
    |--------------------------------------------------------------------------
    */

    public function testDestroyAction()
    {
        $id = $this->modelFactory()->create()->id;

        $this->assertInstanceOf($this->modelClass(), $this->modelFind($id));

        $response = $this->json('DELETE', $this->apiUrl($id));
        $response->assertStatus(200);
        $response->assertExactJson(['message' => 'Ok']);

        $this->assertNull($this->modelFind($id));
    }

    public function testDestroyAction_InvalidId()
    {
        $response = $this->json('DELETE', $this->apiUrl('INVALID'));
        $response->assertStatus(422);
        $response->assertExactJson(['message' => 'Invalid id']);
    }
}
