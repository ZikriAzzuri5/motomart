const User = require("../user/model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getToken } = require("../../utils");

const register = async (req, res, next) => {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        error: 1,
        message: messages.join(", "),
      });
    }
    next(error);
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt -cart_items -token"
    );
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error, null);
  }
  done();
};

const login = async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user)
      return res
        .status(400)
        .json({ error: 1, message: "Email or Password incorrect" });

    let signed = jwt.sign(user, config.secretkey);

    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });

    return res.json({
      message: "Login Successfully",
      user,
      token: signed,
    });
  })(req, res, next);
};

const logout = async (req, res, next) => {
  const token = getToken(req);
  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token: token } },
    { useFindModify: false }
  );

  if (!token || !user) {
    return res.json({
      error: 1,
      message: "Not User Found!",
    });
  }

  return res.json({
    error: 0,
    message: "Sucessfully Logout !",
  });
};

const me = (req, res, next) => {
  if (!req.user) {
    return res.json({
      err: 1,
      message: "You are not login or token expired",
    });
  }
  return res.json(req.user);
};

module.exports = { register, localStrategy, login, logout, me };
