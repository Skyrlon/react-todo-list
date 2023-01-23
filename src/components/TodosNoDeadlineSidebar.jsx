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
  position: fixed;
  display: flex;
  flex-direction: row;
  top: 20%;
  width: 10%;
  height: 60%;
`;

const StyledList = styled(List)`
  position: absolute;
  width: 100%;
  transition: all 500ms;
  padding: 0;
  height: 100%;
  left: ${(props) => (props.$open ? "0%" : "-100%")};
  overflow-y: auto;
`;

const StyledTodosNoDeadline = styled(ListItem)`
  height: 10%;
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
    transform: ${(props) => (props.$open ? "scale(0)" : "scale(1)")};
    transition-property: all;
    transition-delay: ${(props) => (props.$open ? "0ms" : "500ms")};
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 50%;
    left: 105%;
    background-color: red;
    transition-property: all;
    transform: ${(props) => (!props.$open ? "scale(0)" : "scale(1)")};
    transition-delay: 500ms;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;

const TodosNoDeadlineSidebar = ({ todos, onDragStart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledTodosNoDeadlineSidebar>
      <StyledButton
        variant="contained"
        $open={isOpen}
        onClick={() => setIsOpen(true)}
      >
        Todos without deadline
      </StyledButton>

      <StyledIconButton
        color="default"
        $open={isOpen}
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon />
      </StyledIconButton>

      <StyledList $open={isOpen}>
        {todos.map(
          (todo) =>
            todo.deadline.date.length === 0 && (
              <StyledTodosNoDeadline
                $priority={todo.priority}
                $completed={todo.completed}
                key={todo.id}
                draggable
                onDragStart={() => onDragStart(todo.id)}
                sx={{ padding: 0, margin: 0 }}
              >
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={todo.title}
                />
              </StyledTodosNoDeadline>
            )
        )}
      </StyledList>
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
