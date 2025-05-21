
const Cart = require('../models/Cart');
const Album = require('../models/Album');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = new Cart({
        userId: req.user.id,
        items: [],
        totalPrice: 0,
        totalQuantity: 0
      });
      await cart.save();
    }
    
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { albumId } = req.body;
    
    // Find the album
    const album = await Album.findOne({ id: albumId });
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({
        userId: req.user.id,
        items: [],
        totalPrice: 0,
        totalQuantity: 0
      });
    }
    
    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.albumId === albumId
    );
    
    if (existingItemIndex >= 0) {
      // Increase quantity if item exists
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const newItem = {
        albumId: album.id,
        title: album.title,
        artist: album.artist,
        coverImage: album.coverImage,
        price: album.price,
        quantity: 1
      };
      
      cart.items.push(newItem);
    }
    
    // Calculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Save cart
    await cart.save();
    
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { albumId, quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find item in cart
    const itemIndex = cart.items.findIndex(item => item.albumId === albumId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    
    // Recalculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Save cart
    await cart.save();
    
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { albumId } = req.params;
    
    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item
    cart.items = cart.items.filter(item => item.albumId !== albumId);
    
    // Recalculate totals
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Save cart
    await cart.save();
    
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    // Find user's cart
    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear cart
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    
    // Save cart
    await cart.save();
    
    res.json({ message: 'Cart cleared successfully' });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
