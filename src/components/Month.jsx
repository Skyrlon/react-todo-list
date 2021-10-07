import PropTypes from "prop-types";
import styled from "styled-components";

const StyledMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
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
    height: 3em;
    border: 1px solid black;
    box-sizing: border-box;
    &.selected {
      background-color: green;
    }
    &-tooltip {
      position: absolute;
      top: 3em;
      z-index: 1;
      background-color: lightblue;
      min-width: 7em;
    }
    &-todo {
      position: absolute;
      top: 0%;
      right: 0.5em;
      font-size: 0.75em;
      & .priority {
        &-hight {
          color: red;
        }
        &-medium {
          color: #ffcc00;
        }
        &-low {
          color: green;
        }
      }
      &-number {
        position: relative;
        & .tooltip {
          display: none;
        }
        &:hover {
          & .tooltip {
            position: absolute;
            display: block;
            z-index: 1;
            background-color: white;
            bottom: 100%;
            width: 10em;
            border: 1px solid black;
            box-sizing: border-box;
          }
        }
      }
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
}) => {
  const days = function () {
    let daysArray = [];
    const numberOfDays = new Date(
      year,
      monthsNames.indexOf(month) + 1,
      0
    ).getDate();
    for (let j = 0; j < numberOfDays; j++) {
      daysArray.push({
        name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
          new Date(`${j + 1} ${month} ${year}`)
        ),
        number: j + 1 < 10 ? `0${j + 1}` : j + 1,
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
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                onDrop({
                  date: `${year}-${
                    monthsNames.indexOf(month) + 1 > 10
                      ? monthsNames.indexOf(month) + 1
                      : `0${monthsNames.indexOf(month) + 1}`
                  }-${day.number}`,
                  time: "",
                })
              }
              className={`day${
                dateSelected ===
                `${year}-${
                  monthsNames.indexOf(month) + 1 > 10
                    ? monthsNames.indexOf(month) + 1
                    : `0${monthsNames.indexOf(month) + 1}`
                }-${day.number}`
                  ? " selected"
                  : ""
              }`}
              key={day.number}
              onClick={(e) => {
                e.stopPropagation();
                onDayClick(
                  `${year}-${
                    monthsNames.indexOf(month) + 1 > 10
                      ? monthsNames.indexOf(month) + 1
                      : `0${monthsNames.indexOf(month) + 1}`
                  }-${day.number}`
                );
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
              <div className="day-number">{day.name ? day.number : ""}</div>
              {showTooltip &&
                dateSelected ===
                  `${year}-${
                    monthsNames.indexOf(month) + 1 > 10
                      ? monthsNames.indexOf(month) + 1
                      : `0${monthsNames.indexOf(month) + 1}`
                  }-${day.number}` && (
                  <div className="day-tooltip">
                    {todos.map(
                      (todo) =>
                        todo.deadline.date ===
                          `${year}-${
                            monthsNames.indexOf(month) + 1 > 10
                              ? monthsNames.indexOf(month) + 1
                              : `0${monthsNames.indexOf(month) + 1}`
                          }-${day.number}` && (
                          <div key={todo.id}>{todo.title}</div>
                        )
                    )}
                  </div>
                )}
            </div>
          ))}
      </div>
    </StyledMonth>
  );
};
export default Month;

Month.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  dateSelected: PropTypes.string,
  onDayInMonthClick: PropTypes.func,
  onDayDoubleClick: PropTypes.func,
  showTooltip: PropTypes.bool,
  todos: PropTypes.array,
};
