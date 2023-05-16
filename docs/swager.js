const { Express, Request, Response } = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../package.json");

/**
 * @var {swaggerJsdoc.Options} options
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FOLIO API",
      description: "api de création de portfolio",
      version,
      contact: {
        name: "wetterene Rémy",
        email: "wetterene.remy@gmail.com",
        url: "https://github.com/Nuageblanc7000",
      },
      components: {
        securitySchemas: {
          cookieAuth: {
            type: "JWT",
            in: "cookie",
            name: "token",
          },
        },
      },
      security: {
        cookieAuth: [],
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"], // Chemin vers les fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);
/**
 *
 * @param {Express} app
 * @param {number} port
 */
function swagerDocs(app, port) {
  //la page swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //doc in json

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swagerDocs;
