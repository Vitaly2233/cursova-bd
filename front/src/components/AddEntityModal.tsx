import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const inputStyle = { marginTop: 15, marginBottom: 15 };

const closeButtonStyles = { alignSelf: "center", marginTop: 20 };

interface Props {
  isOpen: boolean;
  fieldsToFill: string[];
  handleAddEntity: (newEntity?: Record<string, string>) => void;
}

function AddEntityModal({ handleAddEntity, isOpen, fieldsToFill }: Props) {
  const [obj, setObj] = useState<Record<string, string>>({});
  return (
    <Modal
      open={isOpen}
      onClose={() => handleAddEntity()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new entity
        </Typography>
        {fieldsToFill.map((field) => {
          if (field === 'id') return null
          return (
            <Input
              style={inputStyle}
              placeholder={field}
              onChange={(event) => {
                obj[field] = event.target.value;
                setObj(obj);
              }}
            />
          );
        })}
        <Button
          onClick={() => {
            handleAddEntity(obj);
          }}
          style={closeButtonStyles}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default AddEntityModal;
