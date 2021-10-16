import PropTypes from "prop-types";
import styled from "styled-components";
import Day from "./Day";

const StyledWeeklyCalendar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .day {
    width: 14%;
  }
`;

const weekDaysNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

const WeeklyCalendar = ({ year, month, day, todos, onDrop }) => {
  const days = function () {
    const daysArray = [{ year, month: monthsNames[month], day }];
    const dayNumber = new Date(year, month, day).getDay() - 1;
    for (let i = 1; i <= dayNumber; i++) {
      const precendentDayInTheWeek = new Date(year, month, parseInt(day) - i);
      daysArray.unshift({
        year: precendentDayInTheWeek.getFullYear(),
        month: monthsNames[precendentDayInTheWeek.getMonth()],
        day: precendentDayInTheWeek.getDate(),
      });
    }
    for (let i = 1; i < weekDaysNames.length - dayNumber; i++) {
      const nextDayInTheWeek = new Date(year, month, parseInt(day) + i);
      daysArray.push({
        year: nextDayInTheWeek.getFullYear(),
        month: monthsNames[nextDayInTheWeek.getMonth()],
        day: nextDayInTheWeek.getDate(),
      });
    }
    return daysArray;
  };

  return (
    <StyledWeeklyCalendar>
      {days().map((day, index) => (
        <div key={`${day.day} ${day.month} ${day.year}`} className="day">
          <div className="day-date">{`${day.day} ${day.month} ${day.year}`}</div>
          <Day
            year={`${day.year}`}
            month={day.month}
            day={`${day.day}`}
            todos={todos}
            showHours={index === 0}
            onDrop={onDrop}
          />
        </div>
      ))}
    </StyledWeeklyCalendar>
  );
};

export default WeeklyCalendar;

WeeklyCalendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  todos: PropTypes.array,
};
