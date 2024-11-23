import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  // useRef 사용하자 ==> 각 input 필드 추가하기
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const countryRef = useRef(null);
  const jobRef = useRef(null);

  const navigate = useNavigate();  // hook도 이번에 쓴다.

  // validate 함수
  const validateForm = () => {
    if (!formData.name) {
      nameRef.current.focus();
      alert(" Enter name!");
      return false;
    }
    if (!formData.age) {
      ageRef.current.focus();
      alert("Enter age!(only number)");
      return false;
    }
    if (!formData.gender) {
      genderRef.current.focus();
      alert("Choose gender!");
      return false;
    }
    if (!formData.country) {
      countryRef.current.focus();
      alert("Enter Country!");
      return false;
    }
    if (!formData.job) {
      jobRef.current.focus();
      alert("Enter Job!");
      return false;
    }
    return true;
  };

  const createData = async () => {
    if (!validateForm()) return;  // if No valid, shall not pass!

    try {
      const response = await fetch("https://672818a8270bd0b975544f01.mockapi.io/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        alert("Successfully created!");
        setFormData({
          name: "",
          age: "",
          gender: "",
          country: "",
          job: "",
        });

        // if complete, go to list
        navigate("/list");
      }
    } catch (error) {
      console.log("Fail to create user");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <div className="mb-3">
        <label>Name:</label>
        <input
          ref={nameRef}//여기다가 참조
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Age:</label>
        <input
          ref={ageRef}//여기다가 참조
          type="number"
          className="form-control"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Gender:</label>
        <div ref={genderRef}>
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
          ref={countryRef}//여기다가 참조
          type="text"
          className="form-control"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Job:</label>
        <input
          ref={jobRef}//여기다가 참조
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
