"use client";

import { useState } from "react";

export default function GoalList({
  goals,
  onUpdate,
  onDelete,
}: {
  goals: any;
  onUpdate: any;
  onDelete: any;
}) {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (goal: any) => {
    setEditingId(goal.id);
  };

  const handleSave = (goal: any) => {
    onUpdate(goal);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {goals.map((goal: any) => (
        <div
          key={goal.id}
          className="bg-white p-6 rounded-lg shadow-lg border border-[#72daf7]/20 transition-all duration-300 hover:shadow-xl"
        >
          {editingId === goal.id ? (
            <GoalEditForm
              goal={goal}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0056b3] mb-2">
                {goal.title}
              </h2>
              <p className="text-[#00a0e9] mb-4">カテゴリー: {goal.category}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#0056b3] bg-[#e6f7ff]">
                      進捗
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-[#0056b3]">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-[#e6f7ff]">
                  <div
                    style={{ width: `${goal.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#72daf7] to-[#75fff4]"
                  ></div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(goal)}
                  className="px-4 py-2 bg-[#72daf7] text-white rounded-full hover:bg-[#75fff4] hover:text-[#0056b3] transition-colors duration-300"
                >
                  編集
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="px-4 py-2 bg-[#faa823] text-white rounded-full hover:bg-[#ffc107] hover:text-[#0056b3] transition-colors duration-300"
                >
                  削除
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function GoalEditForm({
  goal,
  onSave,
  onCancel,
}: {
  goal: any;
  onSave: any;
  onCancel: any;
}) {
  const [title, setTitle] = useState(goal.title);
  const [category, setCategory] = useState(goal.category);
  const [progress, setProgress] = useState(goal.progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...goal, title, category, progress: Number(progress) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-[#72daf7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75fff4] focus:border-transparent"
        placeholder="目標のタイトル"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-[#72daf7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75fff4] focus:border-transparent"
        placeholder="カテゴリー"
      />
      <input
        type="number"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        min="0"
        max="100"
        className="w-full p-2 border border-[#72daf7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75fff4] focus:border-transparent"
        placeholder="進捗 (%)"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-[#72daf7] text-white rounded-full hover:bg-[#75fff4] hover:text-[#0056b3] transition-colors duration-300"
        >
          保存
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-300"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}