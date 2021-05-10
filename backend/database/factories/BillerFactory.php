<?php

namespace Database\Factories;

use App\Models\Biller;
use Illuminate\Database\Eloquent\Factories\Factory;

class BillerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Biller::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->firstName . ' ' . $this->faker->lastName;

        return [
            'name' => $name,
            'address_line_one' => $this->faker->streetAddress,
            'address_line_two' => $this->faker->postcode . ' ' . $this->faker->city,
            'email' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->phoneNumber,
            'business_identity_code' => $this->faker->numerify('#######-#'),
            'bank_name' => 'Test Bank',
            'bank_iban' => $this->formatIban($this->faker->iban('FI')),
            'bank_bic' => 'TESTFIHH',
            'pdf_title' => 'Test Invoice',
            'pdf_author' => $name,
        ];
    }

    protected function formatIban($iban)
    {
        $result = '';
        for ($i = 0; $i < strlen($iban); $i++) {
            if ($i > 0 && $i % 4 == 0)
                $result .= ' ';
            $result .= $iban[$i];
        }
        return trim($result);
    }
}
