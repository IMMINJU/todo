// app/api/todoApi.ts
import axios from "axios";

const todoApi = axios.create({ baseURL: "/api/todos" });

export const getTodos = async () => {
  const response = await todoApi.get("/");
  return response.data;
};

export const addTodo = async (title: string) => {
  const response = await todoApi.post("/", { title });
  return response.data;
};

export const toggleTodo = async (id: number, completed: boolean) => {
  await todoApi.put("/", { id, completed });
};

export const deleteTodo = async (id: number) => {
  await todoApi.delete("/", { data: { id } });
};
