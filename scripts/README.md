# Repository Cleanup Script

## Overview

The `cleanup-repo.cjs` script is an interactive tool that helps users who fork this repository to remove optional features and dependencies, allowing them to customize the template to their specific needs.

## Usage

```bash
npm run cleanup
```

## What It Does

The script will prompt you for each removal action, allowing you to selectively remove:

### Build & Testing Tools
- **Playwright** - E2E testing framework and related files
- **Commitlint** - Commit message linting
- **Knip** - Unused code detection
- **TypeDoc** - API documentation generation

### CI/CD & Quality Tools
- **SonarCloud** - Code quality and security analysis
- **GitHub Pages** - Deployment workflow and configuration
- **CodeQL** - Advanced security scanning workflow

### Components & Features
- **TanStack Query Utilities** - Query/mutation helper functions (`src/queries`)
- **ThemeToggleButton** - Dark/light mode toggle component
- **ErrorFallback** - Custom error boundary UI
- **NotFoundPage** - 404 page component

### Documentation & Assets
- **QUICKSTART.md** - Quick start guide
- **FEATURES.md** - Features documentation
- **AGENTS.md** - Agents documentation
- **README Images** - Hero image and icons
- **Bare-bones README** - Replace with minimal version

### Configuration Files
- **Gitleaks** - Secret scanning configuration and pre-commit hook
- **Example schemas** - Sample API validation schemas
- **Lint-staged** - Pre-commit linting configuration

### Package Management
- **Tidy package.json** - Remove optional npm scripts
- **Rename package** - Update package name

## Interactive Workflow

1. The script displays a welcome message and warning
2. You confirm whether to proceed
3. For each feature, you're asked if you want to remove it
4. The script:
   - Deletes files and directories
   - Updates `package.json` (dependencies, scripts)
   - Provides warnings about manual updates needed
5. After completion, it shows next steps

## Safety Features

- **Confirmation prompts** - Each action requires confirmation
- **Manual update warnings** - Alerts you when code changes are needed
- **Color-coded output** - Easy to read status messages
- **Non-destructive** - Only removes what you explicitly approve

## Example Session

```
╔═══════════════════════════════════════════════════════════╗
║     Modern React Template - Repository Cleanup Tool      ║
╚═══════════════════════════════════════════════════════════╝

Do you want to proceed with the cleanup? (y/n): y

━━━ Playwright E2E Testing ━━━
Remove Playwright and E2E tests? (y/n): y
✓ Removed directory: playwright
✓ Removed file: playwright.config.ts
...
```

## Post-Cleanup Steps

After running the script, you should:

1. **Install dependencies** - Run `npm install` to sync with updated `package.json`
2. **Review changes** - Check `git status` and `git diff` to see what was modified
3. **Update imports** - Fix any broken imports if you removed components
4. **Test application** - Run `npm run dev` to verify everything works
5. **Run tests** - Execute `npm run test` to ensure tests pass
6. **Commit changes** - Commit your customized repository

## Manual Updates Required

Depending on what you remove, you may need to manually update:

- **Component imports** - If you removed ThemeToggle, ErrorFallback, or NotFoundPage
- **Router configuration** - If you removed NotFoundPage from `router.tsx`
- **RootComponent** - If you removed ErrorFallback from `RootComponent.tsx`
- **README badges** - If you removed SonarCloud, remove related badges
- **HomePage** - If you removed ThemeToggleButton from `HomePage.tsx`

## Notes

- The script preserves core dependencies like React, Vite, TypeScript, and TanStack Router
- It's designed to be idempotent - you can run it multiple times
- Always commit your changes before running to enable easy rollback
- The script uses colors for better readability (may vary by terminal)

## Troubleshooting

**Q: The script exits immediately**  
A: Make sure you're running it from the repository root directory

**Q: Some files weren't removed**  
A: Check if the files exist and you have proper permissions

**Q: My app breaks after cleanup**  
A: Review the warnings displayed during cleanup and update imports/references

**Q: I want to undo changes**  
A: Use `git reset --hard` to revert (only if you haven't committed yet)

## Contributing

If you have suggestions for additional items to remove or improvements to the script, please open an issue or pull request.
