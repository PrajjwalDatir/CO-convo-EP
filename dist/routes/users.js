"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var R = _interopRequireWildcard(require("ramda"));

var _User = require("../models/User");

var _utils = require("../../utils");

const SALT_ROUNDS = 10;

const router = _express.default.Router();

router.get("/", (req, res) => _User.User.find({}).exec().then(users => res.json({
  users
})).catch(() => res.status(500).json({
  message: "Cannot fetch users"
})));
router.get("/:id", async (req, res, next) => {
  try {
    const user = await _User.User.findOne({
      _id: req.params.id
    }).exec();

    if (!user) {
      res.status(404).json({
        message: "Cannot find user"
      });
      return;
    }

    res.json({
      user
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", // body("firstname").isEmpty().withMessage("First Name Should Not be Empty"),
(0, _expressValidator.body)("firstname"), (0, _expressValidator.body)("lastname"), // body("lastname").isEmpty().withMessage("Last Name Should Not be Empty"),
// body("dob"),
(0, _expressValidator.body)("dob").isDate().withMessage("Date of Birth should be a Valid Date"), (0, _expressValidator.body)("email").isEmail().withMessage("Email should be a valid Email").normalizeEmail().custom(email => _User.User.findOne({
  email
}).exec().then(user => user && Promise.reject())).withMessage("Email is already taken"), (0, _expressValidator.body)("username").trim().not().isEmpty().withMessage("Username should not be empty").custom(username => _User.User.findOne({
  username
}).exec().then(user => user && Promise.reject())).withMessage("Username is already taken"), (0, _expressValidator.body)("password").isLength({
  min: 8
}).withMessage("Password should be at least 8 characters long"), _utils.handleValidation, (req, res, next) => _bcryptjs.default.hash(req.body.password, SALT_ROUNDS) // update password from req.body to the new hashed password. I'm
// aware that this is hard to read. I did this for practice.
.then(R.set(R.lensProp("password"), R.__, req.body)).then(user => new _User.User(user)).then(user => user.save()).then(user => user.toObject()).then(R.dissoc("password")).then(user => res.json({
  message: "User registered",
  user
})).catch(next));
router.put("/", (req, res) => res.status(501).json({
  message: "Not implemented"
}));
router.delete("/", (req, res) => res.status(501).json({
  message: "Not implemented"
}));
router.post("/auth", (0, _expressValidator.body)("username").trim(), async (req, res, next) => {
  try {
    const user = await _User.User.findOne({
      username: req.body.username
    }).select("+password").lean() // lean to convert to plain js object
    .exec();

    if (!user) {
      res.status(404).json({
        errors: {
          username: {
            msg: "User not found"
          }
        }
      });
      return;
    }

    const passwordMatches = await _bcryptjs.default.compare(req.body.password, user.password);

    if (!passwordMatches) {
      res.status(401).json({
        errors: {
          password: {
            msg: "Password is incorrect"
          }
        }
      });
      return;
    }

    const token = _jsonwebtoken.default.sign({
      id: user._id
    }, process.env.JWT_SECRET);

    res.json({
      token: `Bearer ${token}`,
      user: R.dissoc("password", user)
    });
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;