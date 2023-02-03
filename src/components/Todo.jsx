import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Button,
  Card,
  Checkbox,
  CardContent,
  Typography,
  CardActions,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const StyledTodo = styled(Card)`
  position: relative;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
  &.done {
    background-color: grey;
  }
`;

const buttonStyle = { color: "black", minHeight: 0, minWidth: 0, padding: 0 };

const Todo = ({
  todo,
  onEdit,
  onDelete,
  onComplete,
  showCheckBoxes,
  selectedToBeDeleted,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckBoxChange = (e) => {
    selectedToBeDeleted(e.target.checked, todo.id);
    setChecked(e.target.checked);
  };

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
        <Checkbox
          sx={{ position: "absolute", left: "5%", top: "5%" }}
          checked={checked}
          onChange={handleCheckBoxChange}
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
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ButtonGroup orientation="horizontal" variant="none">
          <Button sx={buttonStyle}>
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            />
          </Button>

          <Button sx={buttonStyle}>
            <CheckIcon
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
            />
          </Button>
          <Button sx={buttonStyle}>
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          </Button>
        </ButtonGroup>
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
