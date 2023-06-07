import axios from "axios"
import Cookies from "js-cookie"
import config from "./envConfig"
import { history } from "../main"
const configureAxios = () => {
  axios.defaults.baseURL = config.apiUrl
  axios.interceptors.request.use(
    async (config) => {
      // exlude token refresh and login
      if(config.url.includes("/api/token")) { return config }
      if(config.url.includes("/api/token/refresh")) { return config }

      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${Cookies.get("access")}`
      return  config
    },
    (error) => {
      Promise.reject(error)
    }
  )

    axios.interceptors.response.use(
      async (response) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            const response = await axios.post("/api/token/refresh/", {
              refresh: Cookies.get("refresh"),
            })
            const { access } = response.data
            Cookies.set("access", access)
            originalRequest.headers["Authorization"] = `Bearer ${access}`
            return axios(originalRequest)
          } catch (err) {
            if(originalRequest.url.includes("/api/token/refresh")) {
              return Promise.reject(error)
            } else {
              Cookies.remove("access")
              Cookies.remove("refresh")
              history.push("/login")
              history.go(0)
            }
          }
        }

        return Promise.reject(error)
      })
}

export default configureAxios
