<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            '学習',
            '仕事',
            '部活',
            '趣味',
            '健康',
            'マインド',
            'give me',
            'その他',
        ];
        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'created_at' => now(),
            ]);
        }
    }
}
