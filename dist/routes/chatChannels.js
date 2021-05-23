"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _passport = _interopRequireDefault(require("passport"));

var R = _interopRequireWildcard(require("ramda"));

var _ChatChannel = require("../models/ChatChannel");

var _utils = require("../../utils");

const router = _express.default.Router();

router.get("/", (req, res) => _ChatChannel.ChatChannel.find({}).exec().then(chatChannels => res.json({
  chatChannels
})).catch(() => res.status(500).json({
  message: "Cannot fetch channels"
})));
router.get("/:id", async (req, res, next) => {
  try {
    const messagesPerPage = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const chatChannel = await _ChatChannel.ChatChannel.findOne({
      _id: req.params.id
    }, {
      messages: {
        // pagination behaviour. page 1 shows newest messages
        // because of the negative sign
        $slice: [-messagesPerPage * page, messagesPerPage]
      }
    }).select("+messages").populate("messages.user").exec();

    if (!chatChannel) {
      res.status(404).json({
        message: "Cannot find channel"
      });
      return;
    }

    res.json({
      chatChannel
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", (0, _expressValidator.body)("name").blacklist("\\s").not().isEmpty().withMessage("Channel name should not be empty").customSanitizer(R.toLower).custom(name => _ChatChannel.ChatChannel.findOne({
  name
}).exec().then(channel => channel && Promise.reject())).withMessage("Channel with that name already exists"), _utils.handleValidation, (req, res, next) => {
  _passport.default.authenticate("jwt", (error, user) => {
    if (error) {
      next(error);
      return;
    }

    if (!user) {
      res.status(401).json({
        message: "Unauthorized"
      });
      return;
    }

    (0, _ChatChannel.ChatChannel)({
      name: req.body.name,
      owner: user._id,
      groupType: 2
    }).save().then(channel => res.json({
      message: "Channel created",
      channel
    })).catch(next);
  })(req, res, next);
});
router.put("/", (req, res) => res.status(501).json({
  message: "Not implemented"
}));
router.delete("/", (req, res) => res.status(501).json({
  message: "Not implemented"
}));
var _default = router;
exports.default = _default;