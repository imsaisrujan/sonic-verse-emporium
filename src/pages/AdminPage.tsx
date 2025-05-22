
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      // Call the seed endpoint
      const response = await axios.post('http://localhost:5000/api/albums/seed');
      
      toast({
        title: "Database Seeded",
        description: `Successfully added ${response.data.count} albums to the database.`,
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error",
        description: "Failed to seed the database. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your music store database</p>
      </div>

      <div className="bg-music-gray rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Database Management</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Seed Database</h3>
            <p className="text-gray-400 mb-4">
              Populate your database with sample album data. This action is idempotent 
              and will not create duplicate entries.
            </p>
            <Button 
              onClick={seedDatabase} 
              disabled={isLoading}
              className="bg-music-primary hover:bg-music-primary/90"
            >
              {isLoading ? "Seeding..." : "Seed Database"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
