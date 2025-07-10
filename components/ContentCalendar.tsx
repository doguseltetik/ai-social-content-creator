'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import { GeneratedContent } from '@/types';

interface ScheduledContent extends GeneratedContent {
  scheduledDate: Date;
  platform: string;
}

export default function ContentCalendar() {
  const { generatedContent, setCurrentStep } = useSessionStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);

  const platforms = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getContentForDate = (date: Date) => {
    return scheduledContent.filter(content => {
      const contentDate = new Date(content.scheduledDate);
      return contentDate.toDateString() === date.toDateString();
    });
  };

  const handleScheduleContent = (content: GeneratedContent) => {
    setSelectedContent(content);
    setShowScheduleModal(true);
  };

  const confirmSchedule = (platform: string, date: Date) => {
    if (selectedContent) {
      const scheduled: ScheduledContent = {
        ...selectedContent,
        scheduledDate: date,
        platform,
        status: 'scheduled' as any,
      };
      setScheduledContent([...scheduledContent, scheduled]);
      setShowScheduleModal(false);
      setSelectedContent(null);
    }
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Content Calendar
              </h1>
              <p className="text-neutral-600">
                Plan and schedule your content across different platforms
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('content')}
              >
                Back to Content
              </Button>
              <Button onClick={() => setCurrentStep('chat')}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Content
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
                  setSelectedDate(newDate);
                }}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
                  setSelectedDate(newDate);
                }}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-neutral-600">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-neutral-200 ${
                  day ? 'bg-white' : 'bg-neutral-50'
                }`}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-neutral-900 mb-1">
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getContentForDate(day).map((content, contentIndex) => (
                        <motion.div
                          key={content.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`p-1 rounded text-xs text-white truncate ${
                            content.platform === 'instagram' ? 'bg-pink-500' :
                            content.platform === 'facebook' ? 'bg-blue-500' :
                            content.platform === 'twitter' ? 'bg-blue-400' :
                            content.platform === 'linkedin' ? 'bg-blue-600' :
                            'bg-neutral-500'
                          }`}
                          title={`${content.title} - ${content.platform}`}
                        >
                          {content.title}
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Content */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Available Content to Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedContent
              .filter(content => content.status === 'approved')
              .map((content) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-neutral-900 mb-2">
                    {content.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {content.textContent}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      By {content.designer}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleScheduleContent(content)}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowScheduleModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Schedule Content
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Platform
              </label>
              <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                {platforms.map(platform => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowScheduleModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const platform = (document.querySelector('select') as HTMLSelectElement)?.value || 'instagram';
                  const dateTime = (document.querySelector('input[type="datetime-local"]') as HTMLInputElement)?.value;
                  const date = dateTime ? new Date(dateTime) : new Date();
                  confirmSchedule(platform, date);
                }}
              >
                Schedule
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 