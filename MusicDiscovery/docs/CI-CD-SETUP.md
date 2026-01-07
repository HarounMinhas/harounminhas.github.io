# MusicDiscovery CI/CD Setup

This document explains the automated deployment pipeline for MusicDiscovery.

## Overview

We have **two separate deployment workflows**:

1. **GitHub Pages** (Frontend) - Deploys the React web app
2. **Render** (Backend API) - Deploys the Express API server

## GitHub Actions Workflows

### 1. Main Deployment Workflow
**File**: `.github/workflows/deploy.yml`

**Triggers**: Every push to `main` branch

**What it does**:
- Builds all portfolio projects (Marieke, Phase10, ColorHunt, etc.)
- Builds MusicDiscovery web app
- Deploys everything to GitHub Pages

### 2. MusicDiscovery API Deployment
**File**: `.github/workflows/deploy-musicdiscovery-api.yml`

**Triggers**: 
- Push to `main` with changes in `MusicDiscovery/` folder
- Manual trigger via `workflow_dispatch`

**What it does**:
1. Checks out code
2. Installs dependencies with pnpm
3. Builds the API with TypeScript
4. Runs tests
5. Triggers Render deployment via API

### 3. Pull Request Checks
**File**: `.github/workflows/musicdiscovery-pr-check.yml`

**Triggers**: Pull requests that modify `MusicDiscovery/` folder

**What it does**:
1. Type checks all packages
2. Builds API and Web
3. Runs all tests
4. Comments on PR with build status

## Setting Up Render Auto-Deployment

### Step 1: Get Your Render API Key

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click your profile → **Account Settings**
3. Scroll to **API Keys** section
4. Click **Create API Key**
5. Give it a name like "GitHub Actions - MusicDiscovery"
6. Copy the API key (you won't see it again!)

### Step 2: Get Your Render Service ID

1. Go to your Render service page
2. The URL will look like: `https://dashboard.render.com/web/srv-XXXXXXXXXXXXX`
3. Copy the `srv-XXXXXXXXXXXXX` part - this is your Service ID

### Step 3: Add GitHub Secrets

1. Go to your GitHub repo: [https://github.com/HarounMinhas/harounminhas.github.io](https://github.com/HarounMinhas/harounminhas.github.io)
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:

   **Secret 1:**
   - Name: `RENDER_API_KEY`
   - Value: Your API key from Step 1

   **Secret 2:**
   - Name: `RENDER_SERVICE_ID`
   - Value: Your service ID from Step 2 (e.g., `srv-xxxxx`)

### Step 4: Test the Workflow

#### Option A: Make a change
```bash
cd MusicDiscovery
# Make any change to a file
echo "# Test" >> README.md
git add .
git commit -m "test: trigger CI/CD"
git push origin main
```

#### Option B: Manual trigger
1. Go to **Actions** tab in GitHub
2. Click **Deploy MusicDiscovery API to Render**
3. Click **Run workflow** → **Run workflow**

## How It Works

### Deployment Flow

```
┌─────────────────┐
│  Push to main   │
│  (MusicDiscovery│
│     changes)    │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ GitHub Actions  │
│   - Install     │
│   - Build       │
│   - Test        │
└────────┬────────┘
         │
         v
    ✅ Success?
         │
         v
┌─────────────────┐
│  Render API     │
│  Trigger Deploy │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Render rebuilds │
│  and deploys    │
│    your API     │
└─────────────────┘
```

### Path-Based Triggering

The workflow only runs when files in these paths change:
- `MusicDiscovery/**` - Any file in MusicDiscovery folder
- `.github/workflows/deploy-musicdiscovery-api.yml` - The workflow itself

This means:
- ✅ Changes to `MusicDiscovery/apps/api/src/index.ts` → **Triggers deployment**
- ✅ Changes to `MusicDiscovery/packages/shared/src/types.ts` → **Triggers deployment**
- ❌ Changes to `phase10/src/App.tsx` → **Does NOT trigger**
- ❌ Changes to `README.md` (root) → **Does NOT trigger**

## Monitoring Deployments

### GitHub Actions

1. Go to **Actions** tab in GitHub
2. You'll see all workflow runs
3. Click any run to see detailed logs
4. Green checkmark ✅ = Success
5. Red X ❌ = Failed

### Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click your MusicDiscovery service
3. Go to **Events** tab
4. You'll see deployment history
5. Click any deployment to see logs

## Troubleshooting

### "Render deployment failed"

**Check:**
1. Are the GitHub secrets set correctly?
2. Is the Service ID correct?
3. Is the API key still valid?
4. Check Render dashboard for error logs

**Fix:**
```bash
# Verify secrets are set
gh secret list

# Update API key if needed
gh secret set RENDER_API_KEY

# Update Service ID if needed
gh secret set RENDER_SERVICE_ID
```

### "Build failed in GitHub Actions"

**Check the logs:**
1. Go to Actions tab
2. Click the failed run
3. Expand failed step
4. Read error message

**Common issues:**
- TypeScript errors → Fix in your code
- Dependency errors → Run `pnpm install` locally first
- Test failures → Run `pnpm test` locally first

### "Workflow didn't trigger"

**Possible reasons:**
1. Changes were not in `MusicDiscovery/` folder
2. Branch is not `main`
3. Workflow file has syntax errors

**Check:**
```bash
# Verify branch
git branch --show-current

# Verify changed files
git diff --name-only HEAD~1
```

## Manual Deployment

If automated deployment fails, you can still deploy manually:

### Via Render Dashboard
1. Go to your service page
2. Click **Manual Deploy** → **Deploy latest commit**

### Via Render CLI
```bash
# Install Render CLI
npm install -g @render-ci/cli

# Login
render login

# Deploy
render deploy --service srv-xxxxx
```

## Best Practices

### Before Pushing to Main

1. **Test locally first**
   ```bash
   cd MusicDiscovery
   pnpm install
   pnpm --filter @musicdiscovery/api build
   pnpm test
   ```

2. **Create a PR** (triggers PR checks)
   ```bash
   git checkout -b feature/my-feature
   git push origin feature/my-feature
   # Create PR on GitHub
   ```

3. **Wait for PR checks** before merging

### Deployment Strategy

- **Small changes**: Push directly to `main` (auto-deploys)
- **Big changes**: Use PR → Review → Merge (triggers deployment)
- **Hotfixes**: Push to `main` + monitor Render logs
- **Experimental**: Use separate branch, merge when ready

## Environment Variables

Render automatically injects environment variables. Make sure these are set in Render Dashboard:

- `NODE_ENV=production`
- `PORT=10000` (Render default)
- `DATA_MODE=tokenless`
- Any API keys needed by your app

## Security Notes

- ✅ Never commit API keys to code
- ✅ Always use GitHub Secrets
- ✅ Rotate API keys regularly
- ✅ Use minimal permissions (read-only where possible)
- ❌ Don't share Render API keys publicly
- ❌ Don't hardcode Service IDs in code

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Deploy Hooks](https://render.com/docs/deploy-hooks)
- [Render API Documentation](https://api-docs.render.com/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
