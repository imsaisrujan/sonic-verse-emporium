
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  memberSince: Date;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: { name?: string; email?: string; password?: string }) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('userToken');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...parsedUser, token: storedToken });
        
        // Validate token
        validateToken();
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
      }
    }
  }, []);

  // Validate token is still valid
  const validateToken = async () => {
    try {
      await authService.getUserProfile();
    } catch (error) {
      console.error('Token validation failed:', error);
      // Token is invalid, log out user
      logout();
      toast({
        title: "Session Expired",
        description: "Please log in again",
        variant: "destructive",
      });
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      const userData = response.data;
      
      // Save to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userToken', userData.token);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Melody!",
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password });
      const userData = response.data;
      
      // Save to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userToken', userData.token);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created!",
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  // Update user profile
  const updateProfile = async (userData: { name?: string; email?: string; password?: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.updateUserProfile(userData);
      const updatedUser = response.data;
      
      // Update state and localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('userToken', updatedUser.token);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      updateProfile, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
