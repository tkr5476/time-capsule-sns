<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'target_date',
        'parent_goal_id'
    ];

    protected $casts = [
        'target_date' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function parentGoal()
    {
        return $this->belongsTo(Goal::class, 'parent_goal_id');
    }

    public function childGoals()
    {
        return $this->hasMany(Goal::class, 'parent_goal_id');
    }
}
