import axios from "axios";
import { reactBackendUrl } from "../env/envoriment";

const api = axios.create({
  baseURL: `${reactBackendUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
