import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCalendarInput = styled.form`
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
  calendarYear,
  calendarMonth,
  calendarDay,
  onCancel,
}) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  const [daySelected, setDaySelected] = useState(
    typeof calendarDay === "number" ? calendarDay : "empty"
  );

  const [monthSelected, setMonthSelected] = useState(
    typeof calendarMonth === "number" ? calendarMonth : "empty"
  );

  const [yearSelected, setYearSelected] = useState(calendarYear);

  const onMonthChange = (monthNumber) => {
    setMonthSelected(monthNumber);
    if (!yearSelected || monthNumber === "empty") {
      setDaySelected("empty");
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
      newMonth = parseInt(monthSelected);
      newDay = parseInt(daySelected);
    } else if (monthSelected !== "empty") {
      newFormat = "month";
      newYear = yearSelected;
      newMonth = parseInt(monthSelected);
      newDay = null;
    } else {
      newFormat = "year";
      newYear = yearSelected;
      newMonth = null;
      newDay = null;
    }
    console.log({
      format: newFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
    changeDate({
      format: newFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  useEffect(
    () => {
      if (monthSelected !== "empty") onMonthChange(monthSelected);
    }, // eslint-disable-next-line
    []
  );

  return (
    <StyledCalendarInput onSubmit={handleDateSubmit}>
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
      <button onClick={onCancel}>Cancel</button>
    </StyledCalendarInput>
  );
};

CalendarInput.propTypes = {
  changeDate: PropTypes.func.isRequired,
  calendarYear: PropTypes.number.isRequired,
  calendarMonth: PropTypes.number,
  calendarDay: PropTypes.number,
  onCancel: PropTypes.func.isRequired,
};

export default CalendarInput;
