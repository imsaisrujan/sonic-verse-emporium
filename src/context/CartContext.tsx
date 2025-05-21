
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our cart items
export interface CartItem {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        // If parsing fails, clear localStorage
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    // Calculate totals
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const price = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalQuantity(quantity);
    setTotalPrice(price);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
