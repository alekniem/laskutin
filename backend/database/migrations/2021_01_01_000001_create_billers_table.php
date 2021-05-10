<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address_line_one');
            $table->string('address_line_two');
            $table->string('email');
            $table->string('phone_number');
            $table->string('business_identity_code');
            $table->string('bank_name');
            $table->string('bank_iban');
            $table->string('bank_bic');
            $table->string('pdf_title');
            $table->string('pdf_author');
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
        Schema::dropIfExists('billers');
    }
}
