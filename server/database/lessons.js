'use strict'

exports.add = async function(conn, title, description, tags, content) {
  const { results } = await conn.query('INSERT INTO lessons (title, description, content) VALUES (?, ?, ?)', [title, description, content] )
  await this.tags.set(tags, 'lessons', results.insertId)
  return results.insertId
}

exports.delete = async function(conn, id) {
  const { results } = await conn.query('DELETE FROM lessons WHERE id = ?', [id] )
  this.tags.delete('lessons', id)
  return results.changedRows > 0
}

exports.get = async function(conn, id) {
  const { results } = await conn.query('SELECT * FROM lessons WHERE id = ?', [id] )
  return results[0] || null
}

exports.search = async function(conn, term) {
  const { results } = await conn.query('SELECT * FROM lessons WHERE title LIKE %?% OR description LIKE %?%', [term, term])
  return results
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
    const { results } = await conn.query(query, params)
    changedRows = results.changedRows
  }

  if (data.hasOwnProperty('tags')) await this.tags.set(tags, 'lessons', id)

  return changedRows.length > 0
}