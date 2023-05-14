class ErrorResponse {
  constructor(message, path = "global", err = {}, code = 400) {
    this.errors = {
      message,
      path,
      ...err,
    };
    this.statusCode = code;
  }
}
class ErrorGlobal {
  constructor(message, path = "global", err = {}, code = 400) {
    this.errors = {
      message,
      path,
      err: err,
    };
    this.statusCode = code;
  }
}

class ErrorFileResponse {
  constructor(err, message = "Une erreur dans le fichier", code = 400) {
    this.errors = {
      ...err,
      message: message,
    };
  }
}
class ErrorValidatorResponse {
  constructor({ inner } = err, code = 403) {
    this.errors = {};
    inner.forEach((err) => {
      this.errors[err.path] = {
        path: err.path,
        type: err.type,
        name: err.name,
        message: err.message,
      };
    });
    this.statusCode = code;
  }
}

module.exports = {
  ErrorResponse,
  ErrorValidatorResponse,
  ErrorFileResponse,
  ErrorGlobal,
};
