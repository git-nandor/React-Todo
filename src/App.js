import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import axiosConfig from "./axiosConfig";

export default function App() {
  const [allUserData, setAllUserData] = useState("");
  const [page, setPAge] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadingIndicator = (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const response = await axios.get(`/?page=${page}`);

        if (response.status === 200) {
          setAllUserData({
            totalUsers: response.data.meta.pagination.total,
            maxPageNumber: response.data.meta.pagination.pages,
            currentPageNumber: response.data.meta.pagination.page,
            pageLimit: response.data.meta.pagination.limit,
            users: response.data.data
          });

          setLoading(false);
          console.log(response.data); ////////////////////////
        }
      } catch (error) {
        console.log("Error in handleRequest: ", error);
      }
    };

    handleRequest();
  }, [page]);

  const UsersList = () => {
    console.log("prepare Users List"); //////////////////////
    let preparedUsersList;

    if (allUserData.users && !loading) {
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

  const handleClickPagination = (step) => {
    setLoading(true);
    setTimeout(() => {
      setPAge(allUserData.currentPageNumber + step);
    }, 1000);
  };

  const Pagination = () => {
    let preparedPagination = "";

    if (!loading) {
      preparedPagination = (
        <>
          <button
            onClick={() => handleClickPagination(-1)}
            disabled={allUserData.currentPageNumber === 1}
          >
            &larr;
          </button>
          <div>{allUserData.currentPageNumber}</div>
          <button
            onClick={() => handleClickPagination(+1)}
            disabled={
              allUserData.currentPageNumber === allUserData.maxPageNumber
            }
          >
            &rarr;
          </button>
        </>
      );
    }
    return <div>{preparedPagination}</div>;
  };

  return (
    <div className="App">
      <h1>React Todo Manager</h1>
      <div>{loading ? loadingIndicator : ""}</div>
      <UsersList />
      <Pagination />
    </div>
  );
}
