// fetchChannelInfoApi.tsx
import useFetch from "./useFetch";

interface ChannelInfo {
  type: string;
  name: string;
  channelId: bigint;
  timeCreated: string;

  llm: boolean;
  ai_toolkit: boolean;
  twitter_embed: boolean;
  minicuda: boolean;
  vchannel: boolean;
  emote_upload: boolean;
  tts_join_notify: boolean;
  auto_tts: boolean;
}

interface FetchResult {
  data: ChannelInfo;
  loading: boolean;
  error: any;
}

const fetchChannelInfoApi = (props: { channelId: string }): FetchResult => {

  let { data, loading, error } = useFetch<ChannelInfo>(
    '/api/channel?channelId=' + props.channelId
  );

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = {
      type: "TEXT",
      name: "채널이름",
      channelId: 1077136010883907696n,
      timeCreated: "2023-02-20T07:53:57.214Z",
      llm: false,
      ai_toolkit: false,
      twitter_embed: false,
      minicuda: false,
      vchannel: false,
      emote_upload: false,
      tts_join_notify: false,
      auto_tts: false,
    };
  }
  return { data, loading, error };
};

export default fetchChannelInfoApi;