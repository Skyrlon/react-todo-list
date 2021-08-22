import PropTypes from "prop-types";
import styled from "styled-components";

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

const Day = ({ year, month, day, todos, showHours }) => {
  const time = function () {
    const numberOfHours = 24;
    const numberOfMinutes = 60;
    let hoursArray = [];
    for (let i = 0; i < numberOfHours; i++) {
      let minutesArray = [];
      for (let j = 0; j < numberOfMinutes; j++) {
        minutesArray.push({ number: j < 10 ? `0${j}` : `${j}` });
      }
      hoursArray.push({
        hour: i < 10 ? `0${i}` : `${i}`,
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
              `${year}-${
                monthsNames.indexOf(month) + 1 > 10
                  ? monthsNames.indexOf(month) + 1
                  : `0${monthsNames.indexOf(month) + 1}`
              }-${parseInt(day) > 10 ? day : `0${day}`}` &&
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
            <div key={minute.number} className="hour-minute">
              {todos.map(
                (todo) =>
                  todo.deadline.date ===
                    `${year}-${
                      monthsNames.indexOf(month) + 1 > 10
                        ? monthsNames.indexOf(month) + 1
                        : `0${monthsNames.indexOf(month) + 1}`
                    }-${parseInt(day) > 10 ? day : `0${day}`}` &&
                  todo.deadline.time === `${time.hour}:${minute.number}` && (
                    <div
                      key={todo.id}
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
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  todos: PropTypes.array,
  showHours: PropTypes.bool,
};
