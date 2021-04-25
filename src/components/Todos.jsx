import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    &.priority {
      &-hight {
        background-color: red;
      }
      &-medium {
        background-color: yellow;
      }
      &-low {
        background-color: green;
      }
    }
  }
`;

const Todos = ({ TodoListItems, editTodo, deleteTodo }) => {
  return (
    <StyledTodos>
      {TodoListItems.map((element) => (
        <div key={element.id} className={`priority-${element.priority}`}>
          <h3>{element.title}</h3>
          <div>{element.details}</div>
          <FontAwesomeIcon icon={faEdit} onClick={() => editTodo(element)} />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteTodo(element.id)}
          />
        </div>
      ))}
    </StyledTodos>
  );
};

export default Todos;
