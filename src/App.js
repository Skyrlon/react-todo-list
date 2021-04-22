import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Todos from "./components/Todos.jsx";
import AddTodo from "./components/AddTodo.jsx";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Shopping", text: "Buy tomatoes, apple, and a book" },
    { id: 2, title: "Jogging", text: "Do the daily jogging " },
    { id: 3, title: "Interview", text: "Go to 123, Sky Valley for interview" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const addTodo = (todo) => {
    setShowForm(false);
    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      title: todo.title,
      text: todo.details,
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <header className="App-header">React To Do List</header>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      {showForm && <AddTodo onAdd={addTodo} />}
      <Todos TodoListItems={todos} />
    </div>
  );
};

export default App;
