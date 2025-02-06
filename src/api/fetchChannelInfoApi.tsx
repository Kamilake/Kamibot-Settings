// fetchChannelInfoApi.tsx
import useFetch from "./useFetch";



interface ChannelInfo {
  type: string;
  name: string;
  channel_id: bigint;
  timeCreated: string;

  use_llm: ('on' | 'off' | 'unset');
  use_twitter_embed: ('on' | 'off' | 'unset');
  use_emote_upscaler: ('on' | 'off' | 'unset');
  use_tts_join_notify: ('on' | 'off' | 'unset');
  use_auto_tts: ('on' | 'off' | 'unset');
  use_docs_converter: ('on' | 'off' | 'unset');
  dedicated_channel: string;
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
      channel_id: 1077136010883907696n,
      timeCreated: "2023-02-20T07:53:57.214Z",
      use_llm: 'unset',
      use_twitter_embed: 'unset',
      use_emote_upscaler: 'unset',
      use_tts_join_notify: 'unset',
      use_auto_tts: 'unset',
      use_docs_converter: 'unset',
      dedicated_channel: "default",
    };
  }
  return { data, loading, error };
};

export default fetchChannelInfoApi;