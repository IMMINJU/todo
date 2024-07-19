// app/components/TodoList.tsx
"use client";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import useTodoQuery from "../hooks/useTodoQuery";

export default function TodoList() {
  const { register, handleSubmit, reset } = useForm<{ title: string }>();
  const {
    todos,
    isLoading,
    isError,
    addTodoMutation,
    toggleTodoMutation,
    deleteTodoMutation,
  } = useTodoQuery();

  const onSubmit = handleSubmit((data) => {
    addTodoMutation.mutate(data.title, { onSuccess: () => reset() });
  });

  if (isLoading || !todos) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching todos.</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Enter a new todo"
          className="border border-amber-300 rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-amber-500 text-white rounded px-4 py-2 mt-2"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                toggleTodoMutation.mutate({
                  id: todo.id,
                  completed: !todo.completed,
                })
              }
              className="mr-2"
            />
            <span
              className={clsx("flex-grow", {
                "line-through text-gray-500": todo.completed,
              })}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodoMutation.mutate(todo.id)}
              className="bg-red-500 text-white rounded px-2 py-1 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
