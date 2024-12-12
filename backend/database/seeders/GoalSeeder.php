<?php

namespace Database\Seeders;

use App\Models\Goal;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    public function run(User $user, Category $category): void
    {

        Goal::factory(rand(2, 5))->create([
            'user_id' => $user->id,
            'category_id' => $category->random()->id,
        ]);
    }
}
