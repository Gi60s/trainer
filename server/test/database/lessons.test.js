'use strict'
const expect    = require('chai').expect
const lessons   = require('../../database/lessons')
const tags      = require('../../database/tags')

describe('database/lessons', () => {
  let conn
  let lessonId

  before(async () => {
    conn = await global.connPromise
  })

  it('can add lesson', async () => {
    const id = await lessons.add(conn, 'First lesson', 'first', ['intro'], 'This is content')
    lessonId = id
    expect(id).to.be.a('number')
  })

  it('can add second lesson', async () => {
    const id = await lessons.add(conn, 'second lesson', 'not first', ['go', 'pogo'], 'This is content too')
    expect(id).to.be.a('number')
  })

  it('can add third lesson', async () => {
    const id = await lessons.add(conn, 'third', '', ['pogo'], 'This is content too')
    expect(id).to.be.a('number')
  })

  it('lesson has one tag', async () => {
    const data = await tags.get(conn, 'lessons', lessonId)
    expect(data).to.deep.equal(['intro'])
  })

  it('can update lesson', async () => {
    const updated = await lessons.update(conn, lessonId, { title: 'Intro lesson', tags: ['go', 'start', 'pogo'] })
    expect(updated).to.equal(true)
  })

  it('lesson has three tags', async () => {
    const data = await tags.get(conn, 'lessons', lessonId)
    expect(data).to.deep.equal(['go', 'pogo', 'start'])
  })

  it('can get lesson by id', async () => {
    const data = await lessons.get(conn, lessonId)
    expect(data.timestamp).to.be.instanceof(Date)

    delete data.timestamp
    expect(data).to.deep.equal({
      id: lessonId,
      title: 'Intro lesson',
      description: 'first',
      content: 'This is content',
      tags: ['go', 'pogo', 'start']
    })
  })

  it('returns null for lesson not found', async () => {
    const data = await lessons.get(conn, 0)
    expect(data).to.equal(null)
  })

  it('search for lessons by title', async () => {
    const data = await lessons.search(conn, 'lesson')
    expect(data[0].title).to.equal('Intro lesson')
    expect(data[1].title).to.equal('second lesson')
    expect(data.length).to.equal(2)
  })

  it('search for lessons by description', async () => {
    const data = await lessons.search(conn, 'first')
    expect(data[0].title).to.equal('Intro lesson')
    expect(data[1].title).to.equal('second lesson')
    expect(data.length).to.equal(2)
  })

  it('general tag search', async () => {
    const data = await tags.filter(conn, ['go', 'pogo'])
    expect(data).to.have.ownProperty('lessons')
    expect(data.lessons.length).to.equal(2)   // lesson 3 does not have "go" tag, only "pogo"
    expect(data.lessons[0].id).to.equal(lessonId)
  })

  it('can delete lesson which also deletes tags', async () => {
    const deleted = await lessons.delete(conn, lessonId)
    expect(deleted).to.equal(true)

    const lesson = await lessons.get(conn, lessonId)
    expect(lesson).to.equal(null)

    const data = await tags.filter(conn, ['go', 'pogo'])
    expect(data).to.have.ownProperty('lessons')
    expect(data.lessons.length).to.equal(1)
  })

});