import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  password: yup.string().required("passworNotFill"),
  userCode: yup.number().required("userCodeNotFill"),
});
