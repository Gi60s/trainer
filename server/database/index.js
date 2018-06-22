'use strict'

const mysql = require('mysql2')
const Lessons = require('./lessons')

exports.connect = function() {
  const conn = null

  return {
    lessons: new Lessons(conn)
  }
}
