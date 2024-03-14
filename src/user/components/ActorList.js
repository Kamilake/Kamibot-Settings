import React from 'react';

// fetchChannelListApi.js
import useFetch from "./useFetch";

const actorList = () => {

  let { data, loading, error } = useFetch(
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

export default actorList;