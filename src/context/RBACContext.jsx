import React, { createContext, useState, useEffect } from "react";

export const RBACContext = createContext();

const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users from MockAPI
        const userResponse = await fetch("https://6740982cd0b59228b7f09d85.mockapi.io/Users");
        const roleResponse = await fetch("https://6740982cd0b59228b7f09d85.mockapi.io/Roles"); // Assume you have a similar endpoint for roles
        if (!userResponse.ok || !roleResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        setUsers(await userResponse.json());
        setRoles(await roleResponse.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <RBACContext.Provider value={{ users, setUsers, roles, setRoles }}>
      {children}
    </RBACContext.Provider>
  );
};

export default RBACProvider;