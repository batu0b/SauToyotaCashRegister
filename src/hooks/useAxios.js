import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useAxios = ({
  url,
  method = "GET",
  body = null,
  headers = null,
  isCache = false,
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      let data;
      if (isCache) {
        if (caches[url]) {
          data = caches[url];
        } else {
          const res = await axios.request({
            method: method,
            url: url,
            data: body,
            headers: headers,
          });
          data = res;
          caches[url] = data;
        }
      } else {
        const res = await axios.request({
          method: method,
          url: url,
          data: body,
          headers: headers,
        });
        data = res;
      }
      setResponse(data);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 440);
    }
  }, [url, method]);

  useEffect(() => {
    fetchData();
  }, [url, method]);

  return { response, error, isLoading };
};
