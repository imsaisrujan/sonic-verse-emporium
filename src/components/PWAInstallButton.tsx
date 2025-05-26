
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { usePWA } from '@/context/PWAContext';

const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <Button
      onClick={installApp}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Smartphone className="h-4 w-4" />
      Install App
    </Button>
  );
};

export default PWAInstallButton;
