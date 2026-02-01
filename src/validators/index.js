const { validationResult } = require("express-validator");
const projectValidator = require("./projectValidator");
const authValidator = require("./authValidator");
const profileValidator = require("./profileValidator");

const validationErr = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errCode = 422;
    return res.status(errCode).json({
      code: errCode,
      errors: errors.array().reduce((acc, err) => {
        if (!acc[err.path]) {
          acc[err.path] = err.msg;
        }
        return acc;
      }, {}),
      msg: "Invalid input",
    });
  }

  next();
};

module.exports = { validationErr, ...authValidator, ...projectValidator, ...profileValidator };
