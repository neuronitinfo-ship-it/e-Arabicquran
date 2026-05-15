# Netlify Deployment Guide — e-Arabicquran

## Prerequisites
- Netlify account (sign up at https://app.netlify.com)
- GitHub/GitLab/Bitbucket repository with this project
- Supabase project (for authentication & progress sync)
- Node.js 18+ installed locally (npm comes with Node.js)

## Deployment Steps

### 1. Connect Repository to Netlify
1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select your Git provider (GitHub/GitLab/Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the repository containing e-Arabicquran
6. Click **"Deploy site"**

### 2. Configure Build Settings
Netlify will auto-detect the `netlify.toml` configuration. Verify:
- **Build command**: `npm install && npm run build`
- **Publish directory**: `.output/public`
- **Node version**: 18+ (recommended: 20 LTS)

### 3. Set Environment Variables
In Netlify Dashboard:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variables"** (or use Netlify CLI)
3. Add the following variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-from-supabase
VITE_APP_ENV=production
```

**Get Supabase keys:**
- Visit your Supabase project dashboard
- Go to **Settings** → **API**
- Copy `Project URL` and `anon (public)` key

### 4. Configure Supabase CORS
Add your Netlify deployment URL to Supabase CORS:
1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your Netlify site URL under **Redirect URLs**
   - Example: `https://e-arabicquran.netlify.app/login`

### 5. Deploy
Once environment variables are set, Netlify will:
1. Build the project using `bun install && bun run build`
2. Generate output to `.output/public`
3. Deploy to CDN globally
4. Configure service worker for offline support

## Deployment Using Netlify CLI (Alternative)

```bash
# Install Node.js from https://nodejs.org/ (v18 or later)
node --version

# Install dependencies locally
npm install

# Build the project
npm run build

# Deploy with Netlify CLI
netlify deploy --prod
```

## Post-Deployment Checks

### 1. Test Routes
- [ ] Home page loads: `https://your-site.netlify.app/`
- [ ] Alphabet page: `https://your-site.netlify.app/alphabet`
- [ ] Quran page: `https://your-site.netlify.app/quran`
- [ ] Quiz page: `https://your-site.netlify.app/quiz`
- [ ] Progress page: `https://your-site.netlify.app/progress`

### 2. Test Authentication
- [ ] Login works with email
- [ ] Progress saves across sessions
- [ ] User data syncs with Supabase

### 3. Test PWA Features
- [ ] Service worker installs
- [ ] Offline functionality works
- [ ] App can be installed to home screen
- [ ] Audio downloads & plays offline

### 4. Performance
- [ ] Check Lighthouse score: `https://your-site.netlify.app/`
- [ ] Monitor Core Web Vitals in Netlify Analytics

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous public key |
| `VITE_APP_ENV` | No | Environment mode (production/development) |
| `VITE_LOVABLE_CLIENT_ID` | No | Lovable cloud auth client ID (if using OAuth) |

## Troubleshooting

### Build Fails: "command not found"
- Ensure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Routes Return 404
- Verify `netlify.toml` contains the SPA redirect rule
- Confirm `.output/public/index.html` exists locally

### Service Worker Not Working
- Check browser DevTools → Application → Service Workers
- Verify `/sw.js` is being served with correct cache headers
- Netlify should cache for 0 seconds (must-revalidate)

### Supabase Auth Fails
- Verify CORS is configured in Supabase dashboard
- Confirm environment variables are set in Netlify
- Check browser console for auth errors

### Offline Mode Not Working
- Service Worker must be installed first
- Check that assets are cached locally
- Test in offline mode via DevTools

## Custom Domain (Optional)

1. In Netlify Dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `arabicquran.engineerstechbd.com`)
4. Follow DNS configuration instructions
5. Update Supabase CORS with new domain URL

## Continuous Deployment

Every push to your main branch will trigger a new build and deploy automatically.

To disable auto-deploy:
- Go to **Site settings** → **Build & deploy** → **Deploy contexts**
- Configure which branches trigger deployments

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **TanStack Start**: https://tanstack.com/start/latest
- **Supabase Docs**: https://supabase.com/docs
- **PWA Guide**: https://web.dev/progressive-web-apps/
