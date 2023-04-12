
//短網址末五碼產生器
function randomIndex(wordBank) {
  const randomLetter = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomLetter];
}
function generateRandomFiveLetter() {
  let wordBank =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let shortCode = "";
  for (let i = 0; i < 5; i++) {
    shortCode += randomIndex(wordBank);
  }
  return shortCode;
}

module.exports = {
  generateRandomFiveLetter,
  randomIndex,
};