import Project from "../database/models/project.js";
import moment from "moment";
import User from "../database/models/user.js";
import config from "../lib/config.js";

const getProjects = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = config.perPage;
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
  const filter = { user_id: req.user.id };
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

const createProject = async (req, res) => {
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

const showProject = async (req, res) => {
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

const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.project_id);

  if (!project) {
    return res.status(404).send({
      status: "error",
      msg: "Project not found",
    });
  }

  
  if (project.user_id.toString() !== req.user.id) {
    return res.status(403).send({
      status: "error",
      msg: "You do not have permission to update this project.",
    });
  }

  project.name = req.body.name;
  project.startDate = req.body.startDate;
  project.endDate = req.body.endDate;
  project.rate = req.body.rate;
  project.status = req.body.status;

  await project.save();

  return res.status(200).json({
    status: "success",
    msg: "Project updated successfully",
  });
};

const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.project_id);

  if (!project) {
    return res.status(404).json({
      status: "error",
      msg: "Project not found",
    });
  }

  if (project.user_id.toString() !== req.user.id) {
    return res.status(403).json({
      status: "error",
      msg: "You do not have permission to delete this project.",
    });
  }

  await project.deleteOne();

  return res.status(200).json({
    status: "success",
    msg: "Project deleted successfully",
  });
};

const getAllProjects = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = config.perPage;
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

export default {
  getProjects,
  createProject,
  showProject,
  updateProject,
  deleteProject,
  getAllProjects,
};
