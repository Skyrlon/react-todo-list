import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Todo = ({
  title,
  details,
  priority,
  completed,
  onEdit,
  onDelete,
  onComplete,
}) => {
  return (
    <div className={`todo priority-${priority} ${completed ? "done" : ""}`}>
      <h3>{title}</h3>
      <div>{details}</div>
      <FontAwesomeIcon icon={faEdit} onClick={() => onEdit()} />
      <FontAwesomeIcon icon={faTrash} onClick={() => onDelete()} />
      <FontAwesomeIcon icon={faCheck} onClick={() => onComplete()} />
    </div>
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
};
