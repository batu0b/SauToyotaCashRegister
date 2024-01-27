import { useState, useEffect, useRef } from "react";
import { ServerStatusContex } from "./ServerStatusContex";
import axios from "axios";
export const ServerStatusContexProvider = ({ children }) => {
  const [serverIsAlive, setServerIsAlive] = useState(null);
  const interval = useRef(null);

  const chekServer = () => {
    axios
      .get("/status")
      .then((res) => {
        if (res.status === axios.HttpStatusCode.Ok) {
          setServerIsAlive(true);
        } else {
          serverIsAlive(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerIsAlive(false);
      });
  };
  useEffect(() => {
    chekServer();
    interval.current = setInterval(() => {
      console.log("connetcting");
      chekServer();
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ServerStatusContex.Provider value={{ serverIsAlive }}>
      {children}
    </ServerStatusContex.Provider>
  );
};
