import axios from "axios";


axios.defaults.baseURL = "https://gorest.co.in/public-api/users";
axios.defaults.headers.common["Authorization"] =
  "Bearer fb1e050b3d558518bf9ae65b05e26be53347affef0732cb8b60c664deaddf382";
  
  export default axios;