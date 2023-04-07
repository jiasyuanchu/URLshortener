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
  let keyword = generateRandomFiveLetter()
  const newURL = SERVER + keyword;
  console.log(newURL)
  //先比對此五碼是否有被用過
  function checkKeyword() {
    ShortenURL
      .exists({ keyword })
      .then((URLs) => {
        if (URLs) {
          //先做一個出來拿去檢查
          keyword = generateRandomFiveLetter();
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
                ShortenURL.create({ originalURL, keyword, newURL })
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
    checkKeyword();
})

//輸入短網址後導回原網址
router.get("/:keyword", (req, res) => {
  let keyword = req.params.keyword;
  ShortenURL.findOne({ keyword })
    .lean()
    .then((URL) => res.redirect(URL.originalURL))
    .catch((error) => console.log(error));
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