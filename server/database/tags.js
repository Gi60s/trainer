'use strict'

exports.delete = async function(conn, table, rowId) {
  await conn.query('DELETE FROM tags WHERE table = ? AND rowId = ?', [table, rowId])
}

/**
 * Get the table and row id for each item that matches one table with all tags.
 * @param {object} conn
 * @param {string[]} tags All tags must match.
 * @param {string[]} tables Gets results for all tables listed.
 * @returns {object<string, array<{ id:number, title:string, description:string, timestamp:number}>>} A map of table names with each value an array of objects.
 */
exports.filter = async function(conn, tags, tables) {
  if (!tags || tags.length === 0) return []
  if (!tables) tables = []

  // find all table names and row ids that match the query
  const query = 'SELECT tableName, rowId FROM tags WHERE ' +
    (tables.length ? 'tableName in (' + tables.map(() => '?').join(', ') + ') AND ' : '') +
    'tags in (' + tags.map(() => '?, ') + ') ' +
    'GROUP BY tableName, rowId' +
    'HAVING COUNT(tag) = ' + tags.length
  const matches = await conn.query(query, [].concat(tags, tables))

  // organize row ids by table name
  const tableNames = {}
  matches.results.forEach(row => {
    const tableName = row.tableName;
    if (!tableNames[tableName]) tableNames[tableName] = []
    tableNames[tableName].push(row.rowId)
  })

  // gather high level data about each matched item
  const keys = Object.keys(tableNames)
  const length = keys.length
  for (let i = 0; i < length; i++) {
    const name = keys[i]
    const ids = tableNames[name]
    const query = 'SELECT id, title, description, timestamp FROM ' + name +
      ' WHERE id IN (' + (ids.map('?').join(', ')) + ')'
    const { results } = await conn.query(query, ids)
    tableNames[name] = results
  }

  return tableNames
}

/**
 * Set the tags for the specified table and its id
 * @param {object} conn
 * @param {string[]} tags
 * @param {string} table
 * @param {number} rowId
 * @returns {Promise<[any]>}
 */
exports.set = async function(conn, tags, table, rowId) {
  await exports.delete(conn, table, rowId)

  const promises = []
  tags.forEach(tag => {
    const promise = conn.query('INSERT INTO tags VALUES (?, ?, ?)', [tag, table, rowId])
    promises.push(promise)
  })

  return Promise.all(promises)
}

/**
 * Get a list of all tags
 * @param {object} conn
 * @param {string} [table]
 * @param {number} [id]
 * @returns {Promise<*>}
 */
exports.tags = async function(conn, table, id) {
  const query = 'SELECT DISTINCT tag FROM tags' +
    (table ? ' WHERE table = ?' : '') +
    (id ? ' AND rowId = ?' : '')
  const { results } = await conn.query(query, [ table, id ])
  return results
}

