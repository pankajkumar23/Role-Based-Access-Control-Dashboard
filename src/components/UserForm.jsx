import React, { useContext, useState, useEffect } from 'react';
import { RBACContext } from '../context/RBACContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const UserForm = ({ open, setOpen, selectedUser  }) => {
  const { users, setUsers } = useContext(RBACContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedUser ) {
      setName(selectedUser .name);
    } else {
      setName('');
    }
  }, [selectedUser ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser ) {
      // Update user
      const updatedUser  = { ...selectedUser , name };
      await fetch(`https://6740982cd0b59228b7f09d85.mockapi.io/Users/${selectedUser .id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser ),
      });
      setUsers(users.map(user => (user.id === selectedUser .id ? updatedUser  : user)));
    } else {
      // Add new user
      const newUser  = { name };
      const response = await fetch('https://6740982cd0b59228b7f09d85.mockapi.io/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser ),
      });
      const createdUser  = await response.json();
      setUsers([...users, createdUser ]);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{selectedUser  ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="User  Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>{selectedUser  ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;