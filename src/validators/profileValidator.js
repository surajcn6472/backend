const { body } = require("express-validator");
const { User } = require("../database").models; // adjust path if needed

exports.updateProfileValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value, _id: { $ne: req.user.id } });
      if (user && user._id.toString() !== req.user.id) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("department_id")
    .optional()
    .isMongoId()
    .withMessage("Invalid department id"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender value"),

  body("bio").optional().isString().withMessage("Bio must be a string"),

  body("skills")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Skills must be an array"),

  body("skills.*").optional().isMongoId().withMessage("Invalid skill id"),
];
