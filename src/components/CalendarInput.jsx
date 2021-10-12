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

  const [daysInMonth, setDaysInMonth] = useState([]);

  const [daySelected, setDaySelected] = useState("empty");

  const [monthSelected, setMonthSelected] = useState("empty");

  const [yearSelected, setYearSelected] = useState(yearGoingToSubmit);

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

  const handleNewDate = (e, type) => {
    e.preventDefault();
    let arrayError = inputError;
    // Verify year is not inferior or superior to date limit (stay in year with 4 numerical digits) and each character is a number
    if (
      parseInt(yearGoingToSubmit) < 1000 ||
      parseInt(yearGoingToSubmit) > 9999 ||
      (calendarFormat === "year" &&
        type === "decrement" &&
        parseInt(yearGoingToSubmit) === 1000) ||
      (calendarFormat === "year" &&
        type === "increment" &&
        parseInt(yearGoingToSubmit) === 9999) ||
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
      newDay = dayGoingToSubmit;
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
      newDay = dayGoingToSubmit;
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

  const dateGoingOutLimit = (type) => {
    let outLimit;
    if (type === "decrement") {
      if (calendarFormat === "year") {
        outLimit =
          new Date(parseInt(yearGoingToSubmit) - 1, 1, 1).getFullYear() < 1000;
      }
      if (calendarFormat === "month") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit) - 1,
            1
          ).getFullYear() < 1000;
      }
      if (calendarFormat === "week") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit),
            parseInt(dayGoingToSubmit) - 7
          ).getFullYear() < 1000;
      }
      if (calendarFormat === "day") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit),
            parseInt(dayGoingToSubmit) - 1
          ).getFullYear() < 1000;
      }
    }
    if (type === "increment") {
      if (calendarFormat === "year") {
        outLimit =
          new Date(parseInt(yearGoingToSubmit) + 1, 1, 1).getFullYear() > 9999;
      }
      if (calendarFormat === "month") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit) + 1,
            1
          ).getFullYear() > 9999;
      }
      if (calendarFormat === "week") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit),
            parseInt(dayGoingToSubmit) + 7
          ).getFullYear() > 9999;
      }
      if (calendarFormat === "day") {
        outLimit =
          new Date(
            parseInt(yearGoingToSubmit),
            monthsNames.indexOf(monthGoingToSubmit),
            parseInt(dayGoingToSubmit) + 1
          ).getFullYear() > 9999;
      }
    }
    return outLimit;
  };

  return (
    <StyledCalendarInput>
      {!showInputs && !dateGoingOutLimit("decrement") && (
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
            onChange={(e) => setYearSelected(e.target.selected)}
          />
          <input type="submit" />
        </form>
      )}

      {!showInputs && !dateGoingOutLimit("increment") && (
        <div className="arrow" onClick={(e) => handleNewDate(e, "increment")}>
          &#10093;
        </div>
      )}
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
