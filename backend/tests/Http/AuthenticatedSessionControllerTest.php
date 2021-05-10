<?php

namespace Tests\Http;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticatedSessionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->state([
            'username' => 'aaa',
            'password' => Hash::make('bbb'),
        ])->create();
    }

    protected function errorResponse(array $data)
    {
        $errors = [];
        foreach ($data as $attributeName => $messages)
            $errors[$attributeName] = (array) $messages;

        return [
            'message' => 'The given data was invalid.',
            'errors' => $errors,
        ];
    }

    public function storeDataProvider()
    {
        return [
            ['aaa', 'bbb', 200, ['message' => 'Ok']],

            ['aaa', 'INVALID', 422, $this->errorResponse(['username' => 'These credentials do not match our records.'])],
            ['INVALID', 'bbb', 422, $this->errorResponse(['username' => 'These credentials do not match our records.'])],
            ['INVALID', 'INVALID', 422, $this->errorResponse(['username' => 'These credentials do not match our records.'])],

            ['aaa', null, 422, $this->errorResponse(['password' => 'The password field is required.'])],
            [null, 'bbb', 422, $this->errorResponse(['username' => 'The username field is required.'])],
            [null, null, 422, $this->errorResponse(['password' => 'The password field is required.', 'username' => 'The username field is required.'])],

            ['aaa', '', 422, $this->errorResponse(['password' => 'The password field is required.'])],
            ['', 'bbb', 422, $this->errorResponse(['username' => 'The username field is required.'])],
            ['', '', 422, $this->errorResponse(['password' => 'The password field is required.', 'username' => 'The username field is required.'])],
        ];
    }

    /**
     * @dataProvider storeDataProvider
     */
    public function testStoreAction($username, $password, $status, $json)
    {
        $inputData = [];
        if ($username !== null)
            $inputData['username'] = $username;
        if ($password !== null)
            $inputData['password'] = $password;

        $response = $this->json('POST', '/login', $inputData);
        $response->assertStatus($status);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertExactJson($json);
        $response->assertCookie('XSRF-TOKEN');
    }

    public function testStoreAction_TooManyLoginAttempts()
    {
        $inputData = ['username' => 'aaa', 'password' => 'INVALID'];

        for ($i = 1; $i <= 10; $i++) {
            $response = $this->json('POST', '/login', $inputData);
            $response->assertStatus(422);
            $response->assertHeader('Content-Type', 'application/json');
            $response->assertCookie('XSRF-TOKEN');

            if ($i <= 5) {
                $expected = '{"message":"The given data was invalid.","errors":{"username":["These credentials do not match our records."]}}';
                $this->assertEquals($expected, $response->getContent());
            } else {
                $pattern = '@\{"message":"The given data was invalid.","errors":\{"username":\["Too many login attempts. Please try again in \d+ seconds."\]\}\}@';
                $this->assertMatchesRegularExpression($pattern, $response->getContent());
            }
        }
    }

    public function testDestroyAction()
    {
        // 1. Successful login

        $loginResponse = $this->json('POST', '/login', ['username' => 'aaa', 'password' => 'bbb']);
        $loginResponse->assertStatus(200);
        $loginResponse->assertHeader('Content-Type', 'application/json');
        $loginResponse->assertExactJson(['message' => 'Ok']);
        $loginResponse->assertCookie('XSRF-TOKEN');

        $loginCookies = [];
        foreach ($loginResponse->headers->getCookies() as $cookie)
            $loginCookies[$cookie->getName()] = $cookie->getValue();

        $this->assertCount(2, $loginCookies);

        // 2. Successful logout

        $logoutResponse = $this->json('POST', '/logout');
        $logoutResponse->assertStatus(200);
        $logoutResponse->assertHeader('Content-Type', 'application/json');
        $logoutResponse->assertExactJson(['message' => 'Ok']);
        $logoutResponse->assertCookie('XSRF-TOKEN');

        $logoutCookies = [];
        foreach ($logoutResponse->headers->getCookies() as $cookie)
            $logoutCookies[$cookie->getName()] = $cookie->getValue();

        $this->assertCount(2, $logoutCookies);

        // 3. Check that session data has changed

        foreach ($loginCookies as $name => $value) {
            $this->assertArrayHasKey($name, $logoutCookies);
            $this->assertNotEquals($value, $logoutCookies[$name]);
        }

        // 4. Another logout should not succeed

        $response = $this->json('POST', '/logout');
        $response->assertStatus(401);
        $response->assertHeader('Content-Type', 'application/json');
        $response->assertExactJson(['message' => 'Unauthenticated.']);
        $response->assertCookie('XSRF-TOKEN');
    }
}
