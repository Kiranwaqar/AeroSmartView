# Deploying AeroSmart to Vercel

This guide provides comprehensive instructions for deploying the AeroSmart application to Vercel.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup) (free)
- [GitHub Account](https://github.com/signup) with the repository
- Git installed locally
- Node.js v18+

## 🚀 Option 1: Deploy with GitHub Integration (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: AeroSmart with backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aerosmart-view-main.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New...** → **Project**
3. Click **Import Git Repository**
4. Select your GitHub repository
5. Click **Import**

### Step 3: Configure Project Settings

#### Environment Variables
In the **Environment Variables** section, add:

```bash
# Frontend
VITE_API_URL=https://your-project-backend.vercel.app

# Backend
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
```

#### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build:all`
- **Output Directory**: `dist`
- **Install Command**: `npm run setup`

### Step 4: Deploy

Click **Deploy** button. Vercel will automatically:
- Build your frontend (React + Vite)
- Build your backend (Express)
- Deploy to Vercel's CDN and serverless functions

## 🔧 Option 2: Deploy Using Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
vercel
```

Follow the prompts to:
- Set up and deploy
- Confirm project name
- Override settings if needed

### Step 4: Set Environment Variables

```bash
vercel env add VITE_API_URL
# Enter: https://your-backend-domain

vercel env add PORT
# Enter: 3001

vercel env add NODE_ENV
# Enter: production

vercel env add FRONTEND_URL
# Enter: https://your-project.vercel.app
```

Redeploy to apply environment variables:
```bash
vercel --prod
```

## 📦 Backend Deployment Strategies

### Strategy 1: Vercel Serverless Functions (Recommended)

Create `api/routes/[...route].ts` in root to proxy requests:

```typescript
// api/routes/[...route].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Your routes here
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
```

### Strategy 2: Separate Backend Deployment

Deploy backend separately on:
- **Render**: https://render.com (free tier available)
- **Railway**: https://railway.app
- **Heroku**: https://www.heroku.com (paid)
- **AWS**: https://aws.amazon.com

Then update `VITE_API_URL` in frontend to point to your backend.

## 📱 Frontend-Only Deployment (Simple)

If deployed without backend initially:

```bash
# Build frontend only
npm run build

# Deploy
vercel --prod
```

The app will work with mock data until you connect a backend.

## ✅ Post-Deployment Verification

### 1. Check Frontend Deployment

```bash
curl https://your-project.vercel.app
```

Should return HTML with `<title>AeroSmart - Aircraft Monitoring Dashboard</title>`

### 2. Check Backend Health

```bash
curl https://your-project.vercel.app/api/health
# or if backend deployed separately
curl https://your-backend-api.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-23T...",
  "environment": "production"
}
```

### 3. Test Frontend API Connection

1. Open https://your-project.vercel.app in browser
2. Open DevTools Console
3. Check for any CORS errors
4. Verify API data is loading on dashboard

## 🔒 Security Considerations

### Environment Variables
Never commit `.env.local` or secrets to git:

```bash
# Check .gitignore
cat .gitignore
# Should include: .env*, *.local
```

### CORS Configuration
Update `server/src/index.ts`:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
```

### Rate Limiting (Optional)

Add `express-rate-limit` for production:

```bash
cd server
npm install express-rate-limit
```

### HTTPS

Vercel automatically uses HTTPS for all deployments.

## 🔄 Continuous Deployment

### Automatic Deployments

Any push to `main` branch automatically redeploys:

```bash
# Update code
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically redeploys
# Check deployment status at https://vercel.com/dashboard
```

### Preview Deployments

Pull requests automatically get preview deployments:

```bash
# Create branch for feature
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to create PR
git push origin feature/new-feature

# Comment automatically created with preview URL
```

## 📊 Monitoring & Logs

### View Deployment Logs

```bash
# Using Vercel CLI
vercel logs https://your-project.vercel.app
```

Or check [Vercel Dashboard](https://vercel.com/dashboard) for detailed logs.

### Performance Monitoring

- Check **Analytics** tab on Vercel dashboard
- Use **Web Vitals** for performance metrics
- Monitor error rates and request latencies

## 🐛 Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build:all

# View detailed logs on Vercel
vercel logs --verbose
```

### API Connection Issues

1. Verify `VITE_API_URL` environment variable is set correctly
2. Check CORS is enabled in backend
3. Ensure backend is running/deployed
4. Check browser console for specific error messages

### 404 Errors on Pages

Ensure `vercel.json` is configured:

```json
{
  "buildCommand": "npm run build:all",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Port Already in Use

Vercel automatically manages ports. Local development:

```bash
# Kill existing process
lsof -i :3001
kill -9 <PID>

# Or use different port
PORT=3002 npm run dev:backend
```

## 🚀 Scaling & Performance

### Frontend Optimization
- Vite build automatically optimizes bundles
- Static assets cached at Vercel edge
- Gzip compression enabled

### Backend Optimization
- Use serverless functions for auto-scaling
- Implement caching strategies
- Consider database with connection pooling

### CDN & Edge Caching
Vercel automatically caches at edge locations worldwide.

## 📚 Advanced Configuration

### Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for propagation (5-48 hours)

### Rollback to Previous Deployment

```bash
vercel rollback
```

### Environment-Specific Deployments

```bash
# Staging
vercel --scope your-team staging

# Production
vercel --prod
```

## 💰 Pricing

- **Hobby Plan**: Free (suitable for this project)
- **Pro Plan**: $20/month
- **Enterprise**: Custom

## 📞 Support

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [GitHub Issues](https://github.com/yourrepo/issues)

---

**Next Steps After Deployment:**

1. ✅ Test all dashboard pages
2. ✅ Verify API endpoints are working
3. ✅ Set up custom domain (optional)
4. ✅ Configure monitoring/alerts
5. ✅ Set up database for data persistence
6. ✅ Implement authentication

Congratulations! Your AeroSmart dashboard is now live! 🎉
