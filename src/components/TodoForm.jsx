import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import handleOneDigitNumber from "../utils/handleOneDigitNumber";
import CloseIcon from "@mui/icons-material/Close";

const StyledTodoForm = styled.form`
  z-index: 100;
  position: fixed;
  left: 40%;
  top: 40%;
  background: white;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  box-sizing: border-box;
  padding: 1rem;
  & > * {
    width: 80%;
    margin-top: 2%;
    margin-bottom: 2%;
  }

  & .close-icon {
    position: absolute;
    margin: 0;
    top: 1%;
    right: 1%;
    width: 1rem;
  }

  & textarea {
    resize: none;
  }
  & .add-todo-button {
    border: 1px solid black;
  }
  & .deadline {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 50%;
  }
`;

const TodoForm = ({ onAdd, onEdit, isEditingTodo, todoToEdit, closeForm }) => {
  const [title, setTitle] = useState(isEditingTodo ? todoToEdit.title : "");
  const [details, setDetails] = useState(
    isEditingTodo ? todoToEdit.details : ""
  );
  const [priority, setPriority] = useState(
    isEditingTodo ? todoToEdit.priority : ""
  );

  const [deadlineDate, setDeadlineDate] = useState(
    isEditingTodo ? todoToEdit.deadline.date : ""
  );

  const [deadlineTimeHours, setDeadlineTimeHours] = useState(
    isEditingTodo ? todoToEdit.deadline.time.slice(0, 2) : ""
  );

  const [deadlineTimeMinutes, setDeadlineTimeMinutes] = useState(
    isEditingTodo ? todoToEdit.deadline.time.slice(3) : ""
  );

  const [completed, setCompleted] = useState(todoToEdit.completed);

  const onSubmit = () => {
    if (!title) {
      alert("put atleast a title");
      return;
    }
    if (!priority) {
      alert("set a priority");
      return;
    }

    isEditingTodo
      ? onEdit({
          id: todoToEdit.id,
          title,
          details,
          priority,
          deadline: {
            date: deadlineDate,
            time:
              deadlineTimeHours.length > 0 && deadlineTimeMinutes.length > 0
                ? `${deadlineTimeHours}:${deadlineTimeMinutes}`
                : "",
          },
          completed,
        })
      : onAdd({
          title,
          details,
          priority,
          deadline: {
            date: deadlineDate,
            time:
              deadlineTimeHours.length > 0 && deadlineTimeMinutes.length > 0
                ? `${deadlineTimeHours}:${deadlineTimeMinutes}`
                : "",
          },
        });

    setTitle("");
    setDetails("");
    setPriority("");
    setDeadlineTimeHours("");
    setDeadlineTimeMinutes("");
    setDeadlineDate("");
  };

  return (
    <ClickAwayListener onClickAway={closeForm}>
      <StyledTodoForm className="add-form">
        <CloseIcon className="close-icon" onClick={closeForm} />
        <TextField
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <TextField
          label="Details"
          multiline={true}
          maxRows={3}
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />

        <Select
          MenuProps={{ disablePortal: true }}
          type="select"
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="">--How important is this task ?--</MenuItem>
          <MenuItem value="hight">Hight</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>

        <div className="deadline">
          <TextField
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />

          <Select
            MenuProps={{ disablePortal: true }}
            value={deadlineTimeHours}
            onChange={(e) => setDeadlineTimeHours(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {[...Array(24).keys()].map((hour) => (
              <MenuItem key={hour} value={handleOneDigitNumber(hour)}>
                {handleOneDigitNumber(hour)}
              </MenuItem>
            ))}
          </Select>
          <Select
            MenuProps={{ disablePortal: true }}
            value={deadlineTimeMinutes}
            onChange={(e) => setDeadlineTimeMinutes(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            {["00", "15", "30", "45"].map((minute) => (
              <MenuItem key={minute} value={minute}>
                {minute}
              </MenuItem>
            ))}
          </Select>
        </div>

        {isEditingTodo && (
          <>
            <FormControlLabel
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              label="Completed"
              labelPlacement="start"
              control={
                <Checkbox
                  checked={completed}
                  onChange={() => setCompleted(!completed)}
                />
              }
            />
          </>
        )}
        <div className="buttons">
          <Button onClick={onSubmit}>
            {isEditingTodo ? "Edit Todo" : "Add to the list"}
          </Button>
          <Button onClick={closeForm}>Cancel</Button>
        </div>
      </StyledTodoForm>
    </ClickAwayListener>
  );
};

TodoForm.propTypes = {
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  isEditingTodo: PropTypes.bool,
  todoToEdit: PropTypes.object,
  closeForm: PropTypes.func,
};

export default TodoForm;
