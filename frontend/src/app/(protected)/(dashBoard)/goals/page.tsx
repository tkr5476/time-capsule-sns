"use client";

import { useState } from "react";
import GoalForm from "@/components/protected/goals/goalForm";
import GoalList from "@/components/protected/goals/goalList";

export default function Goals() {
  const [goals, setGoals] = useState([
  
// サーバーから取得したデータをここに追加
  

  
    { id: 1, title: "新しい言語を学ぶ", category: "教育", progress: 30 },
    { id: 2, title: "マラソンを完走する", category: "健康", progress: 50 },
    { id: 3, title: "起業する", category: "キャリア", progress: 10 },
  ]);

  const addGoal = (newGoal: any) => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1 }]);
  };

  const updateGoal = (updatedGoal: any) => {
    setGoals(
      goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const deleteGoal = (goalId: any) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-[#72daf7] to-[#75fff4] p-6 shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          目標
          <span className="block text-sm font-normal mt-1 text-gray-100 opacity-80">
            あなたの未来への道しるべ
          </span>
        </h1>
      </header>
      <div className="p-4">
        <GoalForm onSubmit={addGoal} />
        <GoalList goals={goals} onUpdate={updateGoal} onDelete={deleteGoal} />
      </div>
    </div>
  );
}