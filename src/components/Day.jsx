import PropTypes from "prop-types";
import styled from "styled-components";

import handleOneDigitNumber from "../utils/handleOneDigitNumber";

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

    &-minute {
      height: 10px;
      &.now {
        border-top: 1px solid red;
        position: relative;
        &::before {
          content: "Now";
          color: red;
          position: absolute;
          left: -2.5em;
          top: -0.8em;
        }
      }
    }
  }

  & .todo {
    user-select: none;
  }

  & .todo-nohour {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 3em;
  }
  & .priority {
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
`;

const currentDate = {
  date: `${new Date(Date.now()).getFullYear()}-${handleOneDigitNumber(
    new Date(Date.now()).getMonth() + 1
  )}-${handleOneDigitNumber(new Date(Date.now()).getDate())}`,
  time: `${handleOneDigitNumber(
    new Date(Date.now()).getHours()
  )}:${handleOneDigitNumber(new Date(Date.now()).getMinutes())}`,
};

const Day = ({ year, month, day, todos, showHours, onDrop, onDragStart }) => {
  const time = function () {
    const numberOfHours = 24;
    const numberOfMinutes = 60;
    let hoursArray = [];
    for (let i = 0; i < numberOfHours; i++) {
      let minutesArray = [];
      for (let j = 0; j < numberOfMinutes; j++) {
        minutesArray.push({ number: handleOneDigitNumber(j) });
      }
      hoursArray.push({
        hour: handleOneDigitNumber(i),
        minutes: minutesArray,
      });
    }
    return hoursArray;
  };

  return (
    <StyledDay>
      <div className="todo-nohour">
        {todos.map(
          (todo) =>
            todo.deadline.date ===
              `${year}-${handleOneDigitNumber(
                month + 1
              )}-${handleOneDigitNumber(day)}` &&
            todo.deadline.time.length === 0 && (
              <div
                key={todo.id}
                className={`priority-${
                  todo.completed ? "completed" : todo.priority
                }`}
              >
                {todo.title}
              </div>
            )
        )}
      </div>
      {time().map((time) => (
        <div key={time.hour} className="hour">
          {showHours && <div className="hour-number">{time.hour}:00</div>}
          {time.minutes.map((minute) => (
            <div
              key={minute.number}
              className={`hour-minute${
                currentDate.date ===
                  `${year}-${handleOneDigitNumber(
                    month + 1
                  )}-${handleOneDigitNumber(day)}` &&
                currentDate.time === `${time.hour}:${minute.number}`
                  ? " now"
                  : ""
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                onDrop({
                  date: `${year}-${handleOneDigitNumber(
                    month + 1
                  )}-${handleOneDigitNumber(day)}`,
                  time: `${time.hour}:${minute.number}`,
                })
              }
            >
              {todos.map(
                (todo) =>
                  todo.deadline.date ===
                    `${year}-${handleOneDigitNumber(
                      month + 1
                    )}-${handleOneDigitNumber(day)}` &&
                  todo.deadline.time === `${time.hour}:${minute.number}` && (
                    <div
                      key={todo.id}
                      draggable
                      onDragStart={() => onDragStart(todo.id)}
                      className={`todo priority-${
                        todo.completed ? "completed" : todo.priority
                      }`}
                    >
                      {todo.title}
                    </div>
                  )
              )}
            </div>
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
};
