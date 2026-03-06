# 🏃 Race Ready — Marathon Outfit Builder

A mobile-first web app for runners to pick and customize their marathon gear on an animated cartoon avatar.

## Deploy to Vercel (step by step)

### Option A: The fastest way (drag & drop)

1. Run the build locally:
   ```bash
   npm install
   npm run build
   ```
2. Go to [vercel.com](https://vercel.com) and sign up / log in (GitHub account works)
3. On your dashboard, drag and drop the **`dist`** folder onto the page
4. Done — Vercel gives you a live URL instantly

---

### Option B: Deploy via GitHub (recommended — auto-deploys on every push)

1. **Push this folder to a GitHub repo:**
   ```bash
   cd race-ready
   git init
   git add .
   git commit -m "Initial commit - Race Ready v1"
   git remote add origin https://github.com/YOUR_USERNAME/race-ready.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"**
   - Select your `race-ready` repo
   - Vercel auto-detects Vite — settings are pre-configured, no changes needed:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click **Deploy**

3. **That's it.** Vercel gives you a URL like `race-ready-xxxx.vercel.app`. Every time you push to `main`, it auto-deploys.

---

### Option C: Deploy via Vercel CLI

1. Install the CLI:
   ```bash
   npm i -g vercel
   ```

2. From this project folder:
   ```bash
   vercel
   ```

3. Follow the prompts (it auto-detects Vite). Your site is live.

---

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Tech stack

- **React 18** + **Vite 6**
- Pure SVG animated avatar (CSS keyframe skeletal animation)
- Zero external UI dependencies
- Mobile-first, works on all screen sizes
