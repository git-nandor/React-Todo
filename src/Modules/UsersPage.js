import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleRequestForAllUserData } from "../Components/AxiosGetHandler";
import LoadingIndicator from "../Components/UI/LoadingIndicator";
import AddUser from "./AddUser";


const UsersList = ({ allUserData }) => {
  return allUserData.users ? allUserData.users.map((user, index) => {
        return (
          <div key={user.id} className="user-list-item">
            <Link
              className="user-list-link"
              to={{
                pathname: `/user/${user.id}/todos`,
              }}
            >
              {user.name}
            </Link>
            <div className="user-list-gender">{user.gender}</div>
            <div className="user-list-status">{user.status}</div>
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
    <div className='pagination'>
      <button
        onClick={() => handleClickPagination(-1)}
        disabled={props.allUserData.currentPageNumber === 1}
      >
        &larr;
      </button>
      <div className='page-number'>{props.allUserData.currentPageNumber}</div>
      <button
        onClick={() => handleClickPagination(+1)}
        disabled={
          props.allUserData.currentPageNumber ===
          props.allUserData.maxPageNumber
        }
      >
        &rarr;
      </button>
      <button
        onClick={() => handleClickPagination(props.allUserData.maxPageNumber - props.allUserData.currentPageNumber)}
        disabled={
          props.allUserData.currentPageNumber ===
          props.allUserData.maxPageNumber
        }
      >
        Last page
      </button>
    </div>
  );
};

const UsersPage = (params) => {
  const [allUserData, setAllUserData] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        setAllUserData(await handleRequestForAllUserData(page));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

  }, [page]);

  return (
    <div className="main-container">
      <AddUser />
      <h2>Users: </h2>
      {loading && <LoadingIndicator />}
      {!loading && (
        <div className="user-list-container">
          <UsersList allUserData={allUserData} />
          <Pagination allUserData={allUserData} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
