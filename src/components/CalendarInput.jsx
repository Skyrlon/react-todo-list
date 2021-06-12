import { useState } from "react";
import styled from "styled-components";

const StyledCalendarInput = styled.div`
  & .arrow {
    display: inline;
    margin-left: 1em;
    margin-right: 1em;
  }
`;

const CalendarInput = ({ changeDate }) => {
  const [yearGoingToSubmit, setYearGoingToSubmit] = useState(
    `${new Date(Date.now()).getFullYear()}`
  );
  const [monthGoingToSubmit, setMonthGoingToSubmit] = useState("");
  const [dayGoingToSubmit, setDayGoingToSubmit] = useState("");

  const [inputError, setInputError] = useState([]);
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
    // Verify year is not inferior or superior to date limit and each character is a number
    if (
      yearGoingToSubmit < -271820 ||
      yearGoingToSubmit > 275759 ||
      yearGoingToSubmit
        .split("")
        .every((element) => !isNaN(parseInt(element))) === false ||
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
        !monthsNames.some((element) => element === monthGoingToSubmit)) ||
      (monthGoingToSubmit.length === 0 && dayGoingToSubmit.length > 0)
    ) {
      if (!inputError.includes("month")) {
        arrayError = [...arrayError, "month"];
      }
    } else if (arrayError.includes("month")) {
      arrayError.splice(arrayError.indexOf("month"), 1);
    }
    //verifier si le nombre n'est pas superieur au nombre de jours du mois (e.g 30 pour fevrier)
    if (
      dayGoingToSubmit.length > 0 &&
      (dayGoingToSubmit
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

    //If all input values are correct, set up the calendar with the year and month (if there is one) submited
    if (arrayError.length === 0) {
      if (type === "submit") handleDateSubmit();
      if (type === "decrement") handleDateBackward();
      if (type === "increment") handleDateForward();
    }
  };

  const handleDateSubmit = () => {
    if (dayGoingToSubmit.length > 0) {
      changeDate({
        format: "day",
        year: `${yearGoingToSubmit}`,
        month: monthGoingToSubmit,
        day: dayGoingToSubmit,
      });
    } else if (monthGoingToSubmit.length > 0) {
      changeDate({
        format: "month",
        year: `${yearGoingToSubmit}`,
        month: monthGoingToSubmit,
        day: dayGoingToSubmit,
      });
    } else {
      changeDate({
        format: "year",
        year: `${yearGoingToSubmit}`,
        month: monthGoingToSubmit,
        day: dayGoingToSubmit,
      });
    }
  };

  const handleDateBackward = () => {
    let newFormat, newYear, newMonth, newDay;
    if (dayGoingToSubmit.length > 0) {
      newFormat = "day";
      if (
        parseInt(dayGoingToSubmit) === 1 &&
        monthGoingToSubmit !== "January"
      ) {
        newYear = `${yearGoingToSubmit}`;
        newMonth = monthsNames[monthsNames.indexOf(monthGoingToSubmit) - 1];
        newDay = new Date(
          yearGoingToSubmit,
          monthsNames.indexOf(monthGoingToSubmit),
          0
        );
      } else if (
        parseInt(dayGoingToSubmit) === 1 &&
        monthGoingToSubmit === "January"
      ) {
        newYear = `${parseInt(yearGoingToSubmit) - 1}`;
        newMonth = monthsNames[monthsNames.length - 1];
        newDay = new Date(
          yearGoingToSubmit,
          monthsNames.indexOf(monthGoingToSubmit),
          0
        );
      } else {
        newYear = yearGoingToSubmit;
        newMonth = monthGoingToSubmit;
        newDay = parseInt(dayGoingToSubmit) - 1;
      }
    } else if (monthGoingToSubmit.length > 0) {
      newFormat = "month";
      if (monthGoingToSubmit === "January") {
        newYear = `${parseInt(yearGoingToSubmit) - 1}`;
        newMonth = monthsNames[monthsNames.length - 1];
        newDay = dayGoingToSubmit;
      } else {
        newYear = `${yearGoingToSubmit}`;
        newMonth = monthsNames[monthsNames.indexOf(monthGoingToSubmit) - 1];
        newDay = dayGoingToSubmit;
      }
    } else {
      newFormat = "year";
      newYear = `${yearGoingToSubmit - 1}`;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    }
    setYearGoingToSubmit(newYear);
    setMonthGoingToSubmit(newMonth);
    setDayGoingToSubmit(newDay);
    changeDate({
      format: `${newFormat}`,
      year: `${newYear}`,
      month: `${newMonth}`,
      day: `${newDay}`,
    });
  };

  const handleDateForward = () => {
    let newFormat, newYear, newMonth, newDay;
    if (dayGoingToSubmit.length > 0) {
      newFormat = "day";
      if (
        parseInt(dayGoingToSubmit) ===
          new Date(
            yearGoingToSubmit,
            monthsNames.indexOf(monthGoingToSubmit),
            0
          ) &&
        monthGoingToSubmit !== "December"
      ) {
        newYear = `${yearGoingToSubmit}`;
        newMonth = monthsNames[monthsNames.indexOf(monthGoingToSubmit) + 1];
        newDay = 1;
      } else if (
        parseInt(dayGoingToSubmit) >
          new Date(
            yearGoingToSubmit,
            monthsNames.indexOf(monthGoingToSubmit),
            0
          ) &&
        monthGoingToSubmit === "December"
      ) {
        newYear = `${parseInt(yearGoingToSubmit) + 1}`;
        newMonth = monthsNames[monthsNames.length + 1];
        newDay = 1;
      } else {
        newYear = yearGoingToSubmit;
        newMonth = monthGoingToSubmit;
        newDay = parseInt(dayGoingToSubmit) + 1;
      }
    } else if (monthGoingToSubmit.length > 0) {
      newFormat = "month";
      if (monthGoingToSubmit === "December") {
        newYear = `${parseInt(yearGoingToSubmit) + 1}`;
        newMonth = monthsNames[0];
        newDay = dayGoingToSubmit;
      } else {
        newYear = `${yearGoingToSubmit}`;
        newMonth = monthsNames[monthsNames.indexOf(monthGoingToSubmit) + 1];
        newDay = dayGoingToSubmit;
      }
    } else {
      newFormat = "year";
      newYear = `${yearGoingToSubmit + 1}`;
      newMonth = monthGoingToSubmit;
      newDay = dayGoingToSubmit;
    }
    setYearGoingToSubmit(newYear);
    setMonthGoingToSubmit(newMonth);
    setDayGoingToSubmit(newDay);
    changeDate({
      format: `${newFormat}`,
      year: `${newYear}`,
      month: `${newMonth}`,
      day: `${newDay}`,
    });
  };

  return (
    <StyledCalendarInput>
      <div className="arrow" onClick={(e) => handleNewDate(e, "decrement")}>
        &#10092;
      </div>

      <form onSubmit={(e) => handleNewDate(e, "submit")}>
        <input
          name="day-input"
          type="text"
          value={dayGoingToSubmit}
          onChange={(e) => setDayGoingToSubmit(e.target.value)}
        />
        {inputError.includes("day") && (
          <div className="day-input_error">Put a valid day</div>
        )}
        <input
          name="month-input"
          type="text"
          value={monthGoingToSubmit}
          onChange={(e) => setMonthGoingToSubmit(e.target.value)}
        />
        {inputError.includes("month") && (
          <div className="month-input_error">Put a valid month</div>
        )}
        <input
          name="year-input"
          type="text"
          value={yearGoingToSubmit}
          onChange={(e) => setYearGoingToSubmit(e.target.value)}
        />
        {inputError.includes("year") && (
          <div className="year-input_error">Put a valid year</div>
        )}
        <input type="submit" />
      </form>

      <div className="arrow" onClick={(e) => handleNewDate(e, "increment")}>
        &#10093;
      </div>
    </StyledCalendarInput>
  );
};

export default CalendarInput;
