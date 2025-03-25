import { User, useUser } from './UserContext';
import { createApiService } from '../../api/createApiService';

const FetchUserData = () => {
  const { setUser, setIsUserLoaded } = useUser();

  createApiService<User>('/api/info')({
    onLoadComplete: (userData: User) => {
      setUser(userData);
      setIsUserLoaded(true);
    },
    onError: (error) => {
      console.error('Error fetching user data:', error);
    }
  });

  return null;
};

export default FetchUserData;