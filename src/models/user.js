const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    role: {
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    phone: {
        required: true,
        type: String,
        unique: true,
    },
    deliveryAddress: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
    },
    deliveryAddress: {
        type: {
            address: { type: String, default: '' },
            town: { type: String, default: '' },
            state: { type: String, default: '' },
        }
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);