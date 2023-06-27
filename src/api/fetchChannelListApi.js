// fetchChannelListApi.js
import useFetch from "./useFetch";

const fetchChannelListApi = () => {

  let { data, loading, error } = useFetch(
    'https://kamibot.kami.live/api/channelList'
  );

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = [
      { channelName: 'The Shawshank Redemption', channelType: "PRIVATE", channelId: 1994, categoryName: "일반" },
      { channelName: 'The Godfather', channelType: "PRIVATE", channelId: 1972, categoryName: "일반" },
      { channelName: 'The Godfather: Part II', channelType: "PRIVATE", channelId: 1974, categoryName: "일반a" },
      { channelName: 'The Dark Knight', channelType: "PRIVATE", channelId: 2008, categoryName: "일반b" },
      { channelName: '12 Angry Men', channelType: "PRIVATE", channelId: 1957, categoryName: "일반b" },
    ];

  }
  return { data, loading, error };
};

export default fetchChannelListApi;