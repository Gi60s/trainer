'use strict'
const tags    = require('./tags')

exports.add = async function(conn, title, description, discoverability, guided, materials, courseTags) {
  const [ rows ] = await conn.query('INSERT INTO courses (title, description, discoverability, guided) VALUES (?, ?, ?, ?, ?)', [title, description, discoverability, guided] )
  await tags.set(conn, courseTags, 'courses', rows.insertId)
  // TODO: add materials
  return rows.insertId
}

exports.delete = async function(conn, id) {
  const [ rows ] = await conn.query('DELETE FROM courses WHERE id = ?', [id] )
  await tags.delete(conn, 'courses', id)
  // TODO: delete course material
  return rows.affectedRows > 0
}

exports.get = async function(conn, id) {
  const courseResults = conn.query('SELECT * FROM courses WHERE id = ?', [id] )
  const tagsResults = tags.get(conn, 'courses', id)
  const results = await Promise.all([courseResults, tagsResults])

  const course = results[0][0][0] || null
  if (course) course.tags = results[1]

  return course
}

exports.search = async function(conn, term) {
  const [ rows ] = await conn.query('SELECT * FROM courses WHERE title LIKE ? OR description LIKE ?', ['%' + term + '%', '%' + term + '%'])
  return rows.map(v => Object.assign({}, v))
}

exports.update = async function(conn, id, data) {
  const updates = []
  const params = []
  let changedRows = 0

  if (data.hasOwnProperty('title')) {
    updates.push('title = ?')
    params.push(data.title)
  }
  if (data.hasOwnProperty('description')) {
    updates.push('description = ?')
    params.push(data.description)
  }
  if (data.hasOwnProperty('discoverability')) {
    updates.push('discoverability = ?')
    params.push(data.discoverability)
  }
  if (data.hasOwnProperty('guided')) {
    updates.push('guided = ?')
    params.push(data.guided)
  }

  if (updates.length > 0) {
    const query = 'UPDATE courses SET ' + updates.join(', ') + ' WHERE id = ?'
    params.push(id)
    const [ rows ] = await conn.query(query, params)
    changedRows = rows.changedRows
  }

  if (data.hasOwnProperty('tags')) await tags.set(conn, data.tags, 'courses', id)
  // TODO: update materials

  return changedRows > 0
}