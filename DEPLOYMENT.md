# 🚀 Deployment Guide - AI Social Media Content Creator

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- OpenAI API key
- Vercel account (free)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `ai-social-content-creator`
   - Make it public or private
   - Don't initialize with README (we already have one)

2. **Connect your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-social-content-creator.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variables:
   ```
   Name: OPENAI_API_KEY
   Value: sk-your-openai-api-key-here
   Environment: Production, Preview, Development
   ```
   ```
   Name: NEXT_PUBLIC_APP_URL
   Value: https://your-project-name.vercel.app
   Environment: Production, Preview, Development
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

## Alternative Deployment Options

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"

3. **Configure Build Settings**
   - Build command: `yarn build`
   - Publish directory: `.next`
   - Add environment variables in Netlify dashboard

### Deploy to Railway

1. **Push to GitHub** (same as above)

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure Environment Variables**
   - Add `OPENAI_API_KEY` and `NEXT_PUBLIC_APP_URL` in Railway dashboard

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `NEXT_PUBLIC_APP_URL` | Your app's URL | `https://your-app.vercel.app` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |

## Post-Deployment Checklist

- [ ] Test the landing page loads correctly
- [ ] Test the brief collection form
- [ ] Test designer selection
- [ ] Test AI chat functionality (requires API key)
- [ ] Test content generation (requires API key)
- [ ] Test image generation (requires API key)
- [ ] Test all navigation between sections
- [ ] Test responsive design on mobile
- [ ] Verify environment variables are set correctly

## Troubleshooting

### Build Errors

**Error: "OpenAI API key is not configured"**
- Make sure `OPENAI_API_KEY` is set in your environment variables
- Check that the variable name is exactly correct (case-sensitive)

**Error: "Module not found"**
- Run `yarn install` locally to ensure all dependencies are installed
- Check that `yarn.lock` is committed to your repository

### Runtime Errors

**Error: "Failed to fetch"**
- Check that your API routes are working
- Verify the `NEXT_PUBLIC_APP_URL` is set correctly
- Check browser console for CORS errors

**Error: "OpenAI API error"**
- Verify your OpenAI API key is valid
- Check your OpenAI account has sufficient credits
- Ensure the API key has the correct permissions

## Performance Optimization

### Vercel Settings

- **Function Timeout**: 30 seconds (default)
- **Memory**: 1024 MB (default)
- **Region**: Auto (or choose closest to your users)

### Image Optimization

- Images are automatically optimized by Next.js
- DALL-E images are cached by Vercel
- Consider using a CDN for better performance

## Security Considerations

- Never commit your API keys to the repository
- Use environment variables for all sensitive data
- Enable Vercel's security headers
- Consider rate limiting for API routes
- Monitor API usage to prevent abuse

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your project settings
- Monitor page views, performance, and errors

### OpenAI Usage
- Monitor your OpenAI API usage in the OpenAI dashboard
- Set up billing alerts to avoid unexpected charges

## Support

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [Vercel documentation](https://vercel.com/docs)
3. Check the [OpenAI API documentation](https://platform.openai.com/docs)
4. Review the browser console for errors
5. Check the Vercel function logs

## Updates and Maintenance

### Updating Dependencies
```bash
yarn upgrade
git add .
git commit -m "Update dependencies"
git push origin main
```

### Adding New Features
1. Develop locally with `yarn dev`
2. Test thoroughly
3. Push to GitHub
4. Vercel will automatically redeploy

---

🎉 **Congratulations!** Your AI Social Media Content Creator is now live and ready to help users create amazing content! 