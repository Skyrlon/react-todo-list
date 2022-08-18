import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Todo from "./Todo.jsx";

const StyledTodoList = styled.div`
  & .todos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  & .todo-container {
    flex: 0 0 21%;
    margin-top: 1%;
    margin-bottom: 1%;

    @media (max-width: 599px) {
      flex: 0 0 90%;
    }

    @media (min-width: 600px) and (max-width: 800px) {
      flex: 0 0 40%;
      &:not(:nth-child(2n + 1)) {
        margin-left: calc((100% - (45% * 2)) / 2);
      }
      &:nth-child(2n + 1) {
        margin-left: calc((100% - (45% * 2)) / 2);
      }
    }
  }
`;

const TodoList = ({
  todos,
  editTodo,
  deleteTodo,
  toggleCompleteTodo,
  display,
  showCheckBoxes,
  selectedToBeDeleted,
}) => {
  const [todoListsToCollapse, setTodoListsToCollapse] = useState([]);

  const handleOnChevronClick = (category) => {
    if (todoListsToCollapse.includes(category)) {
      setTodoListsToCollapse((prev) => prev.filter((e) => e !== category));
    } else {
      setTodoListsToCollapse((prev) => [...prev, category]);
    }
  };

  return (
    <StyledTodoList>
      {display === "all" && (
        <div>
          <h2>All ({todos.length})</h2>
          <div className="todos">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-container">
                <Todo
                  key={todo.id}
                  todo={todo}
                  onEdit={() => editTodo(todo)}
                  onDelete={() => deleteTodo(todo.id)}
                  onComplete={() => toggleCompleteTodo(todo, todo.completed)}
                  showCheckBoxes={showCheckBoxes}
                  selectedToBeDeleted={selectedToBeDeleted}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {display === "separated" && (
        <div>
          <div className="todos-not-completed">
            <h2>
              Not completed (
              {todos.filter((todo) => todo.completed === false).length}
              )
              <FontAwesomeIcon
                icon={
                  todoListsToCollapse.includes("not completed")
                    ? faChevronUp
                    : faChevronDown
                }
                onClick={() => handleOnChevronClick("not completed")}
              />
            </h2>

            {!todoListsToCollapse.includes("not completed") && (
              <div className="todos">
                {todos
                  .filter((todo) => todo.completed === false)
                  .map((todo) => (
                    <div key={todo.id} className="todo-container">
                      <Todo
                        todo={todo}
                        onEdit={() => editTodo(todo)}
                        onDelete={() => deleteTodo(todo.id)}
                        onComplete={() => toggleCompleteTodo(todo)}
                        showCheckBoxes={showCheckBoxes}
                        selectedToBeDeleted={selectedToBeDeleted}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="todos-completed">
            <h2>
              Completed (
              {todos.filter((todo) => todo.completed === true).length}
              )
              <FontAwesomeIcon
                icon={
                  todoListsToCollapse.includes("completed")
                    ? faChevronUp
                    : faChevronDown
                }
                onClick={() => handleOnChevronClick("completed")}
              />
            </h2>

            {!todoListsToCollapse.includes("completed") && (
              <div className="todos">
                {todos
                  .filter((todo) => todo.completed === true)
                  .map((todo) => (
                    <div key={todo.id} className="todo-container">
                      <Todo
                        todo={todo}
                        onEdit={() => editTodo(todo)}
                        onDelete={() => deleteTodo(todo.id)}
                        onComplete={() =>
                          toggleCompleteTodo(todo, todo.completed)
                        }
                        showCheckBoxes={showCheckBoxes}
                        selectedToBeDeleted={selectedToBeDeleted}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </StyledTodoList>
  );
};

TodoList.propTypes = {
  display: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  showCheckBoxes: PropTypes.bool.isRequired,
  selectedToBeDeleted: PropTypes.func.isRequired,
};

export default TodoList;
