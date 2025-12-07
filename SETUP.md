# Setup Instructions for New Features

This document provides setup instructions for the new features added to the Modern React Template.

## Table of Contents

1. [Storybook](#storybook)
2. [SonarCloud](#sonarcloud)
3. [GitHub Pages](#github-pages)
4. [Documentation Generation](#documentation-generation)

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

### Setup Steps

1. **Sign up for SonarCloud**
   - Visit https://sonarcloud.io/
   - Sign in with your GitHub account
   - Grant SonarCloud access to your repositories

2. **Import Your Repository**
   - Click "+" in the top right
   - Select "Analyze new project"
   - Choose your repository from the list

3. **Configure GitHub Integration**
   - Go to your repository settings on GitHub
   - Navigate to Secrets and Variables → Actions
   - Add a new secret named `SONAR_TOKEN`
   - Get the token from SonarCloud (Account → Security → Generate Token)

4. **Update Configuration**
   - Open `sonar-project.properties`
   - Update `sonar.projectKey` with your project key
   - Update `sonar.organization` with your organization key
   - These values can be found in SonarCloud project settings

### Viewing Results
Once configured, SonarCloud will automatically analyze your code on every push and pull request. View results at:
https://sonarcloud.io/dashboard?id=YOUR_PROJECT_KEY

## GitHub Pages

### What is it?
GitHub Pages hosts three sites from this repository:
1. **Demo App** - The built React application
2. **Storybook** - Interactive component library
3. **API Docs** - TypeDoc generated documentation

### Important Configuration Details

**Branch:** The deployment uses the `main` branch only. The workflow is triggered on:
- Every push to `main`
- Manual workflow dispatch (via GitHub Actions UI)

**What Gets Deployed:**
- **App**: Built with `npm run build` and deployed to `/app/` path
- **Storybook**: Built with `npm run build-storybook` and deployed to `/storybook/` path
- **Documentation**: Generated with `npm run docs:html` and deployed to `/docs/` path
- **Landing Page**: Auto-generated index page linking to all three above

**Base Paths:** The Vite and Storybook builds are configured with proper base paths to work correctly under the GitHub Pages subdirectory structure:
- Vite uses the `VITE_BASE_PATH` environment variable
- Storybook uses the `STORYBOOK_BASE_PATH` environment variable
- These are automatically set by the deployment workflow

### Setup Steps

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **First Deployment**
   - Push to the `main` branch
   - The GitHub Pages workflow will run automatically
   - Wait for the workflow to complete (usually 2-3 minutes)

3. **Access Your Sites**
   After deployment, your sites will be available at:
   - Landing Page: `https://YOUR_USERNAME.github.io/modern-react-template/`
   - Demo App: `https://YOUR_USERNAME.github.io/modern-react-template/app/`
   - Storybook: `https://YOUR_USERNAME.github.io/modern-react-template/storybook/`
   - API Docs: `https://YOUR_USERNAME.github.io/modern-react-template/docs/`

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
