<?php

namespace Database\Seeders;

use App\Models\Biller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitializeDataForE2E extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!$this->isDatabaseEmpty()) {
            $this->print("Failed to initialize data for E2E tests because database is not empty.");
            exit(1);
        }

        $this->createUser();
        $biller = $this->createBiller();
        $customer = $this->createCustomer();
        $invoice = $this->createInvoice($biller, $customer);
        $this->createInvoiceLine($invoice);
    }

    private function isDatabaseEmpty()
    {
        if (Biller::all()->count() > 0)
            return false;
        if (Customer::all()->count() > 0)
            return false;
        if (Invoice::all()->count() > 0)
            return false;
        if (InvoiceLine::all()->count() > 0)
            return false;
        if (User::all()->count() > 0)
            return false;

        return true;
    }

    private function createUser()
    {
        $username = 'e2eUsername';
        $password = 'e2ePassword';

        $user = User::create([
            'name' => 'E2E',
            'username' => $username,
            'email' => 'e2e@example.com',
            'password' => Hash::make($password),
        ]);

        $this->print('User "%s" created (id=%s).', $user->name, $user->id);
        $this->print('----------------------------------------');
        $this->print('Username: %s', $username);
        $this->print('Password: %s', $password);
        $this->print('----------------------------------------');
    }

    private function createBiller(): Biller
    {
        $biller = Biller::create([
            'name' => 'Biller name',
            'address_line_one' => 'Biller address line 1',
            'address_line_two' => 'Biller address line 2',
            'email' => 'biller@example.com',
            'phone_number' => '+358 40 111 1111',
            'business_identity_code' => '1234567-8',
            'bank_name' => 'Test Bank',
            'bank_iban' => 'FI11 2222 3333 4444 55',
            'bank_bic' => 'TESTFIHH',
            'pdf_title' => 'Test Invoice',
            'pdf_author' => 'Biller name',
        ]);

        $this->print('Biller "%s" created (id=%s).', $biller->name, $biller->id);

        return $biller;
    }

    private function createCustomer(): Customer
    {
        $customer = Customer::create([
            'name' => 'Customer name',
            'address_line_one' => 'Customer address line 1',
            'address_line_two' => 'Customer address line 2',
        ]);

        $this->print('Customer "%s" created (id=%s).', $customer->name, $customer->id);

        return $customer;
    }

    private function createInvoice(Biller $biller, Customer $customer): Invoice
    {
        $invoice = Invoice::create([
            'biller_id' => $biller->id,
            'customer_id' => $customer->id,
            'invoice_date' => '2021-01-01',
            'due_date' => '2021-01-15',
            'invoice_number' => '210101001',
            'reference_number' => '2101010010',

            'biller_name' => $biller->name,
            'biller_address_line_one' => $biller->address_line_one,
            'biller_address_line_two' => $biller->address_line_two,
            'biller_email' => $biller->email,
            'biller_phone_number' => $biller->phone_number,
            'biller_business_identity_code' => $biller->business_identity_code,
            'biller_bank_name' => $biller->bank_name,
            'biller_bank_iban' => $biller->bank_iban,
            'biller_bank_bic' => $biller->bank_bic,
            'biller_pdf_title' => $biller->pdf_title,
            'biller_pdf_author' => $biller->pdf_author,

            'customer_name' => $customer->name,
            'customer_address_line_one' => $customer->address_line_one,
            'customer_address_line_two' => $customer->address_line_two,
        ]);

        $this->print('Invoice "%s" created (id=%s).', $invoice->invoice_number, $invoice->id);

        return $invoice;
    }

    private function createInvoiceLine(Invoice $invoice)
    {
        $invoiceLine = InvoiceLine::create([
            'invoice_id' => $invoice->id,
            'description' => 'Lorem ipsum dolor sit amet',
            'amount' => 10000,
            'vat_percent' => 24,
            'vat_amount' => 2400,
            'total_amount' => 12400,
        ]);

        $this->print('Invoice line created (id=%s).', $invoiceLine->id);
    }

    private function print($format, ...$values)
    {
        vprintf($format, $values);
        echo "\n";
    }
}
