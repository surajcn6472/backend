const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/models/user");

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        },
      );

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      });
    });
};

exports.register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      ),
    });

    await user.save();

    res.status(201).send({
      status: "success",
      msg: "Signup successful",
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({
        status: "failure",
        msg: "Email already exists",
      });
    }
    res.status(500).send({
      status: "error",
      msg: err.message,
    });
  }
};

