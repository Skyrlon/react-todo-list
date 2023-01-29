import { useState } from "react";
import "./App.css";

import TodosPage from "./pages/TodosPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import Nav from "./components/Nav";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState(function () {
    let array = [];
    const completion = [true, false];
    const priorities = ["hight", "medium", "low"];
    const minutesArray = ["00", "15", "30", "45"];

    function randomNumber(min, max) {
      let number = Math.floor(Math.random() * (max - min) + min);
      return number < 10 ? `0${number}` : number;
    }
    for (let i = 0; i < 30; i++) {
      const gotDeadline = randomNumber(0, 2) === "00";
      const gotDeadlineTime = randomNumber(0, 2) === "00";
      array.push({
        id: i,
        title: `Task ${i + 1}`,
        details: `Details ${i + 1}`,
        priority: priorities[Math.floor(Math.random() * 3)],
        completed: completion[parseInt(randomNumber(0, 2))],
        deadline: {
          date: gotDeadline
            ? `2022-${randomNumber(3, 4)}-${randomNumber(1, 28)}`
            : "",
          time:
            gotDeadline && gotDeadlineTime
              ? `${randomNumber(0, 24)}:${
                  minutesArray[parseInt(randomNumber(0, 4))]
                }`
              : "",
        },
      });
    }
    return array;
  });

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          React To Do List
          <Nav />
        </header>

        <Switch>
          <Route path="/calendar">
            <CalendarPage todos={todos} modifyTodos={(e) => setTodos(e)} />
          </Route>
          <Route path="/">
            <TodosPage todos={todos} modifyTodos={(e) => setTodos(e)} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
