<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AddExampleUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createUser();
    }

    private function createUser()
    {
        $username = 'example';
        $password = Str::random(20);

        $user = User::where('username', $username)->first();

        if ($user) {
            $this->print('User "%s" found (id=%s).', $user->name, $user->id);

            $user->password = Hash::make($password);
            $user->save();

            $this->print('Password changed.');
        } else {
            $user = User::create([
                'name' => 'Test',
                'username' => $username,
                'email' => 'test@example.com',
                'password' => Hash::make($password),
            ]);

            $this->print('User "%s" created (id=%s).', $user->name, $user->id);
        }

        $this->print('----------------------------------------');
        $this->print('Username: %s', $username);
        $this->print('Password: %s', $password);
        $this->print('----------------------------------------');
    }

    private function print($format, ...$values)
    {
        vprintf($format, $values);
        echo "\n";
    }
}
