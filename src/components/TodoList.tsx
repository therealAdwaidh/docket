"use client";
import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import toast from "react-hot-toast";


type Todo = { id: string; title: string; completed: boolean };

      export default function TodoList() {
        const [todos, setTodos] = useState<Todo[]>([]);
        const [editingId, setEditingId] = useState<string | null>(null);
      const [editingText, setEditingText] = useState<string>("");


      async function fetchTodos() {
        const res = await fetch("/api/todos");
        setTodos(await res.json());
      }

      useEffect(() => {
        fetchTodos();
      }, []);

      const handleEditSubmit = async (id: string) => {
            if (!editingText.trim()) {
            toast.error("Todo title cannot be empty");
            return;
          }
          
            try {
              await fetch(`/api/todos/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title: editingText }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              toast.success("Todo updated!");
              setEditingId(null);
              fetchTodos();
            } catch (err) {
              toast.error("Failed to update");
            }
          };


      const addTodo = async (title: string) => {

              if (!title.trim()) {
              toast.error("Title cannot be empty");
              return;
            }

            const res = await fetch("/api/todos", {
              method: "POST",
              body: JSON.stringify({ title }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            const newTodo = await res.json();
            setTodos((prev) => [newTodo, ...prev]);
          };




        async function toggle(id: string, completed: boolean) {
          await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({ completed: !completed }),
          });
          fetchTodos();
        }



        async function remove(id: string) {
          await fetch(`/api/todos/${id}`, { method: "DELETE" });
          setTodos(todos.filter((t) => t.id !== id));
        }




      return (
        <div className="todo-wrapper">
          <TodoInput onAdd={addTodo} />
          <ul className="todo-list">
            {todos.map((t) => (
              <li key={t.id} className="todo-item">
                <div className={`todo-item-left ${editingId === t.id ? "editing" : ""}`}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggle(t.id, t.completed)}
                />
                {editingId === t.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      autoFocus
                      onChange={(e) => setEditingText(e.target.value)}
                      className="todo-edit-input"
                    />
                    <button
                      className="todo-save"
                      title="Save"
                      onClick={() => handleEditSubmit(t.id)}
                    >
                      ✅
                    </button>
                    <button
                      className="todo-cancel"
                      title="Cancel"
                      onClick={() => setEditingId(null)}
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <span className={t.completed ? "todo-completed" : ""}>{t.title}</span>
                    <button
                      className="todo-edit"
                      title="Edit"
                      onClick={() => {
                        setEditingId(t.id);
                        setEditingText(t.title);
                      }}
                    >
                      🖉
                    </button>
                  </>
                )}
              </div>


                <button onClick={() => remove(t.id)} className="todo-remove">
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
}
