const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
});

// Static method to find user by email
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};

// Static method to create a user
userSchema.statics.createUser = async function (userData) {
  // Hash the password before saving the user
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new this({ ...userData, password: hashedPassword });
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
