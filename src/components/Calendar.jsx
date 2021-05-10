import { useState } from "react";
import styled from "styled-components";

const StyledCalendar = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    user-select: none;
  }

  & .arrow {
    display: inline;
    margin-left: 1em;
    margin-right: 1em;
  }

  & .calendar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & table {
      width: 16vw;
    }
    & table,
    td {
      border: 1px solid #333;
    }
  }
`;

const Calendar = () => {
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());

  const setUpCalendar = (year) => {
    const months = [
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
    let array = [];
    months.forEach((month, index) => {
      let daysInMonth = new Date(year, index + 1, 0).getDate();
      let days = [];
      for (let i = 0; i < daysInMonth; i++) {
        days.push({
          name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            new Date(`${i + 1} ${month} ${year}`)
          ),
          number: i + 1,
        });
      }
      array.push({ name: month, days: days });
    });
    return array;
  };

  const [calendar, setCalendar] = useState(setUpCalendar(year));

  return (
    <StyledCalendar>
      <h2>
        <div
          className="arrow"
          onClick={() => {
            setYear(year - 1);
            setCalendar(setUpCalendar(year - 1));
          }}
        >
          &#10092;
        </div>
        {year}
        <div
          className="arrow"
          onClick={() => {
            setYear(year + 1);
            setCalendar(setUpCalendar(year + 1));
          }}
        >
          &#10093;
        </div>
      </h2>

      <div className="calendar">
        {calendar.map((month) => (
          <table key={month.name}>
            <thead>
              <tr>
                <th colSpan="2">{month.name}</th>
              </tr>
            </thead>
            <tbody>
              {month.days.map((day) => (
                <tr key={day.number}>
                  <td>{day.name}</td>
                  <td>{day.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
