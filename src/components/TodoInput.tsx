"use client";

import { useState } from "react";


export default function TodoInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onAdd(title);
        setTitle("");
      }}
      className="todo-form"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
        placeholder="Add todo..."
      />
      <button type="submit" className="todo-button">
        Add
      </button>
    </form>
  );
}
