<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    private array $sampleComments = [
        '素晴らしい進捗ですね！',
        '私も頑張ろうと思います！',
        'とても参考になります',
        '一緒に頑張りましょう！',
        '応援しています！',
        'いいペースですね',
        '目標達成に向けて頑張ってください',
        'すごく良い取り組みだと思います',
        '私も同じような目標を持っています',
        'モチベーションをもらえました',
        '頑張ってください！',
        'やっぱりやるべきことはあるもんだね',
        'ありがとうございます',
    ];

    public function run(): void
    {
        try {
            \DB::beginTransaction();

            $users = User::all();
            $posts = Post::all();

            foreach ($posts as $post) {
                $commentCount = rand(0, 5);

                for ($i = 0; $i < $commentCount; $i++) {
                    Comment::create([
                        'user_id' => $users->random()->id,
                        'post_id' => $post->id,
                        'content' => $this->sampleComments[array_rand($this->sampleComments)],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('CommentSeeder error: ' . $e->getMessage());
            throw $e;
        }
    }
}
