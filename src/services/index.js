import axios from "axios";
import { setToken } from "../helpers";

export const loginService = async ({
  setUser,
  setIsAuth,
  setIsLoading,
  body,
  setError = (err) => {
    console.log(err);
  },
}) => {
  setIsLoading(true);
  try {
    const res = await axios.post("/login", body);
    const data = res.data;
    setIsAuth(true);
    setUser(data);
    setToken(data.token);
  } catch (error) {
    setError(error.response.data || error.message);
  } finally {
    setIsLoading(false);
  }
};

export const storeConnectionPostService = async (isAlive, setServerStatus) => {
  try {
    const res = await axios.post("/status/set", {
      set: !isAlive,
    });
    setServerStatus(res.data);
  } catch (error) {
    console.log(error);
  }
};
