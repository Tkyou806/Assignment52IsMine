import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Update = ({ setUserData }) => {
  const { id } = useParams();

  // for data counting
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  const [editCount, setEditCount] = useState(0); // for update counting
  const nameRef = useRef(null); // name에 대한 ref
  const ageRef = useRef(null); // age에 대한 ref
  const genderRef = useRef(null); // gender에 대한 ref
  const countryRef = useRef(null); // country에 대한 ref
  const jobRef = useRef(null); // job에 대한 ref

  // for data orinin...
  const original = useRef({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  // 데이터 가져오기
  useEffect(() => {
    if (id) {
      axios
        .get(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${id}`)
        .then((response) => {
          setInputData(response.data);
          original.current = response.data; // 원본 데이터 저장
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  // 필수 입력 체크(없으면 알람 주고 필드로 가게끔!) 하고 수정 count 증가하자(blur랑 내용물)
  const handleBlur = (fieldName) => {
    if (!inputData[fieldName]) {
      // 알람 ==> 해당 필드로 포커스 이동
      alert(`${fieldName} is required.`);
      const refMap = {
        name: nameRef,
        age: ageRef,
        gender: genderRef,
        country: countryRef,
        job: jobRef,
      };

      // 알람 ==> 포커스를 다시 해당 필드로 옮기자
      setTimeout(() => {
        refMap[fieldName].current.focus();
      }, 100); // alert가 닫힌 후 포커스 이동
    } else if (original.current[fieldName] !== inputData[fieldName]) {
      // 값이 변경  ==> 수정 횟수 증가
      setEditCount((prevCount) => prevCount + 1);
      original.current[fieldName] = inputData[fieldName]; // 변경된 값 저장

      axios
        .put(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${id}`, inputData)
        .then(() => {
          // 업데이트 후 상태 설정 하지 말자, 그게 그거니까
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          alert("Failed to update user data.");
        });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Update User Info</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID:</label>
          <input
            type="text"
            name="id"
            id="id"
            value={inputData.id}
            className="form-control"
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={inputData.name}
            onChange={handleInputChange}
            onBlur={() => handleBlur("name")}
            ref={nameRef}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            value={inputData.age}
            onChange={handleInputChange}
            onBlur={() => handleBlur("age")}
            ref={ageRef}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <select
            name="gender"
            id="gender"
            value={inputData.gender}
            onChange={handleInputChange}
            onBlur={() => handleBlur("gender")}
            ref={genderRef}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="MAN">Male</option>
            <option value="WOMAN">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            id="country"
            value={inputData.country}
            onChange={handleInputChange}
            onBlur={() => handleBlur("country")}
            ref={countryRef}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="job" className="form-label">Job:</label>
          <input
            type="text"
            name="job"
            id="job"
            value={inputData.job}
            onChange={handleInputChange}
            onBlur={() => handleBlur("job")}
            ref={jobRef}
            className="form-control"
          />
        </div>
      </form>
      <div className="text-center">
        <p className="mt-3">Total Edits: {editCount}</p>
      </div>
    </div>
  );
};

export default Update;
