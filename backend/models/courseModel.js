const mongoose = require('../connection');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    avatar: String,
    target: String,
    data: Object,
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Reviews' }]
})


const model = mongoose.model('Courses', schema);

module.exports = model;

