import styled from "styled-components";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const StyledTodos = styled.div`
  & .todos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 5em;

    & .todo {
      border: 1px solid black;
      width: 14.5%;
      margin-left: 2.5%;
      margin-right: 2.5%;
      &.priority {
        &-hight {
          background-color: red;
        }
        &-medium {
          background-color: yellow;
        }
        &-low {
          background-color: green;
        }
      }
      &.done {
        background-color: grey;
      }
    }
  }
`;

const Todos = ({
  TodoListItems,
  editTodo,
  deleteTodo,
  toggleCompleteTodo,
  display,
}) => {
  return (
    <StyledTodos>
      {display === "all" && (
        <div>
          <h2>Not completed ({TodoListItems.length})</h2>
          <div className="todos">
            {TodoListItems.map((element) => (
              <div
                key={element.id}
                className={`todo priority-${element.priority} ${
                  element.completed ? "done" : ""
                }`}
              >
                <h3>{element.title}</h3>
                <div>{element.details}</div>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => editTodo(element)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteTodo(element.id)}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={() =>
                    toggleCompleteTodo(
                      element,
                      element.completed ? false : true
                    )
                  }
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
              {
                TodoListItems.filter((element) => element.completed === false)
                  .length
              }
              )
            </h2>
            <div className="todos">
              {TodoListItems.filter(
                (element) => element.completed === false
              ).map((element) => (
                <div
                  key={element.id}
                  className={`todo priority-${element.priority} ${
                    element.completed ? "done" : ""
                  }`}
                >
                  <h3>{element.title}</h3>
                  <div>{element.details}</div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => editTodo(element)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteTodo(element.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={() =>
                      toggleCompleteTodo(
                        element,
                        element.completed ? false : true
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="todos-completed">
            <h2>
              Completed (
              {
                TodoListItems.filter((element) => element.completed === true)
                  .length
              }
              )
            </h2>
            <div className="todos">
              {TodoListItems.filter(
                (element) => element.completed === true
              ).map((element) => (
                <div
                  key={element.id}
                  className={`todo priority-${element.priority} ${
                    element.completed ? "done" : ""
                  }`}
                >
                  <h3>{element.title}</h3>
                  <div>{element.details}</div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => editTodo(element)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteTodo(element.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={() =>
                      toggleCompleteTodo(
                        element,
                        element.completed ? false : true
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </StyledTodos>
  );
};

Todos.propTypes = {
  display: PropTypes.string,
  TodoListItems: PropTypes.array,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  toggleCompleteTodo: PropTypes.func,
};

export default Todos;
