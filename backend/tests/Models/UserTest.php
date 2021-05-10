<?php

namespace Tests\Models;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testCorrectAttributesExist()
    {
        $user = User::factory()->create();
        $attributeNames = array_keys($user->toArray());
        sort($attributeNames);

        $expected = [
            'created_at',
            'email',
            'email_verified_at',
            'id',
            'name',
            'updated_at',
            'username',
        ];

        $this->assertEquals($expected, $attributeNames);
    }
}
