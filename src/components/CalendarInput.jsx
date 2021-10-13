import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCalendarInput = styled.div`
  grid-area: input;
  margin-left: 45%;
  width: 30vw;
  display: flex;
  flex-direction: row;
  & .arrow {
    display: inline;
    margin-left: 1em;
    margin-right: 1em;
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

const CalendarInput = ({
  changeDate,
  dayGoingToSubmit,
  monthGoingToSubmit,
  yearGoingToSubmit,
}) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  const [daySelected, setDaySelected] = useState(
    dayGoingToSubmit.length > 0 ? dayGoingToSubmit : "empty"
  );

  const [monthSelected, setMonthSelected] = useState(
    monthGoingToSubmit.length > 0
      ? monthsNames.indexOf(monthGoingToSubmit)
      : "empty"
  );

  const [yearSelected, setYearSelected] = useState(yearGoingToSubmit);

  const onMonthChange = (monthNumber) => {
    setMonthSelected(monthNumber);
    if (!yearSelected) {
      return setDaysInMonth([]);
    }
    const numberOfDays = new Date(
      yearSelected,
      parseInt(monthNumber) + 1,
      0
    ).getDate();
    setDaysInMonth([...Array(numberOfDays).keys()].map((x) => x + 1));
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    let newFormat, newYear, newMonth, newDay;
    if (daySelected !== "empty") {
      newFormat = "day";
      newYear = yearSelected;
      newMonth = monthsNames[parseInt(monthSelected)];
      newDay = daySelected;
    } else if (monthSelected !== "empty") {
      newFormat = "month";
      newYear = yearSelected;
      newMonth = monthsNames[parseInt(monthSelected)];
      newDay = "";
    } else {
      newFormat = "year";
      newYear = yearSelected;
      newMonth = "";
      newDay = "";
    }
    changeDate({
      format: newFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  return (
    <StyledCalendarInput>
      {
        <form onSubmit={handleDateSubmit}>
          <select
            name="day-input"
            value={daySelected}
            onChange={(e) => setDaySelected(e.target.value)}
          >
            <option value="empty"></option>
            {daysInMonth.map((dayNumber) => (
              <option key={dayNumber} value={dayNumber}>
                {dayNumber}
              </option>
            ))}
          </select>
          <select
            name="month-input"
            value={monthSelected}
            onChange={(e) => onMonthChange(e.target.value)}
          >
            <option value="empty"></option>
            {monthsNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          <input
            name="year-input"
            type="number"
            value={yearSelected}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            min={1000}
            max={9999}
            onChange={(e) => setYearSelected(e.target.value)}
          />
          <input type="submit" />
        </form>
      }
    </StyledCalendarInput>
  );
};

CalendarInput.propTypes = {
  changeDate: PropTypes.func,
  dayGoingToSubmit: PropTypes.string,
  monthGoingToSubmit: PropTypes.string,
  yearGoingToSubmit: PropTypes.string,
  onInputChange: PropTypes.func,
  calendarFormat: PropTypes.string,
};

export default CalendarInput;
