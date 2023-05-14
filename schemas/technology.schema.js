const mongoose = require("mongoose");

const technoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const result = await this.constructor.findOne({ title: value });
        if (result) {
          throw new Error("Cette Technologie existe déjà.");
        }
      },
      message: "Erreur de validation.",
    },
  },
  icon: String,
});

module.exports = techno = mongoose.model("technologies", technoSchema);
