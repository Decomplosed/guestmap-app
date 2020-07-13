const express = require('express')
const Joi = require('joi')

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(1).max(100).required()
})

const router = express.Router()

router.get('/', (req, res) => {
  res.json([])
})

module.exports = router
