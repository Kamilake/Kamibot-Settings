// useFetch.tsx
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string): { data: T, loading: boolean, error: any } => {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        let jwt = urlParams.get('data');
        if (!jwt) {
          jwt = "default";
        }

        console.log("jwt: " + jwt);

        const response: AxiosResponse<T> = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
          params: {
            data: jwt
          }
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;