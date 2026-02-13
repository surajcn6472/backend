import { models } from "../database/index.js";

const { Department, Skill } = models;

const skills = (req, res) => {
  Skill.find()
    .exec()
    .then((skills) => {
      res.status(200).send({
        status: "success",
        msg: "Skills fetched successfully.",
        data: skills.map((skill) => ({
          id: skill._id,
          name: skill.name,
        })),
      });
    });
};

const departments = (req, res) => {
  Department.find()
    .exec()
    .then((departments) => {
      res.status(200).send({
        status: "success",
        msg: "Departments fetched successfully.",
        data: departments.map((department) => ({
          id: department._id,
          name: department.name,
        })),
      });
    });
};

export default { skills, departments };
