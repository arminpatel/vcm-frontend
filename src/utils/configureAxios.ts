import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";
import config from "./envConfig";
import { history } from "../main";

const configureAxios = () => {
  axios.defaults.baseURL = config.apiUrl;

  axios.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      if (
        config.url?.includes("/api/token") ||
        config.url?.includes("/api/token/refresh")
      ) {
        return config;
      }

      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access")}`,
      };
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest.url?.includes("/api/token") &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post("/api/token/refresh/", {
            refresh: Cookies.get("refresh"),
          });
          const { access } = response.data;
          Cookies.set("access", access);
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return axios(originalRequest);
        } catch  {
          if (originalRequest.url?.includes("/api/token/refresh")) {
            return Promise.reject(error);
          } else {
            Cookies.remove("access");
            Cookies.remove("refresh");
            history.push("/login");
            history.go(0);
          }
        }
      }

      return Promise.reject(error);
    },
  );
};

export default configureAxios;
