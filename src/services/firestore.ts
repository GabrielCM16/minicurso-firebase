import { db } from "./firebase";
import type { Task } from "../@types";

// TODO (Passo 3.1): Criar a referência para a coleção 'tasks' do Firestore

// TODO (Passo 3.2): Criar função para adicionar uma nova tarefa
export const addTask = async (title: string, userId: string) => {
  console.log("TODO: Implementar criação de tarefa", title, userId, db);
};

// TODO (Passo 3.3): Criar função para alternar o status da tarefa (concluída / pendente)
export const toggleTask = async (id: string, completed: boolean) => {
  console.log("TODO: Implementar atualização de status da tarefa", id, completed, db);
};

// TODO (Passo 3.4): Criar função para excluir uma tarefa pelo ID
export const deleteTask = async (id: string) => {
  console.log("TODO: Implementar exclusão de tarefa", id, db);
};

// TODO (Passo 3.5): Criar função para escutar as tarefas em tempo real (Realtime) filtrando por userId
export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  console.log("TODO: Implementar listener em tempo real com onSnapshot para o usuário:", userId, db);
  callback([]);
  return () => {};
};
