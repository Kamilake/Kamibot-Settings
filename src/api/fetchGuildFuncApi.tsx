// fetchGuildInfoApi.tsx
import useFetch from "./useFetch";


interface FetchResult {
  data: any | null;
  loading: boolean;
  error: any;
}

const fetchGuildFuncApi = (func: string): FetchResult => {

  let { data, loading, error } = useFetch<any>(
    '/api/guild/0/' + func
  );

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = {
      "enabled": false,
    };
  }
  return { data, loading, error };
};

export default fetchGuildFuncApi;