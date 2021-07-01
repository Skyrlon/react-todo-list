import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTodo = styled.div`
  border: 1px solid black;
  width: 14.5%;
  margin-left: 2.5%;
  margin-right: 2.5%;
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
  id,
  title,
  details,
  priority,
  completed,
  onEdit,
  onDelete,
  onComplete,
  showCheckBoxes,
  selectedToBeDeleted,
}) => {
  return (
    <StyledTodo
      className={`todo priority-${priority} ${completed ? "done" : ""}`}
    >
      {showCheckBoxes && (
        <input
          type="checkbox"
          onChange={(e) => selectedToBeDeleted(e.target.checked, id)}
        />
      )}
      <h3>{title}</h3>
      <div>{details}</div>
      <FontAwesomeIcon icon={faEdit} onClick={() => onEdit()} />
      <FontAwesomeIcon icon={faTrash} onClick={() => onDelete()} />
      <FontAwesomeIcon icon={faCheck} onClick={() => onComplete()} />
    </StyledTodo>
  );
};

export default Todo;

Todo.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  priority: PropTypes.string,
  completed: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  selectedToBeDeleted: PropTypes.func,
};
