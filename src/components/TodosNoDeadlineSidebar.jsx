import styled, { keyframes } from "styled-components";
import { useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledTodosNoDeadlineSidebar = styled.div`
  grid-area: sidebar;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
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

const popUp = keyframes`
0% {
  transform: scale(0%);
}

100% {
  transform: scale(100%);
}
`;

const StyledList = styled(List)`
  width: 80%;
  animation-name: ${(props) => (props.$mounted ? slideIn : slideOut)};
  animation-duration: 500ms;
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

const StyledButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 50%;
    left: 10%;
    font-size: 0.6rem;
    width: 6rem;
    animation-name: ${popUp};
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 50%;
    left: 90%;
    background-color: red;
    animation-name: ${popUp};
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const TodosNoDeadlineSidebar = ({ todos, onDragStart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar $mounted={isMounted}>
      {!isMounted && (
        <StyledButton
          variant="contained"
          onClick={() => {
            setIsMounted(!isMounted);
            if (!isOpen) setIsOpen(true);
          }}
        >
          Todos without deadline
        </StyledButton>
      )}

      {isMounted && (
        <StyledIconButton
          color="default"
          onClick={() => {
            setIsMounted(!isMounted);
            if (!isOpen) setIsOpen(true);
          }}
        >
          <CloseIcon />
        </StyledIconButton>
      )}

      {isOpen && (
        <StyledList
          sx={{ padding: 0 }}
          $mounted={isMounted}
          onAnimationEnd={() => {
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
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
