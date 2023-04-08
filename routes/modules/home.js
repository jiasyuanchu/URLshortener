const express = require('express')
const router = express.Router()
const ShortenURL = require("../../models/ShortenURL");

const PORT = process.env.PORT || 3000;
const SERVER = `http://localhost:${PORT}/`;

//設定路由：根目錄
router.get('/', (req, res) => {
  // console.log(PORT)
  res.render('index');
});

// 路由設定：縮短網址按鈕
router.post('/', (req, res) => {
  const originalURL = req.body.originalURL
  // res.send('Got a POST request')
  let path = generateRandomFiveLetter()
  const newURL = SERVER + path;
  console.log(newURL)
  //先比對此五碼是否有被用過
  function checkPath() {
    ShortenURL
      .exists({ path })
      .then((URLs) => {
        if (URLs) {
          //先做一個出來拿去檢查
          path = generateRandomFiveLetter();
          // checkKeyword();//呼叫自己重新檢查
        } else {
          ShortenURL.findOne({ originalURL })
            .then((data) => {
              //檢查後發現已經用過
              if (data) {
                res.render("index", {
                  newURL: data.newURL,
                  originalURL: data.originalURL,
                });
                //檢查後確認還沒被用過的話
              } else {
                ShortenURL.create({ originalURL, path, newURL })
                  .then(() => {
                    res.render("index", { originalURL, newURL });
                  })
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => console.log(error));
        }
      });
    }
    checkPath();
})

//輸入短網址後導回原網址
router.get("/:path", (req, res) => {
  // console.log(req.params)
  let path = req.params.path;
  ShortenURL.findOne({ path })
    // .then((result) => console.log(result.originalURL))
    .lean()
    .then((result) => {
      // console.log(result.originalURL)
      const redirectURL = result.originalURL
      if (redirectURL.startsWith('http://') || redirectURL.startsWith('https://')) {
        res.redirect(redirectURL);
      } else {
        res.redirect('http://' + redirectURL);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send("URL not found");
    });
});

//短網址末五碼產生器
function randomIndex(wordBank) {
  const randomLetter = Math.floor(Math.random() * wordBank.length)
  return wordBank[randomLetter];
}
function generateRandomFiveLetter() {
  let wordBank = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let shortCode = "";
  for (let i = 0; i < 5; i++) {
    shortCode += randomIndex(wordBank);
  }
  return shortCode;
}


module.exports = router;