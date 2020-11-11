import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Switch
} from "react-router-dom";

const UserPage = (params) => {
  console.log("All Params:", params);
  const [userTodos, setUserTodos] = useState("");
  const { userID, userName } = useParams();

  useEffect(() => {
    const handleUserTodosRequest = async () => {
      try {
        const responseForUserTodos = await axios.get(`/${userID}/todos`);
        if (responseForUserTodos.status === 200) {
          setUserTodos(responseForUserTodos.data.data);
          console.log("GOTTODOOO:", responseForUserTodos.data.data);
        }
      } catch (error) {
        console.log("Error in handleUserTodosRequest", error);
      }
    };

    handleUserTodosRequest();
  }, [userID]);

  const todoList = userTodos.length ? (
    userTodos.map((todo, index) => {
      console.log("Single todo", todo); ////////////
      return (
        <div key={todo.id}>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            disabled={true}
          />
          <div>{todo.created_at.slice(0, 10)}</div>
          <div className={todo.completed ? "completed" : ""}>{todo.title}</div>
        </div>
      );
    })
  ) : (
    <div>{`Nothing to do... ¯\\_(ツ)_/¯`}</div>
  );

  console.log(params);
  return (
    <>
      <h2>{userName}'s Todo List</h2>
      {todoList}
    </>
  );
};

export default UserPage;
