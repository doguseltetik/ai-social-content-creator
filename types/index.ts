export interface DesignerCharacter {
  id: string;
  name: string;
  title: string;
  description: string;
  style: string;
  language: string;
  avatar: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  promptTemplate: string;
}

export interface ContentBrief {
  businessName: string;
  industry: string;
  targetAudience: string;
  socialMediaAccounts?: string;
  brandVoice: string;
  campaigns?: string;
  stylePreferences?: string;
  logo?: string;
  contentFrequency: 'daily' | 'weekly' | 'monthly';
  selectedDesigner?: string;
}

export interface GeneratedContent {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  textContent: string;
  designer: string;
  createdAt: Date;
  status: 'draft' | 'approved' | 'rejected';
  tags: string[];
  visualStyle?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  designer?: string;
}

export interface UserSession {
  id: string;
  brief: ContentBrief;
  selectedDesigner?: DesignerCharacter;
  chatHistory: ChatMessage[];
  generatedContent: GeneratedContent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
  nextQuestion?: string;
  generatedImage?: string;
}

export type BrandVoice = 
  | 'corporate'
  | 'friendly'
  | 'humorous'
  | 'spiritual'
  | 'professional'
  | 'casual'
  | 'luxury'
  | 'edgy';

export type ContentFrequency = 'daily' | 'weekly' | 'monthly';

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
} 