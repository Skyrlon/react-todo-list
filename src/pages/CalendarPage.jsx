import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CalendarDate from "../components/CalendarDate.jsx";
import CalendarInput from "../components/CalendarInput.jsx";
import Calendar from "../components/Calendar.jsx";
import TodosNoDeadlineSidebar from "../components/TodosNoDeadlineSidebar.jsx";
import handleOneDigitNumber from "../utils/handleOneDigitNumber.jsx";
import TodoForm from "../components/TodoForm.jsx";

const StyledCalendarPage = styled.div`
  display: grid;
  width: 99vw;
  grid-template:
    "sidebar input input" 5vh
    "sidebar view view" 5vh
    "sidebar calendar calendar" 40vh
    "sidebar calendar calendar" 40vh;
  grid-column-gap: 4rem;
  & .view {
    grid-area: view;
    margin-left: 45%;
    width: 10vw;
  }
`;

const CalendarPage = ({ todos, modifyTodos }) => {
  const [calendarYear, setCalendarYear] = useState(
    new Date(Date.now()).getFullYear()
  );

  const [calendarMonth, setCalendarMonth] = useState(null);

  const [calendarDay, setCalendarDay] = useState(null);

  const [showInputs, setShowInputs] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const [todoIdDragged, setTodoIdDragged] = useState(undefined);

  const [showTodoForm, setShowTodoForm] = useState(false);

  const [todoToEdit, setTodoToEdit] = useState(undefined);

  const [dateSelected, setDateSelected] = useState({
    year: new Date(Date.now()).getFullYear(),
    month: new Date(Date.now()).getMonth(),
    day: new Date(Date.now()).getDate(),
  });

  const [calendarFormat, setCalendarFormat] = useState("year");

  const handleChangeView = (e) => {
    let date = new Date(
      `${dateSelected.year}-${handleOneDigitNumber(
        dateSelected.month + 1
      )}-${handleOneDigitNumber(dateSelected.day)}`
    );
    let newDay, newMonth, newYear, newFormat;
    if (e.target.value === "day" || e.target.value === "week") {
      newFormat = e.target.value;
      newDay = date.getDate();
      newMonth = date.getMonth();
      newYear = date.getFullYear();
    } else if (e.target.value === "month") {
      newFormat = e.target.value;
      newDay = null;
      newMonth = date.getMonth();
      newYear = date.getFullYear();
    } else if (e.target.value === "year") {
      newFormat = e.target.value;
      newDay = null;
      newMonth = null;
      newYear = date.getFullYear();
    }
    setCalendarFormat(newFormat);
    setCalendarDay(newDay);
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);setShowInputs(false)
  };

  const handleDayInMonthClick = (date) => {
    setDateSelected(date);
    if (
      dateSelected.year === date.year &&
      dateSelected.month === date.month &&
      dateSelected.day === date.day
    ) {
      setShowTooltip((prev) => !prev);
    } else {
      setShowTooltip(true);
    }setShowInputs(false)
  };

  const handleChangeDate = (newDate) => {
    setCalendarYear(newDate.year);
    setCalendarMonth(newDate.month);
    setCalendarDay(newDate.day);
    setCalendarFormat(newDate.format);
    if (newDate.format === "day")
      setDateSelected({
        year: newDate.year,
        month: newDate.month,
        day: newDate.day,
      });
    if (newDate.format === "month")
      setDateSelected({
        year: newDate.year,
        month: newDate.month,
        day: dateSelected.day,
      });
    if (newDate.format === "year")
      setDateSelected({
        year: newDate.year,
        month: dateSelected.month,
        day: dateSelected.day,
      });
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

  const editTodo = (todo) => {
    setShowTodoForm(true);
    setTodoToEdit(todo);
  };

  const handleEditTodo = (todoEdited) => {
    setShowTodoForm(false);
    const newTodoList = todos.map((todo) => {
      if (todo.id === todoEdited.id) return todoEdited;
      return todo;
    });
    modifyTodos(newTodoList);
  };

  const deleteTodo = (todoToDelete) => {
    const newTodoList = todos.filter((todo) => todo !== todoToDelete);
    modifyTodos(newTodoList);
  };

  const toggleCompleteTodo = (todoToEdit) => {
    const newTodoList = todos.map((todo) => {
      if (todo === todoToEdit) return { ...todo, completed: !todo.completed };
      return todo;
    });
    modifyTodos(newTodoList);
  };

  const closeForm = () => {
    setShowTodoForm(false);
    setTodoToEdit(false);
  };

  //Close tooltip each time calendar's format change
  useEffect(
    () => {
      setShowTooltip(false);
    }, // eslint-disable-next-line
    [calendarFormat]
  );

  return (
    <StyledCalendarPage>
      {showTodoForm && (
        <TodoForm
          onEdit={handleEditTodo}
          isEditingTodo={true}
          todoToEdit={todoToEdit}
          clickedAway={closeForm}
        />
      )}

      {!showInputs && (
        <CalendarDate
          calendarFormat={calendarFormat}
          calendarYear={calendarYear}
          calendarMonth={calendarMonth}
          calendarDay={calendarDay}
          changeDate={handleChangeDate}
          onDateClick={() => setShowInputs(true)}
        />
      )}

      {showInputs && (
        <CalendarInput
          changeDate={(newDate) => {
            handleChangeDate(newDate);
            setShowInputs(false);
          }}
          calendarYear={calendarYear}
          calendarMonth={calendarMonth}
          calendarDay={calendarDay}
          calendarFormat={calendarFormat}
          onCancel={() => setShowInputs(false)}
          clickAwayCalendarInput={() => setShowInputs(false)}
        />
      )}

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
        onDragStart={(todoId) => setTodoIdDragged(todoId)}
        onEdit={editTodo}
        onDelete={deleteTodo}
        toggleCompleteTodo={toggleCompleteTodo}
        closeTooltip={() => setShowTooltip(false)}
      />
    </StyledCalendarPage>
  );
};

CalendarPage.propTypes = {
  todos: PropTypes.array.isRequired,
  modifyTodos: PropTypes.func.isRequired,
};

export default CalendarPage;
