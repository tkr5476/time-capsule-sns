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
        $followCount = rand(5, 10);
        $potentialFollowings = $users->except($user->id);

        $followings = $potentialFollowings->random(min($followCount, $potentialFollowings->count()));

        foreach ($followings as $following) {
            $user->following()->attach($following->id, [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
}
