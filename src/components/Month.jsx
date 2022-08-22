import PropTypes from "prop-types";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import styled from "styled-components";
import handleOneDigitNumber from "../utils/handleOneDigitNumber";
import TodoInCalendar from "./TodoInCalendar";

const StyledMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;

  & .weekdays {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    & > div {
      width: 13%;
      font-size: 100%;
      border: 1px solid black;
      box-sizing: border-box;
    }
  }

  & .days {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
  }

  & .day {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 13%;
    border: 1px solid black;
    box-sizing: border-box;
    padding-bottom: 13%;
    margin-top: 1%;

    &.placeholder {
      border: none;
    }

    &.selected {
      background-color: green;
    }
    &-number {
      width: 100%;
      height: 100%;
      &.over {
        background: blue;
      }
    }
    &-patch {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      & > * {
        width: 5px;
        height: 5px;
        border-radius: 50%;
      }
      &-completed {
        background-color: grey;
      }
      &-low {
        background-color: green;
      }
      &-medium {
        background-color: yellow;
      }
      &-hight {
        background-color: red;
      }
    }
    &-tooltip {
      position: absolute;
      top: 3em;
      z-index: 1;
      background-color: lightblue;
      min-width: 7em;
    }
    &-todolist {
      position: relative;
      width: 100%;
    }
  }
`;

const weekDaysNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Month = ({
  month,
  year,
  dateSelected,
  onDayClick,
  onDayDoubleClick,
  showTooltip,
  todos,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  toggleCompleteTodo,
  closeTooltip,
}) => {
  const [showTodo, setShowTodo] = useState(false);

  const [todoIdToShow, setTodoIdToShow] = useState(null);

  const days = function () {
    let daysArray = [];
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    for (let j = 0; j < numberOfDays; j++) {
      daysArray.push({
        name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
          new Date(`${j + 1} ${monthsNames[month]} ${year}`)
        ),
        number: j + 1,
      });
    }

    let daysBeforeFirstDay = weekDaysNames.indexOf(daysArray[0].name);
    for (let k = 0; k < daysBeforeFirstDay; k++) {
      daysArray.unshift({ name: "", number: -k - 1 });
    }

    let daysAfterLastDay =
      weekDaysNames.length -
      (weekDaysNames.indexOf(daysArray[daysArray.length - 1].name) + 1);
    for (let l = 0; l < daysAfterLastDay; l++) {
      daysArray.push({
        name: "",
        number: daysArray.length + 1,
      });
    }
    return daysArray;
  };

  const handleClickAwayTooltip = () => {
    setShowTodo(false);
    closeTooltip();
    setTodoIdToShow(null);
  };

  const handleOnEdit = (todo) => {
    setShowTodo(false);
    closeTooltip();
    setTodoIdToShow(null);
    onEdit(todo);
  };

  const handleClickTodo = (todoId) => {
    setShowTodo(true);
    setTodoIdToShow(todoId);
  };

  return (
    <StyledMonth>
      <div className="weekdays">
        {weekDaysNames.map((weekday) => (
          <div key={weekday}>{weekday.slice(0, 3)}</div>
        ))}
      </div>
      <div className="days">
        {days().length > 0 &&
          days().map((day) => (
            <div
              className={`day${
                dateSelected.year === year &&
                dateSelected.month === month &&
                dateSelected.day === day.number
                  ? " selected"
                  : ""
              }${day.name ? "" : " placeholder"}`}
              key={day.number}
            >
              <div
                className="day-number"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.target.classList.add("over");
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.target.classList.remove("over");
                }}
                onDrop={(e) => {
                  onDrop({
                    date: `${year}-${handleOneDigitNumber(month + 1)}-${
                      day.number
                    }`,
                    time: "",
                  });
                  e.target.classList.remove("over");
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDayClick({ year, month, day: day.number });
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  onDayDoubleClick({
                    day: day.number,
                    month: month,
                    year: year,
                    format: "day",
                  });
                }}
              >
                {day.name ? day.number : ""}
              </div>
              <div className="day-patch">
                {todos.filter(
                  (todo) =>
                    todo.deadline.date ===
                      `${year}-${handleOneDigitNumber(
                        month + 1
                      )}-${handleOneDigitNumber(day.number)}` &&
                    !!todo.completed
                ).length > 0 && <div className="day-patch-completed"></div>}
                {todos.filter(
                  (todo) =>
                    todo.deadline.date ===
                      `${year}-${handleOneDigitNumber(
                        month + 1
                      )}-${handleOneDigitNumber(day.number)}` &&
                    todo.priority === "low" &&
                    !todo.completed
                ).length > 0 && <div className="day-patch-low"></div>}
                {todos.filter(
                  (todo) =>
                    todo.deadline.date ===
                      `${year}-${handleOneDigitNumber(
                        month + 1
                      )}-${handleOneDigitNumber(day.number)}` &&
                    todo.priority === "medium" &&
                    !todo.completed
                ).length > 0 && <div className="day-patch-medium"></div>}
                {todos.filter(
                  (todo) =>
                    todo.deadline.date ===
                      `${year}-${handleOneDigitNumber(
                        month + 1
                      )}-${handleOneDigitNumber(day.number)}` &&
                    todo.priority === "hight" &&
                    !todo.completed
                ).length > 0 && <div className="day-patch-hight"></div>}
              </div>
              {showTooltip &&
                dateSelected.year === year &&
                dateSelected.month === month &&
                dateSelected.day === day.number && (
                  <ClickAwayListener onClickAway={handleClickAwayTooltip}>
                    <div className="day-tooltip">
                      {todos.map(
                        (todo) =>
                          todo.deadline.date ===
                            `${year}-${handleOneDigitNumber(
                              month + 1
                            )}-${handleOneDigitNumber(day.number)}` && (
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
                    </div>
                  </ClickAwayListener>
                )}
            </div>
          ))}
      </div>
    </StyledMonth>
  );
};
export default Month;

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  dateSelected: PropTypes.object.isRequired,
  onDayDoubleClick: PropTypes.func.isRequired,
  showTooltip: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  closeTooltip: PropTypes.func.isRequired,
};
