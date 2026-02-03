const { Department, Skill } = require("../database").models;

exports.skills = (req, res) => {
  Skill.find()
    .exec()
    .then((skills) => {
      res.status(200).send({
        status: "success",
        msg: "Skills fetched successfully.",
        data: skills.map(skill => ({
          id: skill._id,
          name: skill.name,
        })),
      });
    });
};

exports.departments = (req, res) => {
  Department.find()
    .exec()
    .then((departments) => {
      res.status(200).send({
        status: "success",
        msg: "Departments fetched successfully.",
        data: departments.map(department => ({
          id: department._id,
          name: department.name,
        })),
      });
    });
};
