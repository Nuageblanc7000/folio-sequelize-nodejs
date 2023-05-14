class SuccessResponse {
  constructor(data, code = 200) {
    this.data = data;
    this.code = code;
  }
}

class SuccessArrayResponse {
  constructor(data, req, code = 200) {
    this.data = data;
    this.code = code;
  }
}

module.exports = {
  SuccessResponse,
  SuccessArrayResponse,
};
