import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Not valid email format")
    .required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required(),
  /*patId: yup.string().required("ID is required"),
  pName: yup.string().required("Name is required"),
  phoneNum: yup
    .number()
    .typeError("Input must be a number")
    .required("Phone Number is required!"),
  age: yup
    .number()
    .typeError("Age must be number")
    .integer("Age must be an integer")
    .required("Age is required"),

  address: yup.string().required("Address is required"),*/
});
