import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [users, setUsers] = useState([]);
//전체 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await fetch("https://672818a8270bd0b975544f01.mockapi.io/api/v1/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
//삭제 시, 특정 부분만 건드리기
  const handleDelete = async (id) => {
    try {
      // delete 
      await fetch(`https://672818a8270bd0b975544f01.mockapi.io/api/v1/users/${id}`, {
        method: "DELETE",
      });
      //reload
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {/* Create button*/}
      <Link to="/create">
        <button className="btn btn-success mb-3">Create New User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}, {user.name}, {user.age} years old, {user.gender}, {user.country}, {user.job}
            
            <div>
              {/* Detail button */}
              <Link to={`/detail/${user.id}`}>
                <button className="btn btn-info">Detail</button>
              </Link>

              {/* Update button*/}
              <Link to={`/update/${user.id}`}>
                <button className="btn btn-warning">Update</button>
              </Link>

              {/* Delete button - 클릭 시 즉시 삭제 */}
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user.id)} // delete 함수 호출
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
