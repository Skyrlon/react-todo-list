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
        />
      )}
      {format === "week" && (
        <WeeklyCalendar
          year={calendarYear}
          month={calendarMonth}
          day={calendarDay}
          todos={todos}
          onDrop={onDrop}
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
};

export default Calendar;
