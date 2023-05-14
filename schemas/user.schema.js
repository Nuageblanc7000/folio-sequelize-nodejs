const { Schema, model, default: mongoose } = require("mongoose");
const db = require("./index");

//validator custom et async
const validatorName = {
  validator: async function (v) {
    const existingUser = await this.constructor.findOne({
      firstname: v,
    });

    return !existingUser;
  },
  message: (props) => `Le nom d'utilisateur ${props.value} est déjà pris.`,
};

const userSchema = Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          const result = await this.constructor.findOne({ email: value });
          if (result) {
            throw new Error("Un compte existe déjà avec cet email");
          }
        },
        message: "Erreur de validation.",
      },
    },
    password: { type: String, required: true },
    avatar: String,
    roles: { type: [String], default: ["user"] },
    // projects: [{ type: mongoose.Types.ObjectId, ref: "projects" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});
/**
 * @var {model} UserModel
 */
const UserModel = model("users", userSchema);
module.exports = UserModel;
