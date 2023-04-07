const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema內容項目待確認
const recordSchema = new Schema({
  record: {
    type: String, // 資料型別是字串
    required: false // 這是個必填欄位
  },
})

module.exports = mongoose.model('Record', recordSchema)