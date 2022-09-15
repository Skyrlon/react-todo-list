import styled from "styled-components";
import { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const StyledTodosNoDeadlineSidebar = styled.div`
  grid-area: sidebar;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;

  & ul {
    padding: 0;
    width: 80%;
  }

  & .title {
    position: relative;
    background-color: lightblue;
    display: flex;
    width: 20%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & span {
      white-space: nowrap;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
  & .lock {
    position: absolute;
    top: 0%;
    left: 20%;
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar>
      {isOpen && (
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
                  <ListItemText
                    sx={{ textAlign: "center" }}
                    primary={todo.title}
                  />
                </StyledTodosNoDeadline>
              )
          )}
        </List>
      )}
      <div className="title" onClick={() => setIsOpen((v) => !v)}>
        <span>Todos with no deadline</span>
      </div>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
