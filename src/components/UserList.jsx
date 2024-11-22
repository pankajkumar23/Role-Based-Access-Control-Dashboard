import React, { useContext } from "react";
import { RBACContext } from "../context/RBACContext";
import UserForm from "./UserForm";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const UserList = () => {
  const { users, setUsers } = useContext(RBACContext);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
          setSelectedUser(null);
        }}
      >
        Add User
      </Button>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
            <Button
              onClick={() => {
                setOpen(true);
                setSelectedUser(user);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(user.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {open && (
        <UserForm
          Form
          open={open}
          setOpen={setOpen}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};
export default UserList;
