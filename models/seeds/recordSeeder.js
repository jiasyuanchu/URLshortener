const db = require('../../config/mongoose')

const ShortenURL = require('../ShortenURL')// 載入 ShortenURL model

// 連線成功
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    ShortenURL.create({ InputURL: 'InputURL-' + i })
  }
  console.log('done')
})

