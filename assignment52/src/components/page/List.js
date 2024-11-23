import React, { useEffect, useState } from "react";

const List = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://672818a8270bd0b975544f01.mockapi.io/api/v1/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>

            {user.id}, {user.name}, {user.age} years old, {user.gender}, {user.country}, {user.job}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
