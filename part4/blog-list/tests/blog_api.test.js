const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
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
})

describe('POST tests', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'easy2',
            url: 'Browser JavaScript',
            likes: 411,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        assert(contents.includes('async/await simplifies making async calls'))
    })
})

describe('DELETE tests', () => {
    test('a valid blog can be deleted', async () => {
        const blogs = await api.get('/api/blogs')
        const deleteId = blogs.body[0].id

        await api
            .delete(`/api/blogs/${deleteId}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})