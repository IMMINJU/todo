// app/hooks/useTodoQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../api/todoApi";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function useTodoQuery() {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todo[]>({ queryKey: ["todos"], queryFn: getTodos });

  const addTodoMutation = useMutation<Todo, Error, string>({
    mutationFn: addTodo,
    onSuccess: (todo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        return [...(oldTodos || []), todo];
      });
    },
  });

  const toggleTodoMutation = useMutation<
    void,
    Error,
    { id: number; completed: boolean }
  >({
    mutationFn: ({ id, completed }) => toggleTodo(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return {
    todos,
    isLoading,
    isError,
    addTodoMutation,
    toggleTodoMutation,
    deleteTodoMutation,
  };
}
