# Repository Cleanup Script

## Overview

The `cleanup-repo.cjs` script is an interactive tool that helps users who fork this repository to remove optional features and dependencies, allowing them to customize the template to their specific needs.

## Usage

```bash
npm run cleanup
```

## Cleanup Modes

The script offers three different modes to suit your workflow:

### 1. Interactive Mode (Default)
Prompts you for each item one-by-one, allowing you to carefully review and decide on each feature removal.

### 2. Batch Select Mode
Shows all available options upfront and lets you select multiple items at once by entering numbers separated by spaces.

**Example:**
```
Select items to remove (enter numbers separated by spaces, or 'all' for everything):
  1. Playwright E2E testing
  2. QUICKSTART.md
  3. Commitlint configuration
  ...
  
Your selection: 1 3 5 8
```

### 3. Remove All Mode
Removes all optional features at once without individual prompts. Asks for confirmation before proceeding.

## What It Does

The script can selectively remove:

### Build & Testing Tools
- **Playwright** - E2E testing framework and related files
- **Commitlint** - Commit message linting
- **Knip** - Unused code detection
- **TypeDoc** - API documentation generation
- **All Test Files** - Remove all unit tests, component tests, and test infrastructure (Vitest, RTL, etc.)

### CI/CD & Quality Tools
- **SonarCloud** - Code quality and security analysis
- **GitHub Pages** - Deployment workflow and configuration
- **CodeQL** - Advanced security scanning workflow

### Components & Features
- **TanStack Query Utilities** - Query/mutation helper functions (`src/queries`)
- **ThemeToggleButton** - Dark/light mode toggle component
- **ErrorFallback** - Custom error boundary UI
- **NotFoundPage** - 404 page component
- **HomePage Content** - Replace with blank/minimal page

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

## Workflow

1. The script displays a welcome message and warning
2. You confirm whether to proceed
3. Select your preferred cleanup mode:
   - **Interactive**: Prompted for each item individually
   - **Batch Select**: Choose multiple items upfront (e.g., `1 3 5` or `all`)
   - **Remove All**: Remove everything with one confirmation
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

## Example Sessions

### Interactive Mode
```
╔═══════════════════════════════════════════════════════════╗
║     Modern React Template - Repository Cleanup Tool      ║
╚═══════════════════════════════════════════════════════════╝

Do you want to proceed with the cleanup? (y/n): y

Select cleanup mode:
  1. Interactive (prompt for each item one-by-one)
  2. Batch Select (choose multiple items at once)
  3. Remove All (remove everything without prompts)
Enter your choice (1-3): 1

━━━ Playwright E2E Testing ━━━
Remove Playwright and E2E tests? (y/n): y
✓ Removed directory: playwright
✓ Removed file: playwright.config.ts
...
```

### Batch Select Mode
```
Select cleanup mode:
  1. Interactive (prompt for each item one-by-one)
  2. Batch Select (choose multiple items at once)
  3. Remove All (remove everything without prompts)
Enter your choice (1-3): 2

Select items to remove (enter numbers separated by spaces, or 'all' for everything):
  1. Playwright E2E testing
  2. QUICKSTART.md
  3. Commitlint configuration
  4. Knip unused code detection
  ...
  
  Example: 1 3 5 or all

Your selection: 1 5 8 12

━━━ Processing 4 selected items ━━━
━━━ Playwright E2E testing ━━━
✓ Removed directory: playwright
...
```

### Remove All Mode
```
Select cleanup mode:
  1. Interactive (prompt for each item one-by-one)
  2. Batch Select (choose multiple items at once)
  3. Remove All (remove everything without prompts)
Enter your choice (1-3): 3

⚠️  WARNING: This will remove ALL optional features!
Are you absolutely sure you want to remove everything? (y/n): y

━━━ Removing all optional features ━━━
✓ Removed directory: playwright
✓ Removed file: QUICKSTART.md
...
```
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
