import { Box, Modal, TextField } from "@mui/material";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useRef, useState } from "react";
import { VirtualKeyboard } from "./VirtualKeyboard";

export const KeyboardModal = ({ setInpit, onChange, ...props }) => {
  const { isMobile } = useDeviceDetection();
  const [showModal, setShowModal] = useState(false);
  const keyboard = useRef(null);
  const handleClick = () => {
    if (isMobile) {
      setShowModal(true);
    }
  };
  return (
    <>
      <TextField
        InputProps={{ readOnly: isMobile }}
        onClick={handleClick}
        onChange={onChange}
        {...props}
      />

      {showModal ? (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={{ width: "80%" }} className="modal_box">
            <TextField
              fullWidth
              placeholder={props.label}
              InputProps={{
                readOnly: isMobile,
              }}
              sx={{ bgcolor: "customInput", borderRadius: 1 }}
              value={props.value}
              type={props.type || "text"}
            />
            <VirtualKeyboard
              isNumpad={props.isNumpad}
              initialValue={props.value}
              setInput={setInpit}
              ref={keyboard}
            />
          </Box>
        </Modal>
      ) : null}
    </>
  );
};
