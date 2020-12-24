const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            response.json(blog)
        })
})

blogRouter.put('/:id', (request, response) => {
    Blog
        .findByIdAndUpdate(request.params.id)
        .then(() => {
            response
                .status(201)
                .json({
                    message: "Blog updated successfully"
                })
        })
})

blogRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response
                .status(204)
                .end()
        })
})
blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(savedBlog => {
            response
                .status(201)
                .json(savedBlog)
        })
})

module.exports = blogRouter