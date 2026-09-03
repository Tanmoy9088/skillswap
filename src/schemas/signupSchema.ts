import * as yup from "yup";

const phoneRegExp =
  /^\+?[1-9]\d{7,14}$/;

export const SignupSchema = yup.object({
  name: yup
    .string()
    .min(6, "minimum 6 character long")
    .required("name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, " Phone number is not valid")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 character long")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Password is required"),
});
