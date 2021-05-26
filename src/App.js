import { useState } from "react";
import "./App.css";

import TodoList from "./components/TodoList.jsx";
import Calendar from "./components/Calendar.jsx";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState(function () {
    let array = [];
    const completion = [true, false];
    const priorities = ["hight", "medium", "low"];
    function randomNumber(min, max) {
      let number = Math.floor(Math.random() * (max - min) + min);
      return number > 10 ? number : `0${number}`;
    }
    for (let i = 0; i < 200; i++) {
      array.push({
        id: i,
        title: `Task ${i + 1}`,
        details: `Details ${i + 1}`,
        priority: priorities[Math.floor(Math.random() * 3)],
        completed: completion[parseInt(randomNumber(0, 2))],
        deadline: `2021-${randomNumber(3, 4)}-${randomNumber(1, 28)}`,
      });
    }
    return array;
  });

  return (
    <div className="App">
      <header className="App-header">React To Do List</header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/calendar">Calendar</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/calendar">
              <Calendar todos={todos} />
            </Route>
            <Route path="/">
              <TodoList todos={todos} modifyTodos={(e) => setTodos(e)} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
