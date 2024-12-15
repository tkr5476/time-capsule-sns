<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class FollowSeeder extends Seeder
{
    public function run(): void
    {
        try {
            \DB::beginTransaction();

            $users = User::all();

            foreach ($users as $user) {
                $potentialFollowings = $users->except($user->id);
                $followCount = rand(5, 10);

                $followings = $potentialFollowings->random(
                    min($followCount, $potentialFollowings->count())
                );

                foreach ($followings as $following) {
                    $user->following()->attach($following->id, [
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('FollowSeeder error: ' . $e->getMessage());
            throw $e;
        }
    }
}
