const express = require('express')
const router = express.Router()
const ShortenURL = require("../../models/ShortenURL");

//設定路由：根目錄
router.get('/', (req, res) => {
  res.render('index')
})

//路由設定：輸入URL後導到copy page
router.get('/copy', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('copy', { record }))
    .catch(error => console.log(error))
})

  module.exports = router;