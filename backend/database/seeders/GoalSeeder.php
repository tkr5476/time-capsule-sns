<?php

namespace Database\Seeders;

use App\Models\Goal;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
public function run(): void
{
    $users = User::all();

    $testGoals = [
        [
            'title' => 'プログラミングスキルの向上',
            'description' => 'Webアプリケーション開発の基礎を身につける',
            'category_id' => 1, // 学習
            'target_date' => '2024-12-31',
        ],
        [
            'title' => '健康的な生活習慣の確立',
            'description' => '運動習慣を身につけ、健康的な生活を送る',
            'category_id' => 5, // 健康
            'target_date' => '2024-06-30',
        ],
        [
            'title' => '読書習慣の定着',
            'description' => '月に3冊本を読むことを目標に',
            'category_id' => 4, // 趣味
            'target_date' => '2024-09-30',
        ],
        [
            'title' => '業務効率の改善',
            'description' => 'タスク管理を徹底し、効率的な働き方を実現する',
            'category_id' => 2, // 仕事
            'target_date' => '2024-12-31',
        ],
    ];

    foreach ($users as $user) {

        $goalCount = rand(1, 4);
        $selectedGoals = array_rand($testGoals, $goalCount);

        if (!is_array($selectedGoals)) {
            $selectedGoals = [$selectedGoals];
        }

        foreach ($selectedGoals as $index) {
            Goal::create([
                'user_id' => $user->id,
                'category_id' => $testGoals[$index]['category_id'],
                'title' => $testGoals[$index]['title'],
                'description' => $testGoals[$index]['description'],
                'target_date' => $testGoals[$index]['target_date'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
}
