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
  onDayInMonthClick,
}) => {
  return (
    <StyledYearlyCalendar>
      {monthsNames.map((month) => (
        <div key={month} className="month">
          <div
            className="month-name"
            onClick={() =>
              onMonthClick({
                day: "",
                month: month,
                year: year,
                format: "month",
              })
            }
          >
            {month}
          </div>
          <Month
            month={month}
            year={year}
            dateSelected={dateSelected}
            onDayInMonthClick={onDayInMonthClick}
          />
        </div>
      ))}
    </StyledYearlyCalendar>
  );
};

export default YearlyCalendar;

YearlyCalendar.propTypes = {
  year: PropTypes.string,
  onMonthClick: PropTypes.func,
  dateSelected: PropTypes.string,
  onDayInMonthClick: PropTypes.func,
};
