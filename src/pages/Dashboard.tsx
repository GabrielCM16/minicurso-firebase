import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../@types";
import { addTask, toggleTask, deleteTask, subscribeToTasks } from "../services/firestore";
import { Plus, Trash2, CheckCircle2, Circle, ListTodo, Sparkles } from "lucide-react";

export const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Escuta as tarefas em tempo real vinculadas ao usuário
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToTasks(user.uid, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !user || submitting) return;

    setSubmitting(true);
    try {
      await addTask(newTaskTitle.trim(), user.uid);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (task: Task) => {
    if (!task.id) return;
    try {
      await toggleTask(task.id, !task.completed);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="flex-1 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Banner de Boas-vindas */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-2xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Olá, <span className="text-amber-500">{user?.displayName?.split(" ")[0] || "Dev"}</span>! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tarefas sincronizadas em tempo real com o Cloud Firestore.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
              <ListTodo size={14} className="text-slate-400" /> {tasks.length} {tasks.length === 1 ? "tarefa" : "tarefas"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={14} /> {completedCount} concluídas
            </span>
          </div>
        </section>

        {/* Formulário de Adicionar Tarefa */}
        <form
          onSubmit={handleAddTask}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-lg"
        >
          <input
            type="text"
            placeholder="O que você precisa fazer hoje?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            disabled={submitting}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <button
            type="submit"
            disabled={submitting || !newTaskTitle.trim()}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Plus size={18} />
            )}
            <span>Adicionar</span>
          </button>
        </form>

        {/* Lista de Tarefas */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-5 min-h-[260px] shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400 text-sm">
              <div className="w-8 h-8 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
              <p>Sincronizando com Firestore...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Sparkles size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-200">Nenhuma tarefa por aqui!</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                Adicione uma tarefa no campo acima para testar a inserção e escuta em tempo real.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    task.completed
                      ? "bg-slate-950/40 border-slate-800/60 text-slate-500"
                      : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950 text-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(task)}
                    className="cursor-pointer transition-transform active:scale-90"
                    title={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-emerald-400" size={20} />
                    ) : (
                      <Circle className="text-slate-500 hover:text-amber-400" size={20} />
                    )}
                  </button>

                  <span
                    className={`flex-1 text-sm font-medium transition-all ${
                      task.completed ? "line-through text-slate-500" : "text-slate-200"
                    }`}
                  >
                    {task.title}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Excluir tarefa"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
