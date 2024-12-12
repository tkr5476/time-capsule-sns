# Time Capsule SNS - プロジェクト設計書

## 1. プロジェクト概要

### サービス説明
目標達成のためのSNSプラットフォームと、大切な人との思い出や願いを未来に残すタイムカプセル機能を組み合わせたサービス。

### 主な機能
- ユーザー間の目標共有・進捗管理
- タスク管理と経験値システム
- 未来日付指定投稿
- フォロー/フォロワー管理

### 技術スタック
- フロントエンド: Next.js 13+, TailwindCSS
- バックエンド: Laravel 10, MySQL
- 認証: Laravel Sanctum
- 開発環境: Docker, GitHub

### 開発期間
MVP開発: 30時間

## 2. 機能要件

### ユースケース

#### 目標達成支援の場合

1. ユーザーが最終ゴールと中長期目標を設定
2. 目標をカテゴリー化し、同じ志を持つユーザーとマッチング
3. 日々のタスクを経験値として換算
4. フォロー/フォロワーの進捗を共有しモチベーション向上

#### 思い出・メッセージ継承の場合

1. 送り手（例：母）が受け手（例：子）への願いを目標として登録
2. 生活上のアドバイスをタスク化
3. 記念日やイベント日に合わせてメッセージを事前登録
4. 受け手が日々の目標とメッセージを確認しながら成長

## 完成形の機能

### 1. SNS コア機能

-   ユーザープロフィール（目標、カテゴリー、進捗状況）
-   フォロー/フォロワー管理
-   投稿（テキスト、画像、動画）
-   タイムライン（フォロー中/カテゴリー別）
-   いいね/コメント
-   ハッシュタグ

### 2. 目標管理システム

-   長期目標設定（カテゴリー分類）
-   中期目標のマイルストーン
-   短期タスク管理
-   進捗トラッキング
-   経験値システム

### 3. レガシー機能

-   未来日付指定投稿
-   定期メッセージ設定
-   メモリアルデイ登録
-   限定公開設定
-   承継者設定

### 4. モチベーション機能

-   目標達成度の可視化
-   経験値によるレベルアップ
-   実績バッジシステム
-   同カテゴリーユーザーとのマッチング

## 30 時間 MVP 範囲

### 1. 基本 SNS 機能

-   ユーザー登録/認証
-   プロフィール（目標設定）
-   基本的な投稿機能
-   タイムライン表示
-   フォロー機能

### 2. シンプルな目標管理

-   目標登録（長期/短期）
-   タスク管理
-   基本的な経験値システム
-   進捗表示

### 3. 基本的なレガシー機能

-   未来日付投稿
-   簡単なメール通知

## 3. 技術構成

### 開発環境
```
.
├── docker/
│   ├── frontend/
│   │   └── Dockerfile
│   ├── nginx/
│   │   └── default.conf
│   ├── php/
│   │   └── Dockerfile
│   └── mysql/
│       └── my.cnf
├── docker-compose.yml
├── frontend/
├── backend/
└── README.md
```

### 開発ガイドライン

## 命名規則

### フロントエンド
- コンポーネント: PascalCase (例: `Button.tsx`)
- フック: camelCase (例: `useAuth.ts`)
- 型定義: PascalCase (例: `User.ts`)

### バックエンド
- クラス: PascalCase (例: `GoalController.php`)
- メソッド: camelCase (例: `createGoal()`)
- 変数: snake_case (例: `$user_id`)

## 注意点
1. フロントエンドの`features`ディレクトリは機能単位でコンポーネントを管理
2. バックエンドは責務の分離を意識した構成
3. 環境変数は各プロジェクトのルートに配置
4. テストファイルは対象コードと同じ階層に配置

## 4. データベース設計

### テーブル構成

#### users（ユーザー情報）
| カラム名    | データ型          | 説明                    |
|------------|------------------|------------------------|
| id         | bigint          | PK, auto_increment     |
| name       | varchar(50)     | ユーザー名               |
| email      | varchar(255)    | メールアドレス, unique    |
| password   | varchar(255)    | ハッシュ化パスワード       |
| avatar_path| varchar(255)    | 画像パス, null許容        |
| bio        | varchar(500)    | 自己紹介, null許容        |
| exp_points | int             | 経験値, default:0        |
| level      | tinyint unsigned| レベル, default:1        |
| timestamps | timestamp       | created_at, updated_at |

#### categories（カテゴリーマスタ）
| カラム名    | データ型          | 説明                    |
|------------|------------------|------------------------|
| id         | int             | PK, auto_increment     |
| name       | varchar(30)     | カテゴリー名, unique      |
| created_at | timestamp       | 作成日時                 |

#### tasks（タスク情報）
| カラム名      | データ型           | 説明                     |
|--------------|------------------|--------------------------|
| id           | bigint          | PK, auto_increment       |
| user_id      | bigint          | FK: users.id             |
| goal_id      | bigint          | FK: goals.id             |
| title        | varchar(100)    | タスクタイトル             |
| description  | varchar(500)    | 詳細説明, null許容         |
| due_date     | datetime        | 期限                      |
| exp_points   | smallint unsigned| 獲得経験値, default:0     |
| is_completed | boolean         | 完了フラグ, default:false  |
| visibility   | tinyint         | 公開範囲(0-2)             |
| timestamps   | timestamp       | created_at, updated_at   |

#### posts（投稿情報）
| カラム名       | データ型          | 説明                     |
|--------------|------------------|--------------------------|
| id           | bigint          | PK, auto_increment       |
| user_id      | bigint          | FK: users.id             |
| goal_id      | bigint          | FK: goals.id, null許容    |
| content      | varchar(1000)   | 投稿内容                  |
| media_path   | varchar(255)    | メディアパス, null許容      |
| delivery_date| datetime        | 公開予定日時               |
| visibility   | tinyint         | 公開範囲(0-2)             |
| timestamps   | timestamp       | created_at, updated_at   |

#### follows（フォロー関係）
| カラム名      | データ型          | 説明                     |
|--------------|------------------|--------------------------|
| follower_id  | bigint          | FK: users.id             |
| following_id | bigint          | FK: users.id             |
| is_following | boolean         | フォロー状態, default:true  |
| created_at   | timestamp       | 作成日時                  |
| PRIMARY KEY  | -               | (follower_id, following_id) |

#### likes（いいね情報）
| カラム名    | データ型          | 説明                     |
|------------|------------------|--------------------------|
| user_id    | bigint          | FK: users.id             |
| post_id    | bigint          | FK: posts.id             |
| created_at | timestamp       | 作成日時                  |
| PRIMARY KEY| -               | (user_id, post_id)       |

#### comments（コメント情報）
| カラム名    | データ型          | 説明                     |
|------------|------------------|--------------------------|
| id         | bigint          | PK, auto_increment       |
| user_id    | bigint          | FK: users.id             |
| post_id    | bigint          | FK: posts.id             |
| content    | varchar(500)    | コメント内容               |
| timestamps | timestamp       | created_at, updated_at   |

### テーブルリレーション
```mermaid
[users] 1 ─┬── * [goals]
           ├── * [tasks]
           ├── * [posts]
           ├── * [comments]
           ├── * [likes]
           └── * [follows] (as both follower and following)

[categories] 1 ── * [goals]

[goals] 1 ─┬── * [tasks]
           └── * [posts]

[posts] 1 ─┬── * [comments]
           └── * [likes]

```

## 最適化のポイント

-   データ型の最適化
-   文字列長の適切な制限
-   数値型の範囲最適化
-   timestamp 型の使用
-   インデックス設計
-   複合主キーの活用
-   検索頻度の高いカラムへのインデックス付与
-   正規化
-   カテゴリーの分離
-   中間テーブルの適切な設計
-   セキュリティ考慮
-   公開範囲の統一的な管理
-   適切な null 許容設定
## 5. アプリケーション構成

### フロントエンド（Next.js）構成
```
frontend/
├── src/
│   ├── app/                    # App Router
│   │   ├── (auth)/            # 認証必須ページ
│   │   ├── layout.tsx         # 共通レイアウト
│   │   └── page.tsx           # トップページ
│   ├── components/            # 共通コンポーネント
│   │   ├── elements/          # 基本UI要素
│   │   └── layouts/           # レイアウト
│   ├── features/              # 機能別モジュール
│   │   ├── goals/
│   │   ├── tasks/
│   │   └── posts/
│   └── lib/                   # ユーティリティ
```

### バックエンド（Laravel）構成
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # コントローラー
│   │   ├── Requests/         # フォームリクエスト
│   │   └── Resources/        # APIリソース
│   ├── Models/               # Eloquentモデル
│   ├── Services/             # ビジネスロジック
│   └── Repositories/         # データアクセス
├── database/
│   ├── migrations/           # マイグレーション
│   └── seeders/             # シーダー
└── routes/
    └── api.php              # APIルート定義
```

## 6. 開発工程（30時間）

### 1. 初期設定・設計 (4h)
- [ ] プロジェクト環境構築
- [ ] データベース設計の確定
- [ ] API仕様の設計

### 2. バックエンド開発 (12h)
- [ ] マイグレーション作成
- [ ] 認証機能実装
- [ ] 基本CRUD実装
- [ ] API実装

### 3. フロントエンド開発 (10h)
- [ ] コンポーネント作成
- [ ] ページレイアウト実装
- [ ] API連携
- [ ] 状態管理実装

### 4. 統合・調整 (4h)
- [ ] E2Eテスト
- [ ] バグ修正
- [ ] パフォーマンス最適化

## 7. 将来の拡張計画

### 機能拡張
1. メディア管理機能
   - 画像・動画アップロード
   - ストレージ最適化

2. コミュニケーション機能
   - リアルタイム通知
   - グループ機能
   - メッセージング

3. AI機能
   - 目標達成アドバイス
   - カテゴリー推薦
   - 進捗予測

### インフラ強化
1. スケーラビリティ対応
   - キャッシュ層の追加
   - 負荷分散の実装

2. モニタリング強化
   - ログ収集
   - パフォーマンス監視
   - エラー追跡


<!-- ##メモ
class User extends Model
{
    // ユーザーの目標を取得
    public function goals()
    {
        return $this->hasMany(Goal::class);
    }

    // ユーザーのタスクを取得
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // フォローしているユーザーを取得
    public function following()
    {
        return $this->belongsToMany(User::class, 'follows',
            'follower_id', 'following_id')
            ->wherePivot('is_following', true)
            ->withTimestamps();
    }

    // フォロワーを取得
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows',
            'following_id', 'follower_id')
            ->wherePivot('is_following', true)
            ->withTimestamps();
    }
}

class Goal extends Model
{
    // 目標の所有者を取得
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 目標のカテゴリーを取得
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // 目標に紐づくタスクを取得
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // 親目標を取得
    public function parentGoal()
    {
        return $this->belongsTo(Goal::class, 'parent_goal_id');
    }
}

class Post extends Model
{
    // 投稿の作成者を取得
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 投稿に紐づく目標を取得
    public function goal()
    {
        return $this->belongsTo(Goal::class);
    }

    // いいねしたユーザーを取得
    public function likedBy()
    {
        return $this->belongsToMany(User::class, 'likes')
            ->withTimestamps();
    }
} -->
