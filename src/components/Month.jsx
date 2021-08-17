import styled from "styled-components";

const StyledMonth = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;
  border: 1px solid black;

  & .weekdays {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & > div {
      width: 13%;
      border: 1px solid black;
    }
  }

  & .days {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  & .day {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 13%;
    height: 3em;
    border: 1px solid black;
    &.selected {
      background-color: green;
    }
    &-tooltip {
      position: absolute;
      top: 3em;
      z-index: 1;
      background-color: lightblue;
      min-width: 7em;
    }
    &-todo {
      position: absolute;
      top: 0%;
      right: 0.5em;
      font-size: 0.75em;
      & .priority {
        &-hight {
          color: red;
        }
        &-medium {
          color: #ffcc00;
        }
        &-low {
          color: green;
        }
      }
      &-number {
        position: relative;
        & .tooltip {
          display: none;
        }
        &:hover {
          & .tooltip {
            position: absolute;
            display: block;
            z-index: 1;
            background-color: white;
            bottom: 100%;
            width: 10em;
            border: 1px solid black;
          }
        }
      }
    }
  }
`;

const weekDaysNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

const Month = ({ month, year }) => {
  const days = function () {
    let daysArray = [];
    const numberOfDays = new Date(
      year,
      monthsNames.indexOf(month) + 1,
      0
    ).getDate();
    for (let j = 0; j < numberOfDays; j++) {
      daysArray.push({
        name: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
          new Date(`${j + 1} ${month} ${year}`)
        ),
        number: j + 1 < 10 ? `0${j + 1}` : j + 1,
      });
    }

    let daysBeforeFirstDay = weekDaysNames.indexOf(daysArray[0].name);
    for (let k = 0; k < daysBeforeFirstDay; k++) {
      daysArray.unshift({ name: "", number: -k - 1 });
    }

    let daysAfterLastDay =
      weekDaysNames.length -
      (weekDaysNames.indexOf(daysArray[daysArray.length - 1].name) + 1);
    for (let l = 0; l < daysAfterLastDay; l++) {
      daysArray.push({
        name: "",
        number: daysArray.length + 1,
      });
    }
    return daysArray;
  };

  return (
    <StyledMonth>
      <div className="weekdays">
        {weekDaysNames.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div className="days">
        {days().length > 0 &&
          days().map((day) => (
            <div className="day" key={day.number}>
              {day.name ? day.number : ""}
            </div>
          ))}
      </div>
    </StyledMonth>
  );
};
export default Month;
