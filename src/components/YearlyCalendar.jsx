import PropTypes from "prop-types";
import styled from "styled-components";
import Month from "./Month";

const StyledYearlyCalendar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  & > .month {
    display: flex;
    flex-direction: column;
    height: 45%;
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
    box-sizing: border-box;
    justify-content: flex-start;

    @media (max-width: 799px) {
      flex: 0 0 90%;
      margin-left: 5%;
    }

    @media (min-width: 800px) and (max-width: 999px) {
      flex: 0 0 40%;
    }

    @media (min-width: 1000px) and (max-width: 1399px) {
      flex: 0 0 30%;
    }

    @media (min-width: 1400px) {
      flex: 0 0 calc(100% / 5);
    }
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
                day: null,
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
