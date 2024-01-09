import React from "react";
import Button from "@mui/material/Button";
const SaveButton = ({ onSave, onCancel }) => {
  return (
    <>
      <div className="font-['Roboto'] mb-[32px] flex self-end 2xl:mt-[30px] lg:mt-[13px]  space-x-4 ">
        <Button
          variant="outlined"
          onClick={onCancel}
          style={{
            borderColor: "#2196F3",
            color: "#2196F3",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",
            padding: "6px,16px",
          }}
        >
          CANCEL
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          style={{
            backgroundColor: "#5BD877",
            color: "#fff",
            padding: "6px,16px",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",
          }}
        >
          SAVE
        </Button>
      </div>
    </>
  );
};

export default SaveButton;
