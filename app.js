const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

const blogs = [
    { name: 'Feed Dogs', description: 'Eat 3 times a day , more likely raw meat , crockets, drink lot of water', likes: 2 },
    { name: 'Bath Dogs', description: 'Take a bath  twice a week , more likely in the morning also in the afternoon', likes: 5 },
    { name: 'Sell Dogs', description: 'Sell dogs at the age of 3months', likes: 3 }
]

app.get('/', (req, res) => {
    res.render('index', { blogs })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/create', (req, res) => {
    res.render('create')
})

const PORT = 4000

app.listen(PORT, () => console.log(`server listening on port ${PORT}...`))

