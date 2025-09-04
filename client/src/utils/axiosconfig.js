// var getTokenFromLocalStorage =
//   JSON.parse(localStorage.getItem("user"))?.accessToken || "";

// export const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage}`,
//     Accept: "application/json",
//   },
// };

export const get_config = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken || "";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  return config;
};

// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { refresh } from "../features/userSlice";

// const refreshToken = async () => {
//   try {
//     const res = await axios.post("/api/auth/refresh", {
//       withCredentials: true,
//     });
//     return res.accessToken;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createAxios = (user, dispatch) => {
//   const newInstace = axios.create();
//   newInstace.interceptors.response.use(
//     async (config) => {
//       let date = new Date();
//       const decodedToken = jwt_decode(user.accessToken);
//       if (decodedToken.exp < date.getTime() / 1000) {
//         const accessResponse = await refreshToken();
//         const refreshUser = {
//           ...user,
//           accessToken: accessResponse,
//         };
//         dispatch(refresh(refreshUser));
//         config.headers.Authorization = `Bearer ${accessResponse}`;
//         config.headers.Accept = "application/json";
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   return newInstace;
// };
