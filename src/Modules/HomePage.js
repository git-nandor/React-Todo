import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Switch
} from "react-router-dom";
import {
  useHandleRequestForAllUserData,
  AxiosForAllUserData,
  axiSuper
} from "./AxiosGetHandler";
import axios from "axios";
import axiosConfig from "../axiosConfig";

console.log("Read HOMEPAGE");

const UsersList = ({ allUserData }) => {
  console.log("prepare Users List"); //////////////////////

  return allUserData.users
    ? allUserData.users.map((user, index) => {
        return (
          <div key={user.id}>
            <Link
              to={{
                pathname: `/user/${user.id}/todos`,
                state: { userName: `${user.name}` }
              }}
            >
              {user.name}
            </Link>
            <div>{user.gender}</div>
            <div>{user.status}</div>
          </div>
        );
      })
    : "";
};

const Pagination = (props) => {
  const handleClickPagination = (step) => {
    setTimeout(() => {
      props.setPage(props.allUserData.currentPageNumber + step);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => handleClickPagination(-1)}
        disabled={props.allUserData.currentPageNumber === 1}
      >
        &larr;
      </button>
      <div>{props.allUserData.currentPageNumber}</div>
      <button
        onClick={() => handleClickPagination(+1)}
        disabled={
          props.allUserData.currentPageNumber ===
          props.allUserData.maxPageNumber
        }
      >
        &rarr;
      </button>
    </>
  );
};

const LoadingIndicator = () => (
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

const HomePage = () => {
  const [allUserData, setAllUserData] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const handleAllUserDataRequest = async () => {
      try {
        const responseForAllUserData = await axios.get(`/?page=${page}`);

        if (responseForAllUserData.status === 200) {
          setAllUserData({
            totalUsers: responseForAllUserData.data.meta.pagination.total,
            maxPageNumber: responseForAllUserData.data.meta.pagination.pages,
            currentPageNumber: responseForAllUserData.data.meta.pagination.page,
            pageLimit: responseForAllUserData.data.meta.pagination.limit,
            users: responseForAllUserData.data.data
          });

          setLoading(false);
          console.log(responseForAllUserData.data); ////////////////////////
        }
      } catch (error) {
        console.log("Error in handleAllUserDataRequest: ", error);
      }
    };

    handleAllUserDataRequest();

    setLoading(false);
  }, [page]);

  /*
    const handleAllUserDataRequest = async () => {
      try {
        const responseForAllUserData = await axios.get(`/?page=${page}`);

        if (responseForAllUserData.status === 200) {
          setAllUserData({
            totalUsers: responseForAllUserData.data.meta.pagination.total,
            maxPageNumber: responseForAllUserData.data.meta.pagination.pages,
            currentPageNumber: responseForAllUserData.data.meta.pagination.page,
            pageLimit: responseForAllUserData.data.meta.pagination.limit,
            users: responseForAllUserData.data.data
          });

          setLoading(false);
          console.log(responseForAllUserData.data); ////////////////////////
        }
      } catch (error) {
        console.log("Error in handleAllUserDataRequest: ", error);
      }
    };

    handleAllUserDataRequest();
    */

  return (
    <>
      <h1>Home Page</h1>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <UsersList allUserData={allUserData} />
          <Pagination allUserData={allUserData} setPage={setPage} />
        </>
      )}
    </>
  );
};

export default HomePage;
