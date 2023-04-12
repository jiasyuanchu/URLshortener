const express = require("express");
const router = express.Router();
const ShortenURL = require("../../models/ShortenURL");
const { generateRandomFiveLetter, randomIndex } = require("../../shortPathGenerator");
const checkPath = require("../../checkPath")

const PORT = process.env.PORT || 3000;
const SERVER = `http://localhost:${PORT}/`;

//設定路由：根目錄
router.get("/", (req, res) => {
  // console.log(PORT)
  res.render("index");
});

// 路由設定：縮短網址按鈕
router.post("/", (req, res) => {
  const originalURL = req.body.originalURL;
  let path = generateRandomFiveLetter();
  const newURL = SERVER + path;
  checkPath();
});

//輸入短網址後導回原網址
router.get("/:path", (req, res) => {
  let path = req.params.path;
  ShortenURL.findOne({ path })
    .lean()
    .then((result) => {
      const redirectURL = result.originalURL;
      if (
        redirectURL.startsWith("http://") ||
        redirectURL.startsWith("https://")
      ) {
        res.redirect(redirectURL);
      } else {
        res.redirect("http://" + redirectURL);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send("URL not found");
    });
});


module.exports = router;
