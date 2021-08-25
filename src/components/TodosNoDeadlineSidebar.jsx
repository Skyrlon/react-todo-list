import { useEffect } from "react";
import styled from "styled-components";

const StyledTodosNoDeadlineSidebar = styled.ul`
  grid-area: sidebar;
  border: 1px solid black;
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  & li {
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
`;

const TodosNoDeadlineSidebar = ({
  todos,
  todoToCopy,
  mouseLocation,
  isDragging,
}) => {
  const getMouseLocation = (e) => {
    mouseLocation({ y: e.clientY, x: e.clientX });
  };

  const handleMouseDown = (e, id) => {
    todoToCopy(id);
    isDragging(true);
    window.addEventListener("mousemove", getMouseLocation);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDragging(false);
    window.removeEventListener("mousemove", getMouseLocation);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", getMouseLocation);
      window.removeEventListener("mouseup", handleMouseUp);
    }; // eslint-disable-next-line
  }, []);

  return (
    <StyledTodosNoDeadlineSidebar>
      {todos.map(
        (todo) =>
          todo.deadline.date.length === 0 && (
            <li
              key={todo.id}
              onMouseDown={(e) => handleMouseDown(e, todo.id)}
              className={`priority-${
                todo.completed ? "completed" : todo.priority
              }`}
            >
              {todo.title}
            </li>
          )
      )}
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
