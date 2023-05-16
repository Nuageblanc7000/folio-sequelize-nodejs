const yup = require("yup");
const messages = require("./message");

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email(messages.email)
    .nonNullable(messages.required)
    .required(messages.required),
  password: yup
    .string()
    .nonNullable(messages.required)
    .required(messages.required),
});

module.exports = schemaLogin;
