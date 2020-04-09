var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.user) res.render("index", { title: "Express" });
  else res.redirect("/chat");
});
router.get("/getUser", function (req, res, next) {
  res.json(req.user)
});
router.get("/getEnv",function(req,res,next){
  const envData = require("../config/env.json")[process.env.NODE_ENV || 'development'];
  res.json(envData)
})
module.exports = router;
