import styled from "styled-components";
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

const StyledList = styled(List)`
  position: absolute;
  width: 80%;
  transition: all 500ms;
  left: ${(props) => (props.$open ? "0%" : "-100%")};
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
    transition-property: all;
    transform: ${(props) => (props.$mounted ? "scale(0)" : "scale(1)")};
    transition-delay: 500ms;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 50%;
    left: 90%;
    background-color: red;
    transition-property: all;
    transform: ${(props) => (props.$mounted ? "scale(0)" : "scale(1)")};
    transition-delay: 500ms;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const TodosNoDeadlineSidebar = ({ todos, onDragStart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar>
      {!isOpen && (
        <StyledButton
          variant="contained"
          $mounted={isMounted}
          onClick={() => setIsOpen(true)}
        >
          Todos without deadline
        </StyledButton>
      )}

      {isOpen && (
        <StyledIconButton
          color="default"
          $mounted={isMounted}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </StyledIconButton>
      )}

      {
        <StyledList
          sx={{ padding: 0 }}
          $open={isOpen}
          onAnimationEnd={() => setIsMounted(isOpen)}
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
      }
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
