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

  & .week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90vw;
  }

  & .day {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    width: 12%;
    &_hour {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid;
      width: 100%;
      &::before {
        position: absolute;
        top: -2px;
        left: -1em;
        content: "";
        border-top-width: 2px;
        border-top-color: black;
        border-top-style: solid;
        width: 1em;
      }
      &-number {
        position: absolute;
        top: -1em;
        left: -4em;
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

const Calendar = ({ todos }) => {
  const [calendarYear, setCalendarYear] = useState(
    `${new Date(Date.now()).getFullYear()}`
  );
  const [calendarMonth, setCalendarMonth] = useState("");

  const [calendarDay, setCalendarDay] = useState("");

  const [inputYear, setInputYear] = useState(calendarYear);
  const [inputMonth, setInputMonth] = useState(calendarMonth);
  const [inputDay, setInputDay] = useState(calendarDay);

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
    `${new Date(Date.now()).getFullYear()}-${
      new Date(Date.now()).getMonth() + 1 < 10
        ? `0${new Date(Date.now()).getMonth() + 1}`
        : new Date(Date.now()).getMonth() + 1
    }-${
      new Date(Date.now()).getDate() < 10
        ? `0${new Date(Date.now()).getDate()}`
        : new Date(Date.now()).getDate()
    }`
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
    if (calendarFormat === "year" || calendarFormat === "month") {
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
    } else if (calendarFormat === "day" || calendarFormat === "week") {
      let numberOfDays;
      let startingDay;
      const numberOfHours = 24;
      const numberOfMinutes = 60;
      if (calendarFormat === "day") {
        numberOfDays = 1;
        startingDay = {
          year: dateSelected.split("-")[0],
          month: parseInt(dateSelected.split("-")[1]),
          day: dateSelected.split("-")[2],
        };
      }
      if (calendarFormat === "week") {
        numberOfDays = 7;

        let weekDaySelected = new Date(dateSelected).getDay();
        weekDaySelected =
          weekDaySelected === 0
            ? weekDaysNames[weekDaysNames.length - 1]
            : weekDaysNames[weekDaySelected - 1];

        const mondayDay = {
          year: dateSelected.split("-")[0],
          month: parseInt(dateSelected.split("-")[1]),
          day:
            parseInt(dateSelected.split("-")[2]) -
            weekDaysNames.indexOf(weekDaySelected),
        };
        startingDay = mondayDay;
      }

      for (let i = 0; i < numberOfDays; i++) {
        let date = new Date(
          startingDay.year,
          parseInt(startingDay.month) - 1,
          parseInt(startingDay.day) + i
        );
        date = `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        let timeArray = [];
        for (let j = 0; j < numberOfHours; j++) {
          let minutesArray = [];
          for (let k = 0; k < numberOfMinutes; k++) {
            minutesArray.push({ number: k < 10 ? `0${k}` : `${k}` });
          }
          timeArray.push({
            hour: j < 10 ? `0${j}` : `${j}`,
            minutes: minutesArray,
          });
        }
        array.push({ date, time: timeArray });
      }
    }
    return array;
  };

  const handleMonthClick = (monthName) => {
    setCalendarFormat("month");
    setCalendarMonth(monthName);
    setInputMonth(monthName);
    setDateAsked(`${monthName} ${calendarYear}`);
  };

  const handleChangeView = (e) => {
    let date = new Date(dateSelected);
    let newDay, newMonth, newYear, newFormat, newDate;
    if (e.target.value === "day" || e.target.value === "week") {
      newFormat = e.target.value;
      newDay = date.getDate();
      newMonth = monthsNames[date.getMonth()];
      newYear = date.getFullYear();
      newDate = `${date.getDate()} ${
        monthsNames[date.getMonth()]
      } ${date.getFullYear()}`;
    } else if (e.target.value === "month") {
      newFormat = e.target.value;
      newDay = "";
      newMonth = monthsNames[date.getMonth()];
      newYear = date.getFullYear();
      newDate = `${monthsNames[date.getMonth()]} ${date.getFullYear()}`;
    } else if (e.target.value === "year") {
      newFormat = e.target.value;
      newDay = "";
      newMonth = "";
      newYear = date.getFullYear();
      newDate = date.getFullYear();
    }
    setInputDay(newDay);
    setInputMonth(newMonth);
    setInputYear(newYear);
    setCalendarFormat(newFormat);
    setCalendarDay(newDay);
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
    setDateAsked(newDate);
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

  const handleDayDoubleClick = (e, date) => {
    e.stopPropagation();
    setCalendarFormat("day");
    setDateSelected(`${date.year}-${date.month}-${date.day}`);
    setCalendarYear(date.year);
    setCalendarMonth(date.month);
    setCalendarDay(date.day);
    setInputYear(date.year);
    setInputMonth(monthsNames[parseInt(date.month) - 1]);
    setInputDay(date.day);
    setDateAsked(`${date.day} ${date.month} ${date.year}`);
  };

  const handleChangeDate = (newDate) => {
    let monthWithFirstLetterCapital = newDate.month
      .toLowerCase()
      .split("")
      .map((element, index) => {
        return index === 0 ? element.toUpperCase() : element;
      })
      .join("");
    setInputYear(parseInt(newDate.year).toString());
    setInputMonth(monthWithFirstLetterCapital);
    setInputDay(newDate.day.toString().length > 0 ? parseInt(newDate.day) : "");
    setCalendarYear(parseInt(newDate.year).toString());
    setCalendarMonth(monthWithFirstLetterCapital);
    setCalendarDay(
      newDate.day.toString().length > 0 ? parseInt(newDate.day) : ""
    );
    setCalendarFormat(newDate.format);
    setDateAsked(`${newDate.day} ${newDate.month} ${newDate.year}`);
    if (newDate.format === "week") {
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${newDate.day < 10 ? `0${newDate.day}` : newDate.day}`
      );
    }
    if (newDate.format === "day")
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${newDate.day < 10 ? `0${newDate.day}` : newDate.day}`
      );
    if (newDate.format === "month")
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${dateSelected.split("-")[2]}`
      );
    if (newDate.format === "year")
      setDateSelected(
        `${newDate.year}-${dateSelected.split("-")[1]}-${
          dateSelected.split("-")[2]
        }`
      );
  };

  const onInputChange = (value, input) => {
    if (input === "year") setInputYear(value.toString());
    if (input === "month") setInputMonth(value.toString());
    if (input === "day") setInputDay(value.toString());
  };

  const [calendar, setCalendar] = useState([]);

  const currentDate = {
    date: `${new Date(Date.now()).getFullYear()}-${
      new Date(Date.now()).getMonth() + 1 < 10
        ? `0${new Date(Date.now()).getMonth() + 1}`
        : new Date(Date.now()).getMonth() + 1
    }-${
      new Date(Date.now()).getDate() < 10
        ? `0${new Date(Date.now()).getDate()}`
        : new Date(Date.now()).getDate()
    }`,
    time: `${
      new Date(Date.now()).getHours() < 10
        ? `0${new Date(Date.now()).getHours()}`
        : new Date(Date.now()).getHours()
    }:${
      new Date(Date.now()).getMinutes() < 10
        ? `0${new Date(Date.now()).getMinutes()}`
        : new Date(Date.now()).getMinutes()
    }`,
  };

  useEffect(
    () => {
      setCalendar(setUpCalendar());
    }, // eslint-disable-next-line
    [dateAsked, calendarFormat]
  );

  return (
    <StyledCalendar>
      <CalendarInput
        changeDate={handleChangeDate}
        yearGoingToSubmit={inputYear}
        monthGoingToSubmit={inputMonth}
        dayGoingToSubmit={inputDay}
        onInputChange={onInputChange}
        calendarFormat={calendarFormat}
      />
      <label htmlFor="view">View by : </label>
      <select name="view" value={calendarFormat} onChange={handleChangeView}>
        <option value="year">Year</option>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>

      <div className="calendar">
        {(calendarFormat === "year" || calendarFormat === "month") &&
          calendar.map(
            (month) =>
              month.name && (
                <div
                  className="month"
                  key={month.name}
                  onClick={() =>
                    calendarFormat === "year"
                      ? handleMonthClick(month.name)
                      : ""
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
                    {month.days &&
                      month.days.map((day) => (
                        <div
                          key={`${day.number}${day.name}`}
                          className={`month_day${
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
                          onClick={(e) =>
                            handleDayClick(
                              e,
                              `${calendarYear}-${month.number}-${day.number}`
                            )
                          }
                          onDoubleClick={(e) =>
                            handleDayDoubleClick(e, {
                              day: day.number,
                              month: month.number,
                              year: calendarYear,
                            })
                          }
                        >
                          <div className="month_day-number">
                            {day.name ? day.number : ""}
                          </div>
                          {calendarFormat === "year" &&
                            showTooltip &&
                            dateSelected ===
                              `${calendarYear}-${month.number}-${day.number}` && (
                              <div className="month_day-tooltip">
                                {todos.map(
                                  (todo) =>
                                    todo.deadline.date ===
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
                </div>
              )
          )}

        {(calendarFormat === "day" || calendarFormat === "week") && (
          <div className="week">
            {calendar.map(
              (day) =>
                day.date && (
                  <div key={day.date} className="day">
                    <div>{day.date}</div>
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
                              <div className="day_hour-number">
                                {time.hour}:00
                              </div>
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
          </div>
        )}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
