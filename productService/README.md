# Product Service

This is the product service for the Grocery Store microservices application. It handles all product-related operations including retrieving, adding, updating, and deleting products.

## Features

- RESTful API for product management
- MongoDB database integration
- Categorized products (fruits, vegetables, dairy)
- Stock management
- Product descriptions and images

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
PORT=5003
MONGODB_URI=mongodb://localhost:27017/grocery-store
```

3. Start MongoDB on your system

4. Seed the database with sample products:
```bash
npm run seed
```

5. Start the service:
```bash
npm run dev
```

## API Endpoints

- `GET /api/grocery-items` - Get all products grouped by category
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Add a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Product Schema

```javascript
{
    category: String, // fruits, vegetables, dairy
    name: String,
    price: Number,
    stock: Number,
    description: String,
    imageUrl: String
}
```

## Integration

This service is designed to work with:
- API Gateway (port 5500)
- Order Service (port 5002)
- Auth Service (port 5000)

## Development

- Uses Express.js for the server
- MongoDB for the database
- Mongoose for ODM
- CORS enabled for cross-origin requests 