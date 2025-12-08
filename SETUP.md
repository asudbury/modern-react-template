# Setup Instructions for Optional Features

This document provides detailed setup instructions for the **optional features** in the Modern React Template.

> 🚀 **New to this template?** See [QUICKSTART.md](./QUICKSTART.md) for a quick setup guide and minimal configuration.

## Important: Features are Opt-In

**All advanced features are disabled by default** to make this template fork-friendly:
- ❌ SonarCloud - Only runs if `RUN_SONARCLOUD=true`
- ❌ GitHub Pages - Only runs if `ENABLE_GH_PAGES=true`
- ❌ Storybook in CI - Only runs if `ENABLE_STORYBOOK_BUILD=true`
- ❌ JSDoc in CI - Only runs if `ENABLE_JSDOC_BUILD=true`

**You only need to configure the features you want to use.**

## Table of Contents

1. [Storybook](#storybook)
2. [SonarCloud](#sonarcloud)
3. [GitHub Pages](#github-pages)
4. [Documentation Generation](#documentation-generation)
5. [For Forks: What to Disable](#for-forks-what-to-disable)

## Storybook

### What is it?
Storybook is an open-source tool for developing UI components in isolation. It provides an interactive environment to browse component library, view different component states, and test accessibility.

### Local Development
```bash
# Start Storybook dev server
npm run storybook
```

Visit http://localhost:6006 to view your component library.

### Adding Stories
When creating a new component, always add a corresponding `.stories.tsx` file:

```tsx
// src/components/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

### Building Storybook
```bash
# Build static Storybook
npm run build-storybook
```

This creates a `storybook-static/` directory that can be deployed anywhere.

## SonarCloud

### What is it?
SonarCloud is a cloud-based code quality and security analysis tool. It automatically scans your code for bugs, vulnerabilities, code smells, and provides quality metrics.

**Status: Optional - Disabled by default**

The SonarCloud workflow (`.github/workflows/sonarcloud.yml`) will **not run** unless you explicitly enable it.

### Do I Need This?

**Enable SonarCloud if:**
- ✅ You want automated code quality analysis
- ✅ You need security vulnerability scanning
- ✅ You're building an open-source or team project
- ✅ You want detailed code metrics and reports

**Skip SonarCloud if:**
- ❌ You don't want to sign up for another service
- ❌ You're just learning or building a personal project
- ❌ You have other code analysis tools
- ❌ You don't need the additional CI complexity

### Setup Steps (Opt-In)

1. **Sign up for SonarCloud**
   - Visit https://sonarcloud.io/
   - Sign in with your GitHub account
   - Grant SonarCloud access to your repositories

2. **Import Your Repository**
   - Click "+" in the top right
   - Select "Analyze new project"
   - Choose your repository from the list

3. **Enable the workflow in GitHub**
   - Go to your repository settings on GitHub
   - Navigate to Secrets and variables → Actions → Variables
   - Add a new variable:
     - Name: `RUN_SONARCLOUD`
     - Value: `true`
   
4. **Configure SonarCloud credentials**
   - Add repository variables:
     - `SONAR_ORGANIZATION` = your organization key
     - `SONAR_PROJECT_KEY` = your project key
   - Add repository secret:
     - `SONAR_TOKEN` = your SonarCloud token (from Account → Security)

### Viewing Results
Once configured, SonarCloud will automatically analyze your code on every push and pull request. View results at:
https://sonarcloud.io/dashboard?id=YOUR_PROJECT_KEY

### Disabling SonarCloud

**Option 1: Don't enable it** (Recommended for forks)
- Simply don't set `RUN_SONARCLOUD=true` in repository variables
- The workflow will be skipped automatically

**Option 2: Delete the workflow**
```bash
rm .github/workflows/sonarcloud.yml
```

**Option 3: Remove SonarCloud badges**
If you don't use SonarCloud, remove the badges from `README.md` (lines 2-6).

## GitHub Pages

### What is it?
GitHub Pages hosts multiple sites from this repository:
1. **Demo App** - The built React application
2. **Storybook** - Interactive component library (optional)
3. **API Docs** - TypeDoc generated documentation (optional)

**Status: Optional - Disabled by default**

The GitHub Pages workflow (`.github/workflows/pages.yml`) will **not run** unless you explicitly enable it.

### Do I Need This?

**Enable GitHub Pages if:**
- ✅ You want to deploy a live demo of your app
- ✅ You want to share your component library publicly
- ✅ You need hosted documentation
- ✅ You're building an open-source project

**Skip GitHub Pages if:**
- ❌ You don't need public hosting
- ❌ You deploy elsewhere (Vercel, Netlify, etc.)
- ❌ You're building a private/internal app
- ❌ You only develop locally

### Important Configuration Details

**Branch:** The deployment uses the `main` branch only. The workflow is triggered on:
- Every push to `main`
- Manual workflow dispatch (via GitHub Actions UI)

**What Gets Deployed:**
- **App**: Built with `npm run build` and deployed to `/app/` path (always)
- **Storybook**: Built with `npm run build-storybook` and deployed to `/storybook/` path (optional)
- **Documentation**: Generated with `npm run docs:html` and deployed to `/docs/` path (optional)
- **Landing Page**: Auto-generated index page linking to enabled features (optional)

**Base Paths:** The Vite and Storybook builds are configured with proper base paths to work correctly under the GitHub Pages subdirectory structure:
- Vite uses the `VITE_BASE_PATH` environment variable
- Storybook uses the `STORYBOOK_BASE_PATH` environment variable
- These are automatically set by the deployment workflow

**Important for Forks:** 
- Update base paths in `.github/workflows/pages.yml` to match your repository name
- Example: Change `/modern-react-template/` to `/your-repo-name/`

### Setup Steps (Opt-In)

1. **Enable the workflow**
   - Go to repository Settings → Secrets and variables → Actions → Variables
   - Add a new variable:
     - Name: `ENABLE_GH_PAGES`
     - Value: `true`

2. **Enable optional features** (optional)
   - To include Storybook: Add variable `ENABLE_STORYBOOK_BUILD=true`
   - To include API docs: Add variable `ENABLE_JSDOC_BUILD=true`

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

4. **Update base paths for your fork** (if repository name differs)
   - Edit `.github/workflows/pages.yml`
   - Replace `/modern-react-template/` with `/your-repo-name/`
   - Update both `VITE_BASE_PATH` and `STORYBOOK_BASE_PATH`

5. **First Deployment**
   - Push to the `main` branch
   - The GitHub Pages workflow will run automatically
   - Wait for the workflow to complete (usually 2-3 minutes)

6. **Access Your Sites**
   After deployment, your sites will be available at:
   - Landing Page: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` (if ENABLE_GH_PAGES=true)
   - Demo App: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/app/`
   - Storybook: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/storybook/` (if ENABLE_STORYBOOK_BUILD=true)
   - API Docs: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/docs/` (if ENABLE_JSDOC_BUILD=true)

### Disabling GitHub Pages

**Option 1: Don't enable it** (Recommended for forks)
- Simply don't set `ENABLE_GH_PAGES=true` in repository variables
- The workflow will not run

**Option 2: Disable in repository settings**
- Go to Settings → Pages
- Select "None" under Source

**Option 3: Delete the workflow**
```bash
rm .github/workflows/pages.yml
```

### Redeployment
The sites automatically redeploy on every push to `main`. No manual action needed.

## Documentation Generation

### What is it?
TypeDoc automatically generates API documentation from your TypeScript code and JSDoc comments.

### Generating Docs Locally

```bash
# Generate both markdown and HTML documentation
npm run docs

# Generate only markdown (committed to repo)
npm run docs:md

# Generate only HTML (for GitHub Pages)
npm run docs:html
```

### Documentation Structure

- **Markdown docs** (`docs/`) - Committed to repository for offline viewing
- **HTML docs** (`docs-html/`) - Generated for GitHub Pages (gitignored)

### Writing Good JSDoc Comments

All exported functions, components, and types should have JSDoc comments:

```tsx
/**
 * ComponentName
 *
 * Brief description of what the component does.
 *
 * Features:
 * - List key features
 * - Accessibility considerations
 *
 * @example
 * ```tsx
 * <ComponentName prop="value">
 *   Content
 * </ComponentName>
 * ```
 */
export function ComponentName() {
  // implementation
}
```

### Updating Documentation

Documentation is automatically regenerated on every GitHub Pages deployment. To update:

1. Improve your JSDoc comments
2. Run `npm run docs:md` to update markdown docs
3. Commit changes to the `docs/` directory
4. Push to `main` branch
5. GitHub Pages will automatically rebuild HTML docs

## For Forks: What to Disable

If you forked this repository, here's what you should know:

### Features Disabled by Default ✅

These features are **already disabled** and won't run unless you enable them:
- ✅ SonarCloud analysis - Requires `RUN_SONARCLOUD=true`
- ✅ GitHub Pages deployment - Requires `ENABLE_GH_PAGES=true`
- ✅ CI Storybook builds - Requires `ENABLE_STORYBOOK_BUILD=true`
- ✅ CI JSDoc builds - Requires `ENABLE_JSDOC_BUILD=true`

**You don't need to do anything to disable these - they're already off!**

### Optional: Clean Up for Your Fork

If you want to completely remove features you won't use:

**Remove SonarCloud:**
```bash
rm .github/workflows/sonarcloud.yml
rm sonar-project.properties
# Edit README.md and remove lines 2-6 (SonarCloud badges)
```

**Remove GitHub Pages:**
```bash
rm .github/workflows/pages.yml
rm -rf public/gh-pages-index.html
rm scripts/update-gh-pages-version.cjs
```

**Remove Storybook:**
```bash
rm -rf .storybook
# Remove from package.json: storybook scripts and dependencies
```

**Remove TypeDoc:**
```bash
rm typedoc.json typedoc.html.json
# Remove from package.json: docs scripts and typedoc dependencies
```

### Recommended Approach

**For most forks:**
1. ✅ Keep all workflows (they won't run unless enabled)
2. ✅ Keep all tooling (useful if you need it later)
3. ✅ Only enable features you actually want to use
4. ✅ Remove SonarCloud badges from README if not using it

**Advantage:** Easy to enable features later without reinstalling dependencies or recreating workflows.

## Troubleshooting

### Storybook won't start
- Clear cache: `rm -rf node_modules/.cache/storybook`
- Reinstall: `rm -rf node_modules && npm install`

### SonarCloud not analyzing
- Check that `SONAR_TOKEN` is set in GitHub repository secrets
- Verify `sonar-project.properties` has correct project key and organization
- Check workflow logs in GitHub Actions

### GitHub Pages not deploying
- Verify GitHub Pages is enabled in repository settings
- Check that workflows have completed successfully in Actions tab
- Ensure repository is public or you have GitHub Pro/Team for private repos

### Documentation not generating
- Check TypeScript compilation: `npm run build`
- Verify all exported items have proper JSDoc comments
- Check for TypeScript errors that might prevent doc generation

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [TypeDoc Documentation](https://typedoc.org/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
