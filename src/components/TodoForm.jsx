import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
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

  const onSubmit = (e) => {
    e.preventDefault();

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
      <StyledTodoForm className="add-form" onSubmit={onSubmit}>
        <CloseIcon className="close-icon" onClick={closeForm} />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Your title go here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="details">Details</label>
        <textarea
          name="details"
          placeholder="Add some details if you need"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />

        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">--How important is this task ?--</option>
          <option value="hight">Hight</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="deadline">
          <input
            type="date"
            name="deadline-date"
            min="1000-01-01"
            max="9999-12-31"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />

          <select
            value={deadlineTimeHours}
            onChange={(e) => setDeadlineTimeHours(e.target.value)}
          >
            <option value=""></option>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={handleOneDigitNumber(hour)}>
                {handleOneDigitNumber(hour)}
              </option>
            ))}
          </select>
          <select
            value={deadlineTimeMinutes}
            onChange={(e) => setDeadlineTimeMinutes(e.target.value)}
          >
            <option value=""></option>
            {["00", "15", "30", "45"].map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>

        {isEditingTodo && (
          <>
            <label htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
          </>
        )}
        <div className="buttons">
          <input
            type="submit"
            value={isEditingTodo ? "Edit Todo" : "Add to the list"}
          />
          <button onClick={closeForm}>Cancel</button>
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
