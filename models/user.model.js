const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    password: { type: String },
    status: { type: String, default: 'pending' } 
}, {
    timestamps: true 
})

module.exports = mongoose.model('user', userSchema)