import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Todos from "./components/Todos.jsx";
import AddTodo from "./components/AddTodo.jsx";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Shopping",
      details: "Buy tomatoes, apple, and a book",
      priority: "medium",
    },
    {
      id: 2,
      title: "Jogging",
      details: "Do the daily jogging ",
      priority: "low",
    },
    {
      id: 3,
      title: "Interview",
      details: "Go to 123, Sky Valley for interview",
      priority: "hight",
    },
  ]);

  const [todoToEdit, setTodoToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);

  const addTodo = (todo) => {
    setShowForm(false);
    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
      title: todo.title,
      details: todo.details,
      priority: todo.priority,
    };
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (todoToEdit) => {
    setShowForm(false);
    setEditingTodo(false);
    const indexOfTodoToEdit = todos
      .map(function (x) {
        return x.id;
      })
      .indexOf(todoToEdit.id);
    let newTodoList = todos;
    newTodoList.splice(indexOfTodoToEdit, 1, todoToEdit);
    setTodos([...newTodoList]);
  };

  const handleDeleteTodo = (idToDelete) => {
    const indexOfTodoToDelete = todos
      .map(function (x) {
        return x.id;
      })
      .indexOf(idToDelete);
    let newTodoList = todos;
    newTodoList.splice(indexOfTodoToDelete, 1);
    setTodos([...newTodoList]);
  };

  return (
    <div className="App">
      <header className="App-header">React To Do List</header>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      {showForm && (
        <AddTodo
          onAdd={addTodo}
          onEdit={handleEditTodo}
          isEditingTodo={editingTodo}
          todoToEdit={todoToEdit}
        />
      )}
      <Todos
        TodoListItems={todos}
        editTodo={(e) => {
          setEditingTodo(true);
          setShowForm(true);
          setTodoToEdit(e);
        }}
        deleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
