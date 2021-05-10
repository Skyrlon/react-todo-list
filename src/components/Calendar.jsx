import { useState } from "react";
import styled from "styled-components";

const StyledCalendar = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  const [calendar, setCalendar] = useState(function () {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
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
  });

  return (
    <StyledCalendar>
      <h2>{year}</h2>
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
