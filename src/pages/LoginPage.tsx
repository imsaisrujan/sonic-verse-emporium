
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Music } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would make an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      toast({
        title: "Login Successful",
        description: "Welcome back to Melody!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-240px)] items-center justify-center py-12">
      <div className="w-full max-w-md px-8 py-12 bg-music-gray rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-music-primary rounded-full mb-4">
            <Music className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black border-gray-700 focus:border-music-primary"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-music-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black border-gray-700 focus:border-music-primary"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
            />
            <label 
              htmlFor="remember" 
              className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me for 30 days
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-music-primary hover:bg-music-primary/90" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <div className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-music-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
