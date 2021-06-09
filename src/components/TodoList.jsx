import { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Todos from "./Todos.jsx";
import AddTodo from "./AddTodo.jsx";

const StyledTodoList = styled.div``;

const TodoList = ({ todos, modifyTodos }) => {
  const [todoToEdit, setTodoToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);
  const [sortBy, setSortBy] = useState("first-added");
  const [sortedTodos, setSortedTodos] = useState(todos);

  const [todosListDisplay, setTodosListDisplay] = useState("all");

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
      completed: false,
      deadline: todo.deadline,
    };
    let newTodoList = [...todos, newTodo];
    modifyTodos([...todos, newTodo]);
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
    modifyTodos(newTodoList);
    sortingTodos(sortBy, newTodoList);
  };

  const handleDeleteTodo = (idToDelete) => {
    const newTodoList = todos.filter((todo) => todo.id !== idToDelete);
    modifyTodos(newTodoList);
  };

  const handleToggleCompleteTodo = (todo, completedValue) => {
    const indexOfTodoToToggleComplete = todos
      .map(function (x) {
        return x.id;
      })
      .indexOf(todo.id);
    let newTodoList = todos;
    newTodoList.splice(indexOfTodoToToggleComplete, 1, {
      id: todo.id,
      title: todo.title,
      details: todo.details,
      priority: todo.priority,
      completed: !completedValue,
    });
    modifyTodos([...newTodoList]);
  };

  const handleFilterChange = (e) => {
    let filteredTodos = todos.filter(
      (element) =>
        element.title.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
        element.details.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSortedTodos([...filteredTodos]);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTodo(false);
  };

  useEffect(() => {
    sortingTodos(sortBy, todos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);
  return (
    <StyledTodoList>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>

      <div className="todos-list-display">
        <div onClick={() => setTodosListDisplay("all")}>All</div>|
        <div onClick={() => setTodosListDisplay("separated")}>Separated</div>
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

      <label htmlFor="filter">Filter : </label>
      <input type="text" name="filter" onChange={handleFilterChange} />

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
        display={todosListDisplay}
        TodoListItems={sortedTodos}
        editTodo={(e) => {
          setEditingTodo(true);
          setShowForm(true);
          setTodoToEdit(e);
        }}
        deleteTodo={handleDeleteTodo}
        toggleCompleteTodo={handleToggleCompleteTodo}
      />
    </StyledTodoList>
  );
};
export default TodoList;
