import { useState } from "react";
import styled from "styled-components";

const StyledCalendarInput = styled.div`
  display: flex;
  flex-direction: row;
  & .arrow {
    display: inline;
    margin-left: 1em;
    margin-right: 1em;
  }
`;

const CalendarInput = ({
  changeDate,
  dayGoingToSubmit,
  monthGoingToSubmit,
  yearGoingToSubmit,
  onInputChange,
  calendarFormat,
}) => {
  const [inputError, setInputError] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

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

  const handleNewDate = (e, type) => {
    e.preventDefault();
    let arrayError = inputError;
    // Verify year is not inferior or superior to date limit (stay in year with 4 numerical digits) and each character is a number
    if (
      parseInt(yearGoingToSubmit) < 1000 ||
      parseInt(yearGoingToSubmit) > 9999 ||
      (type === "decrement" && parseInt(yearGoingToSubmit) === 1000) ||
      (type === "increment" && parseInt(yearGoingToSubmit) === 9999) ||
      !yearGoingToSubmit
        .toString()
        .split("")
        .every((element) => !isNaN(parseInt(element))) ||
      yearGoingToSubmit.length === 0
    ) {
      if (!inputError.includes("year")) {
        arrayError = [...arrayError, "year"];
      }
    } else if (arrayError.includes("year")) {
      arrayError.splice(arrayError.indexOf("year"), 1);
    }
    // Verify if there is month to submit and if it's a correct month name
    if (
      (monthGoingToSubmit.length > 0 &&
        !monthsNames.some(
          (element) =>
            element.toLowerCase() === monthGoingToSubmit.toLowerCase()
        )) ||
      (monthGoingToSubmit.length === 0 && dayGoingToSubmit.length > 0)
    ) {
      if (!inputError.includes("month")) {
        arrayError = [...arrayError, "month"];
      }
    } else if (arrayError.includes("month")) {
      arrayError.splice(arrayError.indexOf("month"), 1);
    }
    //Verify if there is a day to submit, if all elements are numbers, and it's not superior to max day of the month or inferior to 1
    if (
      dayGoingToSubmit.toString().length > 0 &&
      (dayGoingToSubmit
        .toString()
        .split("")
        .every((element) => !isNaN(parseInt(element))) === false ||
        parseInt(dayGoingToSubmit) >
          new Date(
            yearGoingToSubmit,
            monthsNames.indexOf(monthGoingToSubmit) + 1,
            0
          ).getDate() ||
        parseInt(dayGoingToSubmit) < 1)
    ) {
      if (!inputError.includes("day")) {
        arrayError = [...arrayError, "day"];
      }
    } else if (arrayError.includes("day")) {
      arrayError.splice(arrayError.indexOf("day"), 1);
    }

    setInputError([...arrayError]);

    //If all input values are correct, set up the calendar with the values submited
    if (arrayError.length === 0) {
      if (type === "submit") handleDateSubmit();
      if (type === "decrement") handleDateBackward();
      if (type === "increment") handleDateForward();
    }
  };

  const handleDateSubmit = () => {
    let newFormat, newYear, newMonth, newDay;
    if (dayGoingToSubmit.toString().length > 0) {
      newFormat = "day";
      newYear = yearGoingToSubmit;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    } else if (monthGoingToSubmit.length > 0) {
      newFormat = "month";
      newYear = yearGoingToSubmit;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    } else {
      newFormat = "year";
      newYear = `${yearGoingToSubmit}`;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    }
    changeDate({
      format: newFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
    setShowInputs(false);
  };

  const handleDateBackward = () => {
    let newDate, newYear, newMonth, newDay;
    if (calendarFormat === "week") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        parseInt(dayGoingToSubmit) - 7
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = newDate.getDate();
    } else if (calendarFormat === "day") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        parseInt(dayGoingToSubmit) - 1
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = newDate.getDate();
    } else if (calendarFormat === "month") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        0
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = "";
    } else if (calendarFormat === "year") {
      newYear = parseInt(yearGoingToSubmit) - 1;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    }
    changeDate({
      format: calendarFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  const handleDateForward = () => {
    let newDate, newYear, newMonth, newDay;
    if (calendarFormat === "week") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        parseInt(dayGoingToSubmit) + 7
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = newDate.getDate();
    } else if (calendarFormat === "day") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        parseInt(dayGoingToSubmit) + 1
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = newDate.getDate();
    } else if (calendarFormat === "month") {
      newDate = new Date(
        yearGoingToSubmit,
        monthsNames.indexOf(monthGoingToSubmit),
        new Date(
          yearGoingToSubmit,
          monthsNames.indexOf(monthGoingToSubmit) + 1,
          0
        ).getDate() + 1
      );
      newYear = newDate.getFullYear();
      newMonth = monthsNames[newDate.getMonth()];
      newDay = newDate.getDate();
    } else if (calendarFormat === "year") {
      newYear = parseInt(yearGoingToSubmit) + 1;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    }
    changeDate({
      format: calendarFormat,
      year: newYear,
      month: newMonth,
      day: newDay,
    });
  };

  return (
    <StyledCalendarInput>
      {!showInputs && (
        <div className="arrow" onClick={(e) => handleNewDate(e, "decrement")}>
          &#10092;
        </div>
      )}

      {!showInputs && (
        <div onClick={() => setShowInputs(true)}>
          {dayGoingToSubmit} {monthGoingToSubmit} {yearGoingToSubmit}
        </div>
      )}

      {showInputs && (
        <form onSubmit={(e) => handleNewDate(e, "submit")}>
          <input
            name="day-input"
            type="text"
            value={dayGoingToSubmit}
            onChange={(e) => onInputChange(e.target.value, "day")}
          />
          {inputError.includes("day") && (
            <div className="day-input_error">Put a valid day</div>
          )}
          <input
            name="month-input"
            type="text"
            value={monthGoingToSubmit}
            onChange={(e) => onInputChange(e.target.value, "month")}
          />
          {inputError.includes("month") && (
            <div className="month-input_error">Put a valid month</div>
          )}
          <input
            name="year-input"
            type="text"
            value={yearGoingToSubmit}
            onChange={(e) => onInputChange(e.target.value, "year")}
          />
          {inputError.includes("year") && (
            <div className="year-input_error">Put a valid year</div>
          )}
          <input type="submit" />
        </form>
      )}

      {!showInputs && (
        <div className="arrow" onClick={(e) => handleNewDate(e, "increment")}>
          &#10093;
        </div>
      )}
    </StyledCalendarInput>
  );
};

export default CalendarInput;
