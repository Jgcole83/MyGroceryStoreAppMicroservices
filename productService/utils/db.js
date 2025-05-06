const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'development') {
            // Create an in-memory MongoDB instance
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            console.log('Using in-memory MongoDB at:', uri);
            
            const conn = await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            console.log(`Database Name: ${conn.connection.name}`);
        } else {
            // Use the real MongoDB server
            const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery-store';
            console.log('Attempting to connect to MongoDB at:', mongoURI);
            
            const conn = await mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            console.log(`Database Name: ${conn.connection.name}`);
        }
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        console.error('Please ensure MongoDB is running and accessible');
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    if (mongod) {
        await mongod.stop();
    }
    process.exit(0);
});

module.exports = connectDB; 