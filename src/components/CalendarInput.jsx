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
        .every((element) => !isNaN(parseInt(element))) === false
    ) {
      if (!inputError.includes("year")) {
        arrayError = [...arrayError, "year"];
      }
    } else if (arrayError.includes("year")) {
      arrayError.splice(arrayError.indexOf("year"), 1);
    }
    // Verify if there is month to submit and if it's a correct month name
    if (
      monthGoingToSubmit.length > 0 &&
      !monthsNames.some((element) => element === monthGoingToSubmit)
    ) {
      if (!inputError.includes("month")) {
        arrayError = [...arrayError, "month"];
      }
    } else if (arrayError.includes("month")) {
      arrayError.splice(arrayError.indexOf("month"), 1);
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
    if (monthGoingToSubmit.length === 0) {
      changeDate({
        format: "year",
        year: `${yearGoingToSubmit}`,
        month: monthGoingToSubmit,
      });
    } else if (monthGoingToSubmit.length > 0) {
      changeDate({
        format: "month",
        year: `${yearGoingToSubmit}`,
        month: monthGoingToSubmit,
      });
    }
  };

  const handleDateBackward = () => {
    if (monthGoingToSubmit.length === 0) {
      setYearGoingToSubmit((prev) => `${parseInt(prev) - 1}`);
      changeDate({
        format: "year",
        year: `${yearGoingToSubmit - 1}`,
        month: monthGoingToSubmit,
      });
    } else if (monthGoingToSubmit.length > 0) {
      if (monthGoingToSubmit === "January") {
        setYearGoingToSubmit((prev) => `${parseInt(prev) - 1}`);
        setMonthGoingToSubmit(monthsNames[monthsNames.length - 1]);
        changeDate({
          format: "month",
          year: `${parseInt(yearGoingToSubmit) - 1}`,
          month: monthsNames[monthsNames.length - 1],
        });
      } else {
        setMonthGoingToSubmit(
          (prev) => monthsNames[monthsNames.indexOf(prev) - 1]
        );
        changeDate({
          format: "month",
          year: `${yearGoingToSubmit}`,
          month: monthsNames[monthsNames.indexOf(monthGoingToSubmit) - 1],
        });
      }
    }
  };

  const handleDateForward = () => {
    if (monthGoingToSubmit.length === 0) {
      setYearGoingToSubmit((prev) => `${parseInt(prev) + 1}`);
      changeDate({
        format: "year",
        year: `${parseInt(yearGoingToSubmit) + 1}`,
        month: monthGoingToSubmit,
      });
    } else if (monthGoingToSubmit.length > 0) {
      if (monthGoingToSubmit === "December") {
        setYearGoingToSubmit((prev) => `${parseInt(prev) + 1}`);
        setMonthGoingToSubmit(monthsNames[0]);
        changeDate({
          format: "month",
          year: `${parseInt(yearGoingToSubmit) + 1}`,
          month: monthsNames[0],
        });
      } else {
        setMonthGoingToSubmit(
          (prev) => monthsNames[monthsNames.indexOf(prev) + 1]
        );
        changeDate({
          format: "month",
          year: `${yearGoingToSubmit}`,
          month: monthsNames[monthsNames.indexOf(monthGoingToSubmit) + 1],
        });
      }
    }
  };

  return (
    <StyledCalendarInput>
      <div className="arrow" onClick={(e) => handleNewDate(e, "decrement")}>
        &#10092;
      </div>

      <form onSubmit={(e) => handleNewDate(e, "submit")}>
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
