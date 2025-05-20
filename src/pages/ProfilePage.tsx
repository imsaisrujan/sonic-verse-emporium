
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Package, CreditCard, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2023',
  };
  
  // Mock order history
  const mockOrders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      total: 22.98,
      status: 'Delivered',
      items: [
        { title: 'Dawn FM', artist: 'The Weeknd', price: 12.99 },
        { title: 'Back in Black', artist: 'AC/DC', price: 9.99 },
      ],
    },
    {
      id: 'ORD-67890',
      date: '2023-03-22',
      total: 13.99,
      status: 'Delivered',
      items: [
        { title: 'Renaissance', artist: 'Beyoncé', price: 13.99 },
      ],
    },
  ];
  
  const [profileForm, setProfileForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully",
      });
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    }, 500);
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <Button 
          variant="outline" 
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-music-gray rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-music-primary flex items-center justify-center text-2xl font-bold">
                {mockUser.name.charAt(0)}
              </div>
            </div>
            <h2 className="font-bold text-xl mb-1">{mockUser.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{mockUser.email}</p>
            <p className="text-sm text-gray-400">Member since {mockUser.memberSince}</p>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="data-[state=active]:bg-music-primary">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-music-primary">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-music-primary">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-8">
              <div className="bg-music-gray rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="bg-black border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="bg-black border-gray-700"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-music-primary hover:bg-music-primary/90"
                    disabled={loading}
                  >
                    Update Profile
                  </Button>
                </form>
              </div>
              
              <div className="bg-music-gray rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="bg-black border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="bg-black border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="bg-black border-gray-700"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-music-primary hover:bg-music-primary/90"
                    disabled={loading}
                  >
                    Change Password
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="bg-music-gray rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                
                {mockOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {mockOrders.map(order => (
                      <div 
                        key={order.id}
                        className="border border-gray-700 rounded-lg overflow-hidden"
                      >
                        <div className="bg-black/30 p-4 flex flex-wrap justify-between items-center gap-y-2">
                          <div>
                            <span className="text-sm text-gray-400">Order ID: </span>
                            <span className="font-medium">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Date: </span>
                            <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Total: </span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-500/20 text-green-500' 
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Items</h3>
                          <ul className="space-y-2">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between">
                                <div>
                                  <p className="font-medium">{item.title}</p>
                                  <p className="text-sm text-gray-400">{item.artist}</p>
                                </div>
                                <span>${item.price.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="payment">
              <div className="bg-music-gray rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-400">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                
                <Button className="bg-music-primary hover:bg-music-primary/90">
                  Add Payment Method
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
