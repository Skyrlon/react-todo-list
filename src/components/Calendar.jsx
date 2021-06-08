import { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarInput from "./CalendarInput.jsx";

const StyledCalendar = styled.div`
  display: flex;
  width: 99vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;

  & .calendar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 75%;
    & .month {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 13%;
      margin-top: 1%;
      margin-left: 1%;
      margin-right: 1%;
      border: 1px solid black;
      &_days {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      &_day {
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
          background-color: grey;
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
      &_weekday {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        & > div {
          width: 13%;
          border: 1px solid black;
        }
      }
    }
  }
`;

const Calendar = ({ todos }) => {
  const [calendarYear, setCalendarYear] = useState(
    `${new Date(Date.now()).getFullYear()}`
  );
  const [calendarMonth, setCalendarMonth] = useState("");

  const [dateAsked, setDateAsked] = useState(calendarYear);

  const [showTooltip, setShowTooltip] = useState(false);

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

  const [dateSelected, setDateSelected] = useState(
    `${
      new Date(Date.now()).getDate() < 10
        ? `0${new Date(Date.now()).getDate()}`
        : new Date(Date.now()).getDate()
    } ${monthsNames[new Date(Date.now()).getMonth()]} ${new Date(
      Date.now()
    ).getFullYear()}`
  );

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
    let startingMonth, endingMonth;
    if (calendarFormat === "year") {
      startingMonth = 0;
      endingMonth = monthsNames.length;
    } else if (calendarFormat === "month") {
      startingMonth = monthsNames.indexOf(calendarMonth);
      endingMonth = startingMonth + 1;
    }

    for (let i = startingMonth; i < endingMonth; i++) {
      let daysInMonth = new Date(calendarYear, i + 1, 0).getDate();
      let days = [];
      let date =
        calendarFormat === "year"
          ? `${monthsNames[i]} ${calendarYear}`
          : `${calendarMonth} ${calendarYear}`;

      for (let j = 0; j < daysInMonth; j++) {
        days.push({
          name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            new Date(`${j + 1} ${date}`)
          ),
          number: j + 1 < 10 ? `0${j + 1}` : j + 1,
        });
      }

      let daysBeforeFirstDay = weekDaysNames.indexOf(days[0].name);
      for (let k = 0; k < daysBeforeFirstDay; k++) {
        days.unshift({ name: "", number: -k - 1 });
      }

      let daysAfterLastDay =
        weekDaysNames.length -
        (weekDaysNames.indexOf(days[days.length - 1].name) + 1);
      for (let l = 0; l < daysAfterLastDay; l++) {
        days.push({
          name: "",
          number: days.length + 1,
        });
      }

      array.push({
        number: i + 1 < 10 ? `0${i + 1}` : i + 1,
        name: monthsNames[i],
        days: days,
      });
    }
    return array;
  };

  const handleMonthClick = (monthName) => {
    setCalendarFormat("month");
    setCalendarMonth(monthName);
    setDateAsked(`${monthName} ${calendarYear}`);
  };

  const handleChangeView = (e) => {
    let date = new Date(dateSelected);
    if (e.target.value === "month") {
      setCalendarFormat(e.target.value);
      setCalendarMonth(monthsNames[date.getMonth()]);
      setCalendarYear(date.getFullYear());
      setDateAsked(`${monthsNames[date.getMonth()]} ${date.getFullYear()}`);
    } else if (e.target.value === "year") {
      setCalendarFormat(e.target.value);
      setCalendarMonth("");
      setCalendarYear(date.getFullYear());
      setDateAsked(date.getFullYear());
    }
  };

  const handleDayClick = (e, date) => {
    e.stopPropagation();
    setDateSelected(date);
    if (dateSelected === date) {
      setShowTooltip((prev) => !prev);
    } else {
      setShowTooltip(true);
    }
  };

  const handleChangeDate = (newDate) => {
    setCalendarYear(newDate.year);
    setCalendarMonth(newDate.month);
    setCalendarFormat(newDate.format);
    setDateAsked(`${newDate.month} ${newDate.year}`);
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
      <CalendarInput changeDate={handleChangeDate} />
      <label htmlFor="view">View by : </label>
      <select name="view" value={calendarFormat} onChange={handleChangeView}>
        <option value="year">Year</option>
        <option value="month">Month</option>
      </select>

      <div className="calendar">
        {calendar.map((month) => (
          <div
            className="month"
            key={month.number}
            onClick={() =>
              calendarFormat === "year" ? handleMonthClick(month.name) : ""
            }
          >
            {calendarFormat === "year" && (
              <div>
                <div>{month.name}</div>
              </div>
            )}
            <div className="month_weekday">
              {weekDaysNames.map((weekday) => (
                <div key={weekday}>{weekday.slice(0, 3)}</div>
              ))}
            </div>
            <div className="month_days">
              {month.days.map((day) => (
                <div
                  className={`month_day${
                    dateSelected ===
                    `${day.number} ${month.name} ${calendarYear}`
                      ? " selected"
                      : ""
                  }${
                    dateSelected ===
                      `${day.number} ${month.name} ${calendarYear}` &&
                    showTooltip
                      ? " showTooltip"
                      : ""
                  }`}
                  key={day.number}
                  onClick={(e) =>
                    handleDayClick(
                      e,
                      `${day.number} ${month.name} ${calendarYear}`
                    )
                  }
                >
                  <div className="month_day-number">
                    {day.name ? day.number : ""}
                  </div>
                  {calendarFormat === "year" &&
                    showTooltip &&
                    dateSelected ===
                      `${day.number} ${month.name} ${calendarYear}` && (
                      <div className="month_day-tooltip">
                        {todos.map(
                          (todo) =>
                            todo.deadline ===
                              `${calendarYear}-${month.number}-${day.number}` && (
                              <div key={todo.id}>{todo.title}</div>
                            )
                        )}
                      </div>
                    )}
                  {calendarFormat === "month" && (
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
                                `${calendarYear}-${month.number}-${day.number}`
                          ).length &&
                            todos.filter(
                              (todo) =>
                                todo.priority === priority &&
                                todo.deadline ===
                                  `${calendarYear}-${month.number}-${day.number}`
                            ).length) ||
                            ""}
                          <div className="tooltip">
                            {todos.map(
                              (todo) =>
                                todo.priority === priority &&
                                todo.deadline ===
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
          </div>
        ))}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
