// fetchActorListApi.tsx
import useFetch from "./useFetch";

export interface Actor {
  displayName: string;
  id: string;
  gender: string;
  language: string;
  categoryName: string;
  disabled: boolean;
}

interface ApiResponse {
  actorList: Actor[];
}

interface FetchResult {
  data: Actor[];
  loading: boolean;
  error: any;
}

const fetchActorListApi = (): FetchResult => {
  let { data, loading, error } = useFetch<ApiResponse>('/api/actorList');

  let actorData: Actor[] = [];

  if (loading) {
    //예제 json 데이터로 대신 표시
    actorData = [
      {
        displayName: "로딩중...",
        id: "notset",
        gender: "f",
        language: "ko-KR",
        categoryName: "",
        disabled: true,
      },
    ];
  } else if (data) {
    actorData = data.actorList;
  }

  return { data: actorData, loading, error };
};

export default fetchActorListApi;