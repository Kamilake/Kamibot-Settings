import { Channel, useChannels } from './ChannelContext';
import { createApiService } from '../../../api/createApiService';

export interface ChannelList {
  channelList: Channel[];
}

const FetchChannels = () => {
  const { setChannelList: setChannel, setIsChannelListLoaded: setIsChannelLoaded } = useChannels();

  createApiService<ChannelList, Channel[]>('/api/channelList')({
    dataMapper: (data: ChannelList) => data.channelList,
    onLoadComplete: (mappedData: Channel[]) => {
      setChannel(mappedData);
      setIsChannelLoaded(true);
    },
    onError: (error) => {
      console.error('Error fetching channel data:', error);
    }
  });

  return null;
};

export default FetchChannels;