'use strict'

exports.delete = async function(conn, table, rowId) {
  await conn.query('DELETE FROM tags WHERE tableName = ? AND rowId = ?', [table, rowId])
}

/**
 * Get a list of all tags
 * @param {object} conn
 * @param {string} [table]
 * @param {number} [id]
 * @returns {Promise<string[]>}
 */
exports.get = async function(conn, table, id) {
  const query = 'SELECT DISTINCT tag FROM tags' +
    (table ? ' WHERE tableName = ?' : '') +
    (id ? ' AND rowId = ?' : '')
  const [ rows ] = await conn.query(query, [ table, id ])
  return rows.map(row => row.tag)
}

/**
 * Get the table and row id for each item that matches one table with all tags.
 * @param {object} conn
 * @param {string[]} tags All tags must match.
 * @param {string[]} [tables] Gets results for all tables listed.
 * @returns {object<string, array<{ id:number, title:string, description:string, timestamp:number}>>} A map of table names with each value an array of objects.
 */
exports.filter = async function(conn, tags, tables) {
  if (!tags || tags.length === 0) return []
  if (!tables) tables = []

  // find all table names and row ids that match the query
  const query = 'SELECT tableName, rowId FROM tags WHERE ' +
    (tables.length ? 'tableName in (' + tables.map(() => '?').join(', ') + ') AND ' : '') +
    'tag in (' + tags.map(() => '?').join(', ') + ') ' +
    'GROUP BY tableName, rowId ' +
    'HAVING COUNT(tag) = ' + tags.length
  const [ matches ] = await conn.query(query, [].concat(tags, tables))

  // organize row ids by table name
  const tableNames = {}
  matches.forEach(row => {
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
      ' WHERE id IN (' + (ids.map(() => '?').join(', ')) + ')'
    const [ rows ] = await conn.query(query, ids)
    tableNames[name] = rows.map(v => Object.assign({}, v))
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

  const length = tags.length
  for (let i = 0; i < length; i++) {
    await conn.query('INSERT INTO tags VALUES (?, ?, ?)', [tags[i], table, rowId])
  }
}
