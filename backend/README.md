# Time Capsule SNS Backend

## ディレクトリ構成とアーキテクチャ

app/
├── Actions/ # 再利用可能な単一責任のビジネスロジック
├── Console/ # Artisan コマンド
├── Exceptions/ # 例外ハンドリング
├── Http/
│ ├── Controllers/ # ルートとビジネスロジックの橋渡し
│ │ ├── Api/ # API 用コントローラー
│ │ └── Web/ # Web 用コントローラー
│ ├── Middleware/ # リクエスト/レスポンスの前後処理
│ ├── Requests/ # フォームリクエストバリデーション
│ └── Resources/ # API リソース（レスポンス整形）
├── Models/ # Eloquent モデル
├── Providers/ # サービスプロバイダー
├── Repositories/ # データアクセス層
└── Services/ # 複合的なビジネスロジック

## 各ディレクトリの役割

### Actions/

単一の責任を持つ再利用可能なビジネスロジックを配置します。

app/
├── Actions/ # 再利用可能な単一責任のビジネスロジック
├── Console/ # Artisan コマンド
├── Exceptions/ # 例外ハンドリング
├── Http/
│ ├── Controllers/ # ルートとビジネスロジックの橋渡し
│ │ ├── Api/ # API 用コントローラー
│ │ └── Web/ # Web 用コントローラー
│ ├── Middleware/ # リクエスト/レスポンスの前後処理
│ ├── Requests/ # フォームリクエストバリデーション
│ └── Resources/ # API リソース（レスポンス整形）
├── Models/ # Eloquent モデル
├── Providers/ # サービスプロバイダー
├── Repositories/ # データアクセス層
└── Services/ # 複合的なビジネスロジック

## 各ディレクトリの役割

### Actions/

単一の責任を持つ再利用可能なビジネスロジックを配置します。

php:time-capsule-sns/backend/README.md
class CreateUserAction
{
public function execute(array $userData): User
{
return User::create([
'name' => $userData['name'],
'email' => $userData['email']
]);
}
}

### Services/

複数の Actions や Repositories を組み合わせた複合的なビジネスロジックを管理します。

php
class UserRegistrationService
{
public function construct(
private CreateUserAction $createUser,
private SendWelcomeEmailAction $sendEmail
) {}
public function register(array $userData): User
{
$user = $this->createUser->execute($userData);
$this->sendEmail->execute($user);
return $user;
}
}

### Controllers/

-   リクエストの受け取り
-   バリデーション
-   Services や Actions の呼び出し
-   レスポンスの返却
    を担当します。

php
class UserController extends Controller
{
public function construct(
private UserRegistrationService $registrationService
) {}
public function store(StoreUserRequest $request)
{
$user = $this->registrationService->register(
$request->validated()
);
return new UserResource($user);
}
}

### Repositories/

データアクセスロジックを抽象化し、モデルとの橋渡しを行います。
php:time-capsule-sns/backend/README.md
class UserRepository
{
public function findByEmail(string $email): ?User
{
return User::where('email', $email)->first();
}
}

### Models/

データベースとのマッピングとリレーションを定義します。

php
class User extends Model
{
protected $fillable = ['name', 'email'];
public function posts()
{
return $this->hasMany(Post::class);
}
}

## アーキテクチャの利点

1. **責任の分離**

    - 各クラスが単一の責任を持つ
    - コードの保守性が向上
    - テストが容易

2. **再利用性**

    - Actions による処理の再利用
    - 重複コードの削減

3. **スケーラビリティ**

    - 機能追加が容易
    - チーム開発での作業分担が明確

4. **テスタビリティ**
    - 単体テストが書きやすい
    - モック化が容易

## 開発ガイドライン

1. **新機能の追加**

    - 単一の処理は`Actions`として実装
    - 複合的な処理は`Services`として実装
    - データアクセスは`Repositories`を経由

2. **命名規則**

    - Actions: 動詞 + 名詞 + Action
    - Services: 名詞 + Service
    - Repositories: 名詞 + Repository

3. **依存性の注入**

    - コンストラクタインジェクションを優先
    - インターフェースを活用

4. **バリデーション**
    - FormRequests を活用
    - ビジネスロジックと分離

## Laravel の主な機能

-   [シンプルで高速なルーティングエンジン](https://laravel.com/docs/routing)
-   [強力な依存性注入コンテナ](https://laravel.com/docs/container)
-   [セッション](https://laravel.com/docs/session)と[キャッシュ](https://laravel.com/docs/cache)の複数バックエンド
-   [直感的なデータベース ORM](https://laravel.com/docs/eloquent)
-   [データベースに依存しないスキーママイグレーション](https://laravel.com/docs/migrations)
-   [堅牢なバックグラウンドジョブ処理](https://laravel.com/docs/queues)
-   [リアルタイムイベントブロードキャスト](https://laravel.com/docs/broadcasting)

## API 仕様

API の詳細な仕様は[API Documentation](./docs/api.md)を参照してください。
