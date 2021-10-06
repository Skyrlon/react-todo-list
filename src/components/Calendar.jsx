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
