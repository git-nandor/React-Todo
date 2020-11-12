import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "./styles.css";
import UserPage from "./Modules/UserPage";
import HomePage from "./Modules/HomePage";

export default function App() {
  return (
    <div className="App">
      <h1>React Todo Manager</h1>
      <Router>
        <Switch>
          <Route path="/" exact strict component={HomePage} />
          <Route path="/user/:userID/todos" exact strict component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}
