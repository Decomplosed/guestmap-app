const express = require('express')
const Joi = require('joi')

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(1).max(100).required(),
  message: Joi.string().alphanum().min(1).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
})

const router = express.Router()

router.get('/', (req, res) => {
  res.json([])
})

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    //insert into DB
    // add current time
    res.json([])
  } else {
    
  }
})

module.exports = router
