import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";

const StyledAddTodo = styled.div`
  & > add-button {
    width: 2em;
  }
  & textarea {
    resize: none;
  }
  & .add-form {
    position: absolute;
    left: 40%;
    top: 40%;
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

const AddTodo = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <StyledAddTodo>
      <div className="add-button" onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </div>
      {showForm && (
        <div className="add-form">
          <input type="text" placeholder="Your title go here" />
          <textarea placeholder="Add some details if you need" />
          <div className="add-todo-button">Add to the list</div>
        </div>
      )}
    </StyledAddTodo>
  );
};

export default AddTodo;
