<?php

namespace App\InvoiceGenerator;

interface Formatter
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
    public function formatMoney($cents): string;

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
    public function formatDate(string $ymd): string;
}
