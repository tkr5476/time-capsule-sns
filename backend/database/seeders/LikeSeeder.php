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
            $likedPosts = $posts->random(rand(5, 15));
            foreach ($likedPosts as $post) {
                $user->likes()->attach($post->id, [
                    'created_at' => now(),
                ]);
            }
        }
    }
}
