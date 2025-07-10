'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Download, RefreshCw, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useSessionStore } from '@/store/use-session-store';
import { ChatMessage, GeneratedContent } from '@/types';
import { generateId } from '@/lib/utils';

export default function AIChat() {
  const { 
    selectedDesigner, 
    brief, 
    chatHistory, 
    addChatMessage, 
    addGeneratedContent,
    setCurrentStep 
  } = useSessionStore();
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('social media post');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contentTypes = [
    { value: 'social media post', label: 'Social Media Post' },
    { value: 'instagram post', label: 'Instagram Post' },
    { value: 'facebook ad', label: 'Facebook Ad' },
    { value: 'twitter thread', label: 'Twitter Thread' },
    { value: 'linkedin post', label: 'LinkedIn Post' },
    { value: 'blog post', label: 'Blog Post' },
    { value: 'email newsletter', label: 'Email Newsletter' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    // Send welcome message if no chat history
    if (chatHistory.length === 0 && selectedDesigner) {
      const welcomeMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Hi! I'm ${selectedDesigner.name}, your ${selectedDesigner.title.toLowerCase()}. I'm excited to help you create amazing content for ${brief.businessName || 'your business'}! 

Let me ask you a few questions to understand your needs better:

1. What type of content would you like to create today? (e.g., Instagram post, Facebook ad, Twitter thread)
2. Do you have any specific topics or themes in mind?
3. Would you like me to generate both visual and text content?

Feel free to share any ideas or preferences you have!`,
        timestamp: new Date(),
        designer: selectedDesigner.id
      };
      addChatMessage(welcomeMessage);
    }
  }, [selectedDesigner, brief, chatHistory.length, addChatMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !selectedDesigner) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          designerId: selectedDesigner.id,
          brief,
          chatHistory: [...chatHistory, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiResponse: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        designer: selectedDesigner.id
      };

      addChatMessage(aiResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mock response if API fails
      const aiResponse: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        designer: selectedDesigner.id
      };
      addChatMessage(aiResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // This is a simplified response generator
    // In a real implementation, this would call the OpenAI API with the designer's prompt template
    const responses = [
      "That's a great idea! I love the direction you're going with this. Let me create something that captures that essence.",
      "Perfect! I can definitely work with that. I'll create content that aligns with your vision and brand voice.",
      "Excellent choice! I'm already thinking of some creative ways to bring this to life in my signature style.",
      "I'm excited about this! Let me craft something that will really resonate with your audience.",
      "That sounds fantastic! I'll create content that's both engaging and true to your brand's personality."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleGenerateContent = async () => {
    if (!selectedDesigner) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          designerId: selectedDesigner.id,
          brief,
          chatHistory,
          contentType
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      
      const generatedContent: GeneratedContent = {
        id: generateId(),
        title: data.content.title || `Content for ${brief.businessName}`,
        description: data.content.platform || 'AI-generated social media content',
        textContent: data.content.content,
        imageUrl: data.content.imageUrl,
        visualStyle: data.content.visualStyle,
        designer: selectedDesigner.name,
        createdAt: new Date(),
        status: 'draft',
        tags: data.content.hashtags || ['social media', 'content', 'ai-generated']
      };

      addGeneratedContent(generatedContent);
      setCurrentStep('content');
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback to mock content if API fails
      const generatedContent: GeneratedContent = {
        id: generateId(),
        title: `Content for ${brief.businessName}`,
        description: 'AI-generated social media content',
        textContent: 'This is a sample generated content that would be created based on the conversation and designer style.',
        designer: selectedDesigner.name,
        createdAt: new Date(),
        status: 'draft',
        tags: ['social media', 'content', 'ai-generated']
      };
      addGeneratedContent(generatedContent);
      setCurrentStep('content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedDesigner.colorScheme.primary}, ${selectedDesigner.colorScheme.secondary})`
              }}
            >
              {selectedDesigner.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                {selectedDesigner.name}
              </h1>
              <p className="text-sm text-neutral-600">
                {selectedDesigner.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select
              options={contentTypes}
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-48"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateContent}
              loading={isGenerating}
              disabled={chatHistory.length < 2}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentStep('designer-selection')}
            >
              Change Designer
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-neutral-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.role === 'assistant' && (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${selectedDesigner.colorScheme.primary}, ${selectedDesigner.colorScheme.secondary})`
                        }}
                      >
                        {selectedDesigner.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-primary-100' : 'text-neutral-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-neutral-200 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${selectedDesigner.colorScheme.primary}, ${selectedDesigner.colorScheme.secondary})`
                    }}
                  >
                    {selectedDesigner.name.charAt(0)}
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-neutral-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-sm text-neutral-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{inputMessage.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
} 