import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTodo = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
  background-color: ${(props) =>
    (props.priority === "hight" && "red") ||
    (props.priority === "medium" && "yellow") ||
    (props.priority === "low" && "green")};
  &.done {
    background-color: grey;
  }
`;

const Todo = ({
  todo,
  onEdit,
  onDelete,
  onComplete,
  showCheckBoxes,
  selectedToBeDeleted,
}) => {
  return (
    <StyledTodo
      priority={todo.priority}
      className={todo.completed ? " done" : ""}
    >
      {showCheckBoxes && (
        <input
          type="checkbox"
          onChange={(e) => selectedToBeDeleted(e.target.checked, todo.id)}
        />
      )}
      <h3>{todo.title}</h3>
      <div>{todo.details}</div>
      <FontAwesomeIcon
        icon={faEdit}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      />
      <FontAwesomeIcon
        icon={faTrash}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
      <FontAwesomeIcon
        icon={faCheck}
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
      />
    </StyledTodo>
  );
};

export default Todo;

Todo.propTypes = {
  todo: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  selectedToBeDeleted: PropTypes.func,
};
