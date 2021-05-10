<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'amount_sum',
        'vat_amount_sum',
        'total_amount_sum',
        'formatted_reference_number',
    ];

    /**
     * Get the biller of the invoice.
     */
    public function biller()
    {
        return $this->belongsTo(Biller::class);
    }

    /**
     * Get the customer of the invoice.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the invoice lines of the invoice.
     */
    public function invoiceLines()
    {
        return $this->hasMany(InvoiceLine::class);
    }

    /**
     * Get amount sum.
     */
    public function getAmountSumAttribute()
    {
        return $this->invoiceLines()->sum('amount');
    }

    /**
     * Get VAT amount sum.
     */
    public function getVatAmountSumAttribute()
    {
        return $this->invoiceLines()->sum('vat_amount');
    }

    /**
     * Get total amount sum.
     */
    public function getTotalAmountSumAttribute()
    {
        return $this->invoiceLines()->sum('total_amount');
    }

    /**
     * Get formatted reference number.
     */
    public function getFormattedReferenceNumberAttribute(): string
    {
        if (!$referenceNumber = $this->reference_number)
            return '';

        $reversed = strrev($referenceNumber);
        $result = '';
        for ($i = 0; $i < strlen($reversed); $i++) {
            if ($i > 0 && $i % 5 == 0)
                $result .= ' ';
            $result .= $reversed[$i];
        }
        return strrev(trim($result));
    }

    /**
     * Set the reference number.
     */
    public function setReferenceNumberAttribute($value)
    {
        $this->attributes['reference_number'] = self::cleanReferenceNumber($value);
    }

    /**
     * Clean the reference number (e.g. remove all whitespace characters).
     */
    public static function cleanReferenceNumber(string $value): string
    {
        return preg_replace('@\s@', '', $value);
    }

    /**
     * Get all invoice numbers of the invoices which have given invoice date.
     */
    public static function getExistingInvoiceNumbers(DateTime $invoiceDate): array
    {
        return Invoice::where('invoice_date', $invoiceDate->format('Y-m-d'))->pluck('invoice_number')->all();
    }

    /**
     * Generate an invoice number.
     *
     * The invoice number is related to given invoice date.
     * It also differs from all the invoice numbers given.
     */
    public static function generateInvoiceNumber(DateTime $invoiceDate, array $existingInvoiceNumbers = [])
    {
        $ymd = $invoiceDate->format('ymd');
        $i = 1;
        do {
            if ($i > 999)
                return false;
            $invoiceNumber = $ymd . str_pad($i, 3, '0', STR_PAD_LEFT);
            $i++;
        } while (in_array($invoiceNumber, $existingInvoiceNumbers));
        return $invoiceNumber;
    }

    /**
     * Generate a reference number.
     *
     * The reference number is related to given invoice number.
     */
    public static function generateReferenceNumber($invoiceNumber)
    {
        $reversed = strrev($invoiceNumber);
        $coefficient = array(7, 3, 1);
        $num = 0;
        for ($i = 0; $i < strlen($reversed); $i++) {
            $num += $reversed[$i] * $coefficient[$i % 3];
        }
        $controlNumber = (10 - ($num % 10)) % 10;
        $referenceNumber = $invoiceNumber . $controlNumber;
        return $referenceNumber;
    }
}
