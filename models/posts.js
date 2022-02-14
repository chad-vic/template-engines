const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title can not be empty'],
    },
    description: {
        type: String,
        required: [true, 'description can not be empty'],
        max: 100,
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Post', postSchema)