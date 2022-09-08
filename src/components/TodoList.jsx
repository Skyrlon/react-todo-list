import styled from "styled-components";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Todo from "./Todo.jsx";

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;

  & .todos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  & .todo-container {
    margin-top: 1%;
    margin-bottom: 1%;

    @media (max-width: 599px) {
      flex: 0 0 90%;
      margin-left: 5%;
    }

    @media (min-width: 600px) and (max-width: 799px) {
      flex: 0 0 40%;
      &:not(:nth-child(2n + 1)) {
        margin-left: calc((100% - (40% * 2)) / 3);
      }
      &:nth-child(2n + 1) {
        margin-left: calc((100% - (40% * 2)) / 3);
      }
    }

    @media (min-width: 800px) and (max-width: 999px) {
      flex: 0 0 30%;
      &:not(:nth-child(3n + 1)) {
        margin-left: calc((100% - (30% * 3)) / 4);
      }
      &:nth-child(3n + 1) {
        margin-left: calc((100% - (30% * 3)) / 4);
      }
    }

    @media (min-width: 1000px) and (max-width: 1399px) {
      flex: 0 0 20%;
      &:not(:nth-child(4n + 1)) {
        margin-left: calc((100% - (20% * 4)) / 5);
      }
      &:nth-child(4n + 1) {
        margin-left: calc((100% - (20% * 4)) / 5);
      }
    }

    @media (min-width: 1400px) {
      flex: 0 0 17%;
      &:not(:nth-child(5n + 1)) {
        margin-left: calc((100% - (17% * 5)) / 6);
      }
      &:nth-child(5n + 1) {
        margin-left: calc((100% - (17% * 5)) / 6);
      }
    }
  }
`;

const accordionTitleStyle = {
  "& .MuiAccordionSummary-content": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

const TodoList = ({
  todos,
  editTodo,
  deleteTodo,
  toggleCompleteTodo,
  display,
  showCheckBoxes,
  selectedToBeDeleted,
}) => {
  return (
    <StyledTodoList>
      {display === "all" && (
        <Accordion defaultExpanded>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ ...accordionTitleStyle, pointerEvents: "none" }}
          >
            <Typography variant="h5" className="title">
              All ({todos.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="todos">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-container">
                <Todo
                  key={todo.id}
                  todo={todo}
                  onEdit={() => editTodo(todo)}
                  onDelete={() => deleteTodo(todo.id)}
                  onComplete={() => toggleCompleteTodo(todo, todo.completed)}
                  showCheckBoxes={showCheckBoxes}
                  selectedToBeDeleted={selectedToBeDeleted}
                />
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {display === "separated" && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={accordionTitleStyle}
            >
              <Typography variant="h5">
                Not completed (
                {todos.filter((todo) => todo.completed === false).length})
              </Typography>
            </AccordionSummary>

            <AccordionDetails className="todos">
              {todos
                .filter((todo) => todo.completed === false)
                .map((todo) => (
                  <div key={todo.id} className="todo-container">
                    <Todo
                      todo={todo}
                      onEdit={() => editTodo(todo)}
                      onDelete={() => deleteTodo(todo.id)}
                      onComplete={() => toggleCompleteTodo(todo)}
                      showCheckBoxes={showCheckBoxes}
                      selectedToBeDeleted={selectedToBeDeleted}
                    />
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={accordionTitleStyle}
            >
              <Typography variant="h5">
                Completed (
                {todos.filter((todo) => todo.completed === true).length})
              </Typography>
            </AccordionSummary>

            <AccordionDetails className="todos">
              {todos
                .filter((todo) => todo.completed === true)
                .map((todo) => (
                  <div key={todo.id} className="todo-container">
                    <Todo
                      todo={todo}
                      onEdit={() => editTodo(todo)}
                      onDelete={() => deleteTodo(todo.id)}
                      onComplete={() =>
                        toggleCompleteTodo(todo, todo.completed)
                      }
                      showCheckBoxes={showCheckBoxes}
                      selectedToBeDeleted={selectedToBeDeleted}
                    />
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </StyledTodoList>
  );
};

TodoList.propTypes = {
  display: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  showCheckBoxes: PropTypes.bool.isRequired,
  selectedToBeDeleted: PropTypes.func.isRequired,
};

export default TodoList;
