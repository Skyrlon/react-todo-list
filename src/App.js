import { useState } from "react";
import "./App.css";

import Todos from "./components/Todos.jsx";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Shopping", text: "Buy tomatoes, apple, and a book" },
    { id: 2, title: "Jogging", text: "Do the daily jogging " },
    { id: 3, title: "Interview", text: "Go to 123, Sky Valley for interview" },
  ]);

  return (
    <div className="App">
      <header className="App-header">React To Do List</header>
      <Todos TodoListItems={todos} />
    </div>
  );
};

export default App;
