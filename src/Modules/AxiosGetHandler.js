import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from "../axiosConfig";

// Create a React Component here to be able call custom hook from HomePage: useHandleRequestForAllUserData
export function AxiosForAllUserData(page) {
  const allData = useHandleRequestForAllUserData(page);

  return allData;
}

export const useHandleRequestForAllUserData = (page) => {
  const [allUserData, setAllUserData] = useState("");

  const allUserDataRequest = async () => {
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
      }
    } catch (error) {
      console.log("Error in useHandleRequestForAllUserData: ", error);
    }
  };

  allUserDataRequest();

  return allUserData;
};
