import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  const navigate = useNavigate();  // hook

  const createData = async () => {
    try {
      const response = await fetch("https://672818a8270bd0b975544f01.mockapi.io/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        const data = await response.json();  // 내 목 데이터 가져오기
        alert("successfully create!");
        setFormData({
          name: "",
          age: "",
          gender: "",
          country: "",
          job: "",
        });
        
        // 새로 만들어진 데이터의 id를 update 페이지로 가져가야지
        navigate(`/update/${data.id}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <div className="mb-3">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Age:</label>
        <input
          type="number"
          className="form-control"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Gender:</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="MAN"
            checked={formData.gender === "MAN"}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          MAN
          <input
            type="radio"
            name="gender"
            value="WOMAN"
            checked={formData.gender === "WOMAN"}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          WOMAN
        </div>
      </div>
      <div className="mb-3">
        <label>Country:</label>
        <input
          type="text"
          className="form-control"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Job:</label>
        <input
          type="text"
          className="form-control"
          value={formData.job}
          onChange={(e) => setFormData({ ...formData, job: e.target.value })}
        />
      </div>

      <button className="btn btn-primary" onClick={createData}>
        Create User
      </button>
    </div>
  );
};

export default Create;
