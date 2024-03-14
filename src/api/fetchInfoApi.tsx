// fetchInfoApi.tsx
import useFetch from "./useFetch";

interface InfoData {
  userEffectiveName: string;
  userAvatarUrl: string;
  channelName: string;
  channelType: string;
  userName: string;
  guildId: string;
  guildName: string;
  ttsActor: string;
  ttsFriendlyName: string;
}

interface FetchResult {
  data: InfoData | null;
  loading: boolean;
  error: any;
}

const fetchInfoApi = (): FetchResult => {

  let { data, loading, error } = useFetch<InfoData>(
    '/api/info'
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
      "ttsActor": "kyuri",
      "ttsFriendlyName": "카미",
    }
  }
  return { data, loading, error };
};

export default fetchInfoApi;