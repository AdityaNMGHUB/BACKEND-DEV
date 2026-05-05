const Order = require('../models/Order');

const calculateTotal = async (orderId) => {
  const order = await Order.findById(orderId).populate('products.productId');
  if (!order) throw new Error('Order not found');
  
  const total = order.products.reduce((acc, item) => {
    return acc + (item.priceAtPurchase * item.quantity);
  }, 0);
  
  return total;
};

module.exports = calculateTotal;
