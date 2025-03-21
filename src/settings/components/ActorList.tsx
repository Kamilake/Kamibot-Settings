import useFetch from "../../api/useFetch";

interface Actor {
  displayName: string;
  id: string;
  gender: string;
  language: string;
  categoryName: string;
  disabled: boolean;
}

interface FetchResult {
  data: Actor[];
  loading: boolean;
  error: any; // error의 타입을 더 정확하게 지정하면 좋습니다.
}

const actorList = (): FetchResult => {
  let { data, loading, error } = useFetch<Actor[]>(
    '/api/actorList'
  );

  if (loading) {
    data = [
      {
        displayName: "로딩중...",
        id: "auto",
        gender: "f",
        language: "ko-KR",
        categoryName: "",
        disabled: true
      },
    ];
  }
  return { data, loading, error };
};

export default actorList;