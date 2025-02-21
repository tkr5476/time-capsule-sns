<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:50',
            'email' => 'sometimes|required|email|unique:users,email,' . auth()->id(),
            'password' => 'sometimes|required|string|min:8|confirmed',
            'avatar' => 'sometimes|nullable|image|mimes:jpeg,png,jpg|max:2048',
            'bio' => 'sometimes|nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '名前は必須です',
            'name.max' => '名前は50文字以内で入力してください',
            'email.required' => 'メールアドレスは必須です',
            'email.email' => '有効なメールアドレスを入力してください',
            'email.unique' => 'このメールアドレスは既に使用されています',
            'password.min' => 'パスワードは8文字以上で入力してください',
            'password.confirmed' => 'パスワードが確認用と一致しません',
            'avatar.image' => '画像ファイルを選択してください',
            'avatar.mimes' => 'jpeg, png, jpg形式の画像を選択してください',
            'avatar.max' => '画像サイズは2MB以内にしてください',
            'bio.max' => '自己紹介は1000文字以内で入力してください',
        ];
    }
}
