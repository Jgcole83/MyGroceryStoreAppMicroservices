# Jessy's Grocery Outlet

A modern, full-stack grocery shopping application built with Node.js, Express, and vanilla JavaScript.

![Project Screenshot](screenshots/login.png)

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes

- **Shopping Experience**
  - Browse products by category
  - Add items to cart
  - Real-time price calculation
  - Secure checkout process

- **User Interface**
  - Modern, responsive design
  - Intuitive navigation
  - Real-time feedback
  - Mobile-friendly layout

## Tech Stack

- **Frontend**
  - HTML5
  - CSS3 (with modern features)
  - Vanilla JavaScript (ES6+)
  - Font Awesome icons
  - Google Fonts

- **Backend**
  - Node.js
  - Express.js
  - JWT Authentication
  - bcrypt for password hashing
  - CORS support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jgcole83/MyGroceryStoreAppMicroservices.git
cd MyGroceryStoreAppMicroservices
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
JWT_SECRET=your-secret-key
PORT=5500
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:5500
```

## Project Structure

```
grocery-outlet/
├── public/
│   ├── css/
│   │   └── design.css
│   ├── js/
│   │   └── app.js
│   ├── login.html
│   └── order.html
├── server.js
├── package.json
├── .env
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- CORS protection
- Input validation
- Error handling
- Secure session management

## API Endpoints

- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /protected` - Protected route example
- `GET /products` - Get all products
- `POST /cart` - Add to cart
- `GET /cart` - Get cart items

## Future Improvements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User profile management
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Search functionality
- [ ] Product filtering
- [ ] Unit tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Jessy Cole - jgcole83@gmail.com

Project Link: [https://github.com/Jgcole83/MyGroceryStoreAppMicroservices](https://github.com/Jgcole83/MyGroceryStoreAppMicroservices)
