import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Todos from "./components/Todos.jsx";
import AddTodo from "./components/AddTodo.jsx";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      title: "Shopping",
      details: "Buy tomatoes, apple, and a book",
      priority: "medium",
    },
    {
      id: 1,
      title: "Jogging",
      details: "Do the daily jogging ",
      priority: "low",
    },
    {
      id: 2,
      title: "Interview",
      details: "Go to 123, Sky Valley for interview",
      priority: "hight",
    },
  ]);

  const [todoToEdit, setTodoToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);
  const [sortBy, setSortBy] = useState("first-added");
  const [sortedTodos, setSortedTodos] = useState(todos);

  const sortingTodos = (sortingValue, todoToSort) => {
    let newSortedTodos = todoToSort;
    switch (sortingValue) {
      case "last-added":
        newSortedTodos.sort(function (a, b) {
          return b.id - a.id;
        });
        break;

      case "first-added":
        newSortedTodos.sort(function (a, b) {
          return a.id - b.id;
        });
        break;

      case "lowest-priority":
        const orderLowToHight = ["low", "medium", "hight"];
        newSortedTodos.sort(
          (a, b) =>
            orderLowToHight.indexOf(a.priority) -
            orderLowToHight.indexOf(b.priority)
        );
        break;

      case "hightest-priority":
        const orderHightToLow = ["hight", "medium", "low"];
        newSortedTodos.sort(
          (a, b) =>
            orderHightToLow.indexOf(a.priority) -
            orderHightToLow.indexOf(b.priority)
        );
        break;
      default:
        alert("an error as occured");
    }
    setSortedTodos([...newSortedTodos]);
  };

  const addTodo = (todo) => {
    setShowForm(false);
    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
      title: todo.title,
      details: todo.details,
      priority: todo.priority,
    };
    let newTodoList = [...todos, newTodo];
    setTodos([...todos, newTodo]);
    sortingTodos(sortBy, newTodoList);
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
    sortingTodos(sortBy, [...newTodoList]);
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

  const closeForm = () => {
    setShowForm(false);
    setEditingTodo(false);
  };

  useEffect(() => {
    sortingTodos(sortBy, sortedTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">React To Do List</header>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>

      <label htmlFor="sorting">Sort by : </label>
      <select
        name="sorting"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          sortingTodos(e.target.value, sortedTodos);
        }}
      >
        <option value="last-added">Last added</option>
        <option value="first-added">First added</option>
        <option value="hightest-priority">Highest priority</option>
        <option value="lowest-priority">Lowest priority</option>
      </select>

      {showForm && (
        <AddTodo
          onAdd={addTodo}
          onEdit={handleEditTodo}
          isEditingTodo={editingTodo}
          todoToEdit={todoToEdit}
          clickedAway={closeForm}
        />
      )}

      <Todos
        TodoListItems={sortedTodos}
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
