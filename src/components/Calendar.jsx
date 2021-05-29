import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledCalendar = styled.div`
  display: flex;
  width: 99vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;

  & h2 {
    user-select: none;
  }

  & .arrow {
    display: inline;
    margin-left: 1em;
    margin-right: 1em;
  }

  & .calendar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    height: 75%;
    & > div {
      margin: 0.25%;
      width: 16%;
      border: 1px solid #333;
    }
    & .year_day {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      & > div {
        border: 1px solid black;
      }
      &-name {
        width: 10%;
      }
      &-number {
        width: 10%;
      }
      &-todo {
        width: 75%;
        &.priority {
          &-hight {
            background-color: red;
          }
          &-medium {
            background-color: yellow;
          }
          &-low {
            background-color: green;
          }
        }
      }
    }
    .month_container {
      width: 50%;
    }
    & .month {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 1em;
    }
    & .month_weekday {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      & > div {
        width: 13%;
        border: 1px solid black;
      }
    }
    & .month_day {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 13%;
      height: 3em;
      border: 1px solid black;
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
  }
`;

const Calendar = ({ todos }) => {
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());

  const [yearGoingToSubmit, setYearGoingToSubmit] = useState(year);
  const [monthGoingToSubmit, setMonthGoingToSubmit] = useState("");

  const [dateAsked, setDateAsked] = useState(year);

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

  const weekDaysNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [calendarFormat, setCalendarFormat] = useState("year");

  const setUpCalendar = () => {
    let array = [];
    if (calendarFormat === "year") {
      monthsNames.forEach((month, index) => {
        let daysInMonth = new Date(dateAsked, index + 1, 0).getDate();
        let days = [];
        for (let i = 0; i < daysInMonth; i++) {
          days.push({
            name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
              new Date(`${i + 1} ${month} ${dateAsked}`)
            ),
            number: i + 1 < 10 ? `0${i + 1}` : i + 1,
          });
        }
        array.push({
          id: monthsNames.indexOf(month),
          number:
            monthsNames.indexOf(month) + 1 < 10
              ? `0${monthsNames.indexOf(month) + 1}`
              : monthsNames.indexOf(month) + 1,
          name: month,
          days: days,
        });
      });
    } else if (calendarFormat === "month") {
      let daysInMonth = new Date(
        dateAsked.split(" ")[1],
        monthsNames.indexOf(dateAsked.split(" ")[0]) + 1,
        0
      ).getDate();
      let days = [];
      for (let i = 0; i < daysInMonth; i++) {
        days.push({
          name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            new Date(`${i + 1} ${dateAsked}`)
          ),
          number: i + 1 < 10 ? `0${i + 1}` : i + 1,
        });
      }
      array.push({
        number:
          monthsNames.indexOf(dateAsked.split(" ")[0]) + 1 < 10
            ? `0${monthsNames.indexOf(dateAsked.split(" ")[0]) + 1}`
            : monthsNames.indexOf(dateAsked.split(" ")[0]) + 1,
        days: days,
      });
      let daysBeforeFirstDay = weekDaysNames.indexOf(array[0].days[0].name);
      for (let j = 0; j < daysBeforeFirstDay; j++) {
        array[0].days.unshift({ name: "", number: -j - 1 });
      }
      let daysAfterLastDay =
        weekDaysNames.length -
        (weekDaysNames.indexOf(array[0].days[array[0].days.length - 1].name) +
          1);
      for (let k = 0; k < daysAfterLastDay; k++) {
        array[0].days.push({
          name: "",
          number: array[0].days.length + 1,
        });
      }
    }
    return array;
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (monthGoingToSubmit.length === 0) {
      setCalendarFormat("year");
      setYear(yearGoingToSubmit);
      setDateAsked(yearGoingToSubmit);
    } else if (monthGoingToSubmit.length > 0) {
      setCalendarFormat("month");
      setYear(yearGoingToSubmit);
      setDateAsked(`${monthGoingToSubmit} ${yearGoingToSubmit}`);
    }
  };

  const handleDateBackward = () => {
    if (monthGoingToSubmit.length === 0) {
      setYearGoingToSubmit((prev) => parseInt(prev) - 1);
      setYear(parseInt(yearGoingToSubmit) - 1);
      setDateAsked(yearGoingToSubmit);
    } else if (monthGoingToSubmit.length > 0) {
      setYear(yearGoingToSubmit);
      setMonthGoingToSubmit(
        (prev) => monthsNames[monthsNames.indexOf(prev) - 1]
      );
      setDateAsked(
        `${
          monthsNames[monthsNames.indexOf(monthGoingToSubmit) - 1]
        } ${yearGoingToSubmit}`
      );
    }
  };

  const handleDateForward = () => {
    if (monthGoingToSubmit.length === 0) {
      setYearGoingToSubmit((prev) => parseInt(prev) + 1);
      setYear(parseInt(yearGoingToSubmit) + 1);
      setDateAsked(yearGoingToSubmit);
    } else if (monthGoingToSubmit.length > 0) {
      setYear(yearGoingToSubmit);
      setMonthGoingToSubmit(
        (prev) => monthsNames[monthsNames.indexOf(prev) + 1]
      );
      setDateAsked(
        `${
          monthsNames[monthsNames.indexOf(monthGoingToSubmit) + 1]
        } ${yearGoingToSubmit}`
      );
    }
  };

  const [calendar, setCalendar] = useState([]);

  useEffect(
    () => {
      setCalendar(setUpCalendar());
    }, // eslint-disable-next-line
    [dateAsked]
  );

  return (
    <StyledCalendar>
      <h2>
        <div className="arrow" onClick={handleDateBackward}>
          &#10092;
        </div>

        <form onSubmit={handleDateSubmit}>
          <input
            name="month-input"
            type="text"
            value={monthGoingToSubmit}
            onChange={(e) => setMonthGoingToSubmit(e.target.value)}
          />
          <input
            name="year-input"
            type="text"
            value={yearGoingToSubmit}
            onChange={(e) => setYearGoingToSubmit(e.target.value)}
          />
          <input type="submit" />
        </form>

        <div className="arrow" onClick={handleDateForward}>
          &#10093;
        </div>
      </h2>

      <div className="calendar">
        {calendarFormat === "year" &&
          calendar.map((month) => (
            <div
              key={month.number}
              onClick={() => {
                setCalendarFormat("month");
                setMonthGoingToSubmit(month.name);
                setDateAsked(`${month.name} ${year}`);
              }}
            >
              <div>
                <div>{month.name}</div>
              </div>
              <div>
                {month.days &&
                  month.days.map((day) => (
                    <div className="year_day" key={day.number}>
                      <div className="year_day-name">{day.name}</div>
                      <div className="year_day-number">{day.number}</div>
                      {(todos.filter(
                        (todo) =>
                          todo.deadline ===
                          `${year}-${month.number}-${day.number}`
                      ).length > 1 && (
                        <div
                          className={`year_day-todo priority-${
                            todos.filter(
                              (todo) =>
                                !todo.completed &&
                                todo.deadline ===
                                  `${year}-${month.number}-${day.number}`
                            )[0].priority
                          }`}
                        >
                          {`${
                            todos.filter(
                              (todo) =>
                                !todo.completed &&
                                todo.deadline ===
                                  `${year}-${month.number}-${day.number}`
                            )[0].title
                          } and ${
                            todos.filter(
                              (todo) =>
                                todo.deadline ===
                                `${year}-${month.number}-${day.number}`
                            ).length - 1
                          } others tasks`}
                        </div>
                      )) ||
                        (todos.filter(
                          (todo) =>
                            todo.deadline ===
                            `${year}-${month.number}-${day.number}`
                        ).length > 0 &&
                          todos.map(
                            (todo) =>
                              !todo.completed &&
                              todo.deadline ===
                                `${year}-${month.number}-${day.number}` && (
                                <div
                                  key={todo.id}
                                  className={`year_day-todo priority-${todo.priority}`}
                                >
                                  {todo.title}
                                </div>
                              )
                          )) || (
                          <div className="year_day-todo" key={day.number}></div>
                        )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {calendarFormat === "month" && (
          <div className="month_container">
            <div className="month_weekday">
              {weekDaysNames.map((weekday) => (
                <div key={weekday}>{weekday.slice(0, 3)}</div>
              ))}
            </div>

            {calendar.map((month) => (
              <div key={month.number} className="month">
                {month.days.map((day) => (
                  <div className="month_day" key={day.number}>
                    <div className="month_day-number">
                      {day.name ? day.number : ""}
                    </div>
                    <div className="month_day-todo">
                      {["hight", "medium", "low"].map((priority) => (
                        <div
                          key={priority}
                          className={`month_day-todo-number priority-${priority}`}
                        >
                          {(todos.filter(
                            (todo) =>
                              todo.priority === priority &&
                              todo.deadline ===
                                `${year}-${month.number}-${day.number}`
                          ).length &&
                            todos.filter(
                              (todo) =>
                                todo.priority === priority &&
                                todo.deadline ===
                                  `${year}-${month.number}-${day.number}`
                            ).length) ||
                            ""}
                          <div className="tooltip">
                            {todos.map(
                              (todo) =>
                                todo.priority === priority &&
                                todo.deadline ===
                                  `${year}-${month.number}-${day.number}` && (
                                  <div key={todo.id}>{todo.title}</div>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
