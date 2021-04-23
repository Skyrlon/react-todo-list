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

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("put atleast a title");
      return;
    }
    const id = todoToEdit.id ? todoToEdit.id : 0;
    isEditingTodo ? onEdit({ id, title, details }) : onAdd({ title, details });
    setTitle("");
    setDetails("");
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
        <input
          type="submit"
          value={isEditingTodo ? "Edit Todo" : "Add to the list"}
        />
      </form>
    </StyledAddTodo>
  );
};

export default AddTodo;
