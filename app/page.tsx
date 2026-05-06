"use client";

import Image from "next/image";
import supabase from "./supabase-client";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    console.log(data);

    if (error) {
      console.log("error fetching todo list: ", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .select()
      .single();

    if (error) {
      console.log("error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id: number, isCompleted: boolean) => {
    const { data, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.log("error updating task ", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !isCompleted }
          : todo,
      );

      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id: number) => {
    const { data, error } = await supabase
      .from("TodoList")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("error deleting task ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>

        <div>
          <input
            type="text"
            placeholder="New Todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo Item</button>
        </div>

        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <p>{todo.name}</p>

              <button
                onClick={() => completeTask(todo.id, todo.isCompleted)}
              >
                {todo.isCompleted ? "Undo" : "Complete"}
              </button>

              <button onClick={() => deleteTask(todo.id)}>
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}