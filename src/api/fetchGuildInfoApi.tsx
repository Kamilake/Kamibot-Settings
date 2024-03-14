// fetchGuildInfoApi.js
import useFetch from "./useFetch";

const fetchChannelInfoApi = ({guildId}) => {
  let { data, loading, error } = useFetch(
    '/api/guild?guildId=' + guildId
  );
  

  if (loading) {
    //예제 json 데이터로 대신 표시
    data =
    {
      "name": "채널이름",
      "timeCreated": "2023-02-20T07:53:57.214Z",
      "llm": false,
      "type": "TEXT",
      "guildId": "1077136010883907696",
      "minicuda": true
    };

  }
  return { data, loading, error };
};

export default fetchChannelInfoApi;