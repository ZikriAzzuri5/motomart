const { getToken } = require("../utils/index");
const jwt = require("jsonwebtoken");
const config = require("../app/config");
const User = require("../app/user/model");

function decodeToken() {
  // return async function (req, res, next) {
  //   try {
  //     let token = getToken(req);

  //     if (!token) return next();

  //     req.user = jwt.verify(token, config.secretkey);
  //     let user = await User.findOne({ token: { $in: [token] } });

  //     if (!user) {
  //       return res.status(401).json({
  //         error: 1,
  //         message: "Token Expired",
  //       });
  //     }
  //   } catch (error) {
  //     if (error && error.name === "JsonWebTokenError") {
  //       return res.status(400).json({
  //         error: 1,
  //         message: error.message,
  //       });
  //     }
  //     return next(error);
  //   }
  //   next();
  // };

  return async function (req, res, next) {
    try {
      let token = getToken(req);
      if (!token) return next();

      let decoded = jwt.verify(token, config.secretkey);
      let user = await User.findById(decoded._id);

      if (!user) {
        return res.status(401).json({
          error: 1,
          message: "Token expired",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.status(400).json({
          error: 1,
          message: error.message,
        });
      }
      next(error);
    }
  };
}

// function police_check(action, subject) {
//   return function (req, res, next) {
//     let policy = policyFor(req.user);
//     if (!policy.can(action, subject)) {
//       return res.status(403).json({
//         error: 1,
//         message: `You are not allowed to ${action} ${subject}`,
//       });
//     }
//     next();
//   };
// }

module.exports = { decodeToken };
