import { Box, Modal, TextField, Button } from "@mui/material";
import useDeviceDetection from "../../hooks/useDeviceDetection";
import { useRef, useState } from "react";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { useTranslation } from "react-i18next";

export const KeyboardModal = ({ setInput, onChange, ...props }) => {
  const { isMobile } = useDeviceDetection();
  const { t } = useTranslation();
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
          <Box sx={{ width: "90%" }} className="modal_box">
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
              setInput={setInput}
              ref={keyboard}
            />
            <Button
              sx={{ mt: 2 }}
              onClick={() => setShowModal(false)}
              fullWidth
              size="large"
            >
              {t("saveChanges")}
            </Button>
          </Box>
        </Modal>
      ) : null}
    </>
  );
};
