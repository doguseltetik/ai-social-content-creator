'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, X, RefreshCw, Plus, Eye, Edit, BarChart3, Calendar, Layers, Settings } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import { GeneratedContent } from '@/types';
import { formatDate } from '@/lib/utils';

export default function ContentManagement() {
  const { generatedContent, setCurrentStep, selectedDesigner } = useSessionStore();
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = (content: GeneratedContent) => {
    // Create a text file with the content
    const blob = new Blob([content.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApprove = (content: GeneratedContent) => {
    // Update content status to approved
    console.log('Content approved:', content.id);
  };

  const handleReject = (content: GeneratedContent) => {
    // Update content status to rejected
    console.log('Content rejected:', content.id);
  };

  const handleGenerateMore = async () => {
    setIsGenerating(true);
    try {
      // Simulate generating more content
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep('chat');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditContent = (content: GeneratedContent) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  if (generatedContent.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            No Content Generated Yet
          </h2>
          <p className="text-neutral-600 mb-6">
            Start a conversation with your AI designer to create amazing content.
          </p>
          <Button onClick={() => setCurrentStep('chat')}>
            Start Creating
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Your Generated Content
              </h1>
              <p className="text-neutral-600">
                Created with {selectedDesigner?.name} • {generatedContent.length} items
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep('calendar')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep('bulk')}
              >
                <Layers className="w-4 h-4 mr-2" />
                Bulk Generate
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep('settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateMore}
                loading={isGenerating}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate More
              </Button>
              <Button onClick={() => setCurrentStep('chat')}>
                <Plus className="w-4 h-4 mr-2" />
                New Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {generatedContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Content Header */}
                  <div className="p-6 border-b border-neutral-100">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {content.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        content.status === 'approved' 
                          ? 'bg-green-100 text-green-700'
                          : content.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {content.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-3">
                      {content.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>By {content.designer}</span>
                      <span>{formatDate(content.createdAt)}</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="p-6">
                    {content.imageUrl && (
                      <div className="mb-4">
                        <img 
                          src={content.imageUrl} 
                          alt={content.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <p className="text-sm text-neutral-700 line-clamp-3 mb-4">
                      {content.textContent}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {content.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditContent(content)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(content)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(content)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(content)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content Detail Modal */}
      <AnimatePresence>
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedContent.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                {selectedContent.imageUrl && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Generated Image
                    </h3>
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <img 
                        src={selectedContent.imageUrl} 
                        alt={selectedContent.title}
                        className="w-full max-h-96 object-contain rounded-lg"
                      />
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Content
                  </h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-neutral-700 whitespace-pre-wrap">
                      {selectedContent.textContent}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-neutral-600">Designer:</span>
                      <p className="text-neutral-900">{selectedContent.designer}</p>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-600">Created:</span>
                      <p className="text-neutral-900">{formatDate(selectedContent.createdAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-600">Status:</span>
                      <p className="text-neutral-900 capitalize">{selectedContent.status}</p>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-600">Tags:</span>
                      <p className="text-neutral-900">{selectedContent.tags.join(', ')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(selectedContent)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedContent)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedContent)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 