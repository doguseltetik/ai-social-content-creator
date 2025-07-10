import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getDesignerPrompt } from '@/lib/designer-characters';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const { message, designerId, brief, chatHistory } = await request.json();

    if (!message || !designerId) {
      return NextResponse.json(
        { error: 'Message and designer ID are required' },
        { status: 400 }
      );
    }

    // Get the designer's prompt template
    const designerPrompt = getDesignerPrompt(designerId);
    
    // Create the system prompt with brief information
    const systemPrompt = `${designerPrompt}

Business Information:
- Business Name: ${brief.businessName || 'Not specified'}
- Industry: ${brief.industry || 'Not specified'}
- Target Audience: ${brief.targetAudience || 'Not specified'}
- Brand Voice: ${brief.brandVoice || 'Not specified'}
- Content Frequency: ${brief.contentFrequency || 'Not specified'}

Please respond in character as the AI designer, maintaining the style and personality described above.`;

    // Prepare conversation history
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({
      content: aiResponse,
      designer: designerId,
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 