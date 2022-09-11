import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faBan } from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  MenuItem,
  TextField,
  ButtonGroup,
  Button,
} from "@mui/material";

import TodoList from "../components/TodoList.jsx";
import TodoForm from "../components/TodoForm.jsx";

const StyledTodosPage = styled.div``;

const buttonGroupStyle = {
  "& .MuiButtonGroup-grouped": {
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    borderColor: "black",
    borderWidth: 1,
  },
};

const buttonStyle = {
  color: "black",
  textTransform: "none",
};

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
      case "nearest-deadline":
        newSortedTodos.sort((a, b) => {
          //Todos with no deadline are moved to last
          if (a.deadline.date.length === 0) return 1;
          if (b.deadline.date.length === 0) return -1;
          const deadlineA = new Date(
            `${a.deadline.date}${
              a.deadline.time.length > 0 ? " " + a.deadline.time : ""
            }`
          ).valueOf();
          const deadlineB = new Date(
            `${b.deadline.date}${
              b.deadline.time.length > 0 ? " " + b.deadline.time : ""
            }`
          ).valueOf();
          if (deadlineA - deadlineB < 0) return -1;
          if (deadlineA - deadlineB === 0) return 0;
          if (deadlineA - deadlineB > 0) return 1;
          return 0;
        });
        break;
      case "lastest-deadline":
        newSortedTodos.sort((a, b) => {
          //Todos with no deadline are moved to last
          if (a.deadline.date.length === 0) return 1;
          if (b.deadline.date.length === 0) return -1;
          const deadlineA = new Date(
            `${a.deadline.date}${
              a.deadline.time.length > 0 ? " " + a.deadline.time : ""
            }`
          ).valueOf();
          const deadlineB = new Date(
            `${b.deadline.date}${
              b.deadline.time.length > 0 ? " " + b.deadline.time : ""
            }`
          ).valueOf();
          if (deadlineA - deadlineB < 0) return 1;
          if (deadlineA - deadlineB === 0) return 0;
          if (deadlineA - deadlineB > 0) return -1;
          return 0;
        });
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
          <ButtonGroup
            orientation="horizontal"
            variant="text"
            sx={buttonGroupStyle}
          >
            <Button sx={buttonStyle} onClick={deleteAllTodosSelected}>
              Delete All Selected
            </Button>
            <Button
              sx={buttonStyle}
              onClick={() => {
                setShowCheckBoxes(false);
                setTodosIdsGoingToBeDeleted([]);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        )}
      </div>

      <ButtonGroup
        orientation="horizontal"
        variant="text"
        sx={buttonGroupStyle}
      >
        <Button sx={buttonStyle} onClick={() => setTodosListDisplay("all")}>
          All
        </Button>
        <Button
          sx={buttonStyle}
          onClick={() => setTodosListDisplay("separated")}
        >
          Separated
        </Button>
      </ButtonGroup>

      <Select
        label="Sort by"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          sortingTodos(e.target.value, sortedTodos);
        }}
      >
        <MenuItem value="last-added">Last added</MenuItem>
        <MenuItem value="first-added">First added</MenuItem>
        <MenuItem value="hightest-priority">Highest priority</MenuItem>
        <MenuItem value="lowest-priority">Lowest priority</MenuItem>
        <MenuItem value="nearest-deadline">Nearest deadline</MenuItem>
        <MenuItem value="lastest-deadline">Lastest deadline</MenuItem>
      </Select>

      <TextField type="text" label="Filter" onChange={handleFilterChange} />

      {showForm && (
        <TodoForm
          onAdd={addTodo}
          onEdit={handleEditTodo}
          isEditingTodo={editingTodo}
          todoToEdit={todoToEdit}
          closeForm={closeForm}
        />
      )}

      <TodoList
        display={todosListDisplay}
        todos={sortedTodos}
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

TodosPage.propTypes = {
  todos: PropTypes.array.isRequired,
  modifyTodos: PropTypes.func.isRequired,
};

export default TodosPage;
