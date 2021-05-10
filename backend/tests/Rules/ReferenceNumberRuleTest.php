<?php

namespace Tests\Rules;

use App\Rules\ReferenceNumberRule;
use PHPUnit\Framework\TestCase;

class ReferenceNumberRuleTest extends TestCase
{
    public function valueProvider()
    {
        return [
            ['abc', false, 'The reference number must be numeric.'],
            ['123', false, 'The reference number is too short.'],
            ['11111 22222 33333 44444 5', false, 'The reference number is too long.'],
            ['4444', false, 'The reference number has invalid control number.'],
            ['4446', true, ''],
        ];
    }

    /**
     * @dataProvider valueProvider
     */
    public function testRule($value, $returnValue, $message)
    {
        $rule = new ReferenceNumberRule();
        $this->assertEquals($returnValue, $rule->passes(null, $value));
        $this->assertEquals($message, $rule->message());
    }
}
