import { useFetchData, FetchResponse, FetchOptions } from '../utils/useFetchData';

export function createApiService<T, R = T>(endpoint: string) {
  return (options?: FetchOptions<T, R>): FetchResponse<T, R> => {
    return useFetchData<T, R>(endpoint, options);
  };
}