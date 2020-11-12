import React, { useState, useEffect } from "react";
import { handleUserTodosRequest, handleUserNameRequest } from './AxiosGetHandler';
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [userTodos, setUserTodos] = useState("");
  const [userName, setUserName] = useState("");
  const { userID } = useParams();

  useEffect(() => {
    
    (async ()=> {
      try {
        setUserTodos(await handleUserTodosRequest(userID));
        setUserName(await handleUserNameRequest(userID));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

  }, [userID]);

  const todoList = userTodos.length ? (
    userTodos.map((todo, index) => {
      
      return (
        <div key={todo.id} className='todo-list-item'>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            disabled={true}
          />
          <div className={todo.completed ? "completed" : ""}>{todo.created_at.slice(0, 10)}</div>
          <div className={todo.completed ? "completed" : ""}>{todo.title}</div>
        </div>
      );
    })
  ) : (
    <div>{`Nothing to do... ¯\\_(ツ)_/¯`}</div>
  );

  return (
    <div className='user-main-container'>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <h2>{userName}'s Todo List</h2>
          <div className='todo-list-container'>{todoList}</div>
        </> 
      )}
    </div>
  );
};

export default UserPage;
