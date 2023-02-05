import { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";

const StyledCalendarDate = styled.div`
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

const CalendarDate = ({
  calendarFormat,
  calendarYear,
  calendarMonth,
  calendarDay,
  changeDate,
  onDateClick,
}) => {
  const handleDateBackward = () => {
    let newDate, newYear, newMonth, newDay;
    if (calendarFormat === "week") {
      newDate = new Date(
        calendarYear,
        calendarMonth,
        parseInt(calendarDay) - 7
      );
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = newDate.getDate();
    } else if (calendarFormat === "day") {
      newDate = new Date(
        calendarYear,
        calendarMonth,
        parseInt(calendarDay) - 1
      );
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = newDate.getDate();
    } else if (calendarFormat === "month") {
      newDate = new Date(calendarYear, calendarMonth, 0);
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = calendarDay;
    } else if (calendarFormat === "year") {
      newYear = parseInt(calendarYear) - 1;
      newMonth = calendarMonth;
      newDay = calendarDay;
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
        calendarYear,
        calendarMonth,
        parseInt(calendarDay) + 7
      );
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = newDate.getDate();
    } else if (calendarFormat === "day") {
      newDate = new Date(
        calendarYear,
        calendarMonth,
        parseInt(calendarDay) + 1
      );
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = newDate.getDate();
    } else if (calendarFormat === "month") {
      newDate = new Date(
        calendarYear,
        calendarMonth,
        new Date(calendarYear, calendarMonth + 1, 0).getDate() + 1
      );
      newYear = newDate.getFullYear();
      newMonth = newDate.getMonth();
      newDay = calendarDay;
    } else if (calendarFormat === "year") {
      newYear = parseInt(calendarYear) + 1;
      newMonth = calendarMonth;
      newDay = calendarDay;
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
          new Date(parseInt(calendarYear) - 1, 1, 1).getFullYear() < 1000;
      }
      if (calendarFormat === "month") {
        outLimit =
          new Date(parseInt(calendarYear), calendarMonth - 1, 1).getFullYear() <
          1000;
      }
      if (calendarFormat === "week") {
        outLimit =
          new Date(
            parseInt(calendarYear),
            calendarMonth,
            parseInt(calendarDay) - 7
          ).getFullYear() < 1000;
      }
      if (calendarFormat === "day") {
        outLimit =
          new Date(
            parseInt(calendarYear),
            calendarMonth,
            parseInt(calendarDay) - 1
          ).getFullYear() < 1000;
      }
    }
    if (type === "increment") {
      if (calendarFormat === "year") {
        outLimit =
          new Date(parseInt(calendarYear) + 1, 1, 1).getFullYear() > 9999;
      }
      if (calendarFormat === "month") {
        outLimit =
          new Date(parseInt(calendarYear), calendarMonth + 1, 1).getFullYear() >
          9999;
      }
      if (calendarFormat === "week") {
        outLimit =
          new Date(
            parseInt(calendarYear),
            calendarMonth,
            parseInt(calendarDay) + 7
          ).getFullYear() > 9999;
      }
      if (calendarFormat === "day") {
        outLimit =
          new Date(
            parseInt(calendarYear),
            calendarMonth,
            parseInt(calendarDay) + 1
          ).getFullYear() > 9999;
      }
    }
    return outLimit;
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 37) {
      handleDateBackward();
    } else if (e.keyCode === 39) {
      handleDateForward();
    }
  };

  //Keyboard left and right arrows increment/decrement calendar date
  useEffect(
    () => {
      document.addEventListener("keyup", handleKeyDown);
      return () => document.removeEventListener("keyup", handleKeyDown);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [calendarYear, calendarMonth, calendarDay, calendarFormat]
  );

  return (
    <StyledCalendarDate>
      {!dateGoingOutLimit("decrement") && (
        <IconButton className="arrow" onClick={handleDateBackward}>
          <ArrowBackIosNewIcon />
        </IconButton>
      )}
      {
        <Button
          sx={{ color: "black", textTransform: "capitalize" }}
          size="large"
          onClick={onDateClick}
        >
          {typeof calendarDay === "number" ? `${calendarDay} ` : ""}
          {typeof calendarMonth === "number"
            ? `${monthsNames[calendarMonth]} `
            : ""}
          {typeof calendarYear === "number" ? `${calendarYear}` : ""}
        </Button>
      }
      {!dateGoingOutLimit("increment") && (
        <IconButton className="arrow" onClick={handleDateForward}>
          <ArrowForwardIosIcon />
        </IconButton>
      )}
    </StyledCalendarDate>
  );
};

CalendarDate.propTypes = {
  calendarFormat: PropTypes.string.isRequired,
  calendarYear: PropTypes.number.isRequired,
  calendarMonth: PropTypes.number,
  calendarDay: PropTypes.number,
  changeDate: PropTypes.func.isRequired,
  onDateClick: PropTypes.func.isRequired,
};

export default CalendarDate;
