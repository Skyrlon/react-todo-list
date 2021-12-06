import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { List, ListItem } from "@mui/material";

const StyledTodosNoDeadlineSidebar = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: row;
  transform: translateX(-32%);
  transition: ease 0.5s;
  &.locked {
    transform: translateX(0);
  }
  &:hover {
    transform: translateX(0);
  }
  & .lock {
    position: absolute;
    left: 50%;
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

const StyledTodosNoDeadline = styled(ListItem)`
  background-color: ${(props) => {
    if (props.$completed) return "grey";
    else {
      if (props.$priority === "low") return "green";
      if (props.$priority === "medium") return "#ffcc00";
      if (props.$priority === "hight") return "red";
    }
  }};
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
      <List>
        {todos.map(
          (todo) =>
            todo.deadline.date.length === 0 && (
              <StyledTodosNoDeadline
                $priority={todo.priority}
                $completed={todo.completed}
                key={todo.id}
                draggable
                onDragStart={() => onDragStart(todo.id)}
              >
                {todo.title}
              </StyledTodosNoDeadline>
            )
        )}
      </List>
      <div className="title">
        <span>Todos with no deadline</span>
      </div>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
