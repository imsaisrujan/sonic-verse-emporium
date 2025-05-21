
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes are protected
router.use(protect);

// GET user's cart
router.get('/', cartController.getCart);

// POST add item to cart
router.post('/add', cartController.addToCart);

// PUT update cart item quantity
router.put('/update-quantity', cartController.updateCartItemQuantity);

// DELETE remove item from cart
router.delete('/remove/:albumId', cartController.removeFromCart);

// DELETE clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router;
