const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Dairy', 'Produce', 'Meat', 'Dry Goods']
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

// Add static method to initialize default products
productSchema.statics.initializeDefaultProducts = async function() {
    const defaultProducts = [
        { category: 'Dairy', name: 'Milk', price: 3.99, stock: 100 },
        { category: 'Dairy', name: 'Cheese', price: 4.99, stock: 100 },
        { category: 'Produce', name: 'Apples', price: 1.99, stock: 100 },
        { category: 'Produce', name: 'Bananas', price: 0.99, stock: 100 },
        { category: 'Meat', name: 'Chicken', price: 5.99, stock: 100 },
        { category: 'Meat', name: 'Beef', price: 7.99, stock: 100 },
        { category: 'Dry Goods', name: 'Pasta', price: 2.99, stock: 100 },
        { category: 'Dry Goods', name: 'Rice', price: 3.99, stock: 100 }
    ];

    for (const product of defaultProducts) {
        await this.findOneAndUpdate(
            { name: product.name },
            product,
            { upsert: true, new: true }
        );
    }
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 