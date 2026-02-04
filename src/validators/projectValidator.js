const { body, param } = require("express-validator");
const { Project } = require("../database").models;

exports.createProjectValidation = [
  body("name").trim().notEmpty().withMessage("Project name is required"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid ISO date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),

  body("rate")
    .notEmpty()
    .withMessage("Rate is required")
    .isNumeric()
    .withMessage("Rate must be a number"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "in progress", "finished"])
    .withMessage("Invalid project status"),
];

exports.updateProjectValidation = [
  param("project_id")
    .isMongoId()
    .custom(async (value) => {
      await Project.exists({ _id: value });
    })
    .withMessage("Invalid project id"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Project name cannot be empty"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid ISO date"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid ISO date")
    .custom((value, { req }) => {
      if (req.body.startDate) {
        if (new Date(value) <= new Date(req.body.startDate)) {
          throw new Error("End date must be after start date");
        }
      }
      return true;
    }),

  body("rate").optional().isNumeric().withMessage("Rate must be a number"),

  body("status")
    .optional()
    .isIn(["pending", "in progress", "finished"])
    .withMessage("Invalid project status"),
];
