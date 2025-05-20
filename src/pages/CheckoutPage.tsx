
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, MapPin, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock cart data for order summary
const mockCartItems = [
  {
    id: '1',
    title: 'Dawn FM',
    artist: 'The Weeknd',
    price: 12.99,
    quantity: 1,
  },
  {
    id: '8',
    title: 'Back in Black',
    artist: 'AC/DC',
    price: 9.99,
    quantity: 1,
  },
];

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [saveInfo, setSaveInfo] = useState(false);
  
  // Calculate total
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setStep('confirmation');
    window.scrollTo(0, 0);
  };
  
  const handleFinishCheckout = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your order will be processed shortly.",
    });
    navigate('/');
  };

  return (
    <div className="pb-16">
      {/* Checkout Progress */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          <div className={`flex flex-col items-center ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'text-music-primary' : 'text-gray-400'}`}>
            <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'border-music-primary' : 'border-gray-400'}`}>
              <MapPin className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Shipping</span>
          </div>
          
          <div className={`flex flex-col items-center ${step === 'payment' || step === 'confirmation' ? 'text-music-primary' : 'text-gray-400'}`}>
            <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${step === 'payment' || step === 'confirmation' ? 'border-music-primary' : 'border-gray-400'}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
          
          <div className={`flex flex-col items-center ${step === 'confirmation' ? 'text-music-primary' : 'text-gray-400'}`}>
            <div className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${step === 'confirmation' ? 'border-music-primary' : 'border-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>
        
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-700">
          <div 
            className="h-full bg-music-primary transition-all duration-500"
            style={{ 
              width: step === 'shipping' ? '0%' : 
                     step === 'payment' ? '50%' : '100%' 
            }}
          />
        </div>
      </div>

      {/* Checkout Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Shipping Step */}
          {step === 'shipping' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
              
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    required
                    className="bg-music-gray border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    required
                    className="bg-music-gray border-gray-700"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input 
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input 
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={shippingInfo.country}
                      onValueChange={(value) => setShippingInfo({...shippingInfo, country: value})}
                    >
                      <SelectTrigger className="bg-music-gray border-gray-700">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent className="bg-music-gray">
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="saveInfo" 
                    checked={saveInfo} 
                    onCheckedChange={(checked) => setSaveInfo(checked as boolean)} 
                  />
                  <label 
                    htmlFor="saveInfo" 
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save this information for next time
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-music-primary hover:bg-music-primary/90"
                >
                  Continue to Payment
                </Button>
              </form>
            </div>
          )}
          
          {/* Payment Step */}
          {step === 'payment' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                    required
                    className="bg-music-gray border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="bg-music-gray border-gray-700"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input 
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      placeholder="MM/YY"
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      placeholder="123"
                      required
                      className="bg-music-gray border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setStep('shipping')}
                  >
                    Back to Shipping
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-music-primary hover:bg-music-primary/90"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-music-primary rounded-full mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              
              <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-gray-300 mb-6">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              
              <div className="mb-8 bg-music-gray rounded-lg p-6 text-left">
                <h2 className="font-bold mb-4">Order Summary</h2>
                
                {/* Order details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-300 text-sm">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.email}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-gray-300 text-sm">
                      Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <ul className="text-sm space-y-2">
                      {mockCartItems.map(item => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.title} by {item.artist} ({item.quantity}x)</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-music-primary hover:bg-music-primary/90"
                onClick={handleFinishCheckout}
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
        
        {/* Order Summary Sidebar (only show for shipping and payment steps) */}
        {(step === 'shipping' || step === 'payment') && (
          <div className="md:col-span-1">
            <div className="bg-music-gray rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {mockCartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.artist}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 my-6 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
