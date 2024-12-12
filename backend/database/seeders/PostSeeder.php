<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Goal;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    private array $samplePosts = [
        '今日も目標に向かって頑張りました！',
        '新しい習慣が少しずつ身についてきた気がします',
        '目標達成まであと一歩！',
        '今日は予定通り進められませんでしたが、明日また頑張ります',
        '良い習慣が続いています！',
        '新しいチャレンジを始めました',
        '目標を見直して、より具体的にしました',
        '今週の振り返りをしました',
        '仲間と一緒に頑張れて楽しいです',
        '小さな成功を積み重ねていきたいです',
    ];

    public function run(): void
    {
        try {
            \DB::beginTransaction();

            $users = User::all();

            foreach ($users as $user) {
                $userGoals = Goal::where('user_id', $user->id)->get();
                if ($userGoals->isEmpty()) continue;

                $postCount = rand(10, 20);

                for ($i = 0; $i < $postCount; $i++) {
                    Post::create([
                        'user_id' => $user->id,
                        'goal_id' => $userGoals->random()->id,
                        'content' => $this->samplePosts[array_rand($this->samplePosts)],
                        'delivery_date' => now()->addDays(rand(-30, 30)),
                        'visibility' => rand(0, 2),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('PostSeeder error: ' . $e->getMessage());
            throw $e;
        }
    }
}
