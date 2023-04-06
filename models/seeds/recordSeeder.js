const db = require('../../config/mongoose')

const Record = require('../record')// 載入 record model

// 連線成功
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Record.create({ InputURL: 'InputURL-' + i })
  }
  console.log('done')
})

