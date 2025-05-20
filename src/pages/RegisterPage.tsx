
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Music } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would make an API call to create a new user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account",
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
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-400 mt-2">Join the Melody Music community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-black border-gray-700 focus:border-music-primary"
            />
          </div>
          
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black border-gray-700 focus:border-music-primary"
            />
            <p className="text-xs text-gray-400">
              Must be at least 8 characters
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-black border-gray-700 focus:border-music-primary"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms} 
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
              required
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{' '}
              <Link to="/terms" className="text-music-primary hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-music-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-music-primary hover:bg-music-primary/90" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
          
          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-music-primary hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
