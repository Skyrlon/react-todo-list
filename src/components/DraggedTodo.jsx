import styled from "styled-components";

const StyledDraggedTodo = styled.div`
  position: absolute;
  border: 1px solid red;
`;

const DraggedTodo = ({ position }) => {
  return (
    <StyledDraggedTodo
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      TOTO
    </StyledDraggedTodo>
  );
};

export default DraggedTodo;
