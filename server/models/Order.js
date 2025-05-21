
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  albumId: String,
  title: String,
  artist: String,
  price: Number,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  totalPrice: Number,
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  paymentMethod: {
    type: String,
    default: 'Credit Card'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
