const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const Post = require('./models/posts')

app.set('view engine', 'ejs')

// middleWares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))


// home page
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.render('index', { posts })
    } catch (error) {
        console.log(error);
    }
})

// about page
app.get('/about', (req, res) => {
    res.render('about')
})

// post page
app.get('/post/create', (req, res) => {
    res.render('create')
})


// create post 
app.post('/post/create', async (req, res) => {
    const { input: title, textarea: description } = req.body
    const data = {
        title,
        description
    }
    try {
        await Post.create(data)
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

// delete route
app.post('/delete/post/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})



const PORT = process.env.PORT || 4000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`server listening on port ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}

start()