import { validationResult } from "express-validator";

const validationErr = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
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

export { validationErr };
export * from "./authValidator.js";
export * from "./projectValidator.js";
export * from "./profileValidator.js";
