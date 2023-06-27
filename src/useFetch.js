// useFetch.js
import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  let [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 브라우저의 GET 파라미터를 가져옵니다.
        const urlParams = new URLSearchParams(window.location.search);
        var dataParam = urlParams.get('data');



        //만약 data 파라미터가 없다면, "default"로 설정합니다.
        if (!dataParam) {
          dataParam = "default";
        }

        //콘솔 로그 파라미터
        console.log("dataParam: " + dataParam);

        // // 서버에 data 헤더와 함께 POST 요청을 보냅니다.
        // const response = await axios.post(url, {
        //   data: dataParam
        // }); 


        // 서버에 GET 요청을 보냅니다.
        const response = await axios.get(url, {
          params: {
            data: dataParam
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

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = {
      "userEffectiveName": "사용자이름",
      "userAvatarUrl": "https://cdn.discordapp.com/avatars/450998273722023947/747975cad28f263db291e981b725dc67.png",
      "channelName": "채널이름",
      "channelType": "PRIVATE",
      "userName": "kamikami",
      "guildId": "1234567890",
      "guildName": "길드이름",
    }
  }

  return { data, loading, error };
};

export default useFetch;