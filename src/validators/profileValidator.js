const { body } = require("express-validator");
const { User, Skill } = require("../database").models;
const path = require("path");

exports.updateProfileValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value, { req }) => {
      const user = await User.findOne({
        email: value,
        _id: { $ne: req.user.id },
      });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("department_id")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid department id"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender value"),

  body("bio").optional().isString().withMessage("Bio must be a string"),

  body("image").custom((value, { req }) => {
    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) {
        throw new Error("Image must be less than 2MB");
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
      const fileExt = path.extname(req.file.originalname).toLowerCase();

      if (!allowedExtensions.includes(fileExt)) {
        throw new Error("Invalid image format. Allowed: jpg, jpeg, png, webp");
      }
    }

    return true;
  }),

  body("skills")
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) return true;
      if (typeof value === "string") return true;
      throw new Error("Skills must be an array");
    }),

  body("skills.*")
    .optional()
    .trim()
    .isMongoId()
    .custom(async (value) => {
      await Skill.exists({ _id: value });
    })
    .withMessage("Invalid skill id"),
];
