
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/context/PWAContext';

const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <Badge variant="destructive" className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <WifiOff className="h-3 w-3" />
      Offline Mode
    </Badge>
  );
};

export default OfflineIndicator;
