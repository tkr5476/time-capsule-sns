<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Goal;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
public function run(): void
{
    \DB::beginTransaction();
    try {
        User::factory()->create([
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
        ]);

        $this->call(CategorySeeder::class);
        $this->call(UserSeeder::class);

        \DB::commit();

        \DB::beginTransaction();

        $this->call(GoalSeeder::class);

        if (Goal::count() === 0) {
            throw new \Exception('ゴールの作成に失敗しました');
        }

        $this->call([
            TaskSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
            FollowSeeder::class,
            LikeSeeder::class,
        ]);

        \DB::commit();
    } catch (\Exception $e) {
        \DB::rollBack();
        \Log::error('Seeding error: ' . $e->getMessage());
        throw $e;
    }
}
}
