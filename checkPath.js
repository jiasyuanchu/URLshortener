const ShortenURL = require("./models/ShortenURL");
const { generateRandomFiveLetter, randomIndex } = require("./shortPathGenerator");

//先比對此五碼是否有被用過
function checkPath(path, originalURL, newURL, res) {
  ShortenURL.exists({ path }).then((URLs) => {
    if (URLs) {
      //先做一個出來拿去檢查
      path = generateRandomFiveLetter();
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

module.exports = checkPath
