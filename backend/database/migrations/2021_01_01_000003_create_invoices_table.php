<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('biller_id');
            $table->foreignId('customer_id');

            $table->date('invoice_date');
            $table->date('due_date');
            $table->string('invoice_number');
            $table->string('reference_number');

            $table->string('biller_name');
            $table->string('biller_address_line_one');
            $table->string('biller_address_line_two');
            $table->string('biller_email');
            $table->string('biller_phone_number');
            $table->string('biller_business_identity_code');
            $table->string('biller_bank_name');
            $table->string('biller_bank_iban');
            $table->string('biller_bank_bic');
            $table->string('biller_pdf_title');
            $table->string('biller_pdf_author');

            $table->string('customer_name');
            $table->string('customer_address_line_one');
            $table->string('customer_address_line_two');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
