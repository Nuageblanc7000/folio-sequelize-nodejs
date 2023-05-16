const yup = require("yup");
const messages = require("./message");

const schemaProject = yup.object().shape({
  title: yup.string().required(messages.required).nonNullable().trim(),
  description: yup.string().required(messages.required).trim(),
  images: yup
    .array()
    .of(yup.object().shape({ path: yup.string().required(messages.required) }))
    .min(1, "Veuillez ajouter au moins une image"),
  technologies: yup
    .mixed()
    .transform((value) => {
      if (!Array.isArray(value)) {
        return (value = [+value]);
      }
      return value;
    })
    .test(
      "is-array-of-numbers",
      "Les technologies doivent être un tableau de nombres",
      function (value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (const item of value) {
          if (typeof item !== "number" || Number.isNaN(item)) {
            return false;
          }
        }
        return true;
      }
    )
    .required(messages.required), // Assurez-vous que le champ est obligatoire
});

module.exports = schemaProject;
