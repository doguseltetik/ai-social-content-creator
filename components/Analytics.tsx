'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Eye, ThumbsUp, Share2, Calendar, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useSessionStore } from '@/store/use-session-store';
import { formatDate } from '@/lib/utils';

export default function Analytics() {
  const { generatedContent, setCurrentStep } = useSessionStore();

  const approvedContent = generatedContent.filter(content => content.status === 'approved');
  const rejectedContent = generatedContent.filter(content => content.status === 'rejected');
  const draftContent = generatedContent.filter(content => content.status === 'draft');

  const totalContent = generatedContent.length;
  const approvalRate = totalContent > 0 ? (approvedContent.length / totalContent) * 100 : 0;

  const designerStats = generatedContent.reduce((acc, content) => {
    acc[content.designer] = (acc[content.designer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      title: 'Total Content',
      value: totalContent,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Approved',
      value: approvedContent.length,
      icon: <ThumbsUp className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Approval Rate',
      value: `${approvalRate.toFixed(1)}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'This Month',
      value: generatedContent.filter(content => {
        const contentDate = new Date(content.createdAt);
        const now = new Date();
        return contentDate.getMonth() === now.getMonth() && 
               contentDate.getFullYear() === now.getFullYear();
      }).length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Content Analytics
              </h1>
              <p className="text-neutral-600">
                Track your content performance and creation metrics
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentStep('content')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Content
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-neutral-600">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Designer Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Designer Performance
            </h2>
            <div className="space-y-4">
              {Object.entries(designerStats).map(([designer, count]) => (
                <div key={designer} className="flex items-center justify-between">
                  <span className="text-neutral-700">{designer}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(count / totalContent) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-neutral-600 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Recent Content
            </h2>
            <div className="space-y-3">
              {generatedContent.slice(0, 5).map((content) => (
                <div key={content.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900 text-sm">
                      {content.title}
                    </h4>
                    <p className="text-xs text-neutral-600">
                      {formatDate(content.createdAt)}
                    </p>
                  </div>
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 