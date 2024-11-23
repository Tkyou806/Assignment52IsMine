import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // URL의 끝에 있는 숫자(=id)가져와서 fetch할 거 받자.
  const [user, setUser] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      // 특정 id에 해당하는 사용자만 가져오기(전과 달라)
      const response = await fetch(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${id}`);
      const data = await response.json();
      console.log("Fetched data:", data); //가져온 데이타 표시하자(check용)

      //if data 없을 겨우 (id번호 넘어가거나, 아님 fetch가 아됬거나)
      if (data) {
        setUser(data);
      } else {
        console.log("User not found with id:", id);
        setUser(null);  // 사용자가 없으면 null 설정
      }
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData(); // id 변경 시마다 fetchData 호출
  }, [fetchData, id]);

  return (
    <div>
      <h2>Detail Page</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age} years old</p>
          <p>Gender: {user.gender}</p>
          <p>Country: {user.country}</p>
          <p>Job: {user.job}</p>
        </div>
      ) : (
        <p>Not fetched.....</p>
      )}
    </div>
  );
};

export default Detail;
