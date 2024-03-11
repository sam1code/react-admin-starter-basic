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
    })
    .catch((err) => {
      console.error(err.message);
      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.clear();
        window.location.reload();
      }
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

export const login = async (username, password) => {
  const response = await instance.post("/admin/auth", {
    email: username,
    password: password,
  });
  return response;
};

export const logout = async () => {
  await instance.head("/admin/logout", {
    headers: {
      "x-refresh-token": localStorage.getItem("refreshToken"),
    },
  });
  localStorage.clear();
  window.location.reload();
};

export const getAdmins = async () => {
  const response = await instance.get("/admin/admins");
  return response.data;
};

export const getProfile = async () => {
  const response = await instance.get("/admin/detail");
  return response.data;
};

export const getUsers = async () => {
  try {
    const response = await instance.get("/admin/users");
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const getCategories = async () => {
  const response = await instance.get("/admin/categories");
  return response.data;
};

export const createCategory = async (category) => {
  console.log(category);
  const response = await instance.post("/admin/category", category);
  return response.data;
};

export const updateCategory = async (category) => {
  const response = await instance.put(`/admin/category/${category._id}`, {
    name: category.name,
    slug: category.slug,
  });
  return response.data;
};

export const getTags = async () => {
  const response = await instance.get("/admin/tags");
  return response.data;
};

export const createTag = async (tag) => {
  const response = await instance.post("/admin/tag", tag);
  return response.data;
};

export const updateTag = async (tag) => {
  const response = await instance.put(`/admin/tag/${tag._id}`, {
    name: tag.name,
    slug: tag.slug,
  });
  return response.data;
};

export default instance;
