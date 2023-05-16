const yup = require("yup");
const userService = require("../services/user.service");
const messages = require("./message");

const uniqueEmail = async (email) => {
  const exist = await userService.userEmailExist(email);
  if (exist) {
    throw new yup.ValidationError("Cet email existe déjà", email, "email");
  } else {
    return true;
  }
};

const schemaUser = yup.object().shape({
  firstname: yup.string().required(messages.required).trim(),
  lastname: yup.string().required(messages.required).trim(),
  roles: yup.string().trim(),
  email: yup
    .string()
    .email()
    .test("uniqueEmail", "Cet email est déjà utilisé", uniqueEmail),
});

module.exports = schemaUser;
