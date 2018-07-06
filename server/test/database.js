const database  = require('../database')
const expect    = require('chai').expect
const fs        = require('fs')
const path      = require('path')

describe('database', () => {
  const dbConfig = { host: 'localhost', user: 'test', password: 'test', database: 'it410-test' }
  let db;
  let conn;

  // before tests load the test database structure
  before(async () => {
    db = database(dbConfig)
    conn = await db.connection()
    const queries = fs.readFileSync(path.resolve(__dirname, '../../build/sql/structure.sql'), 'utf8')
      .replace(/^--.*/gm, '')
      .replace(/\/\*.*\*\//g, '')
      .replace(/\n+/g, '')
      .split(';')
      .filter(v => /\S+/.test(v))

    const length = queries.length
    for (let i = 0; i < length; i++) {
      await conn.query(queries[i])
    }
  })

  // after tests drop all tables
  after(async () => {
    const [ rows ] = await conn.query('SELECT table_name FROM information_schema.tables ' +
      'WHERE table_schema = \'it410-test\'')

    const length = rows.length
    for (let i = 0; i < length; i++) {
      await conn.query('DROP TABLE IF EXISTS `' + rows[i].table_name + '`')
    }

    await conn.release()
    return db.close()
  })

  it('has tables', async () => {
    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'it410-test'"
    const [ rows ] = await conn.query(query)
    expect(rows.length).to.be.at.least(1)
  })

})

