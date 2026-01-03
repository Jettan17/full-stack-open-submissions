const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title)
    assert.strictEqual(title.includes('test2'), true)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    const idPresent = 'id' in response.body[0]

    assert.ok(idPresent)
})

after(async () => {
    await mongoose.connection.close()
})