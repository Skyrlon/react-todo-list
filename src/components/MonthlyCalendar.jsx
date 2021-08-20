import PropTypes from "prop-types";
import styled from "styled-components";
import Month from "./Month";

const StyledMonthlyCalendar = styled.div`
  width: 90%;
`;

const MonthlyCalendar = ({
  year,
  month,
  dateSelected,
  onDayClick,
  onDayDoubleClick,
  showTooltip,
  todos,
}) => {
  return (
    <StyledMonthlyCalendar>
      <Month
        month={month}
        year={year}
        dateSelected={dateSelected}
        onDayClick={onDayClick}
        onDayDoubleClick={onDayDoubleClick}
        showTooltip={showTooltip}
        todos={todos}
      />
    </StyledMonthlyCalendar>
  );
};

export default MonthlyCalendar;

MonthlyCalendar.propTypes = {
  year: PropTypes.string,
  onMonthClick: PropTypes.func,
  dateSelected: PropTypes.string,
  onDayInMonthClick: PropTypes.func,
  onDayDoubleClick: PropTypes.func,
  showTooltip: PropTypes.bool,
  todos: PropTypes.array,
};
