const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['fruits', 'vegetables', 'dairy']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 100
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 