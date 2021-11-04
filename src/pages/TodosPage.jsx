import { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faBan } from "@fortawesome/free-solid-svg-icons";

import TodoList from "../components/TodoList.jsx";
import TodoForm from "../components/TodoForm.jsx";

const StyledTodosPage = styled.div``;

const TodosPage = ({ todos, modifyTodos }) => {
  const [todoToEdit, setTodoToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(false);
  const [sortBy, setSortBy] = useState("first-added");
  const [sortedTodos, setSortedTodos] = useState(todos);

  const [todosListDisplay, setTodosListDisplay] = useState("all");

  const [todosIdsGoingToBeDeleted, setTodosIdsGoingToBeDeleted] = useState([]);

  const [showCheckBoxes, setShowCheckBoxes] = useState(false);

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
    setSortedTodos(newSortedTodos);
  };

  const addTodo = (todo) => {
    setShowForm(false);
    const newTodo = {
      ...todo,
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
      completed: false,
    };
    const newTodoList = [...todos, newTodo];
    modifyTodos(newTodoList);
    sortingTodos(sortBy, newTodoList);
  };

  const handleEditTodo = (todoToEdit) => {
    setShowForm(false);
    setEditingTodo(false);
    const newTodoList = todos.map((todo) => {
      if (todo.id === todoToEdit.id) return todoToEdit;
      return todo;
    });
    modifyTodos(newTodoList);
    sortingTodos(sortBy, newTodoList);
  };

  const handleDeleteTodo = (idToDelete) => {
    const newTodoList = todos.filter((todo) => todo.id !== idToDelete);
    modifyTodos(newTodoList);
  };

  const handleToggleCompleteTodo = (todoToModify) => {
    const newTodoList = todos.map((todo) => {
      if (todo.id === todoToModify.id)
        return { ...todo, completed: !todo.completed };
      return todo;
    });
    modifyTodos(newTodoList);
  };

  const handleFilterChange = (e) => {
    const filteredTodos = todos.filter(
      (element) =>
        element.title.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
        element.details.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSortedTodos([...filteredTodos]);
  };

  const handleSelectedToBeDeleted = (selected, id) => {
    if (selected) {
      setTodosIdsGoingToBeDeleted((prev) => [...prev, id]);
    } else {
      setTodosIdsGoingToBeDeleted((prev) => prev.filter((x) => x !== id));
    }
  };

  const deleteAllTodosSelected = () => {
    const newTodoList = todos.filter(
      (todo) => !todosIdsGoingToBeDeleted.includes(todo.id)
    );
    modifyTodos(newTodoList);
    setShowCheckBoxes(false);
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
    <StyledTodosPage>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>

      <div>
        {!showCheckBoxes && (
          <FontAwesomeIcon
            icon={faBan}
            onClick={() => setShowCheckBoxes(true)}
          />
        )}
        {showCheckBoxes && (
          <div>
            <div onClick={deleteAllTodosSelected}>Delete All Selected</div>
            <div
              onClick={() => {
                setShowCheckBoxes(false);
                setTodosIdsGoingToBeDeleted([]);
              }}
            >
              Cancel
            </div>
          </div>
        )}
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
        <TodoForm
          onAdd={addTodo}
          onEdit={handleEditTodo}
          isEditingTodo={editingTodo}
          todoToEdit={todoToEdit}
          clickedAway={closeForm}
        />
      )}

      <TodoList
        display={todosListDisplay}
        TodoListItems={sortedTodos}
        editTodo={(e) => {
          setEditingTodo(true);
          setShowForm(true);
          setTodoToEdit(e);
        }}
        deleteTodo={handleDeleteTodo}
        toggleCompleteTodo={handleToggleCompleteTodo}
        showCheckBoxes={showCheckBoxes}
        selectedToBeDeleted={handleSelectedToBeDeleted}
      />
    </StyledTodosPage>
  );
};
export default TodosPage;
