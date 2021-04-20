import styled from "styled-components";

const StyledTodos = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5em;

  & > div {
    border: 1px solid black;
    width: 15%;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
`;

const Todos = ({ TodoListItems }) => {
  return (
    <StyledTodos>
      {TodoListItems.map((element) => (
        <div key={element.id}>
          <h3>{element.title}</h3>
          <div>{element.text}</div>
        </div>
      ))}
    </StyledTodos>
  );
};

export default Todos;
