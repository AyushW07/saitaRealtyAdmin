import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";

const Namepopups = ({ open, onClose, onAdd }) => {
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const propertyTypes = ["Residential", "Commercial", "Land", "Other"];
  const handleAdd = () => {
    onAdd({
      propertyName,
      propertyType,
    });
    // Clear the fields and close the popup
    setPropertyName("");
    setPropertyType("");
    onClose();
  };
  //   const handleOpen = () => setTogglePop(true);
  const handleClose = () => onClose();

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: "8px",
          }}
        >
          <TextField
            id="property-name"
            label="Property name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            placeholder="Add property name"
            fullWidth
            margin="normal"
          />
          <TextField
            id="property-type"
            select
            label="Property type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            fullWidth
            margin="normal"
          >
            {propertyTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              variant="contained"
              style={{
                background:
                  "linear-gradient(263deg, #3CBBA4 6.02%, #C1F430 96.65%)",
                boxShadow: "0px 4px 11.6px 0px rgba(0, 0, 0, 0.25) inset",
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Namepopups;
