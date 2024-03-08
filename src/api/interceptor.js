import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/v1",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = (failedRequest) =>
  axios
    .get("/refresh", {
      headers: {
        "x-refresh-token": "refreshToken",
      },
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("token", tokenRefreshResponse.data.token);
      localStorage.setItem(
        "refreshToken",
        tokenRefreshResponse.data.refreshToken
      );
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;
      return Promise.resolve();
    });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "Token expired"
    ) {
      originalRequest._retry = true;
      return refreshAuthLogic(error).then(() => {
        return instance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
