import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import { ClickAwayListener } from "@mui/material";

import handleOneDigitNumber from "../utils/handleOneDigitNumber";
import TodoInCalendar from "./TodoInCalendar";

const StyledDay = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  width: 100%;
  & .hour {
    position: relative;
    display: flex;
    flex-direction: column;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    width: 100%;
    &-number {
      position: absolute;
      top: -1em;
      left: -4em;
      &::before {
        position: absolute;
        top: 0.8em;
        right: -1.65em;
        content: "";
        border-top-width: 2px;
        border-top-color: grey;
        border-top-style: solid;
        width: 1em;
      }
    }
  }

  & .todo-container {
    position: relative;
    user-select: none;
    width: 20%;
    height: 20px;
    font-size: 15px;
  }

  & .todo-no-time {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 3em;
    &.over {
      background-color: blue;
    }
  }
  & .priority {
    &-hight {
      position: relative;
      background-color: red;
    }
    &-medium {
      position: relative;
      background-color: #ffcc00;
    }
    &-low {
      position: relative;
      background-color: green;
    }
    &-completed {
      position: relative;
      background-color: grey;
    }
  }
`;

const StyledMinute = styled.div`
  position: relative;
  height: 20px;
  display: flex;
  flex-direction: row;
  & .time-toolitp {
    display: none;
    background-color: green;
  }
  &.over {
    background-color: blue;
    & .time-toolitp {
      display: block;
      position: absolute;
      left: -2.5rem;
      background-color: green;
    }
  }
`;

const StyledCurrentTimeBar = styled.div`
  position: absolute;
  z-index: 100;
  border-top: 2px solid red;
  width: 104%;
  left: -4%;
  top: ${(props) => props.position}%;

  &::before {
    content: "Now";
    position: absolute;
    left: -2.5rem;
    top: -0.75rem;
    color: red;
  }
`;

const currentDate = {
  date: `${new Date(Date.now()).getFullYear()}-${handleOneDigitNumber(
    new Date(Date.now()).getMonth() + 1
  )}-${handleOneDigitNumber(new Date(Date.now()).getDate())}`,
  time: {
    hour: `${handleOneDigitNumber(new Date(Date.now()).getHours())}`,
    minute: `${handleOneDigitNumber(new Date(Date.now()).getMinutes())}`,
  },
};

const Day = ({
  year,
  month,
  day,
  todos,
  showHours,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  toggleCompleteTodo,
}) => {
  const [showTodo, setShowTodo] = useState(false);

  const [todoIdToShow, setTodoIdToShow] = useState(null);

  const time = function () {
    const numberOfHours = 24;
    const minutesArray = ["00", "15", "30", "45"];
    let hoursArray = [];
    for (let i = 0; i < numberOfHours; i++) {
      hoursArray.push({
        hour: handleOneDigitNumber(i),
        minutes: minutesArray,
      });
    }
    return hoursArray;
  };

  const handleOnEdit = (todo) => {
    setShowTodo(false);
    setTodoIdToShow(null);
    onEdit(todo);
  };

  const handleClickAwayTodo = () => {
    setShowTodo(false);
    setTodoIdToShow(null);
  };

  const handleClickTodo = (todoId) => {
    setShowTodo((v) => !v);
    setTodoIdToShow(todoId);
  };

  return (
    <StyledDay>
      <div
        className="todo-no-time"
        onDragOver={(e) => {
          e.preventDefault();
          e.target.classList.add("over");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.target.classList.remove("over");
        }}
        onDrop={(e) => {
          e.target.classList.remove("over");
          onDrop({
            date: `${year}-${handleOneDigitNumber(
              month + 1
            )}-${handleOneDigitNumber(day)}`,
            time: "",
          });
        }}
      >
        {todos.map(
          (todo) =>
            todo.deadline.date ===
              `${year}-${handleOneDigitNumber(
                month + 1
              )}-${handleOneDigitNumber(day)}` &&
            todo.deadline.time.length === 0 && (
              <ClickAwayListener
                onClickAway={handleClickAwayTodo}
                key={todo.id}
              >
                <div className="todo-container" key={todo.id}>
                  <TodoInCalendar
                    todo={todo}
                    showTodo={showTodo}
                    todoIdToShow={todoIdToShow}
                    onDragStart={onDragStart}
                    handleOnEdit={handleOnEdit}
                    onDelete={onDelete}
                    onClickTodo={handleClickTodo}
                    toggleCompleteTodo={toggleCompleteTodo}
                  />
                </div>
              </ClickAwayListener>
            )
        )}
      </div>
      {time().map((time) => (
        <div key={time.hour} className="hour">
          {`${year}-${handleOneDigitNumber(month + 1)}-${handleOneDigitNumber(
            day
          )}` &&
            currentDate.time.hour === `${time.hour}` && (
              <StyledCurrentTimeBar
                position={(parseInt(currentDate.time.minute) / 60) * 100}
              ></StyledCurrentTimeBar>
            )}
          {showHours && <div className="hour-number">{time.hour}:00</div>}
          {time.minutes.map((minute) => (
            <StyledMinute
              key={minute}
              className="hour-minute"
              onDragOver={(e) => {
                e.preventDefault();
                e.target.classList.add("over");
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.target.classList.remove("over");
              }}
              onDrop={(e) => {
                e.target.classList.remove("over");
                onDrop({
                  date: `${year}-${handleOneDigitNumber(
                    month + 1
                  )}-${handleOneDigitNumber(day)}`,
                  time: `${time.hour}:${minute}`,
                });
              }}
            >
              <div className="time-toolitp">{`${time.hour}:${minute}`}</div>
              {todos.map(
                (todo) =>
                  todo.deadline.date ===
                    `${year}-${handleOneDigitNumber(
                      month + 1
                    )}-${handleOneDigitNumber(day)}` &&
                  todo.deadline.time === `${time.hour}:${minute}` && (
                    <div className="todo-container" key={todo.id}>
                      <TodoInCalendar
                        todo={todo}
                        showTodo={showTodo}
                        todoIdToShow={todoIdToShow}
                        onDragStart={onDragStart}
                        handleOnEdit={handleOnEdit}
                        onDelete={onDelete}
                        onClickTodo={handleClickTodo}
                        toggleCompleteTodo={toggleCompleteTodo}
                      />
                    </div>
                  )
              )}
            </StyledMinute>
          ))}
        </div>
      ))}
    </StyledDay>
  );
};

export default Day;

Day.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  todos: PropTypes.array.isRequired,
  showHours: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
};
