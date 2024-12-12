<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('follows', function (Blueprint $table) {
        $table->foreignId('follower_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('following_id')->constrained('users')->onDelete('cascade');
        $table->boolean('is_following')->default(true);
        $table->timestamp('created_at')->nullable();

        $table->primary(['follower_id', 'following_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
