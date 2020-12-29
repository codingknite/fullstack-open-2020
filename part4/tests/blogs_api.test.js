const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const testData = [
    {
        "title": "The Journey Of A Self Taught Developer",
        "author": "Joel P. Mugalu",
        "url": "thejourney.dev",
        "likes": 101,
        "id": "5fe46436c2e9a03d7052d16d"
    },
    {
        "title": "The Standout Developer",
        "author": "Randall Kanna",
        "url": "thestandout.com",
        "likes": 1213,
        "id": "5fe471dc47473231e8c4f2a8"
    }
]
describe('Blog APIs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogsArray = testData.map(blog => new Blog(blog))
        const promiseArray = blogsArray.map(blog => blog.save())

        await Promise.all(promiseArray)
    })
    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('fetch all notes', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(testData.length)
    })

})

afterAll(() => {
    mongoose.connection.close()
})