# Deployment Guide

Learn how to deploy your Batman-powered R3F applications to production.

## 🚀 Production Build Process

### 1. Prepare for Production

```bash
# Clean and fresh install
npm run fresh

# Run compatibility check
npm run check-compatibility

# Run all tests
npm run test
```

### 2. Build for Production

```bash
# Standard build
npm run build

# Or use Batman Ultimate for complete workflow
npm run batman:ultimate
```

### 3. Verify Build

```bash
# Preview the built application
cd projects/R3f-StarterKit
npm run preview
```

## 🌐 Deployment Platforms

### Vercel Deployment

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   cd projects/R3f-StarterKit
   vercel --prod
   ```

### Netlify Deployment

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `projects/R3f-StarterKit/dist`

2. **Deploy:**

   ```bash
   # Via Netlify CLI
   npm i -g netlify-cli
   cd projects/R3f-StarterKit
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages

1. **Create deployment workflow:**

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: "20"
             cache: "npm"
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./projects/R3f-StarterKit/dist
   ```

### Docker Deployment

1. **Create Dockerfile:**

   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/projects/R3f-StarterKit/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run:**

   ```bash
   docker build -t r3f-batman-app .
   docker run -p 80:80 r3f-batman-app
   ```

## 🏗️ Build Optimization

### Bundle Analysis

```bash
# Analyze bundle size
cd projects/R3f-StarterKit
npm run build
npx vite-bundle-analyzer dist
```

### Performance Tips

1. **Three.js Optimization:**
   - Use tree-shaking for Three.js imports
   - Implement code splitting for large scenes
   - Optimize textures and models

2. **React Three Fiber:**
   - Use `suspense` for loading states
   - Implement proper cleanup in `useEffect`
   - Leverage `useMemo` for expensive computations

3. **Asset Management:**
   - Compress textures and models
   - Use appropriate image formats (WebP, AVIF)
   - Implement progressive loading

## 🔒 Environment Variables

### Production Configuration

Create `.env.production`:

```bash
VITE_APP_TITLE=R3F Batman Production
VITE_API_URL=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
```

### Security Best Practices

- Never expose sensitive keys in frontend code
- Use environment-specific configurations
- Implement proper CORS settings
- Enable HTTPS in production

## 📊 Monitoring & Analytics

### Performance Monitoring

```javascript
// Add to your R3F app
import { Perf } from "r3f-perf";

function App() {
  return (
    <>
      {process.env.NODE_ENV === "development" && <Perf />}
      {/* Your R3F content */}
    </>
  );
}
```

### Error Tracking

Consider integrating error tracking services:

- Sentry for error monitoring
- LogRocket for session replay
- Google Analytics for usage tracking

## 🚨 Deployment Checklist

### Pre-deployment

- [ ] All tests passing
- [ ] Build completes successfully
- [ ] No console errors in production build
- [ ] Assets optimized and compressed
- [ ] Environment variables configured
- [ ] Security headers configured

### Post-deployment

- [ ] Performance metrics baseline established
- [ ] Error monitoring active
- [ ] Analytics tracking functional
- [ ] CDN caching optimized
- [ ] Mobile performance verified

## 🔧 Troubleshooting

### Common Deployment Issues

1. **Build Failures:**

   ```bash
   # Clear cache and rebuild
   npm run build:clean
   ```

2. **Asset Loading Issues:**
   - Check base URL configuration
   - Verify asset paths in production
   - Test with production build locally

3. **Performance Issues:**
   - Enable gzip compression
   - Implement lazy loading
   - Optimize Three.js scenes

4. **Environment Issues:**
   - Verify environment variables
   - Check production vs development configs
   - Test in production-like environment

### Batman Deployment Automation

For automated deployments, use Ultimate Batman:

```bash
# Complete deployment workflow
npm run batman:ultimate
```

This includes:

- Pre-deployment checks
- Production build
- Quality assurance
- Deployment preparation

## 📱 Mobile Considerations

### Responsive Design

- Test on various screen sizes
- Optimize for touch interactions
- Consider device performance limitations

### Performance on Mobile

- Reduce polygon counts for mobile
- Implement level-of-detail (LOD)
- Use texture compression

Ready to deploy your Batman-powered R3F application? Follow this guide and your app will be ready for production! 🦇
