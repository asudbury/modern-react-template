# Quick Start Guide for Forks

This guide helps you quickly set up this template for your own use, with clear instructions on which features to enable or disable.

## 🚀 Minimal Setup (Recommended for Forks)

Get started quickly with just the core features:

### 1. Clone and Install

```bash
git clone <your-fork-url>
cd modern-react-template
npm install
```

### 2. Start Development

```bash
npm run dev
```

That's it! You now have a working React app with:
- ✅ React 19 + Vite 7 + TypeScript 5
- ✅ Tailwind CSS with design tokens
- ✅ TanStack Query for data fetching
- ✅ ESLint + Prettier
- ✅ Vitest unit tests
- ✅ Playwright E2E tests
- ✅ Husky pre-commit hooks
- ✅ Accessibility-first approach

### 3. Disable Optional Features (For Forks)

If you forked this repository, you should **disable** the following optional features unless you specifically want to use them:

#### Disable SonarCloud
The SonarCloud workflow will automatically be skipped if you don't configure it. No action needed!

**Optional:** To completely disable the workflow, you can either:
- Delete `.github/workflows/sonarcloud.yml`
- Or keep it (it won't run without configuration)

#### Disable GitHub Pages
If you don't want to deploy to GitHub Pages:

**Option 1: Don't configure it** (Recommended)
- The workflow will not run unless you set `ENABLE_GH_PAGES=true` in repository variables
- No action needed!

**Option 2: Delete the workflow**
```bash
rm .github/workflows/pages.yml
```

#### Disable Storybook in CI
If you don't want Storybook built in CI:
- Don't set the `ENABLE_STORYBOOK_BUILD` repository variable
- The CI workflow will skip Storybook builds automatically

You can still run Storybook locally:
```bash
npm run storybook
```

---

## 🎯 Full Setup (Enable All Features)

Want to use all the advanced features? Here's how to enable them:

### 1. Enable SonarCloud

SonarCloud provides code quality and security analysis.

**Steps:**
1. Sign up at [sonarcloud.io](https://sonarcloud.io)
2. Import your repository
3. Go to GitHub repository Settings → Secrets and variables → Actions → Variables
4. Add these variables:
   - `RUN_SONARCLOUD` = `true`
   - `SONAR_ORGANIZATION` = `your-org-name`
   - `SONAR_PROJECT_KEY` = `your-project-key`
5. Add secret: `SONAR_TOKEN` = `your-sonar-token`

**Remove SonarCloud badges from README** (if you don't use it):
```bash
# Edit README.md and remove lines 2-6 (SonarCloud badges)
```

### 2. Enable GitHub Pages

Deploy your app, Storybook, and documentation to GitHub Pages.

**Steps:**
1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Go to Settings → Secrets and variables → Actions → Variables
4. Add these variables:
   - `ENABLE_GH_PAGES` = `true`
   - `ENABLE_STORYBOOK_BUILD` = `true` (optional, for Storybook on Pages)
   - `ENABLE_JSDOC_BUILD` = `true` (optional, for API docs on Pages)
5. Push to `main` branch to trigger deployment

**Access your sites:**
- Landing: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- App: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/app/`
- Storybook: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/storybook/` (if enabled)
- Docs: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/docs/` (if enabled)

**Note:** Update the base path in workflows if your repo name is different:
- Edit `.github/workflows/pages.yml`
- Change `VITE_BASE_PATH` and `STORYBOOK_BASE_PATH` to match your repo name

### 3. Enable Storybook in CI

**Steps:**
1. Go to Settings → Secrets and variables → Actions → Variables
2. Add: `ENABLE_STORYBOOK_BUILD` = `true`
3. Push to trigger CI build

This builds Storybook in the CI pipeline for verification.

### 4. Enable JSDoc/TypeDoc Documentation

**Steps:**
1. Go to Settings → Secrets and variables → Actions → Variables
2. Add: `ENABLE_JSDOC_BUILD` = `true`
3. Push to trigger documentation generation

This generates API documentation from your JSDoc comments.

---

## 🔧 Configuration Reference

### Environment Variables (.env)

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

**Required for development:**
```env
VITE_API_URL=https://api.example.com
```

**Optional features:**
```env
# Enable GitHub Pages artifacts locally
ENABLE_GH_PAGES=false

# Enable Storybook builds locally
ENABLE_STORYBOOK_BUILD=false

# Enable JSDoc builds locally
ENABLE_JSDOC_BUILD=false

# SonarCloud (used by CI, not local dev)
RUN_SONARCLOUD=false
```

### GitHub Actions Variables

Set these in: **Settings → Secrets and variables → Actions → Variables**

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_GH_PAGES` | `false` | Enable GitHub Pages deployment |
| `ENABLE_STORYBOOK_BUILD` | `false` | Build Storybook in CI and Pages |
| `ENABLE_JSDOC_BUILD` | `false` | Generate JSDoc documentation |
| `RUN_SONARCLOUD` | `false` | Enable SonarCloud analysis |
| `SONAR_ORGANIZATION` | - | Your SonarCloud organization |
| `SONAR_PROJECT_KEY` | - | Your SonarCloud project key |

### GitHub Actions Secrets

Set these in: **Settings → Secrets and variables → Actions → Secrets**

| Secret | Required For | Description |
|--------|-------------|-------------|
| `SONAR_TOKEN` | SonarCloud | Token from SonarCloud account |

---

## 📊 Feature Decision Matrix

Choose which features to enable based on your needs:

| Feature | Enable If You... | Skip If You... |
|---------|-----------------|----------------|
| **SonarCloud** | Want automated code quality checks | Don't need code analysis or don't want to sign up |
| **GitHub Pages** | Want to deploy a live demo | Don't need public hosting |
| **Storybook in CI** | Want component library verification | Only use Storybook locally |
| **JSDoc/TypeDoc** | Want published API documentation | Only need docs locally or in IDE |

### Recommended Setups

**Personal Project (Minimal):**
- ✅ Core development features
- ❌ SonarCloud
- ❌ GitHub Pages
- ❌ CI Storybook
- ❌ CI JSDoc

**Open Source Project:**
- ✅ Core development features
- ✅ SonarCloud
- ✅ GitHub Pages (for demo)
- ✅ CI Storybook
- ✅ CI JSDoc

**Company/Team Project:**
- ✅ Core development features
- ✅ SonarCloud
- ⚠️ GitHub Pages (if public demo needed)
- ✅ CI Storybook
- ⚠️ CI JSDoc (if needed)

---

## 🐛 Troubleshooting

### SonarCloud workflow fails
**Solution:** Either configure SonarCloud properly or set `RUN_SONARCLOUD=false` in repository variables.

### GitHub Pages workflow doesn't run
**Expected:** The workflow only runs if `ENABLE_GH_PAGES=true` is set in repository variables.

### Storybook not building in CI
**Expected:** The Storybook build is skipped unless `ENABLE_STORYBOOK_BUILD=true` is set in repository variables.

### Pre-commit hooks are slow
**Solution:** Pre-commit runs tests. To skip tests temporarily:
```bash
git commit --no-verify -m "your message"
```

Or disable in `.husky/pre-commit` by commenting out `npm run test`.

### Commitlint rejects my commit message
**Solution:** Use Conventional Commits format:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update readme"
```

Temporary skip (development only):
```bash
SKIP_COMMITLINT=true git commit -m "message"
```

---

## 📚 Next Steps

1. ✅ Complete this quick start
2. 📖 Read [SETUP.md](./SETUP.md) for detailed feature documentation
3. 🤝 Read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
4. 🔒 Read [SECURITY.md](./SECURITY.md) for security best practices
5. 💻 Start building your app!

---

## 💡 Tips

- **Start minimal**: Only enable features you actually need
- **Enable gradually**: Add features as your project grows
- **Local first**: Test features locally before enabling in CI
- **Fork friendly**: All optional features default to OFF
- **Documentation**: Keep your `.env` and workflow variables documented

---

## 🆘 Need Help?

- Check [SETUP.md](./SETUP.md) for detailed setup instructions
- Review [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- See [EXTENSIONS.md](./EXTENSIONS.md) for adding features like error logging, authentication, and cloud deployments
- Open an issue if you find problems
- Read the [Copilot Instructions](.github/copilot-instructions.md) for coding standards

---

Made with ❤️ using React 19, Vite 7, and TypeScript 5
