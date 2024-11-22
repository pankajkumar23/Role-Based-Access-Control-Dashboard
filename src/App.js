import React from "react";
import RBACProvider from "./context/RBACContext";
import UserList from "./components/UserList";
import RoleList from "./components/RoleList";
import { Container, Typography } from "@mui/material";

const App = () => {
  return (
    <RBACProvider>
      <Container>
        <Typography variant="h4" gutterBottom>
          Role-Based Access Control Dashboard
        </Typography>
        <UserList />
        <RoleList />
      </Container>
    </RBACProvider>
  );
};

export default App;
