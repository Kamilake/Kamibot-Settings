// fetchInfoApi.tsx
import useFetch from "./useFetch";

export interface User {
  userEffectiveName: string;
  userAvatarUrl: string;
  channelName: string;
  channelId: number;
  channelType: string;
  userName: string;
  guildId: number;
  guildName: string;
  ttsActor: string;
  ttsFriendlyName: string;
}

interface FetchResult {
  data: User;
  loading: boolean;
  error: any;
}

const fetchUserInfoApi = (): FetchResult => {

  let { data, loading, error } = useFetch<User>(
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
      "channelId": 1077136010883907696,
      "guildId": 1234567890,
      "guildName": "길드이름",
      "ttsActor": "kyuri",
      "ttsFriendlyName": "카미",
    }
  }
  return { data, loading, error };
};

export default fetchUserInfoApi;