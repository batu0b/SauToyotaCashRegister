import { Box, Button, Modal, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { VirtualKeyboard } from "../keyboard/VirtualKeyboard";
import { useBasketContext } from "../../context/basket/BasketContext";
import { useFormik } from "formik";
import { CustomerEmailSchema } from "../../validations";

export const EMailModal = ({ open, handleClose }) => {
  const { setCustomerEmail } = useBasketContext();
  const [input, setInput] = useState("");
  const keyboard = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: input,
    },
    onSubmit: ({ email }) => {
      setCustomerEmail(email);
      handleClose();
    },
    validationSchema: CustomerEmailSchema,
  });

  const customChange = (val) => {
    setInput(val);
    formik.setFieldValue("email", val);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: "80%" }} className="modal_box">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            helperText={formik.errors.email ? formik.errors.email : null}
            error={formik.errors.email}
            name="email"
            sx={{ bgcolor: "customSecondary", borderRadius: 1 }}
            placeholder="email"
            type="email"
            fullWidth
            value={input}
          />
          <VirtualKeyboard setInput={customChange} ref={keyboard} />
          <Button type="submit" size="large" sx={{ mt: 2 }} fullWidth>
            kaydet
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
