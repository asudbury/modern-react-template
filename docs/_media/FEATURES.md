# Feature Configuration Guide

This document provides a comprehensive overview of how to configure optional features in the Modern React Template.

## 🎯 Quick Reference

| Feature | Default | Enable With | Purpose |
|---------|---------|-------------|---------|
| **SonarCloud** | ❌ Disabled | `RUN_SONARCLOUD=true` | Code quality & security analysis |
| **GitHub Pages** | ❌ Disabled | `ENABLE_GH_PAGES=true` | Deploy demo app publicly |
| **JSDoc in CI** | ❌ Disabled | `ENABLE_JSDOC_BUILD=true` | Generate API documentation in CI |

## 📋 Configuration Matrix

### Setting Repository Variables

All feature flags are set in: **Settings → Secrets and variables → Actions → Variables**

### For Personal/Learning Projects (Minimal Setup)

```
No variables needed! Everything works out of the box.
```

**What you get:**
- ✅ Full local development environment
- ✅ All testing and linting tools
- ✅ Local documentation (`npm run docs`)
- ❌ No CI overhead from optional features

### For Open Source Projects (Full Setup)

```
Variables to set:
├── RUN_SONARCLOUD=true
├── SONAR_ORGANIZATION=your-org
├── SONAR_PROJECT_KEY=your-project
├── ENABLE_GH_PAGES=true
└── ENABLE_JSDOC_BUILD=true

Secrets to set:
└── SONAR_TOKEN=your-token
```

**What you get:**
- ✅ Everything from minimal setup
- ✅ SonarCloud code quality reports
- ✅ Live demo on GitHub Pages
- ✅ Published API documentation

### For Team/Enterprise Projects (Selective Setup)

Choose features based on your needs:

```
# Code quality only
RUN_SONARCLOUD=true
SONAR_ORGANIZATION=your-org
SONAR_PROJECT_KEY=your-project
SONAR_TOKEN=secret

# Or demo deployment only
ENABLE_GH_PAGES=true

# Or component library showcase
ENABLE_GH_PAGES=true
```

## 🔧 Manual Workflow Triggers

All workflows support manual triggering via GitHub Actions UI.

### Trigger SonarCloud Analysis

1. Go to Actions → SonarCloud Analysis
2. Click "Run workflow"
3. Check "Run SonarCloud analysis" if you want to override the default
4. Click "Run workflow"

**Use case:** Run analysis on-demand without setting permanent variables.

### Trigger GitHub Pages Deployment

1. Go to Actions → Deploy to GitHub Pages
2. Click "Run workflow"
3. Optionally check:
   - "Build and deploy API documentation"
4. Click "Run workflow"

**Use case:** Deploy to Pages without enabling it permanently, or test specific features.

## 🔍 Feature Details

### SonarCloud

**Benefits:**
- Automated code quality metrics
- Security vulnerability detection
- Technical debt tracking
- Pull request analysis

**Cost:** Requires sign-up (free for open source)

**Setup time:** 10-15 minutes

**When to enable:**
- Open source projects
- Team projects with code review requirements
- Projects requiring security compliance

**When to skip:**
- Learning projects
- Personal experiments
- Prototypes

### GitHub Pages

**Benefits:**
- Free hosting for demo app
- Automatic deployment on push
- Professional project showcase
- Easy sharing with stakeholders

**Cost:** Free (public repos) or GitHub Pro (private repos)

**Setup time:** 5 minutes

**When to enable:**
- Portfolio projects
- Open source projects
- Projects needing live demos
- Documentation sites

**When to skip:**
- Internal tools
- Projects deployed elsewhere
- Private development

### JSDoc in CI

**Benefits:**
- Generate API documentation
- Deploy to GitHub Pages
- Keep docs in sync with code

**Cost:** Adds ~1-2 minutes to CI time

**Setup time:** 1 minute (just set variable)

**When to enable:**
- Library/SDK projects
- Open source with API documentation needs
- Projects with GitHub Pages

**When to skip:**
- Simple applications
- Limited CI/CD minutes
- Internal projects without external API

## 📝 Step-by-Step Enablement

### Enable SonarCloud

1. **Sign up:** Visit [sonarcloud.io](https://sonarcloud.io) and sign in with GitHub
2. **Import:** Click "+" → "Analyze new project" → Select your repository
3. **Get credentials:**
   - Organization: Found in SonarCloud URL or settings
   - Project Key: Found in project overview
   - Token: Account → Security → Generate Token
4. **Configure GitHub:**
   - Settings → Secrets and variables → Actions → Variables
     - Add `RUN_SONARCLOUD` = `true`
     - Add `SONAR_ORGANIZATION` = your organization
     - Add `SONAR_PROJECT_KEY` = your project key
   - Settings → Secrets and variables → Actions → Secrets
     - Add `SONAR_TOKEN` = your token
5. **Push:** Next push to main will trigger SonarCloud analysis

### Enable GitHub Pages

1. **Enable Pages:**
   - Settings → Pages
   - Source: Select "GitHub Actions"
2. **Configure GitHub:**
   - Settings → Secrets and variables → Actions → Variables
     - Add `ENABLE_GH_PAGES` = `true`
     - (Optional) Add `ENABLE_JSDOC_BUILD` = `true`
3. **Update paths (for forks):**
   - Edit `.github/workflows/pages.yml`
   - Replace `/modern-react-template/` with `/your-repo-name/`
4. **Push:** Next push to main will deploy to Pages

### Enable JSDoc in CI

1. **Configure GitHub:**
   - Settings → Secrets and variables → Actions → Variables
     - Add `ENABLE_JSDOC_BUILD` = `true`
2. **Push:** Next push will generate documentation in CI

## 🚫 Disabling Features

### Temporary Disable

Simply remove or set to `false` the corresponding repository variable.

### Permanent Disable

**Option 1:** Leave disabled (recommended)
- Keep workflows and dependencies
- Easy to re-enable later
- No maintenance needed

**Option 2:** Remove files
```bash
# Remove SonarCloud
rm .github/workflows/sonarcloud.yml
rm sonar-project.properties

# Remove GitHub Pages
rm .github/workflows/pages.yml
rm public/gh-pages-index.html
rm scripts/update-gh-pages-version.cjs

# Remove TypeDoc
rm typedoc.json typedoc.html.json
# Edit package.json to remove docs scripts and typedoc deps
```

## 🤔 FAQ

### Q: Will workflows fail if I don't configure them?

**A:** No! All optional features are designed to be skipped silently when not enabled. Your fork will work perfectly without configuration.

### Q: Can I enable features temporarily?

**A:** Yes! Use the workflow_dispatch manual trigger to test features without setting permanent variables.

### Q: Do I need all features?

**A:** No! Most projects only need the core features. Enable optional features based on your specific needs.

### Q: What if I fork this repo?

**A:** Everything works out of the box! Optional features won't run until you enable them. See [QUICKSTART.md](./QUICKSTART.md) for fork-specific guidance.

### Q: Can I use different values than the original repo?

**A:** Yes! Each fork can configure features independently. Set your own organization, project keys, and repository names.

### Q: How do I know which features are enabled?

**A:** Check Settings → Secrets and variables → Actions → Variables. Only features with `=true` are enabled.

## 💡 Pro Tips

1. **Start minimal:** Only enable features you actively use
2. **Monitor CI time:** Each optional feature adds time; enable strategically
3. **Use manual triggers:** Test Pages deployment manually before enabling automatic deployment
4. **Keep it simple:** The best setup is the one you actually need

---

**Remember:** This template is designed to grow with your project. Start with core features and add optional features as your needs evolve!
