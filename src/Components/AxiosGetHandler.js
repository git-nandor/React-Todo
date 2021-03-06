import axios from "../Components/apiClient";


export const handleRequestForAllUserData = async (page) => {
  let allUserData = null;

  try {
    const responseForAllUserData = await axios.get(`/?page=${page}`);

    if (responseForAllUserData.status === 200) {
      allUserData = {
        totalUsers: responseForAllUserData.data.meta.pagination.total,
        maxPageNumber: responseForAllUserData.data.meta.pagination.pages,
        currentPageNumber: responseForAllUserData.data.meta.pagination.page,
        pageLimit: responseForAllUserData.data.meta.pagination.limit,
        users: responseForAllUserData.data.data
      };
    }
  } catch (error) {
    console.log("Error in handleRequestForAllUserData: ", error);
  }

  return allUserData;
};

export const handleUserTodosRequest = async (userID) => {
  let userTodos = null;

    try {
      const responseForUserTodos = await axios.get(`/${userID}/todos`);

      if (responseForUserTodos.status === 200) {
        userTodos = responseForUserTodos.data.data;
      }
    } catch (error) {
      console.log("Error in handleUserTodosRequest", error);
    }

  return userTodos;
};


export const handleUserNameRequest = async (userID) => {
  let userName = null;

    try {
      const responseForUserName = await axios.get(`/${userID}`);

      if (responseForUserName.status === 200) {
        userName = responseForUserName.data.data.name;
      }
    } catch (error) {
      console.log("Error in handleUserNameRequest", error);
    }

  return userName;
};

export const handleAddUserPostRequest = async (newUserData) => {
let addStatusSucces = false; 

    try {
      const responseForAddNewUser = await axios.post('https://gorest.co.in/public-api/users', newUserData);
      if (responseForAddNewUser.status === 200 && responseForAddNewUser.data.code === 201) {
        addStatusSucces = true;
      }
    } catch (error) {
      console.log("Error in handleAddUserPostRequest", error);
    }
    
  return addStatusSucces;
};