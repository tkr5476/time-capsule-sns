"use client";

import { useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckBoxIcon from "@mui/icons-material/CheckBox";


// タスクのステータスはカラム次第
type TaskStatus = "未着手" | "処理中" | "完了";
type FilterStatus = "すべて" | TaskStatus;

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  deadline: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([
  
  // サーバーから取得したデータをここに追加
  
  
  
  
  
    {
      id: 1,
      title: "プロジェクト計画を立てる",
      status: "未着手",
      deadline: "2023-06-30",
    },
    {
      id: 2,
      title: "週次レポートを提出する",
      status: "完了",
      deadline: "2023-06-15",
    },
    {
      id: 3,
      title: "チームミーティングの準備",
      status: "処理中",
      deadline: "2023-06-20",
    },
    { id: 4, title: "新機能の設計", status: "未着手", deadline: "2023-07-05" },
    { id: 5, title: "バグ修正", status: "処理中", deadline: "2023-06-25" },
  ]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("すべて");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredTasks =
    filterStatus === "すべて"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const completedTasks = sortedTasks.filter((task) => task.status === "完了");
  const statusOrder: TaskStatus[] = ["処理中", "未着手", "完了"];
  const sortedActiveTasks = sortedTasks
    .filter((task) => task.status !== "完了")
    .sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    );

  const updateTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const nextStatus: { [key in TaskStatus]: TaskStatus } = {
            未着手: "処理中",
            処理中: "完了",
            完了: "未着手",
          };
          return { ...task, status: nextStatus[task.status] };
        }
        return task;
      })
    );
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "未着手":
        return <CircleOutlinedIcon sx={{ fontSize: 16, color: "gray" }} />;
      case "処理中":
        return <ArrowForwardIcon sx={{ fontSize: 16, color: "#1976d2" }} />;
      case "完了":
        return <CheckBoxIcon sx={{ fontSize: 16, color: "#faa823" }} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gradient-to-r from-[#72daf7] to-[#75fff4] p-6 shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          タスク
          <span className="block text-sm font-normal mt-1 text-gray-100 opacity-80">
            あなたの日々の取り組み
          </span>
        </h1>
      </header>
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ステータスでフィルター
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="すべて">すべて</option>
              <option value="未着手">未着手</option>
              <option value="処理中">処理中</option>
              <option value="完了">完了</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="sort-order"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              並び替え
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="asc">古い順</option>
              <option value="desc">新しい順</option>
            </select>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-[#72daf7] text-[#0056b3]">
              進行中のタスク
            </h2>
            <ul className="space-y-2">
              {sortedActiveTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between bg-white p-3 rounded-md shadow"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => updateTaskStatus(task.id)}
                      className="mr-3 flex-shrink-0"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <span className="text-gray-800">{task.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      締切:{" "}
                      {new Date(task.deadline).toLocaleDateString("ja-JP", {
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100">
                      {task.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-[#72daf7] text-[#0056b3]">
                完了したタスク
              </h2>
              <ul className="space-y-2">
                {completedTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => updateTaskStatus(task.id)}
                        className="mr-3 flex-shrink-0"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <span className="text-gray-600 line-through">
                        {task.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      締切:{" "}
                      {new Date(task.deadline).toLocaleDateString("ja-JP", {
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
