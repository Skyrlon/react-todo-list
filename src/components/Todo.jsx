import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const StyledTodo = styled(Card)`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
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
      sx={{
        backgroundColor:
          (todo.priority === "hight" && "red") ||
          (todo.priority === "medium" && "yellow") ||
          (todo.priority === "low" && "green"),
      }}
      className={todo.completed ? " done" : ""}
    >
      {showCheckBoxes && (
        <input
          type="checkbox"
          onChange={(e) => selectedToBeDeleted(e.target.checked, todo.id)}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {todo.details}
        </Typography>
      </CardContent>

      <CardActions
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <EditIcon
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        />
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
        <CheckIcon
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
        />
      </CardActions>
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
