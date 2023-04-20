//  import axios from "axios";

export const BaseURL = "http://localhost:8080/api/v1";

// axios.interceptors.request.use(
//     (config) => {
//       const { origin } = new URL(config.url);
//       const allowedOrigins = [BaseURL];
//           const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
//           console.log(token);
//       if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

//   axios.interceptors.request.use((req) => {
//     if (token)  {
//         req.headers.Authorization = `${token}`;
//     }

//     return req;
// });