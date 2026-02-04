const Project = require("../database/models/project");
var moment = require("moment");
const User = require("../database/models/user");

exports.getProjects = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = 2;
  const skip = (page - 1) * perPage;

  const {
    sortBy = "name",
    order = "asc",
    status = null,
    search = null,
  } = req.query;

  const allowedSortFields = ["name", "rate"];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "name";

  const sortOrder = order === "desc" ? -1 : 1;

  // build filter
  const filter = {user_id: req.user.id};
  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }
  const total = await Project.countDocuments(filter);

  const projects = await Project.find(filter)
    .populate({
      path: "user",
      select: "name email",
      populate: {
        path: "profile",
        select: "image",
      },
    })
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(perPage)
    .exec();

  res.status(200).send({
    status: "success",
    meta: {
      total,
      page,
      perPage: perPage,
      totalPages: Math.ceil(total / perPage),
      hasNextPage: page * perPage < total,
      hasPrevPage: page > 1,
    },
    data: projects.map((project) => ({
      id: project._id,
      name: project.name,
      startDate: moment(project.startDate).format("DD MMM, YYYY"),
      endDate: moment(project.endDate).format("DD MMM, YYYY"),
      rate: project.rate,
      status: project.status,
      owner: {
        id: project.user._id,
        name: project.user.name,
        profileImage: project.user.profile ? project.user.profile.image : null,
      },
    })),
  });
};

exports.createProject = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
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
    msg: "Project created successfully",
  });
};

exports.showProject = async (req, res) => {
  const project = await Project.findById(req.params.project_id);

  if (!project) {
    return res.status(404).send({
      status: "error",
      msg: "Project not found",
    });
  }

  res.status(200).send({
    status: "success",
    data: {
      id: project._id,
      name: project.name,
      // startDate: moment(project.startDate).format("DD MMM, YYYY"),
      // endDate: moment(project.endDate).format("DD MMM, YYYY"),
      startDate: project.startDate,
      endDate: project.endDate,
      rate: project.rate,
      status: project.status,
    },
  });
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.project_id,
    {
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rate: req.body.rate,
      status: req.body.status,
    },
    { new: true }, // when true -> it returns the modified document rather than the original
  );
  if (!project) {
    return res.status(404).send({
      status: "error",
      msg: "Project not found",
    });
  }

  res.status(200).send({
    status: "success",
    msg: "Project updated successfully",
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

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.project_id).then(() => {
    res.status(200).send({
      status: "success",
      msg: "Project deleted successfully",
    });
  });
};

exports.getAllProjects = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = 2;
  const skip = (page - 1) * perPage;

  const {
    sortBy = "name",
    order = "asc",
    status = null,
    search = null,
  } = req.query;

  const allowedSortFields = ["name", "rate"];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "name";

  const sortOrder = order === "desc" ? -1 : 1;

  // build filter
  const filter = {};
  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }
  const total = await Project.countDocuments(filter);

  const projects = await Project.find(filter)
    .populate({
      path: "user",
      select: "name email",
      populate: {
        path: "profile",
        select: "image",
      },
    })
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(perPage)
    .exec();

  res.status(200).send({
    status: "success",
    meta: {
      total,
      page,
      perPage: perPage,
      totalPages: Math.ceil(total / perPage),
      hasNextPage: page * perPage < total,
      hasPrevPage: page > 1,
    },
    data: projects.map((project) => ({
      id: project._id,
      name: project.name,
      startDate: moment(project.startDate).format("DD MMM, YYYY"),
      endDate: moment(project.endDate).format("DD MMM, YYYY"),
      rate: project.rate,
      status: project.status,
      owner: {
        id: project.user._id,
        name: project.user.name,
        profileImage: project.user.profile ? project.user.profile.image : null,
      },
    })),
  });
};
