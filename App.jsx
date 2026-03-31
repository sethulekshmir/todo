import React, { useMemo, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TodoListApp() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React practice", done: false },
    { id: 2, text: "Watch tutorial and build project", done: true },
  ]);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  const addTask = () => {
    const trimmed = taskText.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskText("");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl rounded-2xl shadow-xl border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">
            To-Do List
          </CardTitle>
          <p className="text-center text-sm text-slate-500">
            Add tasks, mark them done, or delete them.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-11 rounded-xl"
            />
            <Button onClick={addTask} className="h-11 rounded-xl px-4">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3">
            <span>Total Tasks: {tasks.length}</span>
            <span>Completed: {completedCount}</span>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center text-slate-500 py-8 border rounded-2xl bg-slate-50">
                No tasks yet. Add one above.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition ${
                        task.done ? "bg-slate-900 text-white" : "bg-white"
                      }`}
                      aria-label={task.done ? "Mark as not done" : "Mark as done"}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <span
                      className={`text-base break-words ${
                        task.done ? "line-through text-slate-400" : "text-slate-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => deleteTask(task.id)}
                    className="rounded-xl shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
