import useTodoStore from "../store/todoStore";

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
        listStyle: "none",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#aaa" : "#000",
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => removeTodo(todo.id)}
        style={{
          padding: "4px 8px",
          cursor: "pointer",
          background: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
