import useTodoStore from "../store/todoStore";
import TodoItem from "./TodoItem";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  return (
    <div>
      <ul style={{ padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {todos.length > 0 && (
        <button
          onClick={clearCompleted}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TodoList;
