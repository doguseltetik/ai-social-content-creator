# AI Social Media Content Creator

A fully AI-powered web platform designed to generate unique social media content for small and medium-sized businesses. Users interact with AI designer characters to create personalized content that matches their brand's voice and style.

## 🚀 Features

### Core Functionality
- **AI Designer Characters**: 5 unique AI designers with distinct styles and personalities
- **Guided Content Creation**: Step-by-step process with AI agent assistance
- **Interactive Chat Interface**: Real-time conversation with selected AI designer
- **Content Management**: View, approve, reject, and download generated content
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### AI Designer Characters

1. **Artiya – Artistic Soul**
   - Style: Abstract, texture, collage, hand-drawn
   - Language: Poetic, visually focused
   - Perfect for: Creative brands, art businesses, lifestyle content

2. **Lineo – Corporate & Minimal**
   - Style: Clean, pastel, space-focused
   - Language: Clear, simple, corporate
   - Perfect for: B2B companies, professional services, corporate brands

3. **Juno – Cheerful & Colorful**
   - Style: Sticker-filled, colorful, fun
   - Language: Friendly, playful, emoji-friendly
   - Perfect for: Consumer brands, retail, entertainment, food & beverage

4. **Nala – Spiritual & Soft**
   - Style: Light blur, lavender tones
   - Language: Inspirational, gentle
   - Perfect for: Wellness brands, spiritual businesses, lifestyle coaches

5. **Roko – Street & Badboy**
   - Style: Graffiti, dark contrast, urban
   - Language: Short, direct, aggressive
   - Perfect for: Streetwear, urban brands, edgy content

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **AI Integration**: OpenAI GPT-4 API (ready for integration)
- **Image Generation**: DALL-E API (ready for integration)

## 📋 User Flow

1. **Landing Page**: Introduction and "Get Started" button
2. **Information Gathering**: AI agent collects business details through guided questions
3. **Designer Selection**: User chooses from 5 AI designer characters
4. **Collaborative Creation**: Interactive chat with selected designer
5. **Content Management**: Review, approve, and download generated content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-social-content-platform
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: First, push your code to a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Add the following environment variables:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
     ```

4. **Deploy**:
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy" and wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Deploy to Other Platforms

#### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Set build command: `yarn build`
4. Set publish directory: `.next`
5. Add environment variables

#### Railway
1. Push to GitHub
2. Connect repository to Railway
3. Railway will auto-detect Next.js
4. Add environment variables in Railway dashboard

#### DigitalOcean App Platform
1. Push to GitHub
2. Create new app in DigitalOcean
3. Connect your repository
4. Set build command: `yarn build`
5. Add environment variables

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page with flow management
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── BriefCollection.tsx
│   ├── DesignerSelection.tsx
│   ├── AIChat.tsx
│   └── ContentManagement.tsx
├── lib/                  # Utility functions and configurations
│   ├── utils.ts          # General utilities
│   └── designer-characters.ts
├── store/                # State management
│   └── use-session-store.ts
├── types/                # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets
```

## 🎨 Design System

The platform uses a comprehensive design system with:

- **Color Palette**: Primary blues, secondary purples, and neutral grays
- **Typography**: Inter font family for clean, modern appearance
- **Components**: Consistent button styles, cards, and form elements
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

## 🔧 Configuration

### Designer Characters
Each AI designer has a unique prompt template that can be customized in `lib/designer-characters.ts`. The prompts include:
- Style guidelines
- Language preferences
- Content creation approach
- Brand voice alignment

### Content Brief Questions
The information gathering process can be modified in `components/BriefCollection.tsx` to include additional questions or change the flow.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔮 Future Enhancements

### V2 Features
- **Content Calendar**: Schedule and plan content in advance
- **Social Media Integration**: Direct posting to Instagram, Facebook, Twitter
- **User Accounts**: Persistent user profiles and content history
- **Analytics Dashboard**: Track content performance
- **Team Collaboration**: Multiple users per account
- **Custom Designer Creation**: Build your own AI designer
- **Bulk Content Generation**: Create multiple pieces at once
- **A/B Testing**: Test different content variations

### AI Enhancements
- **Image Generation**: Integrate DALL-E or Midjourney for visual content
- **Voice Cloning**: Generate audio content
- **Video Generation**: Create short-form video content
- **Multi-language Support**: Generate content in multiple languages
- **Trend Analysis**: Incorporate current social media trends

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@aisocialcontent.com or create an issue in the repository.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

Built with ❤️ for creators and businesses who want to leverage AI for better social media content. **Live Demo**: https://ai-social-content-creator.vercel.app/
# Updated for Vercel deployment
