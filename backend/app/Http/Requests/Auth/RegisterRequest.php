<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:16'],
            'email' => ['required', 'string', 'email', 'max:50', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'max:16', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '名前は必須です',
            'name.max' => '名前は16文字以下である必要があります',
            'email.required' => 'メールアドレスは必須です',
            'email.max' => 'メールアドレスは50文字以下である必要があります',
            'email.email' => '有効なメールアドレスを入力してください',
            'email.unique' => 'このメールアドレスは既に使用されています',
            'password.required' => 'パスワードは必須です',
            'password.min' => 'パスワードは8文字以上である必要があります',
            'password.max' => 'パスワードは16文字以下である必要があります',
            'password.confirmed' => 'パスワードが一致しません',
        ];
    }
}
