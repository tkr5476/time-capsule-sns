<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class FollowSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $followings = $users->except($user->id)->random(rand(3, 10));
            foreach ($followings as $following) {
                $user->following()->attach($following->id, [
                    'created_at' => now(),
                ]);
            }
        }
    }
}
