import axios from "axios";

const apiUrl = "http://localhost:3001/v1";

const instance = axios.create({
  baseURL: apiUrl,
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
    .get(apiUrl + "/admin/refresh", {
      headers: {
        "x-refresh-token": localStorage.getItem("refreshToken"),
      },
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("token", tokenRefreshResponse.data.jwtToken);
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
      error.response.status === 403 &&
      error.response.data.message === "JWT_EXPIRED"
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
