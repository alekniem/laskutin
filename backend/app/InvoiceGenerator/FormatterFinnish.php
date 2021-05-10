<?php

namespace App\InvoiceGenerator;

use DateTime;
use Exception;

class FormatterFinnish implements Formatter
{
    /**
     * Format monetary amount.
     *
     * Monetary amount must be given in fractional units of the currency.
     * For example, 1 euro must be given as "100".
     *
     * @param  string|int  $cents
     *
     * @return string
     *
     * @throws Exception If given monetary amount is invalid
     */
    public function formatMoney($cents): string
    {
        if ($cents === null)
            return '';

        if (filter_var($cents, FILTER_VALIDATE_INT) === false)
            throw new Exception("Invalid money amount");

        return number_format($cents / 100, 2, ',', '');
    }

    /**
     * Format date.
     *
     * Date must be given as a string which has format "YYYY-MM-DD".
     *
     * @param  string  $ymd
     *
     * @return string
     *
     * @throws Exception If given date is in wrong format or otherwise invalid
     */
    public function formatDate(string $ymd): string
    {
        $dateObject = DateTime::createFromFormat('Y-m-d', $ymd);
        $errors = DateTime::getLastErrors();

        if ($errors['warning_count'] + $errors['error_count'] > 0)
            throw new Exception("Invalid date");

        return $dateObject->format('j.n.Y');
    }
}
