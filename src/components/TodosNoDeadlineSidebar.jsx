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

const TodosNoDeadlineSidebar = ({ todos, onDragStart }) => {
  return (
    <StyledTodosNoDeadlineSidebar>
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
    </StyledTodosNoDeadlineSidebar>
  );
};

export default TodosNoDeadlineSidebar;
