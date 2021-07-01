import styled from "styled-components";
import PropTypes from "prop-types";

import Todo from "./Todo.jsx";

const StyledTodoList = styled.div`
  & .todos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 5em;
  }
`;

const TodoList = ({
  TodoListItems,
  editTodo,
  deleteTodo,
  toggleCompleteTodo,
  display,showCheckBoxes,
  selectedToBeDeleted,
}) => {
  return (
    <StyledTodoList>
      {display === "all" && (
        <div>
          <h2>All ({TodoListItems.length})</h2>
          <div className="todos">
            {TodoListItems.map((element) => (
              <Todo
                key={element.id}
                id={element.id}
                title={element.title}
                details={element.details}
                priority={element.priority}
                completed={element.completed}
                onEdit={() => editTodo(element)}
                onDelete={() => deleteTodo(element.id)}
                onComplete={() =>
                  toggleCompleteTodo(element, element.completed)
                }
                showCheckBoxes={showCheckBoxes}
                selectedToBeDeleted={selectedToBeDeleted}
              />
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
                <Todo
                  key={element.id}
                  id={element.id}
                  title={element.title}
                  details={element.details}
                  priority={element.priority}
                  completed={element.completed}
                  onEdit={() => editTodo(element)}
                  onDelete={() => deleteTodo(element.id)}
                  onComplete={() =>
                    toggleCompleteTodo(element, element.completed)
                  }
                  showCheckBoxes={showCheckBoxes}
                  selectedToBeDeleted={selectedToBeDeleted}
                />
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
                <Todo
                  key={element.id}
                  id={element.id}
                  title={element.title}
                  details={element.details}
                  priority={element.priority}
                  completed={element.completed}
                  onEdit={() => editTodo(element)}
                  onDelete={() => deleteTodo(element.id)}
                  onComplete={() =>
                    toggleCompleteTodo(element, element.completed)
                  }
                  showCheckBoxes={showCheckBoxes}
                  selectedToBeDeleted={selectedToBeDeleted}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </StyledTodoList>
  );
};

TodoList.propTypes = {
  display: PropTypes.string,
  TodoListItems: PropTypes.array,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  toggleCompleteTodo: PropTypes.func,
  showCheckBoxes: PropTypes.bool,
  selectedToBeDeleted: PropTypes.func,
};

export default TodoList;
