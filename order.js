const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  cart: [
    {
      name: String,
      price: String,    
      category: String,
      company: String,
      img: String,
      size: String,
      color1:String
    }
  ],
  total: String,
  name: String,        
  email: String,       
  address: String,    
  paymentMethod: String 
});

module.exports = mongoose.model('orders', orderSchema);
