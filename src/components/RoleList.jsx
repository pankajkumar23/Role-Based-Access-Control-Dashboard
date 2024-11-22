import React, { useContext } from "react";
import { RBACContext } from "../context/RBACContext";
import RoleForm from "./RoleForm";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const RoleList = () => {
  const { roles, setRoles } = useContext(RBACContext);
  const [open, setOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(null);

  const handleDelete = async (id) => {
    await fetch(`https://6740982cd0b59228b7f09d85.mockapi.io/Roles/${id}`, { method: "DELETE" });
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
          setSelectedRole(null);
        }}
      >
        Add Role
      </Button>
      <List>
        {roles.map((role) => (
          <ListItem key={role.id}>
            <ListItemText primary={role.name} />
            <Button
              onClick={() => {
                setOpen(true);
                setSelectedRole(role);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(role.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {open && (
        <RoleForm open={open} setOpen={setOpen} selectedRole={selectedRole} />
      )}
    </div>
  );
};

export default RoleList;
