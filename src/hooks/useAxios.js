import axios from "axios";
import React, { useEffect, useState } from "react";
import { worker } from "../mocks/browser";

export const useAxios = ({
  url,
  method = "GET",
  body = null,
  headers = null,
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await axios.request({
        method: method,
        url: url,
        data: body,
        headers: headers,
      });
      setResponse(res);
      setError(null);
    } catch (error) {
      console.log(error.response);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, isLoading };
};
