import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const StyledAddTodo = styled.div`
  & textarea {
    resize: none;
  }
  & .add-form {
    position: absolute;
    left: 40%;
    top: 40%;
    background: white;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 20%;
    & > * {
      width: 80%;
    }
    & .add-todo-button {
      border: 1px solid black;
    }
  }
`;

const AddTodo = ({ onAdd, onEdit, isEditingTodo, todoToEdit, clickedAway }) => {
  const [title, setTitle] = useState(isEditingTodo ? todoToEdit.title : "");
  const [details, setDetails] = useState(
    isEditingTodo ? todoToEdit.details : ""
  );
  const [priority, setPriority] = useState(
    isEditingTodo ? todoToEdit.priority : ""
  );

  const [deadline, setDeadline] = useState(
    isEditingTodo ? todoToEdit.deadline : ""
  );

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
          deadline,
        })
      : onAdd({ title, details, priority, deadline });

    setTitle("");
    setDetails("");
    setPriority("");
    setDeadline("");
  };

  return (
    <ClickAwayListener onClickAway={clickedAway}>
      <StyledAddTodo>
        <form className="add-form" onSubmit={onSubmit}>
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
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <input
            type="submit"
            value={isEditingTodo ? "Edit Todo" : "Add to the list"}
          />
        </form>
      </StyledAddTodo>
    </ClickAwayListener>
  );
};

AddTodo.propTypes = {
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  isEditingTodo: PropTypes.bool,
  todoToEdit: PropTypes.object,
  clickedAway: PropTypes.func,
};

export default AddTodo;
