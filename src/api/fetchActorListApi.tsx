// fetchActorListApi.tsx
import useFetch from "./useFetch";

interface ActorData {
  displayName: string;
  id: string;
  gender: string;
  language: string;
  categoryName: string;
  disabled: boolean;
}

interface FetchResult {
  data: ActorData[] | null;
  loading: boolean;
  error: any;
}

const fetchActorListApi = (): FetchResult => {

  let { data, loading, error } = useFetch<ActorData[]>(
    '/api/actorList'
  );

  if (loading) {
    //예제 json 데이터로 대신 표시
    data = [
      {
        "displayName": "로딩중...", "id": "auto", "gender": "f",
        "language": "ko-KR", "categoryName": "", "disabled": true
      },
    ];
  }
  return { data, loading, error };
};

export default fetchActorListApi;