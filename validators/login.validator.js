const yup = require("yup");

const schemaLogin = yup.object().shape({
  email: yup.string().email().nonNullable().required(),
  password: yup.string().nonNullable().required(),
});

module.exports = schemaLogin;
