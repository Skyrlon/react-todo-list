import styled from "styled-components";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledCalendarDate = styled.div`
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

const CalendarDate = ({
  calendarFormat,
  dayGoingToSubmit,
  monthGoingToSubmit,
  yearGoingToSubmit,
  changeDate,
  onDateClick,
}) => {
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
    <StyledCalendarDate>
      {!dateGoingOutLimit("decrement") && (
        <div className="arrow" onClick={handleDateBackward}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      )}
      {
        <div onClick={onDateClick}>
          {dayGoingToSubmit} {monthGoingToSubmit} {yearGoingToSubmit}
        </div>
      }
      {!dateGoingOutLimit("increment") && (
        <div className="arrow" onClick={handleDateForward}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      )}
    </StyledCalendarDate>
  );
};

export default CalendarDate;
