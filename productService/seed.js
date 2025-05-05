require('dotenv').config();
const connectDB = require('./utils/db');
const Product = require('./models/Product');

const seedProducts = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        
        // Sample products
        const products = [
            {
                category: 'fruits',
                name: 'Apple',
                price: 0.99,
                stock: 100,
                description: 'Fresh red apples',
                imageUrl: 'https://example.com/apple.jpg'
            },
            {
                category: 'fruits',
                name: 'Banana',
                price: 0.59,
                stock: 150,
                description: 'Ripe bananas',
                imageUrl: 'https://example.com/banana.jpg'
            },
            {
                category: 'fruits',
                name: 'Orange',
                price: 0.79,
                stock: 120,
                description: 'Juicy oranges',
                imageUrl: 'https://example.com/orange.jpg'
            },
            {
                category: 'vegetables',
                name: 'Carrot',
                price: 0.89,
                stock: 200,
                description: 'Fresh carrots',
                imageUrl: 'https://example.com/carrot.jpg'
            },
            {
                category: 'vegetables',
                name: 'Broccoli',
                price: 1.29,
                stock: 80,
                description: 'Fresh broccoli',
                imageUrl: 'https://example.com/broccoli.jpg'
            },
            {
                category: 'vegetables',
                name: 'Lettuce',
                price: 1.49,
                stock: 90,
                description: 'Crisp lettuce',
                imageUrl: 'https://example.com/lettuce.jpg'
            },
            {
                category: 'dairy',
                name: 'Milk',
                price: 2.99,
                stock: 50,
                description: 'Fresh milk',
                imageUrl: 'https://example.com/milk.jpg'
            },
            {
                category: 'dairy',
                name: 'Cheese',
                price: 3.49,
                stock: 60,
                description: 'Cheddar cheese',
                imageUrl: 'https://example.com/cheese.jpg'
            },
            {
                category: 'dairy',
                name: 'Yogurt',
                price: 1.99,
                stock: 70,
                description: 'Greek yogurt',
                imageUrl: 'https://example.com/yogurt.jpg'
            }
        ];

        await Product.insertMany(products);
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedProducts(); 