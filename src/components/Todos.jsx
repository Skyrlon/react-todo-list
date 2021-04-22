import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const StyledTodos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5em;

  & > div {
    border: 1px solid black;
    width: 15%;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
`;

const Todos = ({ TodoListItems, deleteTodo }) => {
  const onDeleteClick = (e) => {
    deleteTodo(e);
  };

  return (
    <StyledTodos>
      {TodoListItems.map((element) => (
        <div key={element.id}>
          <h3>{element.title}</h3>
          <div>{element.text}</div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onDeleteClick(element.id)}
          />
        </div>
      ))}
    </StyledTodos>
  );
};

export default Todos;
