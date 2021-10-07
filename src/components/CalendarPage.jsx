import { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarInput from "./CalendarInput.jsx";
import Calendar from "./Calendar.jsx";
import TodosNoDeadlineSidebar from "./TodosNoDeadlineSidebar.jsx";

const StyledCalendarPage = styled.div`
  display: grid;
  width: 99vw;
  grid-template: "sidebar input input" 3vh "sidebar view view" 3vh "sidebar calendar calendar" 40vh "sidebar calendar calendar" 40vh / 10vw auto;
  grid-column-gap: 4rem;
  & .view {
    grid-area: view;
    margin-left: 45%;
    width: 10vw;
  }
`;

const CalendarPage = ({ todos, modifyTodos }) => {
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

  const [todoIdDragged, setTodoIdDragged] = useState(undefined);

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

  const [calendarFormat, setCalendarFormat] = useState("year");

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
    setInputDay(newDay.toString());
    setInputMonth(newMonth);
    setInputYear(newYear.toString());
    setCalendarFormat(newFormat);
    setCalendarDay(newDay.toString());
    setCalendarMonth(newMonth);
    setCalendarYear(newYear.toString());
    setDateAsked(newDate);
  };

  const handleDayInMonthClick = (date) => {
    setDateSelected(date);
    if (dateSelected === date) {
      setShowTooltip((prev) => !prev);
    } else {
      setShowTooltip(true);
    }
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
    setInputDay(
      newDate.day.toString().length > 0 ? parseInt(newDate.day).toString() : ""
    );
    setCalendarYear(parseInt(newDate.year).toString());
    setCalendarMonth(monthWithFirstLetterCapital);
    setCalendarDay(
      newDate.day.toString().length > 0 ? parseInt(newDate.day).toString() : ""
    );
    setCalendarFormat(newDate.format);
    setDateAsked(`${newDate.day} ${newDate.month} ${newDate.year}`);
    if (newDate.format === "week") {
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${
          parseInt(newDate.day) < 10
            ? `0${parseInt(newDate.day)}`
            : parseInt(newDate.day)
        }`
      );
    }
    if (newDate.format === "day")
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${
          parseInt(newDate.day) < 10
            ? `0${parseInt(newDate.day)}`
            : parseInt(newDate.day)
        }`
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

  const handleDropTodo = (newDeadline) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === todoIdDragged)
        return {
          ...todo,
          deadline: { date: newDeadline.date, time: newDeadline.time },
        };
      return todo;
    });
    modifyTodos(newTodos);
  };

  useEffect(
    () => {
      setShowTooltip(false);
    }, // eslint-disable-next-line
    [dateAsked, calendarFormat]
  );

  return (
    <StyledCalendarPage>
      <CalendarInput
        changeDate={handleChangeDate}
        yearGoingToSubmit={inputYear}
        monthGoingToSubmit={inputMonth}
        dayGoingToSubmit={inputDay}
        onInputChange={onInputChange}
        calendarFormat={calendarFormat}
      />

      <div className="view">
        <label htmlFor="view">View by : </label>
        <select name="view" value={calendarFormat} onChange={handleChangeView}>
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>

      <TodosNoDeadlineSidebar
        todos={todos}
        onDragStart={(todoId) => setTodoIdDragged(todoId)}
      />

      <Calendar
        todos={todos}
        format={calendarFormat}
        currentDate={currentDate}
        calendarYear={calendarYear}
        calendarMonth={calendarMonth}
        calendarDay={calendarDay}
        onMonthClick={handleChangeDate}
        dateSelected={dateSelected}
        onDayInMonthClick={handleDayInMonthClick}
        onDayInMonthDoubleClick={handleChangeDate}
        goToThisDay={handleChangeDate}
        showTooltip={showTooltip}
        onDrop={handleDropTodo}
      />
    </StyledCalendarPage>
  );
};

export default CalendarPage;
