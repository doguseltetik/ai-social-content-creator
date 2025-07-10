'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Palette, User, Bell, Shield, ArrowLeft, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useSessionStore } from '@/store/use-session-store';

interface UserSettings {
  defaultDesigner: string;
  contentFrequency: string;
  autoGenerateImages: boolean;
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export default function Settings() {
  const { selectedDesigner, setCurrentStep, resetSession } = useSessionStore();
  const [settings, setSettings] = useState<UserSettings>({
    defaultDesigner: selectedDesigner?.id || 'artiya',
    contentFrequency: 'weekly',
    autoGenerateImages: true,
    emailNotifications: false,
    theme: 'light',
    language: 'en'
  });
  const [isSaving, setIsSaving] = useState(false);

  const contentFrequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' },
  ];

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto (System)' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would save to localStorage or backend
      localStorage.setItem('user-settings', JSON.stringify(settings));
      
      // Show success message
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSession = () => {
    if (confirm('Are you sure you want to reset your session? This will clear all your data.')) {
      resetSession();
      setCurrentStep('welcome');
    }
  };

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Settings
              </h1>
              <p className="text-neutral-600">
                Customize your AI content creation experience
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('content')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Content
              </Button>
              <Button
                onClick={handleSaveSettings}
                loading={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Content Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-neutral-900">
                Content Preferences
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Default Designer
                </label>
                <Select
                  options={[
                    { value: 'artiya', label: 'Artiya - Artistic Soul' },
                    { value: 'lineo', label: 'Lineo - Corporate & Minimal' },
                    { value: 'juno', label: 'Juno - Cheerful & Colorful' },
                    { value: 'nala', label: 'Nala - Spiritual & Soft' },
                    { value: 'roko', label: 'Roko - Street & Badboy' },
                  ]}
                  value={settings.defaultDesigner}
                  onChange={(e) => updateSetting('defaultDesigner', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Content Frequency
                </label>
                <Select
                  options={contentFrequencies}
                  value={settings.contentFrequency}
                  onChange={(e) => updateSetting('contentFrequency', e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoGenerateImages}
                    onChange={(e) => updateSetting('autoGenerateImages', e.target.checked)}
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">
                    Automatically generate images with content
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-neutral-900">
                Notifications
              </h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-neutral-700">
                  Receive email notifications for new content
                </span>
              </label>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center mb-4">
              <SettingsIcon className="w-5 h-5 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-neutral-900">
                Appearance
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Theme
                </label>
                <Select
                  options={themes}
                  value={settings.theme}
                  onChange={(e) => updateSetting('theme', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Language
                </label>
                <Select
                  options={languages}
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Account & Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-neutral-900">
                Account & Data
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-neutral-900">Session Data</h3>
                  <p className="text-sm text-neutral-600">
                    Clear all your current session data
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleResetSession}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Reset Session
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-neutral-900">Export Data</h3>
                  <p className="text-sm text-neutral-600">
                    Download all your generated content
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Export functionality would go here
                    console.log('Export data');
                  }}
                >
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 