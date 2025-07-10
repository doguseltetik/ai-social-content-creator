'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Trash2, Download, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useSessionStore } from '@/store/use-session-store';
import { GeneratedContent } from '@/types';
import { generateId } from '@/lib/utils';

interface BulkContentRequest {
  id: string;
  contentType: string;
  topic: string;
  platform: string;
  description: string;
}

export default function BulkGenerator() {
  const { selectedDesigner, brief, setCurrentStep, addGeneratedContent } = useSessionStore();
  const [contentRequests, setContentRequests] = useState<BulkContentRequest[]>([
    {
      id: generateId(),
      contentType: 'social media post',
      topic: '',
      platform: 'instagram',
      description: ''
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBulkContent, setGeneratedBulkContent] = useState<GeneratedContent[]>([]);

  const contentTypes = [
    { value: 'social media post', label: 'Social Media Post' },
    { value: 'instagram post', label: 'Instagram Post' },
    { value: 'facebook ad', label: 'Facebook Ad' },
    { value: 'twitter thread', label: 'Twitter Thread' },
    { value: 'linkedin post', label: 'LinkedIn Post' },
    { value: 'blog post', label: 'Blog Post' },
    { value: 'email newsletter', label: 'Email Newsletter' },
  ];

  const platforms = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'general', label: 'General' },
  ];

  const addContentRequest = () => {
    setContentRequests([
      ...contentRequests,
      {
        id: generateId(),
        contentType: 'social media post',
        topic: '',
        platform: 'instagram',
        description: ''
      }
    ]);
  };

  const removeContentRequest = (id: string) => {
    if (contentRequests.length > 1) {
      setContentRequests(contentRequests.filter(req => req.id !== id));
    }
  };

  const updateContentRequest = (id: string, field: keyof BulkContentRequest, value: string) => {
    setContentRequests(contentRequests.map(req => 
      req.id === id ? { ...req, [field]: value } : req
    ));
  };

  const generateBulkContent = async () => {
    if (!selectedDesigner || contentRequests.length === 0) return;

    setIsGenerating(true);
    const newGeneratedContent: GeneratedContent[] = [];

    try {
      for (const request of contentRequests) {
        if (!request.topic.trim()) continue;

        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            designerId: selectedDesigner.id,
            brief,
            chatHistory: [],
            contentType: request.contentType,
            topic: request.topic,
            platform: request.platform,
            description: request.description
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          const generatedContent: GeneratedContent = {
            id: generateId(),
            title: data.content.title || `Content for ${request.topic}`,
            description: `${request.platform} ${request.contentType}`,
            textContent: data.content.content,
            imageUrl: data.content.imageUrl,
            visualStyle: data.content.visualStyle,
            designer: selectedDesigner.name,
            createdAt: new Date(),
            status: 'draft',
            tags: data.content.hashtags || [request.platform, request.contentType, 'bulk-generated']
          };

          newGeneratedContent.push(generatedContent);
          addGeneratedContent(generatedContent);
        }
      }

      setGeneratedBulkContent(newGeneratedContent);
    } catch (error) {
      console.error('Error generating bulk content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadBulkContent = () => {
    const contentText = generatedBulkContent.map(content => 
      `Title: ${content.title}\nPlatform: ${content.description}\nContent:\n${content.textContent}\n\n---\n\n`
    ).join('');

    const blob = new Blob([contentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-content-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!selectedDesigner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            No Designer Selected
          </h2>
          <Button onClick={() => setCurrentStep('designer-selection')}>
            Choose a Designer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Bulk Content Generator
              </h1>
              <p className="text-neutral-600">
                Create multiple pieces of content at once with {selectedDesigner.name}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('content')}
              >
                Back to Content
              </Button>
              {generatedBulkContent.length > 0 && (
                <Button
                  variant="outline"
                  onClick={downloadBulkContent}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              Content Requests
            </h2>
            <Button
              variant="outline"
              onClick={addContentRequest}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Request
            </Button>
          </div>

          <div className="space-y-4">
            {contentRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-neutral-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-neutral-900">
                    Request #{index + 1}
                  </h3>
                  {contentRequests.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContentRequest(request.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Content Type
                    </label>
                    <Select
                      options={contentTypes}
                      value={request.contentType}
                      onChange={(e) => updateContentRequest(request.id, 'contentType', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Platform
                    </label>
                    <Select
                      options={platforms}
                      value={request.platform}
                      onChange={(e) => updateContentRequest(request.id, 'platform', e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Topic/Theme
                    </label>
                    <input
                      type="text"
                      value={request.topic}
                      onChange={(e) => updateContentRequest(request.id, 'topic', e.target.value)}
                      placeholder="e.g., Product launch, Customer testimonial, Industry tips"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Additional Description (Optional)
                  </label>
                  <textarea
                    value={request.description}
                    onChange={(e) => updateContentRequest(request.id, 'description', e.target.value)}
                    placeholder="Any specific requirements or context..."
                    rows={2}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={generateBulkContent}
              loading={isGenerating}
              disabled={contentRequests.every(req => !req.topic.trim())}
              className="w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate {contentRequests.filter(req => req.topic.trim()).length} Pieces of Content
            </Button>
          </div>
        </div>

        {/* Generated Content Preview */}
        {generatedBulkContent.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Generated Content ({generatedBulkContent.length} items)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedBulkContent.map((content) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-neutral-900 text-sm">
                      {content.title}
                    </h3>
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-neutral-600 mb-2">
                    {content.description}
                  </p>
                  <p className="text-sm text-neutral-700 line-clamp-3">
                    {content.textContent}
                  </p>
                  {content.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={content.imageUrl} 
                        alt={content.title}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 