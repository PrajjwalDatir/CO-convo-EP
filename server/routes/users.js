import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as R from "ramda";
import { User } from "../models/User";
import { handleValidation } from "../../utils";

const SALT_ROUNDS = 10;

const router = express.Router();

router.get("/", (req, res) =>
  User.find({})
    .exec()
    .then((users) => res.json({ users }))
    .catch(() => res.status(500).json({ message: "Cannot fetch users" }))
);

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();

    if (!user) {
      res.status(404).json({ message: "Cannot find user" });
      return;
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  // body("firstname").isEmpty().withMessage("First Name Should Not be Empty"),
  body("firstname"),
  body("lastname"),
  // body("lastname").isEmpty().withMessage("Last Name Should Not be Empty"),
  // body("dob"),
  body("dob").isDate().withMessage("Date of Birth should be a Valid Date"),
  body("email")
    .isEmail()
    .withMessage("Email should be a valid Email")
    .normalizeEmail()
    .custom((email) =>
      User.findOne({ email })
        .exec()
        .then((user) => user && Promise.reject())
    )
    .withMessage("Email is already taken"),
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username should not be empty")
    .custom((username) =>
      User.findOne({ username })
        .exec()
        .then((user) => user && Promise.reject())
    )
    .withMessage("Username is already taken"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
  handleValidation,
  (req, res, next) =>
    bcrypt
      .hash(req.body.password, SALT_ROUNDS)
      // update password from req.body to the new hashed password. I'm
      // aware that this is hard to read. I did this for practice.
      .then(R.set(R.lensProp("password"), R.__, req.body))
      .then((user) => new User(user))
      .then((user) => user.save())
      .then((user) => user.toObject())
      .then(R.dissoc("password"))
      .then((user) => res.json({ message: "User registered", user }))
      .catch(next)
);

router.put("/", (req, res) =>
  res.status(501).json({ message: "Not implemented" })
);

router.delete("/", (req, res) =>
  res.status(501).json({ message: "Not implemented" })
);

router.post("/auth", body("username").trim(), async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .select("+password")
      .lean() // lean to convert to plain js object
      .exec();

    if (!user) {
      res.status(404).json({ errors: { username: { msg: "User not found" } } });
      return;
    }

    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatches) {
      res
        .status(401)
        .json({ errors: { password: { msg: "Password is incorrect" } } });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token: `Bearer ${token}`,
      user: R.dissoc("password", user),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
