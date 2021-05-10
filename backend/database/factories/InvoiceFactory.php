<?php

namespace Database\Factories;

use App\Models\Biller;
use App\Models\Customer;
use App\Models\Invoice;
use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Invoice::class;

    /**
     * Define the model's default state.
     *
     * @todo 'invoice_number' does not work properly when using factory's count function.
     * The following gives same invoice number for all invoices although it should not.
     * Invoice::factory()->count(3)->state(['invoice_date' => '2020-01-01'])->create();
     *
     * @return array
     */
    public function definition()
    {
        $invoiceDate = $this->faker->dateTimeBetween('-3 months', 'now');

        return [
            'biller_id' => Biller::factory(),
            'customer_id' => Customer::factory(),
            'invoice_date' => $invoiceDate->format('Y-m-d'),
            'due_date' => function (array $attributes) {
                $dueDate = new DateTime($attributes['invoice_date']);
                $dueDate->modify('+14 days');
                return $dueDate->format('Y-m-d');
            },
            'invoice_number' => function (array $attributes) {
                $invoiceDate = new DateTime($attributes['invoice_date']);
                $existingInvoiceNumbers = Invoice::getExistingInvoiceNumbers($invoiceDate);
                return Invoice::generateInvoiceNumber($invoiceDate, $existingInvoiceNumbers);
            },
            'reference_number' => function (array $attributes) {
                return Invoice::generateReferenceNumber($attributes['invoice_number']);
            },

            'biller_name' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->name;
            },
            'biller_address_line_one' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->address_line_one;
            },
            'biller_address_line_two' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->address_line_two;
            },
            'biller_email' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->email;
            },
            'biller_phone_number' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->phone_number;
            },
            'biller_business_identity_code' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->business_identity_code;
            },
            'biller_bank_name' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->bank_name;
            },
            'biller_bank_iban' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->bank_iban;
            },
            'biller_bank_bic' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->bank_bic;
            },
            'biller_pdf_title' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->pdf_title;
            },
            'biller_pdf_author' => function (array $attributes) {
                return Biller::find($attributes['biller_id'])->pdf_author;
            },

            'customer_name' => function (array $attributes) {
                return Customer::find($attributes['customer_id'])->name;
            },
            'customer_address_line_one' => function (array $attributes) {
                return Customer::find($attributes['customer_id'])->address_line_one;
            },
            'customer_address_line_two' => function (array $attributes) {
                return Customer::find($attributes['customer_id'])->address_line_two;
            },
        ];
    }
}
