'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Palette, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import { designerCharacters } from '@/lib/designer-characters';
import { DesignerCharacter } from '@/types';

export default function DesignerSelection() {
  const { brief, setSelectedDesigner, setCurrentStep } = useSessionStore();
  const [selectedDesignerId, setSelectedDesignerId] = useState<string | null>(null);

  const handleDesignerSelect = (designer: DesignerCharacter) => {
    setSelectedDesignerId(designer.id);
  };

  const handleContinue = () => {
    if (selectedDesignerId) {
      const designer = designerCharacters.find(d => d.id === selectedDesignerId);
      if (designer) {
        setSelectedDesigner(designer);
        setCurrentStep('chat');
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Choose Your AI Designer
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Each designer has a unique style and personality. Pick the one that best matches your brand's vibe.
          </p>
        </motion.div>

        {/* Brief Summary */}
        {brief.businessName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-neutral-200"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Brief Summary for {brief.businessName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
              <div>
                <span className="font-medium">Industry:</span> {brief.industry}
              </div>
              <div>
                <span className="font-medium">Brand Voice:</span> {brief.brandVoice}
              </div>
              <div>
                <span className="font-medium">Content Frequency:</span> {brief.contentFrequency}
              </div>
            </div>
          </motion.div>
        )}

        {/* Designer Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {designerCharacters.map((designer, index) => (
            <motion.div
              key={designer.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer group ${
                selectedDesignerId === designer.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => handleDesignerSelect(designer)}
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300">
                {/* Header with gradient */}
                <div 
                  className="h-32 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${designer.colorScheme.primary}, ${designer.colorScheme.secondary})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 right-4">
                    {selectedDesignerId === designer.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-primary-600" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {designer.name}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Designer
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    {designer.title}
                  </p>
                  
                  <p className="text-sm text-neutral-600 mb-4">
                    {designer.description}
                  </p>

                  {/* Style Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                      {designer.style}
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                      {designer.language}
                    </span>
                  </div>

                  {/* Color Palette Preview */}
                  <div className="flex gap-2">
                    {Object.values(designer.colorScheme).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-6 h-6 rounded-full border border-neutral-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedDesignerId === designer.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedDesignerId}
            className="text-lg px-8 py-4"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Creating with {selectedDesignerId ? designerCharacters.find(d => d.id === selectedDesignerId)?.name : 'Designer'}
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-neutral-500 mt-6"
        >
          Don't worry! You can always change your designer later or try different styles.
        </motion.p>
      </div>
    </div>
  );
} 