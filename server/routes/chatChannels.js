import express from "express";
import { body } from "express-validator";
import passport from "passport";
import * as R from "ramda";
import { ChatChannel } from "../models/ChatChannel";
import { handleValidation } from "../../utils";

const router = express.Router();

router.get("/", (req, res) =>
  ChatChannel.find({})
    .exec()
    .then((chatChannels) => res.json({ chatChannels }))
    .catch(() => res.status(500).json({ message: "Cannot fetch channels" }))
);

router.get("/:id", async (req, res, next) => {
  try {
    const messagesPerPage = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const chatChannel = await ChatChannel.findOne(
      {
        _id: req.params.id,
      },
      {
        messages: {
          // pagination behaviour. page 1 shows newest messages
          // because of the negative sign
          $slice: [-messagesPerPage * page, messagesPerPage],
        },
      }
    )
      .select("+messages")
      .populate("messages.user")
      .exec();

    if (!chatChannel) {
      res.status(404).json({ message: "Cannot find channel" });
      return;
    }

    res.json({ chatChannel });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  body("name")
    .blacklist("\\s")
    .not()
    .isEmpty()
    .withMessage("Channel name should not be empty")
    .customSanitizer(R.toLower)
    .custom((name) =>
      ChatChannel.findOne({ name })
        .exec()
        .then((channel) => channel && Promise.reject())
    )
    .withMessage("Channel with that name already exists"),
  handleValidation,
  (req, res, next) => {
    passport.authenticate("jwt", (error, user) => {
      if (error) {
        next(error);
        return;
      }

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      ChatChannel({
        name: req.body.name,
        owner: user._id,
        groupType: 2,
      })
        .save()
        .then((channel) => res.json({ message: "Channel created", channel }))
        .catch(next);
    })(req, res, next);
  }
);

router.put("/", (req, res) =>
  res.status(501).json({ message: "Not implemented" })
);

router.delete("/", (req, res) =>
  res.status(501).json({ message: "Not implemented" })
);

export default router;
