<?php

namespace Database\Seeders;

use App\Models\Biller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use DateTime;
use Illuminate\Database\Seeder;

class AddExampleData extends Seeder
{
    const MAX_CUSTOMER_COUNT = 10;

    private $currentDate = null;
    private $invoiceDate = null;
    private $biller = null;
    private $customers = [];

    public function __construct()
    {
        $this->currentDate = new DateTime();
        $this->currentDate->setTime(0, 0, 0);

        $this->invoiceDate = new DateTime();
        $this->invoiceDate->setTime(0, 0, 0);
        $this->invoiceDate->modify('-1 year');
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        while ($this->invoiceDate <= $this->currentDate) {
            $biller = $this->getBiller();
            $customer = $this->getCustomer();
            $invoice = $this->createInvoice($biller, $customer, $this->invoiceDate);

            $lines = random_int(1, 4);
            for ($i = 1; $i <= $lines; $i++) {
                $this->createInvoiceLine($invoice);
            }

            $days = random_int(5, 15);
            $this->invoiceDate->modify("+$days days");
        }
    }

    private function getBiller(): Biller
    {
        if (!$this->biller) {
            $this->biller = $this->createBiller();
        }
        return $this->biller;
    }

    private function getCustomer(): Customer
    {
        if (count($this->customers) < self::MAX_CUSTOMER_COUNT) {
            $customer = $this->createCustomer();
            $this->customers[] = $customer;
            return $customer;
        }
        return $this->customers[array_rand($this->customers)];
    }

    private function createBiller(): Biller
    {
        $biller = Biller::factory()->create();

        $this->print('Biller "%s" created (id=%s).', $biller->name, $biller->id);

        return $biller;
    }

    private function createCustomer(): Customer
    {
        $customer = Customer::factory()->create();

        $this->print('Customer "%s" created (id=%s).', $customer->name, $customer->id);

        return $customer;
    }

    private function createInvoice(Biller $biller, Customer $customer, DateTime $invoiceDate): Invoice
    {
        $invoice = Invoice::factory()->state([
            'biller_id' => $biller->id,
            'customer_id' => $customer->id,
            'invoice_date' => $invoiceDate->format('Y-m-d'),
        ])->create();

        $this->print('Invoice "%s" created (id=%s).', $invoice->invoice_number, $invoice->id);

        return $invoice;
    }

    private function createInvoiceLine(Invoice $invoice): InvoiceLine
    {
        $invoiceLine = InvoiceLine::factory()->state([
            'invoice_id' => $invoice->id,
        ])->create();

        $this->print('Invoice line created (id=%s).', $invoiceLine->id);

        return $invoiceLine;
    }

    private function print($format, ...$values)
    {
        vprintf($format, $values);
        echo "\n";
    }
}
