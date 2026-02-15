# Ridgeline - Launch Guide

## What You Have
A complete React app ready to deploy. Zero cost. Takes about 15 minutes.

---

## Step 1: Install Tools (one time, 2 min)

Open your Mac terminal and run:

```bash
# Install Node.js (if you don't have it)
# Download from https://nodejs.org - get the LTS version
# Or if you have Homebrew:
brew install node

# Verify it worked
node --version   # should show v18+ or v20+
npm --version    # should show 9+
```

---

## Step 2: Set Up the Project (3 min)

```bash
# Navigate to where you want the project
cd ~/Desktop

# Create the project from the files I gave you
# (copy the ridgeline-app folder to your Desktop first)

cd ridgeline-app

# Install dependencies
npm install

# Test it locally
npm run dev
```

This opens http://localhost:5173 in your browser. You should see Ridgeline running locally. Press Ctrl+C to stop.

---

## Step 3: Push to GitHub (3 min)

```bash
# Go to github.com and create a new repo called "ridgeline"
# (click the + button → New repository → name it "ridgeline" → Create)
# Do NOT check "Initialize with README"

# Back in terminal:
cd ~/Desktop/ridgeline-app
git init
git add .
git commit -m "Ridgeline v5 - initial launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ridgeline.git
git push -u origin main
```

Replace YOUR_USERNAME with your actual GitHub username.

---

## Step 4: Deploy to Vercel (3 min)

### Option A: Vercel Dashboard (easiest)
1. Go to https://vercel.com and sign up with your GitHub account
2. Click "Add New" → "Project"
3. Find your "ridgeline" repo and click "Import"
4. Vercel auto-detects Vite — just click "Deploy"
5. Wait ~60 seconds
6. Your app is live at `ridgeline-XXXXX.vercel.app`

### Option B: Vercel CLI (if you prefer terminal)
```bash
npm install -g vercel
cd ~/Desktop/ridgeline-app
vercel

# Follow prompts:
# - Link to your Vercel account
# - Accept default settings
# - It deploys automatically

# For production:
vercel --prod
```

---

## Step 5: Add to Your Phone Home Screen (1 min)

### iPhone
1. Open your Vercel URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down → "Add to Home Screen"
4. Name it "Ridgeline" → tap Add
5. It now works like a native app

### Android
1. Open your Vercel URL in Chrome
2. Tap the 3-dot menu
3. "Add to Home screen" or "Install app"

---

## Custom Domain (Optional)

If you want ridgeline.app or similar:
1. Buy a domain ($10-15/yr) from Namecheap, Google Domains, or Vercel
2. In Vercel dashboard → your project → Settings → Domains
3. Add your domain and follow the DNS instructions
4. SSL certificate is automatic

---

## Making Changes

After you edit src/App.jsx:

```bash
git add .
git commit -m "description of changes"
git push
```

Vercel auto-deploys on every push. Live in ~30 seconds.

---

## What's Free

- **Vercel hosting**: Free tier = 100GB bandwidth/month (plenty)
- **GitHub**: Free for public or private repos
- **Domain**: Only cost if you want a custom one

---

## Next Steps for the Real MVP

Once you're live and using it, here's the roadmap to make it production-grade:

### Week 1-2: Real Data
- [ ] Connect Open-Meteo API for real weather
- [ ] Connect USGS Water Services API for live river CFS
- [ ] Add more spots (goal: 30-50)

### Week 3-4: Backend
- [ ] Set up Supabase (free) for spot database
- [ ] Move spot data from hardcoded → database
- [ ] Add ability to submit new spots

### Week 5-6: Polish
- [ ] Offline support (service worker)
- [ ] Share via URL
- [ ] Add Mapbox for real interactive maps
- [ ] Test with friends, iterate on feedback

All of these APIs are free tier. Total monthly cost: $0.
