import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//수정 관련 페이지
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  const [editCount, setEditCount] = useState(0); // useState for 수정 횟 수 세기
  const [editFields, setEditFields] = useState({}); // useState for 필드 변경 관련

  const nameRef = useRef(null);//참조 하자
  const ageRef = useRef(null);

  // 기존 원래 정보 불러와서 건드리자.
  const original = useRef({
    id: "",
    name: "",
    age: "",
    gender: "",
    country: "",
    job: "",
  });

  useEffect(() => {
    if (id) {
      // 전체 정보 말고 url로 특정 정보 Fetch하기
      axios
        .get(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${id}`)
        .then((response) => {
          const fetchedData = {
            id: response.data.id,
            name: response.data.name,
            age: response.data.age,
            gender: response.data.gender,
            country: response.data.country,
            job: response.data.job,
          };

          setInputData(fetchedData);
          original.current = fetchedData; 
          setEditFields({});
        })
        .catch((error) => {
          console.log("Error fetching data", error);
          
        });
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInputData((prevData) => ({ ...prevData, [name]: value }));

    // Track modified fields only if the value changes
    if (original.current[name] !== value) {
      setEditFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Compare with original data to check for edits
    if (original.current[name] !== value) {
      setEditCount((prevCount) => prevCount + 1); // Increment edit count
      setEditFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const validateForm = useCallback(() => {
    let isValid = true;

    if (!inputData.id) {//이제 필요 없긴 한데...(고정이니까)
      isValid = false;
    }

    return isValid;
  }, [inputData.id]);

  useEffect(() => {
    if (inputData.id && validateForm()) {
      // Only update if there are edit fields
      const dataToUpdate = Object.keys(editFields).length > 0 ? editFields : null;

      if (dataToUpdate) {
        axios
          .put(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${inputData.id}`, dataToUpdate)
          .then((response) => {
            setEditFields({});
            setInputData((prevData) => ({
              ...prevData,
              ...dataToUpdate,
            }));
            
          })
          .catch((error) => {
            console.log("Error updating data");
           
          });
      }
    }
  }, [inputData.id, editFields, validateForm, navigate]);

  return (
    <div>
      <h2>Update User Info</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={inputData.id}
            onChange={(e) => setInputData((prevData) => ({ ...prevData, id: e.target.value }))}
            disabled
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInput}
            onBlur={handleBlur}
            ref={nameRef}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={inputData.age}
            onChange={handleInput}
            onBlur={handleBlur}
            ref={ageRef}
          />
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="MAN"
            checked={inputData.gender === "MAN"}
            onChange={handleInput}
            onBlur={handleBlur}
          /> Male
          <input
            type="radio"
            name="gender"
            value="WOMAN"
            checked={inputData.gender === "WOMAN"}
            onChange={handleInput}
            onBlur={handleBlur}
          /> Female
        </div>

        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={inputData.country}
            onChange={handleInput}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <label>Job:</label>
          <input
            type="text"
            name="job"
            value={inputData.job}
            onChange={handleInput}
            onBlur={handleBlur}
          />
        </div>
      </form>
      <div>
        <p>Total Edits: {editCount}</p> {/*수정 횟 수 (내용물 바꾸고 필드에서 나가면 세자)*/}
      </div>
    </div>
  );
};

export default Update;
