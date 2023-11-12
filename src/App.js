import { useState } from "react";
import "./App.css";

import TodosPage from "./pages/TodosPage.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import Nav from "./components/Nav";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [todos, setTodos] = useState([]);

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
