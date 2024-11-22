import React, { createContext, useState, useEffect } from "react";

export const RBACContext = createContext();

const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch("http://localhost:3001/users");
      const roleResponse = await fetch("http://localhost:3001/roles");
      setUsers(await userResponse.json());
      setRoles(await roleResponse.json());
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
