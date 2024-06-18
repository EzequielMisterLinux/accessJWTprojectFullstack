import { useState, useEffect } from "react";
import { getUser } from "../api/UsersProvider.jsx";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUser();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido al Dashboard</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>Nombre: {user.name} {user.middlename}</p>
              <p>Correo: {user.mail}</p>
              <p>Usuario: {user.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Dashboard;
