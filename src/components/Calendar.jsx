import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledCalendar = styled.div`
  display: flex;
  width: 99vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75em;

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
    justify-content: center;
    width: 90%;
    & table {
      margin: 0.25%;
      width: 16%;
    }
    & table,
    td {
      border: 1px solid #333;
    }
    & td {
      &.priority {
        &-hight {
          background-color: red;
        }
        &-medium {
          background-color: yellow;
        }
        &-low {
          background-color: green;
        }
      }
    }
  }
`;

const Calendar = ({ todos }) => {
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());

  const [dateGoingToSubmit, setDateGoingToSubmit] = useState(year);

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

  const [calendarFormat, setCalendarFormat] = useState("year");

  const setUpCalendar = () => {
    let array = [];
    if (calendarFormat === "year") {
      monthsNames.forEach((month, index) => {
        let daysInMonth = new Date(dateGoingToSubmit, index + 1, 0).getDate();
        let days = [];
        for (let i = 0; i < daysInMonth; i++) {
          days.push({
            name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
              new Date(`${i + 1} ${month} ${dateGoingToSubmit}`)
            ),
            number: i + 1,
          });
        }
        array.push({ id: monthsNames.indexOf(month), name: month, days: days });
      });
    } else if (calendarFormat === "month") {
      let daysInMonth = new Date(year, dateGoingToSubmit + 1, 0).getDate();
      for (let i = 0; i < daysInMonth; i++) {
        let day = {
          id: i,
          name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
            new Date(`${i + 1} ${monthsNames[dateGoingToSubmit]} ${year}`)
          ),
          number: i + 1,
        };
        array.push(day);
      }
    }
    return array;
  };

  const [calendar, setCalendar] = useState([]);

  useEffect(
    () => {
      setCalendar(setUpCalendar());
    }, // eslint-disable-next-line
    [dateGoingToSubmit]
  );

  return (
    <StyledCalendar>
      <h2>
        <div
          className="arrow"
          onClick={() => {
            setYear((prev) => prev - 1);
            setCalendar(setUpCalendar(year));
          }}
        >
          &#10092;
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setYear(dateGoingToSubmit);
          }}
        >
          <input
            name="year-input"
            type="text"
            value={dateGoingToSubmit}
            onChange={(e) => setDateGoingToSubmit(e.target.value)}
          />
          <input type="submit" />
        </form>

        <div
          className="arrow"
          onClick={() => {
            setYear((prev) => prev + 1);
            setCalendar(setUpCalendar(year));
          }}
        >
          &#10093;
        </div>
      </h2>

      <div className="calendar">
        {calendarFormat === "year" &&
          calendar.map((month) => (
            <table
              key={month.id}
              onClick={() => {
                setCalendarFormat("month");
                setDateGoingToSubmit(monthsNames.indexOf(month.name));
                setUpCalendar();
              }}
            >
              <thead>
                <tr>
                  <th colSpan="3">{month.name}</th>
                </tr>
              </thead>
              <tbody>
                {month.days.map((day) => (
                  <tr key={day.number}>
                    <td>{day.name}</td>
                    <td>{day.number}</td>
                    {todos.filter(
                      (todo) =>
                        todo.deadline ===
                        `${year}-${
                          monthsNames.indexOf(month.name) + 1 < 10 //check if number is inferior to ten, to add or not a 0 before number
                            ? `0${monthsNames.indexOf(month.name) + 1}`
                            : monthsNames.indexOf(month.name) + 1
                        }-${day.number < 10 ? `0${day.number}` : day.number}` //check if number is inferior to ten, to add or not a 0 before number
                    ).length > 0 ? (
                      todos.map(
                        (todo) =>
                          todo.deadline ===
                            `${year}-${
                              monthsNames.indexOf(month.name) + 1 < 10 //check if number is inferior to ten, to add or not a 0 before number
                                ? `0${monthsNames.indexOf(month.name) + 1}`
                                : monthsNames.indexOf(month.name) + 1
                            }-${
                              day.number < 10 ? `0${day.number}` : day.number //check if number is inferior to ten, to add or not a 0 before number
                            }` && (
                            <td
                              key={todo.id}
                              className={`priority-${todo.priority}`}
                            >
                              {todo.title}
                            </td>
                          )
                      )
                    ) : (
                      <td key={day.number}></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}

        {calendarFormat === "month" && (
          <table>
            <tbody>
              {calendar.map((day) => (
                <tr key={day.id}>
                  <td>{day.name}</td>
                  <td>{day.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
