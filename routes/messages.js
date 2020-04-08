var express = require("express");
var router = express.Router();
//lib
const Messsages = require("../src/lib/Messages");

router.get("/list", function (req, res, next) {
  Messsages.list(req.query.roomId, (messages) => {
    res.json({ messages });
  });
});

module.exports = router;
