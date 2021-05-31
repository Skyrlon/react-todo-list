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
    & .month {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
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
    & .month_weekday {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      & > div {
        width: 13%;
        border: 1px solid black;
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
    let startingMonth, endingMonth;
    if (calendarFormat === "year") {
      startingMonth = 0;
      endingMonth = monthsNames.length;
    } else if (calendarFormat === "month") {
      startingMonth = monthsNames.indexOf(monthGoingToSubmit);
      endingMonth = startingMonth + 1;
    }

    for (let i = startingMonth; i < endingMonth; i++) {
      let daysInMonth = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit) + 1,
        0
      ).getDate();
      let days = [];
      let date =
        calendarFormat === "year"
          ? `${monthsNames[i]} ${yearGoingToSubmit}`
          : `${monthGoingToSubmit} ${yearGoingToSubmit}`;

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

  const handleMonthClick = (monthName) => {
    setCalendarFormat("month");
    setMonthGoingToSubmit(monthName);
    setDateAsked(`${monthName} ${year}`);
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
          </div>
        ))}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
