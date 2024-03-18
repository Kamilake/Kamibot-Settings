// fetchChannelListApi.tsx
import useFetch from "./useFetch";

export interface Channel {
  channelName: string;
  channelType: string;
  channelId: number;
  categoryName: string;
}

interface ApiResponse {
  channelList: Channel[];
}

interface ChannelListFetchResult {
  data: Channel[]; // null을 허용하지 않음
  loading: boolean;
  error: any;
}

const fetchChannelListApi = (): ChannelListFetchResult => {

  let { data, loading, error } = useFetch<ApiResponse>(
    '/api/channelList'
  );

  let channelData: Channel[] = [];

  if (loading || data === null) {
    //예제 json 데이터로 대신 표시
    channelData = [
      {
        channelName: '로드 중...',
        channelType: "PRIVATE",
        channelId: -1,
        categoryName: "일반",
      },
    ];
  }
  else if (data) {
    channelData = data.channelList;
  }

  return { data: channelData, loading, error };
};

export default fetchChannelListApi;