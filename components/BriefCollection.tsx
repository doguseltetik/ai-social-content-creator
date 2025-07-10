'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building, Users, Instagram, Palette, Calendar, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import { ContentBrief, BrandVoice, ContentFrequency } from '@/types';

const questions = [
  {
    id: 'businessName',
    question: 'What is your business name?',
    placeholder: 'Enter your business name',
    icon: <Building className="w-5 h-5" />,
    type: 'text' as const,
  },
  {
    id: 'industry',
    question: 'Which industry do you operate in?',
    placeholder: 'e.g., Technology, Fashion, Food & Beverage, etc.',
    icon: <Building className="w-5 h-5" />,
    type: 'text' as const,
  },
  {
    id: 'targetAudience',
    question: 'How would you define your target audience?',
    placeholder: 'e.g., Young professionals aged 25-35, interested in fitness',
    icon: <Users className="w-5 h-5" />,
    type: 'text' as const,
  },
  {
    id: 'socialMediaAccounts',
    question: 'Do you have social media accounts? (You can share an Instagram link)',
    placeholder: 'https://instagram.com/yourbusiness',
    icon: <Instagram className="w-5 h-5" />,
    type: 'text' as const,
    optional: true,
  },
  {
    id: 'brandVoice',
    question: 'What should your brand voice be?',
    placeholder: 'Select your brand voice',
    icon: <Palette className="w-5 h-5" />,
    type: 'select' as const,
    options: [
      { value: 'corporate', label: 'Corporate & Professional' },
      { value: 'friendly', label: 'Friendly & Approachable' },
      { value: 'humorous', label: 'Humorous & Witty' },
      { value: 'spiritual', label: 'Spiritual & Inspirational' },
      { value: 'professional', label: 'Professional & Trustworthy' },
      { value: 'casual', label: 'Casual & Relaxed' },
      { value: 'luxury', label: 'Luxury & Premium' },
      { value: 'edgy', label: 'Edgy & Bold' },
    ],
  },
  {
    id: 'campaigns',
    question: 'Do you have regular campaigns or content series?',
    placeholder: 'e.g., Weekly tips, Monthly promotions, etc.',
    icon: <Calendar className="w-5 h-5" />,
    type: 'text' as const,
    optional: true,
  },
  {
    id: 'stylePreferences',
    question: 'Do you have any color, style, or font preferences?',
    placeholder: 'e.g., Blue and white, minimalist style, sans-serif fonts',
    icon: <Palette className="w-5 h-5" />,
    type: 'text' as const,
    optional: true,
  },
  {
    id: 'logo',
    question: 'Would you like to upload your logo?',
    placeholder: 'Upload your logo (optional)',
    icon: <Upload className="w-5 h-5" />,
    type: 'file' as const,
    optional: true,
  },
  {
    id: 'contentFrequency',
    question: 'Do you want daily, weekly, or monthly content?',
    placeholder: 'Select content frequency',
    icon: <Calendar className="w-5 h-5" />,
    type: 'select' as const,
    options: [
      { value: 'daily', label: 'Daily Content' },
      { value: 'weekly', label: 'Weekly Content' },
      { value: 'monthly', label: 'Monthly Content' },
    ],
  },
];

export default function BriefCollection() {
  const { brief, updateBrief, setCurrentStep } = useSessionStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<ContentBrief>>(brief);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion.optional || answers[currentQuestion.id as keyof ContentBrief]) {
      updateBrief(answers);
      
      if (isLastQuestion) {
        setCurrentStep('designer-selection');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion.optional) {
      handleNext();
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-neutral-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Question Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mr-4">
              {currentQuestion.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {currentQuestion.question}
              </h2>
              {currentQuestion.optional && (
                <p className="text-sm text-neutral-500 mt-1">(Optional)</p>
              )}
            </div>
          </div>

          {/* Input Field */}
          <div className="mb-8">
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                placeholder={currentQuestion.placeholder}
                value={answers[currentQuestion.id as keyof ContentBrief] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
              />
            )}

            {currentQuestion.type === 'select' && (
              <select
                value={answers[currentQuestion.id as keyof ContentBrief] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-lg"
              >
                <option value="">{currentQuestion.placeholder}</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {currentQuestion.type === 'file' && (
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors duration-200">
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-2">Click to upload your logo</p>
                <p className="text-sm text-neutral-500">PNG, JPG up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file upload logic here
                      handleAnswerChange(file.name);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-3">
              {currentQuestion.optional && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-neutral-600"
                >
                  Skip
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={!currentQuestion.optional && !answers[currentQuestion.id as keyof ContentBrief]}
                className="flex items-center"
              >
                {isLastQuestion ? 'Continue' : 'Next'}
                {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 