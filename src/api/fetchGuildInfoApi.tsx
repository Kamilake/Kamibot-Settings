// fetchGuildInfoApi.tsx
import useFetch from "./useFetch";

interface GuildData {
  name: string;
  timeCreated: string;
  llm: boolean;
  type: string;
  guildId: string;
  emote_upscale: boolean;
}

interface FetchResult {
  data: GuildData | null;
  loading: boolean;
  error: any;
}

const fetchGuildInfoApi = (props: { guildId: string }): FetchResult => {

  let { data, loading, error } = useFetch<GuildData>(
    '/api/guild?guildId=' + props.guildId
  );

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = {
      "name": "채널이름",
      "timeCreated": "2023-02-20T07:53:57.214Z",
      "llm": false,
      "type": "TEXT",
      "guildId": "1077136010883907696",
      "emote_upscale": true
    };
  }
  return { data, loading, error };
};

export default fetchGuildInfoApi;