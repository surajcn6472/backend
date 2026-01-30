const { models: { User, Profile, UserSkill } } = require("../database");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).lean();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const profile = await Profile.findOne({ user_id: userId })
    .populate("department_id")
    .lean();
    
    const skills = await UserSkill.find({ user_id: userId })
    .populate("skill_id")
    .lean();

    return res.json({
      user,
      profile,
      skills,
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateProfile = (req, res) => {
  res.send(req.body);
};
