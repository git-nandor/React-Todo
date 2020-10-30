import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import axiosConfig from "./axiosConfig";

export default function App() {
  const [allUserData, setAllUserData] = useState("");

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const response = await axios.get();

        if (response.status === 200) {
          setAllUserData({
            totalUsers: response.data.meta.pagination.total,
            allPages: response.data.meta.pagination.pages,
            currentPage: response.data.meta.pagination.page,
            pageLimit: response.data.meta.pagination.limit,
            users: response.data.data
          });

          console.log(response.data); ////////////////////////
        }
      } catch (error) {
        console.log("Error in handleRequest: ", error);
      }
    };

    handleRequest();
  }, []);

  const UsersList = () => {
    console.log("prepare Users List"); //////////////////////
    let preparedUsersList;

    if (allUserData.users) {
      preparedUsersList = allUserData.users.map((user, index) => {
        return (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.gender}</div>
            <div>{user.status}</div>
          </div>
        );
      });
    } else {
      preparedUsersList = "";
    }

    return <div>{preparedUsersList}</div>;
  };

  return (
    <div className="App">
      <h1>React Todo Manager</h1>
      <UsersList />
    </div>
  );
}
