"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
};

export default function Home() {
  const pomodoroTime = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;

  const [mode, setMode] = useState("Pomodoro");
  const [time, setTime] = useState(pomodoroTime);
  const [running, setRunning] = useState(false);

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // TIMER
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, time]);

  // LOCAL STORAGE TASKS
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CHANGE MODE
  const changeMode = (newMode: string) => {
    setRunning(false);

    if (newMode === "Pomodoro") {
      setTime(pomodoroTime);
    }

    if (newMode === "Descanso Corto") {
      setTime(shortBreak);
    }

    if (newMode === "Descanso Largo") {
      setTime(longBreak);
    }

    setMode(newMode);
  };

  // FORMAT TIME
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // ADD TASK
  const addTask = () => {
    if (task.trim() === "") return;

    if (editingId !== null) {
      setTasks(
        tasks.map((t) =>
          t.id === editingId ? { ...t, text: task } : t
        )
      );

      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: task,
      };

      setTasks([...tasks, newTask]);
    }

    setTask("");
  };

  // DELETE TASK
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // EDIT TASK
  const editTask = (id: number, text: string) => {
    setTask(text);
    setEditingId(id);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-950 text-white p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* TIMER */}
        <section className="bg-white/10 backdrop-blur-lg rounded-3xl border border-red-500/20 shadow-2xl p-8">
          <h1 className="text-5xl font-bold text-red-400 mb-2">
            StudyBoost
          </h1>

          <p className="text-zinc-400 italic mb-8">
            集中 • Productividad Japonesa
          </p>

          {/* MODES */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => changeMode("Pomodoro")}
              className={`px-5 py-3 rounded-xl transition font-semibold ${
                mode === "Pomodoro"
                  ? "bg-red-500"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Pomodoro
            </button>

            <button
              onClick={() => changeMode("Descanso Corto")}
              className={`px-5 py-3 rounded-xl transition font-semibold ${
                mode === "Descanso Corto"
                  ? "bg-red-500"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Descanso Corto
            </button>

            <button
              onClick={() => changeMode("Descanso Largo")}
              className={`px-5 py-3 rounded-xl transition font-semibold ${
                mode === "Descanso Largo"
                  ? "bg-red-500"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Descanso Largo
            </button>
          </div>

          {/* CLOCK */}
          <div className="bg-black/40 rounded-3xl p-10 text-center border border-red-500/20">
            <h2 className="text-2xl text-zinc-300 mb-4">
              {mode}
            </h2>

            <div className="text-7xl font-bold tracking-widest mb-8">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setRunning(true)}
                className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Iniciar
              </button>

              <button
                onClick={() => setRunning(false)}
                className="bg-zinc-700 hover:bg-zinc-600 transition px-6 py-3 rounded-xl font-semibold"
              >
                Pausar
              </button>

              <button
                onClick={() => changeMode(mode)}
                className="bg-zinc-900 hover:bg-zinc-800 transition px-6 py-3 rounded-xl font-semibold border border-zinc-700"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </section>

        {/* TASKS */}
        <section className="bg-white/10 backdrop-blur-lg rounded-3xl border border-red-500/20 shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-red-400 mb-2">
            Tareas
          </h2>

          <p className="text-zinc-400 italic mb-8">
            今日も頑張ろう • Organiza tu día
          </p>

          {/* INPUT */}
          <div className="flex gap-3 mb-8">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Escribe una tarea..."
              className="flex-1 bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
            />

            <button
              onClick={addTask}
              className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold"
            >
              {editingId !== null ? "Guardar" : "Agregar"}
            </button>
          </div>

          {/* TASK LIST */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-zinc-500 text-center py-10">
                No hay tareas todavía
              </div>
            ) : (
              tasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-black/40 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center"
                >
                  <span className="text-zinc-200">
                    {t.text}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editTask(t.id, t.text)}
                      className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteTask(t.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}