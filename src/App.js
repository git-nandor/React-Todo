import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import "./styles.css";
import UserPage from "./Modules/UserPage";
import UsersPage from "./Modules/UsersPage";

export default function App() {
  return (
    <div className="App">
      <h1>React Todo Manager</h1>
      <Router>
        <Switch>
          <Route path="/" exact strict component={UsersPage} />
          <Route path="/user/:userID/todos" exact strict component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}
/*
TODOS:
 - Add better pagination
 - New module for create todo
 - Add options for modify todos
 - Create better structure for modules (separate) 
 - Modify modules css -to css classes
*/
