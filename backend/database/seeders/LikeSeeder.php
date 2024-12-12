<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $posts = Post::all();

    foreach ($users as $user) {
        $likeCount = rand(1, 5);
        $likedPosts = $posts->random($likeCount);

        foreach ($likedPosts as $post) {
            $user->likes()->attach($post->id, [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
    }
}
