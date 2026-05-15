import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import useTodoStore from "./store/todoStore";

function App() {
  const todoCount = useTodoStore((state) => state.todos.length);
  const completedCount = useTodoStore(
    (state) => state.todos.filter((todo) => todo.completed).length,
  );

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #000",
        borderRadius: "8px",
      }}
    >
      <h1>Todo List with Zustand</h1>

      <TodoInput />

      <div style={{ marginBottom: "16px" }}>
        <p>Total todos: {todoCount}</p>
        <p>Completed: {completedCount}</p>
      </div>

      <TodoList />
    </div>
  );
}

export default App;
