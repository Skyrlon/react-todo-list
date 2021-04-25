import styled from "styled-components";
import { useState } from "react";

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

const AddTodo = ({ onAdd, onEdit, isEditingTodo, todoToEdit }) => {
  const [title, setTitle] = useState(isEditingTodo ? todoToEdit.title : "");
  const [details, setDetails] = useState(
    isEditingTodo ? todoToEdit.details : ""
  );
  const [priority, setPriority] = useState(
    isEditingTodo ? todoToEdit.priority : ""
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
        })
      : onAdd({ title, details, priority });

    setTitle("");
    setDetails("");
    setPriority("");
  };

  return (
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
          type="submit"
          value={isEditingTodo ? "Edit Todo" : "Add to the list"}
        />
      </form>
    </StyledAddTodo>
  );
};

export default AddTodo;
