<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Goal;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $goals = Goal::all();

        foreach ($goals as $goal) {
            Task::factory(rand(3, 7))->create([
                'user_id' => $goal->user_id,
                'goal_id' => $goal->id,
            ]);
        }
    }
}
