<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceLine extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'invoice_id' => 'integer',
        'amount' => 'integer',
        'vat_percent' => 'integer',
        'vat_amount' => 'integer',
        'total_amount' => 'integer',
    ];

    /**
     * Get the invoice that the invoice line belongs to.
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
