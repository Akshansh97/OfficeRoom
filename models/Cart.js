// const mongoose = require('mongoose');

// const CartSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String
// }, { timestamps: true });

// module.exports = mongoose.model('Cart', CartSchema);
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
