import { useActor } from './ActorContext';
import { createApiService } from '../../../api/createApiService';

export interface Actor {
  displayName: string;
  id: string;
  gender: string;
  language: string;
  categoryName: string;
  disabled: boolean;
  hidden: boolean;
}
export interface ActorList {
  actorList: Actor[];
}

const FetchActors = () => {
  const { setActor, setIsActorLoaded } = useActor();

  createApiService<ActorList, Actor[]>('/api/actorList')({
    dataMapper: (data: ActorList) => data.actorList,
    onLoadComplete: (mappedData: Actor[]) => {
      setActor(mappedData);
      setIsActorLoaded(true);
    },
    onError: (error) => {
      console.error('Error fetching actor data:', error);
    }
  });

  return null;
};

export default FetchActors;