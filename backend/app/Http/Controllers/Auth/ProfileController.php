<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * 認証済みユーザーの情報を取得
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'user' => auth()->user()
        ]);
    }
}
