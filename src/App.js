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
          setAllUserData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log("Error in handleRequest: ", error);
      }
    };

    handleRequest();
  }, []);

  return (
    <div className="App">
      <h1>React Todo Manager</h1>
      <div>{JSON.stringify(allUserData)}</div>
    </div>
  );
}
