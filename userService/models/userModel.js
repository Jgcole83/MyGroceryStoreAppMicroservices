// models/userModel.js

const db = require('../db'); // Replace this with your actual database connection

class User {
  static async findByEmail(email) {
    try {
      // Query the database for the user by email
      const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return result.length ? result[0] : null;  // Return the first user found, or null if not found
    } catch (err) {
      throw new Error('Error fetching user by email');
    }
  }

  static async create(userData) {
    try {
      // Insert new user into the database
      await db.query('INSERT INTO users SET ?', userData);
    } catch (err) {
      throw new Error('Error creating user');
    }
  }

  static async updatePassword(email, newPassword) {
    try {
      // Update the user's password in the database
      await db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    } catch (err) {
      throw new Error('Error updating password');
    }
  }
}

module.exports = User;
