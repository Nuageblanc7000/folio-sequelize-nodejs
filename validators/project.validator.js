const yup = require("yup");

const schemaProject = yup.object().shape({
  title: yup.string().required().nonNullable().trim(),
  description: yup.string().required().trim(),
  images: yup
    .array()
    .of(yup.object().shape({ path: yup.string().required() }))
    .min(1, "Veuillez ajouter au moins une image"),
  technologies: yup.array().of(yup.number()).min(1).required(),
});

module.exports = schemaProject;
