const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema內容項目待確認
const recordSchema = new Schema({
  // name: {
  //   type: String, // 資料型別是字串
  //   required: true // 這是個必填欄位
  // },
  // done: {
  //   type: Boolean
  // }
})
module.exports = mongoose.model('Record', recordSchema)