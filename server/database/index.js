'use strict'

const mysql     = require('mysql2/promise')
const libraries = {
  lessons: require('./lessons')
}

// {
//   connectionLimit : 50,
//     host            : 'localhost',
//   user            : 'root',
//   password        : 'mysqlpass',
//   database        : 'it410'
// }

module.exports = database

function database(config) {
  const pool = mysql.createPool(config)
  const database = { pool }

  database.connection = async function() {
    const factory = {}
    factory.conn = await pool.getConnection()
    factory.release = factory.conn.release

    // populate this factory with all database library operations
    Object.keys(libraries)
      .forEach(library => {
        const store = {}
        const lib = libraries[library];
        factory[library] = store
        Object.keys(lib)
          .forEach(operation => {
            store[operation] = lib[operation].bind(factory, factory.conn);
          })
      })

    return factory
  }

  database.transaction = async function() {
    const context = await this.connection()
    const conn = context.conn

    await conn.beginTransaction()

    context.commit = () => {
      conn.commit()
        .then(() => true)
        .catch(err => {
          console.error(err.stack)
          conn.rollback()
          return false
        })
        .then(() => true, () => {
          conn.release()
        })
    }

    return conn
  }

  return database
}