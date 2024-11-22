import React, { useContext, useState, useEffect } from "react";
import { RBACContext } from "../context/RBACContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const RoleForm = ({ open, setOpen, selectedRole }) => {
  const { roles, setRoles } = useContext(RBACContext);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (selectedRole) {
      setName(selectedRole.name);
      setPermissions(selectedRole.permissions);
    } else {
      setName("");
      setPermissions([]);
    }
  }, [selectedRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRole) {
      // Update role
      const updatedRole = { ...selectedRole, name, permissions };
      await fetch(`https://6740982cd0b59228b7f09d85.mockapi.io/Roles/${selectedRole.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRole),
      });
      setRoles(
        roles.map((role) => (role.id === selectedRole.id ? updatedRole : role))
      );
    } else {
      // Add new role
      const newRole = { name, permissions };
      const response = await fetch("https://6740982cd0b59228b7f09d85.mockapi.io/Roles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });
      const createdRole = await response.json();
      setRoles([...roles, createdRole]);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{selectedRole ? "Edit Role" : "Add Role"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Role Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Add checkboxes for permissions here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {selectedRole ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleForm;
