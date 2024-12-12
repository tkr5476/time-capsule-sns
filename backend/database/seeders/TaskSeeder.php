<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Goal;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{

    private array $categoryTasks = [
            1 => [
                [
                    'title' => 'プログラミング学習',
                    'description' => 'Laravelの公式ドキュメントを読む'
                ],
                [
                    'title' => 'オンライン講座の受講',
                    'description' => 'Udemyで新しい技術の動画を見る'
                ],
                [
                    'title' => '技術書を読む',
                    'description' => 'AWSの基礎について学ぶ'
                ],
                [
                    'title' => 'コーディング練習',
                    'description' => 'アルゴリズムの問題を解く'
                ],
                [
                    'title' => 'プロジェクト作成',
                    'description' => 'ポートフォリオのアップデート'
                ],
            ],
            2 => [
                [
                    'title' => '朝会の準備',
                    'description' => '今日の作業内容の整理'
                ],
                [
                    'title' => 'メール処理',
                    'description' => '未読メールの確認と返信'
                ],
                [
                    'title' => '報告書作成',
                    'description' => '週次進捗レポートの作成'
                ],
                [
                    'title' => 'タスク整理',
                    'description' => '優先順位の見直しと調整'
                ],
                [
                    'title' => 'ミーティング準備',
                    'description' => '資料作成と内容の確認'
                ],
            ],
            3 => [
                [
                    'title' => '基礎練習',
                    'description' => 'フォームの確認と改善'
                ],
                [
                    'title' => 'チーム練習',
                    'description' => '連携プレーの強化'
                ],
                [
                    'title' => '体力トレーニング',
                    'description' => '持久力向上のための練習'
                ],
                [
                    'title' => '戦術研究',
                    'description' => '試合映像の分析'
                ],
                [
                    'title' => '個人練習',
                    'description' => '苦手な技術の克服'
                ],
            ],
            4 => [
                [
                    'title' => '新しい曲の練習',
                    'description' => '基本的なフレーズの習得'
                ],
                [
                    'title' => '写真撮影',
                    'description' => '構図とライティングの練習'
                ],
                [
                    'title' => '絵画制作',
                    'description' => 'デッサンの基礎練習'
                ],
                [
                    'title' => 'ゲーム配信',
                    'description' => '配信環境の整備'
                ],
                [
                    'title' => '読書',
                    'description' => '新刊を30ページ読む'
                ],
            ],
            5 => [
                [
                    'title' => 'ジョギング',
                    'description' => '近所を30分走る'
                ],
                [
                    'title' => '筋トレ',
                    'description' => '腕立て30回、腹筋30回'
                ],
                [
                    'title' => 'ストレッチ',
                    'description' => '全身のストレッチを15分'
                ],
                [
                    'title' => '食事管理',
                    'description' => '一日の摂取カロリーを記録'
                ],
                [
                    'title' => '睡眠管理',
                    'description' => '23時までに就寝する'
                ],
            ],
            6 => [
                [
                    'title' => '瞑想',
                    'description' => '朝10分間の瞑想'
                ],
                [
                    'title' => '日記',
                    'description' => '今日の振り返りを書く'
                ],
                [
                    'title' => 'アファメーション',
                    'description' => '目標を声に出して唱える'
                ],
                [
                    'title' => 'マインドマップ作成',
                    'description' => '今月の目標を整理する'
                ],
                [
                    'title' => 'セルフトーク',
                    'description' => 'ポジティブな言葉で自己対話'
                ],
            ],
            7 => [
                [
                    'title' => 'ボランティア活動',
                    'description' => '地域の清掃活動に参加'
                ],
                [
                    'title' => '寄付活動',
                    'description' => '不要な本を図書館に寄付'
                ],
                [
                    'title' => '知識共有',
                    'description' => '技術記事の執筆'
                ],
                [
                    'title' => 'メンタリング',
                    'description' => '後輩のサポート'
                ],
                [
                    'title' => 'コミュニティ活動',
                    'description' => '勉強会の企画運営'
                ],
            ],
            8 => [
                [
                    'title' => '部屋の整理',
                    'description' => '不要なものを処分する'
                ],
                [
                    'title' => '家計簿管理',
                    'description' => '支出の記録と分析'
                ],
                [
                    'title' => '新しい趣味探し',
                    'description' => '興味のある分野を調査'
                ],
                [
                    'title' => '資格取得計画',
                    'description' => '学習スケジュールの作成'
                ],
                [
                    'title' => '目標の見直し',
                    'description' => '長期目標の進捗確認'
                ],
            ],
        ];

    public function run(): void
    {
        try {
            \DB::beginTransaction();

            $goals = Goal::with('user')->get();

            foreach ($goals as $goal) {
                $this->createTasksForGoal($goal);
            }

            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            \Log::error('TaskSeeder error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function createTasksForGoal(Goal $goal): void
    {
        $taskCount = rand(3, 7);
        $categoryId = $goal->category_id;

        $availableTasks = $this->categoryTasks[$categoryId] ?? $this->categoryTasks[8];

        $shuffledTasks = collect($availableTasks)->shuffle();

        for ($i = 0; $i < $taskCount; $i++) {
            $taskIndex = $i % count($availableTasks);
            $task = $shuffledTasks[$taskIndex];

            Task::create([
                'user_id' => $goal->user_id,
                'goal_id' => $goal->id,
                'title' => $task['title'] . ' #' . ($i + 1),
                'description' => $task['description'],
                'due_date' => now()->addDays(rand(1, 30)),
                'exp_points' => rand(10, 100),
                'is_completed' => (bool)rand(0, 1),
                'visibility' => rand(0, 2),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
