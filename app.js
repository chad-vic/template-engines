const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer');
const fs = require('fs');
const connectDB = require('./db/connect')
const Post = require('./models/posts')
require('dotenv').config()

app.set('view engine', 'ejs')

// middleWares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))


//image middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage });


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
app.post('/post/create', upload.single('image'), async (req, res) => {
    const { title, description } = req.body
    const data = {
        title,
        description,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
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