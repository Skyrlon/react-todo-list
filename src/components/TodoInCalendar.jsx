import styled from "styled-components";
import PropTypes from "prop-types";
import Todo from "./Todo";

const StyledTodoInCalendar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    (props.priority === "hight" && "red") ||
    (props.priority === "medium" && "yellow") ||
    (props.priority === "low" && "green")};
  &.done {
    background-color: grey;
  }

  & .todo-tooltip {
    position: absolute;
    bottom: 0%;
    left: 100%;
    width: 100%;
  }
`;

const TodoInCalendar = ({
  todo,
  showTodo,
  todoIdToShow,
  onDragStart,
  handleOnEdit,
  onDelete,
  onClickTodo,
  toggleCompleteTodo,
}) => {
  const onClick = (e) => {
    e.stopPropagation();
    onClickTodo(todo.id);
  };

  return (
    <StyledTodoInCalendar
      className={todo.completed ? " done" : ""}
      priority={todo.priority}
      key={todo.id}
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onClick={onClick}
    >
      <span>{todo.title}</span>
      {showTodo && todo.id === todoIdToShow && (
        <div className="todo-tooltip">
          <Todo
            key={todo.id}
            todo={todo}
            onEdit={() => handleOnEdit(todo)}
            onDelete={() => onDelete(todo)}
            onComplete={() => toggleCompleteTodo(todo)}
          />
        </div>
      )}
    </StyledTodoInCalendar>
  );
};

export default TodoInCalendar;

TodoInCalendar.propTypes = {
  todo: PropTypes.object.isRequired,
  showTodo: PropTypes.bool.isRequired,
  todoIdToShow: PropTypes.number,
  onDragStart: PropTypes.func.isRequired,
  handleOnEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClickTodo: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
};
