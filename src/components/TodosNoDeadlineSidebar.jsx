import styled, { keyframes } from "styled-components";
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
    left: ${(props) => (props.$mounted ? "80%" : "0%")};
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

const slideIn = keyframes`
0% {
  transform: translateX(-100%);
}

100% {
  transform: translateX(0%);
}
`;

const slideOut = keyframes`
0% {
  transform: translateX(0%);
}

100% {
  transform: translateX(-100%);
}
`;

const StyledList = styled(List)`
  width: 80%;
  animation-name: ${(props) => (props.$mounted ? slideIn : slideOut)};
  animation-duration: 700ms;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
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

  const [isMounted, setIsMounted] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar $mounted={isMounted}>
      {isOpen && (
        <StyledList
          sx={{ padding: 0 }}
          $mounted={isMounted}
          onAnimationEnd={() => {
            console.log(isMounted);
            if (!isMounted) setIsOpen(false);
          }}
        >
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
      )}

      <div
        className="title"
        onClick={() => {
          setIsMounted(!isMounted);
          if (!isOpen) setIsOpen(true);
        }}
      >
        <span>Todos with no deadline</span>
      </div>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
