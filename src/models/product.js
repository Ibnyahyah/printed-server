const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    reviews: {
        type: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);