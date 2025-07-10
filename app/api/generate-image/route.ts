import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getDesignerById } from '@/lib/designer-characters';

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

    const { designerId, content, brief, visualStyle } = await request.json();

    if (!designerId || !content) {
      return NextResponse.json(
        { error: 'Designer ID and content are required' },
        { status: 400 }
      );
    }

    const designer = getDesignerById(designerId);
    if (!designer) {
      return NextResponse.json(
        { error: 'Designer not found' },
        { status: 404 }
      );
    }

    // Create image prompt based on designer style and content
    const imagePrompt = `Create a social media image for ${brief.businessName || 'a business'} in the style of ${designer.name}: ${designer.style}. 

Content: ${content}
Visual Style: ${visualStyle || designer.description}

Style Guidelines:
- ${designer.promptTemplate.split('\n').slice(1, 6).join('\n- ')}

Create a visually appealing social media image that matches the designer's aesthetic and complements the content.`;

    // Generate image using DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural",
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      designer: designerId,
    });

  } catch (error) {
    console.error('Error in image generation API:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 