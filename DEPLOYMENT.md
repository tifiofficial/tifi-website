# Deployment Guide

## Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin https://github.com/yourusername/tifi-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `tifi-website` repository
4. Vercel will auto-detect:
   - Framework: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
5. Click "Deploy"

### Step 3: Configure Environment Variables

If you're using email services:

1. Go to Project Settings → Environment Variables
2. Add your variables:
   - `RESEND_API_KEY` (if using Resend)
   - Or EmailJS variables if using EmailJS
3. Redeploy for changes to take effect

### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Other Deployment Options

### Netlify

1. Connect your GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Site Settings

### AWS Amplify

1. Connect your repository
2. Amplify auto-detects Next.js
3. Configure build settings if needed
4. Add environment variables

### Self-Hosted (Node.js Server)

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Use PM2 or similar for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "tifi-website" -- start
   ```

4. Configure reverse proxy (nginx/Apache) to point to port 3000

## Pre-Deployment Checklist

- [ ] All images are optimized and in `/public/images/`
- [ ] EPK PDF is in `/public/epk/`
- [ ] Social links updated in `/content/tifi.ts`
- [ ] Contact emails updated
- [ ] Embed URLs are correct
- [ ] Environment variables set (if using email)
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Check Lighthouse scores (target: 90+)

## Post-Deployment

1. Test all pages and links
2. Verify images load correctly
3. Test contact form (if email is configured)
4. Check mobile responsiveness
5. Test smooth scrolling and animations
6. Verify SEO meta tags with [OpenGraph Preview](https://www.opengraph.xyz/)

## Performance Monitoring

- Use Vercel Analytics (built-in)
- Monitor Lighthouse scores
- Check Core Web Vitals
- Optimize images if needed
- Monitor bundle size

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run lint`

**Images not loading?**
- Check file paths are correct
- Ensure images are committed to git
- Verify Next.js image optimization is working

**Environment variables not working?**
- Ensure variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names match code exactly

**Slow performance?**
- Optimize images further
- Check bundle size
- Enable Vercel's Edge Network
- Use Next.js Image Optimization
