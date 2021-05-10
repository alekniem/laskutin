<?php

namespace App\Rules;

use App\Models\Invoice;
use Illuminate\Contracts\Validation\Rule;

class ReferenceNumberRule implements Rule
{
    const ERROR_NONE = 'none';
    const ERROR_NON_NUMERIC = 'non_numeric';
    const ERROR_TOO_SHORT = 'too_short';
    const ERROR_TOO_LONG = 'too_long';
    const ERROR_INVALID_CONTROL_NUMBER = 'invalid_control_number';

    private $error = self::ERROR_NONE;

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $value = Invoice::cleanReferenceNumber($value);

        if (!preg_match('@^\d+$@', $value)) {
            $this->error = self::ERROR_NON_NUMERIC;
            return false;
        }

        if (strlen($value) < 4) {
            $this->error = self::ERROR_TOO_SHORT;
            return false;
        }

        if (strlen($value) > 20) {
            $this->error = self::ERROR_TOO_LONG;
            return false;
        }

        $tmp = substr($value, 0, -1);
        $generated = Invoice::generateReferenceNumber($tmp);

        if ($value !== $generated) {
            $this->error = self::ERROR_INVALID_CONTROL_NUMBER;
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        if ($this->error === self::ERROR_NON_NUMERIC)
            return 'The reference number must be numeric.';

        if ($this->error === self::ERROR_TOO_SHORT)
            return 'The reference number is too short.';

        if ($this->error === self::ERROR_TOO_LONG)
            return 'The reference number is too long.';

        if ($this->error === self::ERROR_INVALID_CONTROL_NUMBER)
            return 'The reference number has invalid control number.';

        return '';
    }
}
