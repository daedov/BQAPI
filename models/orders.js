const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: 
    {
      type: Schema.Types.ObjectId, 
      required: true,
    },
  client: {
    type: String,
    required: true,
  },
  table:{
    type: String,
    required: false  
  },
  products: [ {
        qty: {
          type: String,
          required: true,
        },
        product: {
          type: String,
          required: true,
          unique: false,
          sparse: true
        },
        price: {
          type: String,
          required: false
        },
    },
  ],
// array [pending, canceled, delivering, delivered]
  status: {
    required: true,
    type: String,
    default: 'pending',
    enum: ['pending', 'canceled', 'delivering', 'delivered']
  },
  dataEntry: {
    type: Date,
    default: Date.now,
  },
  dataProcessed: {
    type: Date,
  },
  commerce: {
    type: String,
    required: true
  }
});

  // orderSchema.index({ commerce: 1, client: 1, products: 1, status: 1 });
  const Orders = mongoose.model("orders", orderSchema);
  module.exports = Orders;
