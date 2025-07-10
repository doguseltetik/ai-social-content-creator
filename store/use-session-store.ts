import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentBrief, DesignerCharacter, ChatMessage, GeneratedContent } from '@/types';

interface SessionState {
  // Session data
  sessionId: string | null;
  brief: Partial<ContentBrief>;
  selectedDesigner: DesignerCharacter | null;
  chatHistory: ChatMessage[];
  generatedContent: GeneratedContent[];
  
  // UI state
  currentStep: 'welcome' | 'brief' | 'designer-selection' | 'chat' | 'content' | 'analytics' | 'calendar' | 'bulk' | 'settings';
  isLoading: boolean;
  
  // Actions
  setSessionId: (id: string) => void;
  updateBrief: (updates: Partial<ContentBrief>) => void;
  setSelectedDesigner: (designer: DesignerCharacter) => void;
  addChatMessage: (message: ChatMessage) => void;
  addGeneratedContent: (content: GeneratedContent) => void;
  setCurrentStep: (step: SessionState['currentStep']) => void;
  setLoading: (loading: boolean) => void;
  resetSession: () => void;
}

const initialState = {
  sessionId: null,
  brief: {},
  selectedDesigner: null,
  chatHistory: [],
  generatedContent: [],
  currentStep: 'welcome' as const,
  isLoading: false,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setSessionId: (id: string) => set({ sessionId: id }),
      
      updateBrief: (updates: Partial<ContentBrief>) => 
        set((state) => ({ 
          brief: { ...state.brief, ...updates } 
        })),
      
      setSelectedDesigner: (designer: DesignerCharacter) => 
        set({ selectedDesigner: designer }),
      
      addChatMessage: (message: ChatMessage) => 
        set((state) => ({ 
          chatHistory: [...state.chatHistory, message] 
        })),
      
      addGeneratedContent: (content: GeneratedContent) => 
        set((state) => ({ 
          generatedContent: [...state.generatedContent, content] 
        })),
      
      setCurrentStep: (step: SessionState['currentStep']) => 
        set({ currentStep: step }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      resetSession: () => set(initialState),
    }),
    {
      name: 'ai-social-session',
      partialize: (state) => ({
        sessionId: state.sessionId,
        brief: state.brief,
        selectedDesigner: state.selectedDesigner,
        chatHistory: state.chatHistory,
        generatedContent: state.generatedContent,
        currentStep: state.currentStep,
      }),
    }
  )
); 