<?php

namespace Tests\Http;

use Tests\TestCase;

class MiddlewareAuthenticateTest extends TestCase
{
    public function testRedirectTo()
    {
        $location = $this->app['config']['app.url'] . '/login';

        $response = $this->post('/logout', []);
        $response->assertStatus(302);
        $response->assertHeader('Location', $location);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }
}
