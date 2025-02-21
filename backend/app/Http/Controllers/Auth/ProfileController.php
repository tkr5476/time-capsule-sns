<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * 認証済みユーザーの情報を取得
     */
    public function show(): JsonResponse
    {
        $user = auth()->user();
        return response()->json([
            'user' => new UserResource($user)
        ]);
    }

    /**
     * プロフィール情報を更新
     */
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = auth()->user();
            $validated = $request->validated();

            if ($request->hasFile('avatar')) {
                if ($user->avatar_path) {
                    Storage::disk('public')->delete($user->avatar_path);
                }

                $path = $request->file('avatar')->store('avatars', 'public');
                if (!$path) {
                    throw new \Exception('画像のアップロードに失敗しました');
                }
                $validated['avatar_path'] = $path;
            }

            if (isset($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            }

            $user->update($validated);

            return response()->json([
                'message' => 'プロフィールを更新しました',
                'user' => new UserResource($user)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'プロフィールの更新に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
