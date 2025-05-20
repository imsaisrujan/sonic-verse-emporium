import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Empty cart by default
const CartPage: React.FC = () => {
  // This would normally use Redux, for now we're using an empty array
  const [cartItems, setCartItems] = React.useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  
  const proceedToCheckout = () => {
    // In a real app, save cart state and navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="dark:text-white text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {cartItems.length > 0 && (
          <Button 
            variant="ghost" 
            className="text-red-500"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className="py-16 text-center">
          <div className="inline-flex justify-center items-center w-20 h-20 bg-gray-200 dark:bg-music-gray rounded-full mb-6">
            <ShoppingBag className="h-10 w-10 text-indigo-600 dark:text-music-primary" />
          </div>
          <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any albums to your cart yet. Start exploring our collection to find your next favorite album.
          </p>
          <Link to="/browse">
            <Button>
              Browse Albums
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-music-gray rounded-lg overflow-hidden">
              {cartItems.map(item => (
                <div 
                  key={item.id}
                  className="flex items-center p-4 border-b border-gray-700 last:border-0"
                >
                  <div className="flex-shrink-0 w-16 h-16 relative rounded overflow-hidden">
                    <img 
                      src={item.coverImage} 
                      alt={`${item.title} by ${item.artist}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <Link to={`/album/${item.id}`} className="font-medium hover:text-music-primary transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-400">{item.artist}</p>
                    <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-black rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:text-red-400"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue shopping */}
            <div className="flex justify-start">
              <Link to="/browse">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-music-gray rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={proceedToCheckout}
                className="w-full"
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="bg-gray-600 text-xs px-2 py-1 rounded">Visa</div>
                  <div className="bg-gray-600 text-xs px-2 py-1 rounded">MasterCard</div>
                  <div className="bg-gray-600 text-xs px-2 py-1 rounded">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
