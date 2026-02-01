const { body } = require("express-validator");
const { User } = require("../database").models; // adjust path if needed

exports.registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

exports.loginValidation = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
