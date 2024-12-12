<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $posts = Post::all();

        foreach ($posts as $post) {
            Comment::factory(rand(0, 5))->create([
                'user_id' => $users->random()->id,
                'post_id' => $post->id,
            ]);
        }
    }
}
