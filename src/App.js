import { useState } from "react";
import "./App.css";

import TodoList from "./components/TodoList.jsx";
import Calendar from "./components/Calendar.jsx";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      title: "Shopping",
      details: "Buy tomatoes, apple, and a book",
      priority: "medium",
      completed: false,
      deadline: "2021-01-10",
    },
    {
      id: 1,
      title: "Jogging",
      details: "Do the daily jogging ",
      priority: "low",
      completed: false,
      deadline: "2021-10-05",
    },
    {
      id: 2,
      title: "Interview",
      details: "Go to 123, Sky Valley for interview",
      priority: "hight",
      completed: false,
      deadline: "2022-06-02",
    },
    {
      id: 3,
      title: "Another task ",
      details: "",
      priority: "medium",
      completed: true,
    },
  ]);

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
