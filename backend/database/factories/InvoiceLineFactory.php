<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\InvoiceLine;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceLineFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InvoiceLine::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $amount = $this->faker->numberBetween(50, 1000) * 100;
        $vatPercent = 24;
        $vatAmount = (int) ($amount * $vatPercent / 100);
        $totalAmout = $amount + $vatAmount;

        return [
            'invoice_id' => Invoice::factory(),
            'description' => strtr($this->faker->sentence(4), ['.' => '']),
            'amount' => $amount,
            'vat_percent' => $vatPercent,
            'vat_amount' => $vatAmount,
            'total_amount' => $totalAmout,
        ];
    }
}
