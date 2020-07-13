const express = require('express')
const Joi = require('joi')

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(1).max(100).required(),
  message: Joi.string().alphanum().min(1).max(500).required(),
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required(),
  date: Joi.date(),
})

const router = express.Router()

router.get('/', (req, res) => {
  res.json([])
})

module.exports = router
