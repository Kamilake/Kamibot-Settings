// fetchInfoApi.js
import useFetch from "./useFetch";

const fetchInfoApi = () => {

  let { data, loading, error } = useFetch(
    'https://kamibot.kami.live/api/info'
  );

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

export default fetchInfoApi;