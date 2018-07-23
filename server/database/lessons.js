'use strict'
const tags    = require('./tags')

exports.add = async function(conn, title, description, lessonTags, content) {
  const [ rows ] = await conn.query('INSERT INTO lessons (title, description, content) VALUES (?, ?, ?)', [title, description, content] )
  await tags.set(conn, lessonTags, 'lessons', rows.insertId)
  return rows.insertId
}

exports.delete = async function(conn, id) {
  const [ rows ] = await conn.query('DELETE FROM lessons WHERE id = ?', [id] )
  await tags.delete(conn, 'lessons', id)
  return rows.affectedRows > 0
}

exports.get = async function(conn, id) {
  const lessonResults = conn.query('SELECT * FROM lessons WHERE id = ?', [id] )
  const tagsResults = tags.get(conn, 'lessons', id)
  const results = await Promise.all([lessonResults, tagsResults])

  const lesson = results[0][0][0] || null
  if (lesson) lesson.tags = results[1]

  return lesson
}

exports.search = async function(conn, term) {
  const [ rows ] = await conn.query('SELECT id, title, description, timestamp FROM lessons WHERE title LIKE ? OR description LIKE ?', ['%' + term + '%', '%' + term + '%'])
  return rows.map(v => {
    return {
      id: v.id,
      title: v.title,
      description: v.description,
      timestamp: v.timestamp
    }
  })
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
  if (data.hasOwnProperty('content')) {
    updates.push('content = ?')
    params.push(data.content)
  }

  if (updates.length > 0) {
    const query = 'UPDATE lessons SET ' + updates.join(', ') + ' WHERE id = ?'
    params.push(id)
    const [ rows ] = await conn.query(query, params)
    changedRows = rows.changedRows
  }

  if (data.hasOwnProperty('tags')) await tags.set(conn, data.tags, 'lessons', id)

  return changedRows > 0
}