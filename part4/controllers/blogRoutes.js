const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const notes = await Blog.find({})
    response.json(notes)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)

})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id)
    response
        .status(201)
        .json({
            message: "Blog updated successfully"
        })
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response
        .status(204)
        .end()
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response
        .status(201)
        .json(savedBlog)
})

module.exports = blogRouter