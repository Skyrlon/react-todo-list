import { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarInput from "./CalendarInput.jsx";
import Calendar from "./Calendar.jsx";

const StyledCalendarPage = styled.div`
  display: flex;
  width: 99vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
`;

const CalendarPage = ({ todos }) => {
  const [calendarYear, setCalendarYear] = useState(
    `${new Date(Date.now()).getFullYear()}`
  );
  const [calendarMonth, setCalendarMonth] = useState("");

  const [calendarDay, setCalendarDay] = useState("");

  const [inputYear, setInputYear] = useState(calendarYear);
  const [inputMonth, setInputMonth] = useState(calendarMonth);
  const [inputDay, setInputDay] = useState(calendarDay);

  const [dateAsked, setDateAsked] = useState(calendarYear);

  const [showTooltip, setShowTooltip] = useState(false);

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

  const [dateSelected, setDateSelected] = useState(
    `${new Date(Date.now()).getFullYear()}-${
      new Date(Date.now()).getMonth() + 1 < 10
        ? `0${new Date(Date.now()).getMonth() + 1}`
        : new Date(Date.now()).getMonth() + 1
    }-${
      new Date(Date.now()).getDate() < 10
        ? `0${new Date(Date.now()).getDate()}`
        : new Date(Date.now()).getDate()
    }`
  );

  const weekDaysNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [calendarFormat, setCalendarFormat] = useState("year");

  const setUpCalendar = () => {
    let array = [];
    if (calendarFormat === "year" || calendarFormat === "month") {
      let startingMonth, endingMonth;
      if (calendarFormat === "year") {
        startingMonth = 0;
        endingMonth = monthsNames.length;
      } else if (calendarFormat === "month") {
        startingMonth = monthsNames.indexOf(calendarMonth);
        endingMonth = startingMonth + 1;
      }

      for (let i = startingMonth; i < endingMonth; i++) {
        let daysInMonth = new Date(calendarYear, i + 1, 0).getDate();
        let days = [];
        let date =
          calendarFormat === "year"
            ? `${monthsNames[i]} ${calendarYear}`
            : `${calendarMonth} ${calendarYear}`;

        for (let j = 0; j < daysInMonth; j++) {
          days.push({
            name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
              new Date(`${j + 1} ${date}`)
            ),
            number: j + 1 < 10 ? `0${j + 1}` : j + 1,
          });
        }

        let daysBeforeFirstDay = weekDaysNames.indexOf(days[0].name);
        for (let k = 0; k < daysBeforeFirstDay; k++) {
          days.unshift({ name: "", number: -k - 1 });
        }

        let daysAfterLastDay =
          weekDaysNames.length -
          (weekDaysNames.indexOf(days[days.length - 1].name) + 1);
        for (let l = 0; l < daysAfterLastDay; l++) {
          days.push({
            name: "",
            number: days.length + 1,
          });
        }

        array.push({
          number: i + 1 < 10 ? `0${i + 1}` : i + 1,
          name: monthsNames[i],
          days: days,
        });
      }
    } else if (calendarFormat === "day" || calendarFormat === "week") {
      let numberOfDays;
      let startingDay;
      const numberOfHours = 24;
      const numberOfMinutes = 60;
      if (calendarFormat === "day") {
        numberOfDays = 1;
        startingDay = {
          year: dateSelected.split("-")[0],
          month: parseInt(dateSelected.split("-")[1]),
          day: dateSelected.split("-")[2],
        };
      }
      if (calendarFormat === "week") {
        numberOfDays = 7;

        let weekDaySelected = new Date(dateSelected).getDay();
        weekDaySelected =
          weekDaySelected === 0
            ? weekDaysNames[weekDaysNames.length - 1]
            : weekDaysNames[weekDaySelected - 1];

        const mondayDay = {
          year: dateSelected.split("-")[0],
          month: parseInt(dateSelected.split("-")[1]),
          day:
            parseInt(dateSelected.split("-")[2]) -
            weekDaysNames.indexOf(weekDaySelected),
        };
        startingDay = mondayDay;
      }

      for (let i = 0; i < numberOfDays; i++) {
        let date = new Date(
          startingDay.year,
          parseInt(startingDay.month) - 1,
          parseInt(startingDay.day) + i
        );
        date = `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        let timeArray = [];
        for (let j = 0; j < numberOfHours; j++) {
          let minutesArray = [];
          for (let k = 0; k < numberOfMinutes; k++) {
            minutesArray.push({ number: k < 10 ? `0${k}` : `${k}` });
          }
          timeArray.push({
            hour: j < 10 ? `0${j}` : `${j}`,
            minutes: minutesArray,
          });
        }
        array.push({ date, time: timeArray });
      }
    }
    return array;
  };

  const handleChangeView = (e) => {
    let date = new Date(dateSelected);
    let newDay, newMonth, newYear, newFormat, newDate;
    if (e.target.value === "day" || e.target.value === "week") {
      newFormat = e.target.value;
      newDay = date.getDate();
      newMonth = monthsNames[date.getMonth()];
      newYear = date.getFullYear();
      newDate = `${date.getDate()} ${
        monthsNames[date.getMonth()]
      } ${date.getFullYear()}`;
    } else if (e.target.value === "month") {
      newFormat = e.target.value;
      newDay = "";
      newMonth = monthsNames[date.getMonth()];
      newYear = date.getFullYear();
      newDate = `${monthsNames[date.getMonth()]} ${date.getFullYear()}`;
    } else if (e.target.value === "year") {
      newFormat = e.target.value;
      newDay = "";
      newMonth = "";
      newYear = date.getFullYear();
      newDate = date.getFullYear();
    }
    setInputDay(newDay);
    setInputMonth(newMonth);
    setInputYear(newYear);
    setCalendarFormat(newFormat);
    setCalendarDay(newDay);
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
    setDateAsked(newDate);
  };

  const handleDayInMonthClick = (date) => {
    setDateSelected(date);
    if (dateSelected === date) {
      setShowTooltip((prev) => !prev);
    } else {
      setShowTooltip(true);
    }
  };

  const handleChangeDate = (newDate) => {
    let monthWithFirstLetterCapital = newDate.month
      .toLowerCase()
      .split("")
      .map((element, index) => {
        return index === 0 ? element.toUpperCase() : element;
      })
      .join("");
    setInputYear(parseInt(newDate.year).toString());
    setInputMonth(monthWithFirstLetterCapital);
    setInputDay(newDate.day.toString().length > 0 ? parseInt(newDate.day) : "");
    setCalendarYear(parseInt(newDate.year).toString());
    setCalendarMonth(monthWithFirstLetterCapital);
    setCalendarDay(
      newDate.day.toString().length > 0 ? parseInt(newDate.day) : ""
    );
    setCalendarFormat(newDate.format);
    setDateAsked(`${newDate.day} ${newDate.month} ${newDate.year}`);
    if (newDate.format === "week") {
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${newDate.day < 10 ? `0${newDate.day}` : newDate.day}`
      );
    }
    if (newDate.format === "day")
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${newDate.day < 10 ? `0${newDate.day}` : newDate.day}`
      );
    if (newDate.format === "month")
      setDateSelected(
        `${newDate.year}-${
          monthsNames.indexOf(monthWithFirstLetterCapital) + 1 < 10
            ? `0${monthsNames.indexOf(monthWithFirstLetterCapital) + 1}`
            : monthsNames.indexOf(monthWithFirstLetterCapital) + 1
        }-${dateSelected.split("-")[2]}`
      );
    if (newDate.format === "year")
      setDateSelected(
        `${newDate.year}-${dateSelected.split("-")[1]}-${
          dateSelected.split("-")[2]
        }`
      );
  };

  const onInputChange = (value, input) => {
    if (input === "year") setInputYear(value.toString());
    if (input === "month") setInputMonth(value.toString());
    if (input === "day") setInputDay(value.toString());
  };

  const [calendarArray, setCalendarArray] = useState([]);

  const currentDate = {
    date: `${new Date(Date.now()).getFullYear()}-${
      new Date(Date.now()).getMonth() + 1 < 10
        ? `0${new Date(Date.now()).getMonth() + 1}`
        : new Date(Date.now()).getMonth() + 1
    }-${
      new Date(Date.now()).getDate() < 10
        ? `0${new Date(Date.now()).getDate()}`
        : new Date(Date.now()).getDate()
    }`,
    time: `${
      new Date(Date.now()).getHours() < 10
        ? `0${new Date(Date.now()).getHours()}`
        : new Date(Date.now()).getHours()
    }:${
      new Date(Date.now()).getMinutes() < 10
        ? `0${new Date(Date.now()).getMinutes()}`
        : new Date(Date.now()).getMinutes()
    }`,
  };

  useEffect(
    () => {
      setCalendarArray(setUpCalendar());
      setShowTooltip(false);
    }, // eslint-disable-next-line
    [dateAsked, calendarFormat]
  );

  return (
    <StyledCalendarPage>
      <CalendarInput
        changeDate={handleChangeDate}
        yearGoingToSubmit={inputYear}
        monthGoingToSubmit={inputMonth}
        dayGoingToSubmit={inputDay}
        onInputChange={onInputChange}
        calendarFormat={calendarFormat}
      />

      <label htmlFor="view">View by : </label>
      <select name="view" value={calendarFormat} onChange={handleChangeView}>
        <option value="year">Year</option>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>

      <Calendar
        todos={todos}
        calendarArray={calendarArray}
        format={calendarFormat}
        currentDate={currentDate}
        calendarYear={calendarYear}
        onMonthClick={handleChangeDate}
        dateSelected={dateSelected}
        onDayInMonthClick={handleDayInMonthClick}
        goToThisDay={handleChangeDate}
        showTooltip={showTooltip}
      />
    </StyledCalendarPage>
  );
};

export default CalendarPage;
