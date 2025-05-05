# Jessy's Grocery Outlet

A modern, full-stack e-commerce application for grocery shopping with a focus on user experience and efficient data management.

![Project Screenshot](screenshots/main.png)

## Features

### User Authentication
- Secure JWT-based authentication
- User registration and login
- Protected routes
- Session management

### Shopping Experience
- Doubly linked list implementation for cart management
- Real-time search functionality
- Advanced filtering options
- Category-based product organization
- Responsive design for all devices

### Technical Features
- Modern UI with CSS variables
- Smooth animations and transitions
- Efficient data structures
- Clean, modular code structure
- Error handling and user feedback

## Tech Stack

### Frontend
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Poppins)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Project Structure

```
Jessy's-Grocery-Outlet/
├── public/
│   ├── css/
│   │   ├── design.css
│   │   └── order.css
│   ├── js/
│   │   └── app.js
│   └── images/
├── views/
│   ├── login.html
│   └── order.html
├── app.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Modern web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Jessy-s-Grocery-Outlet.git
cd Jessy-s-Grocery-Outlet
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
PORT=5003
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
node app.js
```

5. Access the application
Open your browser and navigate to:
```
http://localhost:5003
```

## Key Features in Detail

### Shopping Cart Implementation
The shopping cart uses a doubly linked list data structure for efficient item management:
- O(1) insertion and deletion
- Memory efficient
- Easy traversal in both directions
- Maintains order history

### Search and Filtering
- Real-time search across product names and descriptions
- Category-based filtering
- Price range filtering
- Multiple sorting options (name, price)

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## Future Improvements

- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Order history
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Wishlist functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Unsplash for stock images

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/Jessy-s-Grocery-Outlet](https://github.com/yourusername/Jessy-s-Grocery-Outlet)
