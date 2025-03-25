import { useState, useEffect } from 'react';

export interface FetchResponse<T, R = T> {
  data: R | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface FetchOptions<T, R = T> extends RequestInit {
  dataMapper?: (data: T) => R;
  onLoadComplete?: (data: R) => void;
  onError?: (error: Error) => void;
}

export function useFetchData<T, R = T>(
  endpoint: string, 
  options?: FetchOptions<T, R>
): FetchResponse<T, R> {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  
  const refetch = () => setRefreshCount(prev => prev + 1);

  const { 
    dataMapper, 
    onLoadComplete, 
    onError,
    ...fetchOptions 
  } = options || {};

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint, {
          credentials: 'include',
          ...fetchOptions,
        });
        
        if (!isMounted) return;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        
        const result = await response.json();
        
        if (!isMounted) return;
        
        if (!result || (result as any).success === "false") {
          throw new Error(`No data found from ${endpoint}`);
        }
        
        // 데이터 매핑 적용
        const mappedData = dataMapper ? dataMapper(result) : (result as unknown as R);
        
        setData(mappedData);
        setError(null);
        
        // 로딩 완료 콜백 실행
        if (onLoadComplete && mappedData) {
          onLoadComplete(mappedData);
        }
      } catch (err) {
        if (!isMounted) return;
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        
        // 에러 콜백 실행
        if (onError) {
          onError(errorObj);
        } else {
          console.error(`Error fetching data from ${endpoint}:`, err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [endpoint, refreshCount, JSON.stringify(fetchOptions)]);

  return { data, isLoading, error, refetch };
}