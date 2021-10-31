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

const WeeklyCalendar = ({
  year,
  month,
  day,
  todos,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  toggleCompleteTodo,
}) => {
  const days = function () {
    const daysArray = [{ year, month: month, day }];
    //handle getDate which starts with Sunday instead of Monday
    const dayNumber =
      new Date(year, month, day).getDay() === 0
        ? 6
        : new Date(year, month, day).getDay() - 1;
    //Put all previous days before dateSelected
    for (let i = 1; i <= dayNumber; i++) {
      const precendentDayInTheWeek = new Date(year, month, day - i);
      daysArray.unshift({
        year: precendentDayInTheWeek.getFullYear(),
        month: precendentDayInTheWeek.getMonth(),
        day: precendentDayInTheWeek.getDate(),
      });
    }
    //Put all next days after dateSelected
    for (let i = 1; i < weekDaysNames.length - dayNumber; i++) {
      const nextDayInTheWeek = new Date(year, month, day + i);
      daysArray.push({
        year: nextDayInTheWeek.getFullYear(),
        month: nextDayInTheWeek.getMonth(),
        day: nextDayInTheWeek.getDate(),
      });
    }
    return daysArray;
  };

  return (
    <StyledWeeklyCalendar>
      {days().map((day, index) => (
        <div key={`${day.day} ${day.month} ${day.year}`} className="day">
          <div className="day-date">{`${day.day} ${monthsNames[day.month]} ${
            day.year
          }`}</div>
          <Day
            year={day.year}
            month={day.month}
            day={day.day}
            todos={todos}
            showHours={index === 0}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onEdit={onEdit}
            onDelete={onDelete}
            toggleCompleteTodo={toggleCompleteTodo}
          />
        </div>
      ))}
    </StyledWeeklyCalendar>
  );
};

export default WeeklyCalendar;

WeeklyCalendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  todos: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
};
