import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function handleDelete(id) {
    try {
      fetch(`/delete/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  function handleUpdate(id, updatedDescription) {
    try {
      const response = fetch(`/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: updatedDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, description: updatedDescription } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="table-wrapper">
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.dob}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>{user.description}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  <button onClick={() => handleUpdate(user.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
