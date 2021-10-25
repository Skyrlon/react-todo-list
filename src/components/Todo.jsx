import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTodo = styled.div`
  border: 1px solid black;
  width: 100%;
  overflow-wrap: break-word;
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
      className={`todo priority-${todo.priority} ${
        todo.completed ? "done" : ""
      }`}
    >
      {showCheckBoxes && (
        <input
          type="checkbox"
          onChange={(e) => selectedToBeDeleted(e.target.checked, todo.id)}
        />
      )}
      <h3>{todo.title}</h3>
      <div>{todo.details}</div>
      <FontAwesomeIcon icon={faEdit} onClick={() => onEdit()} />
      <FontAwesomeIcon icon={faTrash} onClick={() => onDelete()} />
      <FontAwesomeIcon icon={faCheck} onClick={() => onComplete()} />
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
