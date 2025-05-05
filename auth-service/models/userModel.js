let users = [
  { email: "test@example.com", password: "$2b$10$4aWhUrs1oCfyLqzP1Uiv5eNy6H6k9D5dnJXGhWmRWftWyE8odgtte", name: "Test User", budget: 50 } // hashed "password123"
];

class User {
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static create(userData) {
    users.push(userData);
    return userData;
  }

  static updatePassword(email, newPassword) {
    const user = this.findByEmail(email);
    if (user) user.password = newPassword;
  }

  static getAll() {
    return users;
  }
}

module.exports = User;
