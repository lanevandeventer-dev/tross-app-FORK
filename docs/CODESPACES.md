# GitHub Codespaces Guide

Zero-setup cloud development environment for TrossApp collaborators.

---

## What is Codespaces?

**GitHub Codespaces** = VS Code running in the browser with:
- ✅ Node.js, Flutter, PostgreSQL pre-installed
- ✅ All dependencies auto-installed
- ✅ No local setup needed
- ✅ Works from any computer (even Chromebook)

**Perfect for collaborators who:**
- Don't have Node/Flutter installed locally
- Don't want to install PostgreSQL
- Want to test quickly without setup
- Work from multiple machines

---

## Quick Start (2 minutes)

### 1. Open in Codespace

**From your fork:**
1. Go to your fork: `https://github.com/YOUR-USERNAME/tross-app`
2. Click green "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on main"

**Wait ~2 minutes** for environment to build.

### 2. Environment Auto-Configures

Codespace automatically:
- ✅ Installs Node.js 20
- ✅ Installs Flutter SDK
- ✅ Runs `npm install` (root + backend + frontend)
- ✅ Sets up VS Code extensions
- ✅ Forwards ports (3001, 8080)

You'll see this in terminal:
```
Running postCreateCommand...
npm install
cd backend && npm install
cd frontend && flutter pub get
✅ Environment ready!
```

### 3. Start Development

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

**Access app:**
- Frontend: Click "Open in Browser" when port 8080 forwards
- Backend: https://YOUR-CODESPACE-3001.github.dev

---

## Running Tests

**All tests:**
```bash
npm test
```

**Backend only:**
```bash
cd backend
npm test
```

**Frontend only:**
```bash
cd frontend
flutter test
```

**E2E (requires backend running):**
```bash
npx playwright test
```

---

## Making Changes

### 1. Create Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

Edit files in VS Code (in browser).

### 3. Run Tests

```bash
npm test  # Must pass!
```

### 4. Commit

```bash
git add .
git commit -m "Add my feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/my-feature
```

### 6. Create PR

1. Go to GitHub (your fork)
2. Click "Compare & pull request"
3. Submit PR to `losamgmt/tross-app:main`

---

## Features

### VS Code Extensions (Pre-installed)

- **ESLint** - Code quality checks
- **Prettier** - Auto-formatting
- **Flutter/Dart** - Flutter development
- **GitHub Copilot** - AI code assistance (if you have it)
- **Docker** - Container management

### Port Forwarding (Automatic)

- **3001** - Backend API (labeled, notifies when ready)
- **8080** - Frontend (labeled, auto-opens in browser)
- **5432** - PostgreSQL (hidden, used internally)

### Auto-formatting

- Saves = auto-formats (Prettier + Dart formatter)
- ESLint errors shown inline
- No manual formatting needed

---

## Cost

**Free tier:**
- 60 hours/month for free
- 2-core, 8GB RAM machine
- More than enough for hobby development

**Usage:**
- Development: ~2-4 hours/week = 16 hours/month
- Well within free tier ✅

---

## Tips & Tricks

### Stopping Codespace (Save Money)

**When done working:**
1. Click "Codespaces" in bottom-left
2. Click "Stop Current Codespace"

**Auto-stops after 30 min idle** (default).

### Reconnecting

1. Go to https://github.com/codespaces
2. Click your codespace to resume
3. Resumes exactly where you left off

### Multiple Terminals

**Split terminal:**
- Click "+" to add terminal
- Or Ctrl+Shift+5 (split)

**Recommended layout:**
```
Terminal 1: npm run dev:backend
Terminal 2: npm run dev:frontend  
Terminal 3: git commands
```

### Secrets Management

**Don't commit:**
- `.env` files
- Auth0 credentials
- Database passwords

**Use Codespace secrets** (for testing):
1. GitHub → Settings → Codespaces → Secrets
2. Add `AUTH0_DOMAIN`, etc.
3. Available in codespace environment

---

## Troubleshooting

### "Port already in use"

```bash
# Kill processes on port
npm run kill-port 3001
npm run kill-port 8080
```

### "Flutter command not found"

Wait for `postCreateCommand` to finish:
```bash
# Check status
flutter doctor

# If missing, install manually
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:`pwd`/flutter/bin"
```

### "Database connection failed"

Codespaces doesn't include PostgreSQL by default.

**For local testing:**
```bash
# Use test DB (in-memory)
NODE_ENV=test npm run dev:backend
```

**For full PostgreSQL:**
Add Docker Compose feature to `.devcontainer/devcontainer.json` (ask maintainer).

### "Can't access localhost URLs"

Use Codespace forwarded URLs instead:
- ❌ `http://localhost:3001`
- ✅ `https://YOURCODESPACE-3001.github.dev`

---

## Limitations

**What Codespaces CAN'T do:**
- ❌ Run full E2E tests (Playwright needs display server)
- ❌ Access production databases (security)
- ❌ Deploy to production (maintainer-only)

**What it CAN do:**
- ✅ Backend unit tests
- ✅ Backend integration tests
- ✅ Frontend widget tests
- ✅ Code, commit, push
- ✅ Create PRs
- ✅ Test locally

---

## Alternative: Local Development

**If you prefer local:**

See [DEVELOPMENT.md](../DEVELOPMENT.md) for:
- Installing Node.js 20
- Installing Flutter SDK
- Installing PostgreSQL
- Running locally

**Local is better if:**
- You develop regularly
- You want E2E testing
- You have fast internet (for Codespaces)

**Codespaces is better if:**
- You contribute occasionally
- You don't want to install tools
- You work from multiple machines
- You want zero configuration

---

## Next Steps

1. ✅ Create your first codespace (2 min)
2. ✅ Run tests to verify setup
3. ✅ Make a test change
4. ✅ Submit your first PR!

**Need help?** Ask maintainer or check [DEVELOPMENT.md](../DEVELOPMENT.md).
