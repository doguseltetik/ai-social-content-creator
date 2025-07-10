'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/store/use-session-store';
import HomePage from '@/app/page';
import BriefCollection from '@/components/BriefCollection';
import DesignerSelection from '@/components/DesignerSelection';
import AIChat from '@/components/AIChat';
import ContentManagement from '@/components/ContentManagement';

export default function MainApp() {
  const { currentStep, setCurrentStep } = useSessionStore();

  // Reset to welcome if no step is set
  useEffect(() => {
    if (!currentStep) {
      setCurrentStep('welcome');
    }
  }, [currentStep, setCurrentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <HomePage />;
      case 'brief':
        return <BriefCollection />;
      case 'designer-selection':
        return <DesignerSelection />;
      case 'chat':
        return <AIChat />;
      case 'content':
        return <ContentManagement />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
} 