const Project = require("../database/models/projects");
var moment = require("moment");
const User = require("../database/models/users");

exports.getProjects = async (req, res) => {
  const projects = await Project.find().exec();
  res.status(200).send({
    status: "success",
    data: projects.map((project) => ({
      id: project._id,
      name: project.name,
      startDate: moment(project.startDate).format("DD MMM, YYYY"),
      endDate: moment(project.endDate).format("DD MMM, YYYY"),
      rate: project.rate,
      status: project.status,
    })),
  });
};

exports.createProject = async (req, res) => {
  const user = await User.findOne({ _id: req.body.user_id });
  const newProject = new Project({
    user_id: user._id,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    rate: req.body.rate,
    status: req.body.status,
  });

  await newProject.save();
  res.status(201).send({
    status: "success",
    message: "Project created successfully",
  });
};

exports.showProject = async (req, res) => {
  const project = await Project.findById(req.params.project_id);
  res.status(200).send({
    status: "success",
    data: {
      id: project._id,
      name: project.name,
      startDate: moment(project.startDate).format("DD MMM, YYYY"),
      endDate: moment(project.endDate).format("DD MMM, YYYY"),
      rate: project.rate,
      status: project.status,
    },
  });
};

exports.updateProject = (req, res) => {
  Project.findByIdAndUpdate(
    req.params.project_id,
    {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rate: req.body.rate,
      status: req.body.status,
    },
    { new: true }, // when true -> it returns the modified document rather than the original
  ).then((updatedProjects) => {
    res.status(200).send({
      status: "success",
      message: "Project updated successfully",
      data: {
        id: updatedProjects._id,
        name: updatedProjects.name,
        startDate: moment(updatedProjects.startDate).format("DD MMM, YYYY"),
        endDate: moment(updatedProjects.endDate).format("DD MMM, YYYY"),
        rate: updatedProjects.rate,
        status: updatedProjects.status,
      }
    });
  });
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.project_id).then(() => {
    res.status(200).send({
      status: "success",
      message: "Project deleted successfully",
    });
  });
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().exec();
  res.send(
    projects.map((project) => ({
      id: project._id,
      name: project.name,
      startDate: moment(project.startDate).format("DD MMM, YYYY"),
      endDate: moment(project.endDate).format("DD MMM, YYYY"),
      rate: project.rate,
      status: project.status,
    })),
  );
};
