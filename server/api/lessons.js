'use strict'
const Router    = require('express').Router

const router = new Router()
module.exports = router

router.get('/:id', async (req, res, next) => {
  const lesson = await req.dbConn.lessons.get(req.params.id)
  if (lesson) {
    res.json(lesson)
  } else {
    res.sendStatus(404)
  }
})