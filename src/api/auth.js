import api, { setAuthToken } from "./api";
import jwtDecode from "jwt-decode";

const authLogin = async (email, password) => {
  const response = await api.post("/login", { email, password });
  const { token } = response.data;
  setAuthToken(token);

  return jwtDecode(token);
};

const authRegister = async (name, document, email, password) => {
  if (!name || !document || !email || !password) {
    throw new Error("All fields are required");
  }
  if (document.length < 11 || document.length > 14) {
    throw new Error("Document must have 11 digits");
  }
  const response = await api.post("/register", {
    name,
    document,
    email,
    password,
  });

  return response.data;
};

const authLogout = () => {
  setAuthToken(null);
};

const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};

export default {authRegister, authLogin, authLogout, getCurrentUser };
