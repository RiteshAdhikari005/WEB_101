import { useState } from "react";
import useTodoStore from "../store/todoStore";

function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        style={{
          padding: "8px",
          flex: 1,
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{ padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
