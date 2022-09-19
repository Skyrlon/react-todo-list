import styled from "styled-components";
import { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const StyledTodosNoDeadlineSidebar = styled.div`
  grid-area: sidebar;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;

  & .title {
    position: absolute;
    top: 0%;
    left: ${(props) => (props.open ? "80%" : "0%")};
    background-color: lightblue;
    display: flex;
    width: 20%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: left 700ms;
    border: 1px solid lightblue;

    & span {
      white-space: nowrap;
      display: inline-block;
      transform: rotate(90deg);
    }
  }
`;

const StyledList = styled(List)`
  width: 80%;
  right: ${(props) => (props.open ? "20%" : "100%")};
  transition: all 700ms;
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
    <StyledTodosNoDeadlineSidebar open={isOpen}>
      <StyledList sx={{ position: "absolute", padding: 0 }} open={isOpen}>
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
      </StyledList>

      <div className="title" onClick={() => setIsOpen((v) => !v)}>
        <span>Todos with no deadline</span>
      </div>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
