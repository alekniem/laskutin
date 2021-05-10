<?php

namespace Tests\InvoiceGenerator;

use App\InvoiceGenerator\FormatterFinnish;
use Exception;
use PHPUnit\Framework\TestCase;

class FormatterFinnishTest extends TestCase
{
    public function validMoneyProvider()
    {
        return [
            [null, ''],
            [0, '0,00'],
            [1, '0,01'],
            [10, '0,10'],
            [100, '1,00'],
            [1000, '10,00'],
            [10000, '100,00'],
            [12345, '123,45'],
            [-0, '0,00'],
            [-1, '-0,01'],
            [-10, '-0,10'],
            [-100, '-1,00'],
            [-1000, '-10,00'],
            [-10000, '-100,00'],
            [-12345, '-123,45'],
        ];
    }

    /**
     * @dataProvider validMoneyProvider
     */
    public function testFormatMoney($cents, $expected)
    {
        $formatter = new FormatterFinnish();

        $this->assertEquals($expected, $formatter->formatMoney($cents));
    }

    public function invalidMoneyProvider()
    {
        return [
            [false],
            [''],
            ['abc'],
            [1.23],
            ['4.56'],
            [array(1)],
        ];
    }

    /**
     * @dataProvider invalidMoneyProvider
     */
    public function testFormatMoney_InvalidMoneyAmount($cents)
    {
        $formatter = new FormatterFinnish();

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Invalid money amount');
        $formatter->formatMoney($cents);
    }

    public function validDateProvider()
    {
        return [
            ['0-1-1', '1.1.0000'],
            ['2000-01-01', '1.1.2000'],
            ['9999-12-31', '31.12.9999'],
        ];
    }

    /**
     * @dataProvider validDateProvider
     */
    public function testFormatDate($ymd, $expected)
    {
        $formatter = new FormatterFinnish();

        $this->assertEquals($expected, $formatter->formatDate($ymd));
    }

    public function invalidDateProvider()
    {
        return [
            [''],
            ['abc'],
            ['1.1.2000'],
            ['2000-01-32'],
            ['2000-01-01-01'],
        ];
    }

    /**
     * @dataProvider invalidDateProvider
     */
    public function testFormatDate_InvalidDate($ymd)
    {
        $formatter = new FormatterFinnish();

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Invalid date');
        $formatter->formatDate($ymd);
    }
}
