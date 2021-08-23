import styled from "styled-components";
import PropTypes from "prop-types";
import YearlyCalendar from "./YearlyCalendar";
import Month from "./Month";
import Day from "./Day";
import WeeklyCalendar from "./WeeklyCalendar";

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

const StyledCalendar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  height: 75%;
`;

const StyledMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 13%;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;
  border: 1px solid black;

  & .weekday {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & > div {
      width: 13%;
      border: 1px solid black;
    }
  }

  & .days {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  & .day {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 13%;
    height: 3em;
    border: 1px solid black;
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
          }
        }
      }
    }
  }
`;

const StyledWeek = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  & .day {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    width: 12%;
    &_hour {
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

        & div {
          font-size: 1em;
        }
      }
    }
    &_todo-nohour {
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
  }
`;

const Calendar = ({
  todos,
  calendarArray,
  format,
  currentDate,
  calendarYear,
  calendarMonth,
  calendarDay,
  onMonthClick,
  dateSelected,
  onDayInMonthClick,
  onDayInMonthDoubleClick,
  goToThisDay,
  showTooltip,
}) => {
  const weekDaysNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <StyledCalendar>
      {(format === "year" || format === "month") &&
        calendarArray.map(
          (month) =>
            month.name && (
              <StyledMonth
                key={month.name}
                onClick={() =>
                  format === "year"
                    ? onMonthClick({
                        day: "",
                        month: monthsNames[parseInt(month.number) - 1],
                        year: calendarYear,
                        format: "month",
                      })
                    : ""
                }
              >
                {format === "year" && (
                  <div>
                    <div>{month.name}</div>
                  </div>
                )}
                <div className="weekday">
                  {weekDaysNames.map((weekday) => (
                    <div key={weekday}>{weekday.slice(0, 3)}</div>
                  ))}
                </div>
                <div className="days">
                  {month.days &&
                    month.days.map((day) => (
                      <div
                        key={`${day.number}${day.name}`}
                        className={`day${
                          dateSelected ===
                          `${calendarYear}-${month.number}-${day.number}`
                            ? " selected"
                            : ""
                        }${
                          dateSelected ===
                            `${calendarYear}-${month.number}-${day.number}` &&
                          showTooltip
                            ? " showTooltip"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDayInMonthClick(
                            `${calendarYear}-${month.number}-${day.number}`
                          );
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          goToThisDay({
                            day: day.number,
                            month: monthsNames[parseInt(month.number) - 1],
                            year: calendarYear,
                            format: "day",
                          });
                        }}
                      >
                        <div className="day-number">
                          {day.name ? day.number : ""}
                        </div>
                        {format === "year" &&
                          showTooltip &&
                          dateSelected ===
                            `${calendarYear}-${month.number}-${day.number}` && (
                            <div className="day-tooltip">
                              {todos.map(
                                (todo) =>
                                  todo.deadline.date ===
                                    `${calendarYear}-${month.number}-${day.number}` && (
                                    <div key={todo.id}>{todo.title}</div>
                                  )
                              )}
                            </div>
                          )}
                        {format === "month" && (
                          <div className="day-todo">
                            {["hight", "medium", "low"].map((priority) => (
                              <div
                                key={priority}
                                className={`day-todo-number priority-${priority}`}
                              >
                                {(todos.filter(
                                  (todo) =>
                                    todo.priority === priority &&
                                    todo.deadline.date ===
                                      `${calendarYear}-${month.number}-${day.number}`
                                ).length &&
                                  todos.filter(
                                    (todo) =>
                                      todo.priority === priority &&
                                      todo.deadline.date ===
                                        `${calendarYear}-${month.number}-${day.number}`
                                  ).length) ||
                                  ""}
                                <div className="tooltip">
                                  {todos.map(
                                    (todo) =>
                                      todo.priority === priority &&
                                      todo.deadline.date ===
                                        `${calendarYear}-${month.number}-${day.number}` && (
                                        <div key={todo.id}>{todo.title}</div>
                                      )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </StyledMonth>
            )
        )}

      {(format === "day" || format === "week") && (
        <StyledWeek>
          {calendarArray.map(
            (day, index) =>
              day.date && (
                <div key={day.date} className="day">
                  <div
                    onClick={() =>
                      !(
                        parseInt(day.date.split("-")[0]) < 1000 ||
                        parseInt(day.date.split("-")[0]) > 9999
                      )
                        ? goToThisDay({
                            day: day.date.split("-")[2],
                            month:
                              monthsNames[parseInt(day.date.split("-")[1]) - 1],
                            year: day.date.split("-")[0],
                            format: "day",
                          })
                        : ""
                    }
                  >
                    {day.date}
                  </div>
                  <div className="day_todo-nohour">
                    {todos.map(
                      (todo) =>
                        todo.deadline.date === day.date &&
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
                  {day.time &&
                    day.time.map(
                      (time) =>
                        time.hour && (
                          <div key={time.hour} className={"day_hour"}>
                            {index === 0 && (
                              <div className="day_hour-number">
                                {time.hour}:00
                              </div>
                            )}
                            {time.minutes &&
                              time.minutes.map((minute) => (
                                <div
                                  key={`${time.hour} ${minute.number}`}
                                  className={`day_hour-minute${
                                    currentDate.date === day.date &&
                                    currentDate.time ===
                                      `${
                                        time.hour < 10
                                          ? `0${time.hour}`
                                          : time.hour
                                      }:${
                                        minute.number < 10
                                          ? `0${minute.number}`
                                          : minute.number
                                      }`
                                      ? " now"
                                      : ""
                                  }`}
                                >
                                  {todos.map(
                                    (todo) =>
                                      todo.deadline.date === day.date &&
                                      todo.deadline.time ===
                                        `${time.hour}:${minute.number}` && (
                                        <div
                                          key={todo.title}
                                          className={`priority-${
                                            todo.completed
                                              ? "completed"
                                              : todo.priority
                                          }`}
                                        >
                                          {todo.title}
                                        </div>
                                      )
                                  )}
                                </div>
                              ))}
                          </div>
                        )
                    )}
                </div>
              )
          )}
        </StyledWeek>
      )}
      {format === "year" && (
        <YearlyCalendar
          year={calendarYear}
          onMonthClick={onMonthClick}
          dateSelected={dateSelected}
          onDayClick={onDayInMonthClick}
          onDayDoubleClick={onDayInMonthDoubleClick}
          showTooltip={showTooltip}
          todos={todos}
        />
      )}

      {format === "month" && (
        <Month
          year={calendarYear}
          month={calendarMonth}
          onMonthClick={onMonthClick}
          dateSelected={dateSelected}
          onDayClick={onDayInMonthClick}
          onDayDoubleClick={onDayInMonthDoubleClick}
          showTooltip={showTooltip}
          todos={todos}
        />
      )}
      {format === "day" && (
        <Day
          year={calendarYear}
          month={calendarMonth}
          day={calendarDay}
          todos={todos}
          showHours={true}
        />
      )}
      {format === "week" && (
        <WeeklyCalendar
          year={calendarYear}
          month={calendarMonth}
          day={calendarDay}
          todos={todos}
        />
      )}
    </StyledCalendar>
  );
};

Calendar.propTypes = {
  todos: PropTypes.array,
  calendarArray: PropTypes.array,
  format: PropTypes.string,
  currentDate: PropTypes.object,
  calendarYear: PropTypes.string,
  calendarMonth: PropTypes.string,
  calendarDay: PropTypes.string,
  onMonthClick: PropTypes.func,
  dateSelected: PropTypes.string,
  onDayInMonthClick: PropTypes.func,
  onDayInMonthDoubleClick: PropTypes.func,
  goToThisDay: PropTypes.func,
  showTooltip: PropTypes.bool,
};

export default Calendar;
