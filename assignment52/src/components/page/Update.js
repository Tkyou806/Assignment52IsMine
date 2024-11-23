import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();  // URL에서 id를 받아오기

  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
  });

  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    // URL로 id받기 ==> API 호출
    axios.get(`https://api.example.com/user/${id}`)
      .then((response) => {
        setInputData({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          age: response.data.age,
        });
      })
      .catch((error) => console.error("Error fetching data", error));
  }, [id]);  // 다시 호출할 수 있게끔!!!

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 다시 reload...
    const updatedData = { ...inputData, [name]: value };
    setInputData(updatedData);

    // 수정한 회수 증가시키자
    setEditCount((prevCount) => prevCount + 1);

    // API 호출
    axios.put(`https://api.example.com/user/${id}`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => console.error("Error updating data", error));
  };

  return (
    <div>
      <h2>Update User Info</h2>
      <form>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={inputData.id}
            readOnly
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={inputData.age}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div>
        <p>Total Edits: {editCount}</p>
      </div>
    </div>
  );
};

export default Update;
