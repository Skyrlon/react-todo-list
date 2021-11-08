import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

const StyledTodosNoDeadlineSidebar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: row;
  transform: translateX(-85%);
  transition: ease 0.5s;
  &.locked {
    transform: translateX(0);
  }
  &:hover {
    transform: translateX(0);
  }
  & .lock {
    position: absolute;
    right: 5%;
  }
  & ul {
    list-style: none;
    width: 85%;
    border: 1px solid black;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    & li {
      box-sizing: border-box;
      user-select: none;
      border: 1px solid black;
      &.priority {
        &-hight {
          background-color: red;
        }
        &-medium {
          background-color: #ffcc00;
        }
        &-low {
          background-color: green;
        }
        &-completed {
          background-color: grey;
        }
      }
    }
  }

  & .title {
    background-color: lightblue;
    display: flex;
    width: 15%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & span {
      white-space: nowrap;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
`;

const TodosNoDeadlineSidebar = ({ todos, onDragStart }) => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar className={isLocked ? "locked" : ""}>
      <div className="lock">
        {isLocked && (
          <FontAwesomeIcon icon={faLock} onClick={() => setIsLocked(false)} />
        )}
        {!isLocked && (
          <FontAwesomeIcon icon={faUnlock} onClick={() => setIsLocked(true)} />
        )}
      </div>
      <ul>
        {todos.map(
          (todo) =>
            todo.deadline.date.length === 0 && (
              <li
                key={todo.id}
                draggable
                onDragStart={() => onDragStart(todo.id)}
                className={`priority-${
                  todo.completed ? "completed" : todo.priority
                }`}
              >
                {todo.title}
              </li>
            )
        )}
      </ul>
      <div className="title">
        <span>Todos with no deadline</span>
      </div>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
