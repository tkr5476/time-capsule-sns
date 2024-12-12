<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Goal;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $goals = Goal::all();

        foreach ($users as $user) {
            Post::factory(rand(5, 10))->create([
                'user_id' => $user->id,
                'goal_id' => $goals->random()->id,
            ]);
        }
    }
}
