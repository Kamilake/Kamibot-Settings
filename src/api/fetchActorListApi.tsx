import useFetch from "./useFetch";
// import React from 'react';

// fetchActorListApi.js

const fetchActorListApi = () => {

  let { data, loading, error } = useFetch(
    '/api/actorList'
  );

  // let data = [];
  // let loading = true;
  // let error = null;

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