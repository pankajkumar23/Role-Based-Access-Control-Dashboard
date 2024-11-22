import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const PermissionManager = ({ permissions, setPermissions }) => {
  const allPermissions = ["Read", "Write", "Delete"];

  const handlePermissionChange = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div>
      {allPermissions.map((permission) => (
        <FormControlLabel
          key={permission}
          control={
            <Checkbox
              checked={permissions.includes(permission)}
              onChange={() => handlePermissionChange(permission)}
            />
          }
          label={permission}
        />
      ))}
    </div>
  );
};

export default PermissionManager;
