const jsonwebtoken = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const jwt = {
  generate: ({ id, role }) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id,
        role,
      };
      const options = {
        expiresIn: "1d",
        algorithm: "HS256",
      };
      jsonwebtoken.sign(payload, JWT_SECRET_KEY, options, (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      });
    });
  },

  decode: (token) => {
    return new Promise((resolve, reject) => {
      const options = {};
      jsonwebtoken.verify(token, JWT_SECRET_KEY, options, (error, payload) => {
        if (error) {
          reject(error);
        }
        resolve(payload);
      });
    });
  },
};

module.exports = jwt;
