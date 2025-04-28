let users = [
    { email: "test@example.com", password: "password123", name: "Test User", budget: 50 }
  ];
  
  class User {
    static findByEmail(email) {
      return users.find(user => user.email === email);
    }
  
    static create(userData) {
      users.push(userData);
    }
  
    static updatePassword(email, newPassword) {
      const user = this.findByEmail(email);
      if (user) user.password = newPassword;
    }
  }
  
  module.exports = User;
  