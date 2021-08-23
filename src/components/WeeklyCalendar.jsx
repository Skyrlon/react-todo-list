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

const WeeklyCalendar = ({ year, month, day, todos }) => {
  const days = function () {
    const daysArray = [{ year, month, day }];
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(new Date(`${day} ${month} ${year}`));
    for (let i = 1; i <= weekDaysNames.indexOf(dayName); i++) {
      const precendentDayInTheWeek = new Date(
        year,
        monthsNames.indexOf(month),
        parseInt(day) - i
      );
      daysArray.unshift({
        year: precendentDayInTheWeek.getFullYear(),
        month: monthsNames[precendentDayInTheWeek.getMonth()],
        day: precendentDayInTheWeek.getDate(),
      });
    }
    for (
      let i = 1;
      i < weekDaysNames.length - weekDaysNames.indexOf(dayName);
      i++
    ) {
      const nextDayInTheWeek = new Date(
        year,
        monthsNames.indexOf(month),
        parseInt(day) + i
      );
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
          />
        </div>
      ))}
    </StyledWeeklyCalendar>
  );
};

export default WeeklyCalendar;

WeeklyCalendar.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  todos: PropTypes.array,
};
