import PropTypes from "prop-types";
import styled from "styled-components";
import Month from "./Month";

const StyledYearlyCalendar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  & > .month {
    display: flex;
    flex-direction: column;
    width: 13%;
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
    box-sizing: border-box;
    border: 1px solid;
    justify-content: flex-start;
  }
`;

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

const YearlyCalendar = ({
  year,
  onMonthClick,
  dateSelected,
  onDayClick,
  onDayDoubleClick,
  showTooltip,
  todos,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  toggleCompleteTodo,
  closeTooltip,
}) => {
  return (
    <StyledYearlyCalendar>
      {monthsNames.map((month, index) => (
        <div key={month} className="month">
          <div
            className="month-name"
            onClick={() =>
              onMonthClick({
                day: "",
                month: index,
                year: year,
                format: "month",
              })
            }
          >
            {month}
          </div>
          <Month
            month={index}
            year={year}
            dateSelected={dateSelected}
            onDayClick={onDayClick}
            onDayDoubleClick={onDayDoubleClick}
            showTooltip={showTooltip}
            todos={todos}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onEdit={onEdit}
            onDelete={onDelete}
            toggleCompleteTodo={toggleCompleteTodo}
            closeTooltip={closeTooltip}
          />
        </div>
      ))}
    </StyledYearlyCalendar>
  );
};

export default YearlyCalendar;

YearlyCalendar.propTypes = {
  year: PropTypes.number.isRequired,
  onMonthClick: PropTypes.func.isRequired,
  dateSelected: PropTypes.object.isRequired,
  onDayDoubleClick: PropTypes.func.isRequired,
  showTooltip: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  closeTooltip: PropTypes.func.isRequired,
};
