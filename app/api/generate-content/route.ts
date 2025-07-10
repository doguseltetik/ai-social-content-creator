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

    const { designerId, brief, chatHistory, contentType, topic, platform, description } = await request.json();

    if (!designerId || !brief) {
      return NextResponse.json(
        { error: 'Designer ID and brief are required' },
        { status: 400 }
      );
    }

    // Get the designer's prompt template
    const designerPrompt = getDesignerPrompt(designerId);
    
    // Create content generation prompt
    let contentPrompt = `${designerPrompt}

Based on the business information below, create a ${contentType || 'social media post'} that matches my style and the business requirements.

Business Information:
- Business Name: ${brief.businessName}
- Industry: ${brief.industry}
- Target Audience: ${brief.targetAudience}
- Brand Voice: ${brief.brandVoice}
- Content Frequency: ${brief.contentFrequency}
${brief.campaigns ? `- Campaigns: ${brief.campaigns}` : ''}
${brief.stylePreferences ? `- Style Preferences: ${brief.stylePreferences}` : ''}`;

    // Add topic and platform if provided (for bulk generation)
    if (topic) {
      contentPrompt += `\n\nSpecific Topic: ${topic}`;
    }
    if (platform) {
      contentPrompt += `\nPlatform: ${platform}`;
    }
    if (description) {
      contentPrompt += `\nAdditional Context: ${description}`;
    }

    // Add conversation context if available
    if (chatHistory && chatHistory.length > 0) {
      contentPrompt += `\n\nConversation Context:\n${chatHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}`;
    }

    contentPrompt += `\n\nPlease create:
1. A compelling title
2. Engaging content text (appropriate length for ${contentType || 'social media'})
3. Relevant hashtags
4. A brief description of the visual style that would complement this content

Format your response as JSON:
{
  "title": "Your title here",
  "content": "Your content text here",
  "hashtags": ["#hashtag1", "#hashtag2"],
  "visualStyle": "Description of visual style",
  "platform": "${contentType || 'social media'}"
}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a creative content generator. Always respond with valid JSON.' },
        { role: 'user', content: contentPrompt }
      ],
      max_tokens: 800,
      temperature: 0.8,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Try to parse JSON response
    let generatedContent;
    try {
      generatedContent = JSON.parse(responseText);
    } catch (error) {
      // Fallback if JSON parsing fails
      generatedContent = {
        title: `Content for ${brief.businessName}`,
        content: responseText,
        hashtags: ['#content', '#socialmedia'],
        visualStyle: 'Designer-specific style',
        platform: contentType || 'social media'
      };
    }

    // Generate image if visual style is provided
    let imageUrl = null;
    if (generatedContent.visualStyle) {
      try {
        const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            designerId,
            content: generatedContent.content,
            brief,
            visualStyle: generatedContent.visualStyle
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.imageUrl;
        }
      } catch (error) {
        console.error('Error generating image:', error);
        // Continue without image if generation fails
      }
    }

    return NextResponse.json({
      success: true,
      content: {
        ...generatedContent,
        imageUrl
      },
      designer: designerId,
    });

  } catch (error) {
    console.error('Error in content generation API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 