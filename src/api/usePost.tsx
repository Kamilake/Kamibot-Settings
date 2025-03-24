// usePost.tsx
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

interface PostResult<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

const usePost = <T,>(url: string, param: object): PostResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const postData = async () => {
      try {
        // 사용자 브라우저의 GET 파라미터를 가져옵니다.
        const urlParams = new URLSearchParams(window.location.search);
        let jwt = urlParams.get('data');
        //만약 data 파라미터가 없다면, "default"로 설정합니다.
        if (!jwt) {
          jwt = "default";
        }

        //콘솔 로그 파라미터
        console.log("userUrlParam: " + jwt);

        // 서버에 data와 함께 POST 요청을 보냅니다.
        const response: AxiosResponse<T> = await axios.post(url, Object.assign({
          data: jwt
        }, param), {
          // headers: {
          //   Authorization: `Bearer ${jwt}`
          // }
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    postData();
  }, [url, param]);
  return { data, loading, error };
};

export default usePost;