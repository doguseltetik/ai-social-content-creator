'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Palette, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import BriefCollection from '@/components/BriefCollection';
import DesignerSelection from '@/components/DesignerSelection';
import AIChat from '@/components/AIChat';
import ContentManagement from '@/components/ContentManagement';
import Analytics from '@/components/Analytics';
import ContentCalendar from '@/components/ContentCalendar';
import BulkGenerator from '@/components/BulkGenerator';
import Settings from '@/components/Settings';

export default function HomePage() {
  const { currentStep, setCurrentStep } = useSessionStore();

  const handleGetStarted = () => {
    setCurrentStep('brief');
  };

  // Render different components based on current step
  if (currentStep === 'brief') {
    return <BriefCollection />;
  }
  
  if (currentStep === 'designer-selection') {
    return <DesignerSelection />;
  }
  
  if (currentStep === 'chat') {
    return <AIChat />;
  }
  
  if (currentStep === 'content') {
    return <ContentManagement />;
  }
  
  if (currentStep === 'analytics') {
    return <Analytics />;
  }
  
  if (currentStep === 'calendar') {
    return <ContentCalendar />;
  }
  
  if (currentStep === 'bulk') {
    return <BulkGenerator />;
  }
  
  if (currentStep === 'settings') {
    return <Settings />;
  }

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Design',
      description: 'Choose from 5 unique AI designer characters, each with their own style and personality.'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Guided Creation',
      description: 'Our AI agent walks you through the entire content creation process step by step.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Unique Styles',
      description: 'From artistic and abstract to corporate and minimal, find the perfect style for your brand.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Results',
      description: 'Generate professional social media content in minutes, not hours.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                Create Stunning Social Media Content with{' '}
                <span className="text-gradient">AI Designers</span>
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                Choose your AI designer character and let them create unique, engaging content 
                that perfectly matches your brand's voice and style.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="text-lg px-8 py-4"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  See Examples
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Our AI Designers?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Each AI designer has a unique personality, style, and approach to content creation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Designer Preview Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Meet Your AI Designers
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Each designer brings their own unique style and personality to your content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Artiya',
                title: 'Artistic Soul',
                style: 'Abstract & Poetic',
                color: 'from-purple-400 to-purple-600'
              },
              {
                name: 'Lineo',
                title: 'Corporate & Minimal',
                style: 'Clean & Professional',
                color: 'from-blue-400 to-blue-600'
              },
              {
                name: 'Juno',
                title: 'Cheerful & Colorful',
                style: 'Fun & Playful',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                name: 'Nala',
                title: 'Spiritual & Soft',
                style: 'Calming & Inspirational',
                color: 'from-purple-300 to-pink-400'
              },
              {
                name: 'Roko',
                title: 'Street & Badboy',
                style: 'Bold & Edgy',
                color: 'from-gray-600 to-gray-800'
              }
            ].map((designer, index) => (
              <motion.div
                key={designer.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-32 bg-gradient-to-r ${designer.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {designer.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {designer.title}
                  </p>
                  <p className="text-sm font-medium text-neutral-700">
                    {designer.style}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of businesses creating amazing content with AI designers.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleGetStarted}
            className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-neutral-100"
          >
            Start Creating Now
          </Button>
        </div>
      </section>
    </div>
  );
} 