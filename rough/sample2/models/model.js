const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', ModelSchema); // Corrected this line

module.exports = UserModel;