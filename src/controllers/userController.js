const { User, Profile, UserSkill } = require("../database").models;
const { mongoose } = require("../database");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },

      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "user_id",
          as: "profile",
        },
      },
      { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "departments",
          localField: "profile.department_id",
          foreignField: "_id",
          as: "departmentTemp",
        },
      },
      {
        $unwind: { path: "$departmentTemp", preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: "userskills",
          localField: "_id",
          foreignField: "user_id",
          as: "userSkillsTemp",
        },
      },

      {
        $lookup: {
          from: "skills",
          localField: "userSkillsTemp.skill_id",
          foreignField: "_id",
          as: "skillsTemp",
        },
      },

      {
        $addFields: {
          "profile.department": "$departmentTemp",
          "profile.skills": "$skillsTemp",
        },
      },

      {
        $project: {
          departmentTemp: 0,
          userSkillsTemp: 0,
          skillsTemp: 0,
        },
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = user[0];
    return res.json({
      status: "success",
      data: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        profile: userData.profile
          ? {
              bio: userData.profile.bio,
              gender: userData.profile.gender,
              image: userData.profile.image,
              department: userData.profile.department
                ? {
                    id: userData.profile.department._id,
                    name: userData.profile.department.name,
                  }
                : null,
              skills: userData.profile.skills
                ? userData.profile.skills.map((skill) => ({
                    id: skill._id,
                    name: skill.name,
                  }))
                : [],
            }
          : null,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, department_id, gender, bio, skills = [] } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true },
    );
    if (!user) throw new Error("User not found");

    const profile = await Profile.findOneAndUpdate(
      { user_id: userId },
      {
        department_id,
        gender,
        bio,
      },
      { new: true },
    );

    if (!profile) throw new Error("Profile not found");

    await UserSkill.deleteMany({ user_id: userId });

    if (skills.length) {
      const userSkills = skills.map((skillId) => ({
        user_id: userId,
        skill_id: skillId,
      }));
      await UserSkill.insertMany(userSkills);
    }

    return res.json({
      status: "success",
      message: "Profile updated",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
