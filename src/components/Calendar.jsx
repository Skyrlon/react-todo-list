import styled from "styled-components";
import PropTypes from "prop-types";
import YearlyCalendar from "./YearlyCalendar";
import Month from "./Month";
import Day from "./Day";
import WeeklyCalendar from "./WeeklyCalendar";

const StyledCalendar = styled.div`
  grid-area: calendar;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 95%;
  height: 75%;
`;

const Calendar = ({
  todos,
  format,
  calendarYear,
  calendarMonth,
  calendarDay,
  onMonthClick,
  dateSelected,
  onDayInMonthClick,
  onDayInMonthDoubleClick,
  showTooltip,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  toggleCompleteTodo,
  closeTooltip,
}) => {
  return (
    <StyledCalendar>
      {format === "year" && (
        <YearlyCalendar
          year={calendarYear}
          onMonthClick={onMonthClick}
          dateSelected={dateSelected}
          onDayClick={onDayInMonthClick}
          onDayDoubleClick={onDayInMonthDoubleClick}
          showTooltip={showTooltip}
          todos={todos}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
          toggleCompleteTodo={toggleCompleteTodo}
          closeTooltip={closeTooltip}
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
          onDrop={onDrop}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
          toggleCompleteTodo={toggleCompleteTodo}
          closeTooltip={closeTooltip}
        />
      )}
      {format === "day" && (
        <Day
          year={calendarYear}
          month={calendarMonth}
          day={calendarDay}
          todos={todos}
          showHours={true}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      )}
      {format === "week" && (
        <WeeklyCalendar
          year={calendarYear}
          month={calendarMonth}
          day={calendarDay}
          todos={todos}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      )}
    </StyledCalendar>
  );
};

Calendar.propTypes = {
  todos: PropTypes.array.isRequired,
  format: PropTypes.string.isRequired,
  calendarYear: PropTypes.number.isRequired,
  calendarMonth: PropTypes.number,
  calendarDay: PropTypes.number,
  onMonthClick: PropTypes.func.isRequired,
  dateSelected: PropTypes.object.isRequired,
  onDayInMonthClick: PropTypes.func.isRequired,
  onDayInMonthDoubleClick: PropTypes.func.isRequired,
  showTooltip: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  closeTooltip: PropTypes.func.isRequired,
};

export default Calendar;
