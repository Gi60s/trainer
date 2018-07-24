'use strict'

// TODO: can edit, delete own lesson, can see, copy, reference other lessons

exports.delete = async function(conn, courseId) {
  await conn.query('DELETE FROM courseMaterials WHERE courseId = ?', [courseId])
}

/**
 * Get a list of all materials for a specific course
 * @param {object} conn
 * @param {number} courseId
 * @returns {Promise<{id:number,table:string}[]>}
 */
exports.get = async function(conn, courseId) {
  const query = 'SELECT materialTable, materialId, materialOrder FROM courseMaterials ' +
    'WHERE courseId = ? ORDER BY materialOrder'
  const [ rows ] = await conn.query(query, [ courseId ])
  return rows.map(row => {
    return {
      id: row.materialId,
      table: row.materialTable
    }
  })
}

/**
 * Get the table and row id for each item that matches one table with all tags.
 * @param {object} conn
 * @param {string[]} tags All tags must match.
 * @param {string[]} [tables] Gets results for all tables listed.
 * @returns {object<string, array<{ id:number, title:string, description:string, timestamp:number}>>} A map of table names with each value an array of objects.
 */
// exports.filter = async function(conn, tags, tables) {
//   if (!tags || tags.length === 0) return []
//   if (!tables) tables = []
//
//   // find all table names and row ids that match the query
//   const query = 'SELECT tableName, rowId FROM tags WHERE ' +
//     (tables.length ? 'tableName in (' + tables.map(() => '?').join(', ') + ') AND ' : '') +
//     'tag in (' + tags.map(() => '?').join(', ') + ') ' +
//     'GROUP BY tableName, rowId ' +
//     'HAVING COUNT(tag) = ' + tags.length
//   const [ matches ] = await conn.query(query, [].concat(tags, tables))
//
//   // organize row ids by table name
//   const tableNames = {}
//   matches.forEach(row => {
//     const tableName = row.tableName;
//     if (!tableNames[tableName]) tableNames[tableName] = []
//     tableNames[tableName].push(row.rowId)
//   })
//
//   // gather high level data about each matched item
//   const keys = Object.keys(tableNames)
//   const length = keys.length
//   for (let i = 0; i < length; i++) {
//     const name = keys[i]
//     const ids = tableNames[name]
//     const query = 'SELECT id, title, description, timestamp FROM ' + name +
//       ' WHERE id IN (' + (ids.map(() => '?').join(', ')) + ')'
//     const [ rows ] = await conn.query(query, ids)
//     tableNames[name] = rows.map(v => Object.assign({}, v))
//   }
//
//   return tableNames
// }

/**
 * Set the tags for the specified table and its id
 * @param {object} conn
 * @param {number} courseId
 * @param {{table:string, id:number}[]} materials
 * @returns {Promise<[any]>}
 */
exports.set = async function(conn, courseId, materials) {
  await exports.delete(conn, courseId)

  const length = materials.length
  for (let i = 0; i < length; i++) {
    const m = materials[i]
    await conn.query('INSERT INTO courseMaterials VALUES (?, ?, ?, ?)', [courseId, m.table, m.id, i])
  }
}
