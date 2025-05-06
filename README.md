# Jessy's Grocery Outlet - Full Stack E-commerce Application

A modern, full-stack e-commerce application for a grocery store, built with Node.js, Express, and vanilla JavaScript. This project demonstrates a microservices architecture with an API Gateway, Authentication Service, Product Service, and Order Service.

## Features

- 🛍️ **Product Catalog**
  - Browse products by category
  - Search functionality
  - Price filtering
  - Sort by name or price
  - Product details and stock information

- 👤 **User Authentication**
  - User registration
  - Login/Logout
  - Guest checkout option
  - Secure password handling

- 🛒 **Shopping Cart**
  - Add/remove items
  - Real-time cart updates
  - Cart persistence
  - Order total calculation

- 📦 **Order Management**
  - Place orders
  - Guest checkout
  - Order history
  - Order status tracking

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Services**:
  - API Gateway
  - Authentication Service
  - Product Service
  - Order Service
- **Data Storage**: In-memory JSON storage (for demo purposes)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/grocery-store.git
   cd grocery-store
   ```

2. Install dependencies for each service:
   ```bash
   # Install API Gateway dependencies
   cd api-gateway
   npm install

   # Install Authentication Service dependencies
   cd ../authService
   npm install

   # Install Product Service dependencies
   cd ../productService
   npm install

   # Install Order Service dependencies
   cd ../orderService
   npm install
   ```

## Running the Application

1. Start the Authentication Service:
   ```bash
   cd authService
   npm start
   ```

2. Start the Product Service:
   ```bash
   cd productService
   npm start
   ```

3. Start the Order Service:
   ```bash
   cd orderService
   npm start
   ```

4. Start the API Gateway:
   ```bash
   cd api-gateway
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5500
   ```

## Service Ports

- API Gateway: `http://localhost:5500`
- Authentication Service: `http://localhost:3001`
- Product Service: `http://localhost:5003`
- Order Service: `http://localhost:5002`

## Project Structure

```
grocery-store/
├── api-gateway/          # API Gateway service
├── authService/          # Authentication service
├── productService/       # Product service
├── orderService/         # Order service
└── README.md
```

## Features in Detail

### Product Catalog
- Browse products organized by categories (Dairy, Produce, Meat, etc.)
- Search products by name or description
- Filter products by price range
- Sort products by name or price
- View product details including price and stock information

### User Authentication
- Secure user registration with email and password
- Login functionality with JWT token authentication
- Guest checkout option for quick purchases
- Password reset functionality

### Shopping Experience
- Add products to cart
- Update quantities
- Remove items from cart
- View cart total
- Real-time cart updates

### Order Processing
- Place orders as registered user or guest
- View order history
- Track order status
- Receive order confirmation

## Development Notes

- The application uses in-memory storage for demonstration purposes
- All services are designed to be easily modified to use a real database
- The API Gateway handles routing and authentication
- Services communicate through HTTP requests
- Error handling and logging are implemented throughout

## Future Improvements

- [ ] Add a real database (MongoDB/PostgreSQL)
- [ ] Implement payment processing
- [ ] Add user profile management
- [ ] Implement product reviews and ratings
- [ ] Add admin dashboard
- [ ] Implement real-time notifications
- [ ] Add product images
- [ ] Implement wishlist functionality

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or suggestions, please reach out to [your-email@example.com]
