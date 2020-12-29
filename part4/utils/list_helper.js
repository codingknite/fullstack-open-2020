const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    return blogList
        .map(blog => blog.likes)
        .reduce((current, value) => current + value, 0)
}

const favoriteBlog = (blogs) => {
    let _favoriteBlog = {}
    let mostLikes = 0;

    blogs.map(blog => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes
            _favoriteBlog.title = blog.title
            _favoriteBlog.author = blog.author
            _favoriteBlog.likes = blog.likes
        }
    })
    return _favoriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
