const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new mongoose.Schema({
    name: String,
    stock: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('products', productSchema)