
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cartService } from '@/services/api';

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
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get cart on initial render
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    
    // Only fetch cart if user is logged in
    if (userToken) {
      fetchCart();
    } else {
      // Load from localStorage if not logged in
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          localStorage.removeItem('cart');
        }
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
    
    // Save to localStorage if not using API
    if (!localStorage.getItem('userToken')) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Fetch cart from API
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await cartService.getCart();
      if (response.data && response.data.items) {
        // Convert API cart format to our format
        const items = response.data.items.map((item: any) => ({
          id: item.albumId,
          title: item.title,
          artist: item.artist,
          coverImage: item.coverImage,
          price: item.price,
          quantity: item.quantity
        }));
        setCartItems(items);
        setTotalQuantity(response.data.totalQuantity);
        setTotalPrice(response.data.totalPrice);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Error",
        description: "Failed to load your cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add an item to the cart
  const addToCart = async (newItem: Omit<CartItem, 'quantity'>) => {
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
      // Use API
      try {
        await cartService.addToCart(newItem.id);
        fetchCart(); // Refresh cart after adding item
        
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart",
          variant: "destructive",
        });
      }
    } else {
      // Use localStorage
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
    }
  };

  // Remove an item from the cart
  const removeItem = async (id: string) => {
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
      // Use API
      try {
        await cartService.removeFromCart(id);
        fetchCart(); // Refresh cart after removing item
      } catch (error) {
        console.error('Error removing item from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart",
          variant: "destructive",
        });
      }
    } else {
      // Use localStorage
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  // Update quantity of an item
  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
      // Use API
      try {
        await cartService.updateQuantity(id, quantity);
        fetchCart(); // Refresh cart after updating quantity
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
        toast({
          title: "Error",
          description: "Failed to update quantity",
          variant: "destructive",
        });
      }
    } else {
      // Use localStorage
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
      // Use API
      try {
        await cartService.clearCart();
        fetchCart(); // Refresh cart after clearing
      } catch (error) {
        console.error('Error clearing cart:', error);
        toast({
          title: "Error",
          description: "Failed to clear cart",
          variant: "destructive",
        });
      }
    } else {
      // Use localStorage
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeItem, 
      updateQuantity, 
      clearCart,
      totalQuantity,
      totalPrice,
      loading
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
