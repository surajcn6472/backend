exports.getProfile = (req, res) => {
  res.send("logged in user profile");
}

exports.updateProfile = (req, res) => {
  res.send(req.body);
}