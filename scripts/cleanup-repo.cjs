#!/usr/bin/env node

/**
 * Interactive script to remove optional features from modern-react-template
 * 
 * This script helps users who fork this repo to remove functionality
 * and get it down to the bare bones if needed.
 * 
 * Usage: npm run cleanup
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');

// Helper to read/write JSON files
function readJsonFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

function writeJsonFile(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// Helper to delete file or directory
function deletePath(filepath) {
  const fullPath = path.join(rootDir, filepath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`${colors.green}✓${colors.reset} Removed directory: ${filepath}`);
    } else {
      fs.unlinkSync(fullPath);
      console.log(`${colors.green}✓${colors.reset} Removed file: ${filepath}`);
    }
    return true;
  }
  return false;
}

// Helper to create readline interface
function createPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

// Helper to ask yes/no question
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset} (y/n): `, (answer) => {
      resolve(answer.toLowerCase().trim() === 'y');
    });
  });
}

// Helper to ask for text input
function askText(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Remove Playwright
async function removePlaywright(rl) {
  console.log(`\n${colors.blue}━━━ Playwright E2E Testing ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove Playwright and E2E tests?')) {
    deletePath('playwright');
    deletePath('playwright.config.ts');
    deletePath('.github/workflows/codeql.yml'); // Includes Playwright
    
    // Update package.json
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.scripts['test:e2e'];
    delete pkg.devDependencies['@playwright/test'];
    delete pkg.devDependencies['playwright'];
    delete pkg.devDependencies['@axe-core/playwright'];
    delete pkg.devDependencies['@vitest/browser-playwright'];
    
    // Update pre script if it exists
    if (pkg.scripts.pre) {
      pkg.scripts.pre = pkg.scripts.pre.replace(/&& npm run test:e2e/g, '');
      pkg.scripts.pre = pkg.scripts.pre.replace(/npm run test:e2e &&/g, '');
      pkg.scripts.pre = pkg.scripts.pre.replace(/npm run test:e2e/g, '');
    }
    
    writeJsonFile(packageJsonPath, pkg);
    return true;
  }
  return false;
}

// Remove QUICKSTART.md
async function removeQuickstart(rl) {
  console.log(`\n${colors.blue}━━━ Quick Start Guide ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove QUICKSTART.md?')) {
    deletePath('QUICKSTART.md');
    return true;
  }
  return false;
}

// Remove commitlint
async function removeCommitlint(rl) {
  console.log(`\n${colors.blue}━━━ Commitlint ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove commitlint configuration and dependencies?')) {
    deletePath('commitlint.config.cjs');
    deletePath('.husky/commit-msg');
    
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.devDependencies['@commitlint/cli'];
    delete pkg.devDependencies['@commitlint/config-conventional'];
    writeJsonFile(packageJsonPath, pkg);
    return true;
  }
  return false;
}

// Remove knip
async function removeKnip(rl) {
  console.log(`\n${colors.blue}━━━ Knip (Unused Code Detection) ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove knip configuration and dependencies?')) {
    deletePath('knip.toml');
    
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.scripts.knip;
    delete pkg.scripts['knip:ci'];
    delete pkg.devDependencies.knip;
    writeJsonFile(packageJsonPath, pkg);
    return true;
  }
  return false;
}

// Remove SonarCloud
async function removeSonarCloud(rl) {
  console.log(`\n${colors.blue}━━━ SonarCloud Integration ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove SonarCloud configuration and workflow?')) {
    deletePath('sonar-project.properties');
    deletePath('.github/workflows/sonarcloud.yml');
    
    console.log(`${colors.yellow}Note: You should manually remove SonarCloud badges from README.md${colors.reset}`);
    return true;
  }
  return false;
}

// Remove TypeDoc
async function removeTypeDoc(rl) {
  console.log(`\n${colors.blue}━━━ TypeDoc Documentation ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove TypeDoc configuration and dependencies?')) {
    deletePath('typedoc.json');
    deletePath('typedoc.html.json');
    deletePath('docs');
    deletePath('docs-html');
    
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.scripts['docs:md'];
    delete pkg.scripts['docs:html'];
    delete pkg.scripts.docs;
    delete pkg.devDependencies.typedoc;
    delete pkg.devDependencies['typedoc-plugin-markdown'];
    delete pkg.devDependencies.jsdoc;
    delete pkg.devDependencies['jsdoc-to-markdown'];
    writeJsonFile(packageJsonPath, pkg);
    return true;
  }
  return false;
}

// Remove queries folder
async function removeQueries(rl) {
  console.log(`\n${colors.blue}━━━ TanStack Query Utilities ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: This will remove query utilities but keep TanStack Query dependency.${colors.reset}`);
  console.log(`${colors.yellow}You may need to update your code if it uses these utilities.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove src/queries folder?')) {
    deletePath('src/queries');
    deletePath('docs/queries');
    
    console.log(`${colors.yellow}Note: Check your code for imports from 'src/queries' and update them.${colors.reset}`);
    return true;
  }
  return false;
}

// Remove ThemeToggle
async function removeThemeToggle(rl) {
  console.log(`\n${colors.blue}━━━ Theme Toggle Component ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: You may need to update components that import ThemeToggleButton.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove ThemeToggleButton component?')) {
    deletePath('src/components/ThemeToggleButton');
    deletePath('docs/components/ThemeToggleButton');
    
    console.log(`${colors.yellow}Note: Update HomePage.tsx or any other files that import ThemeToggleButton.${colors.reset}`);
    return true;
  }
  return false;
}

// Remove ErrorFallback
async function removeErrorFallback(rl) {
  console.log(`\n${colors.blue}━━━ Error Fallback Component ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: This removes the custom error boundary UI.${colors.reset}`);
  console.log(`${colors.yellow}You'll need to provide an alternative error boundary or remove it from RootComponent.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove ErrorFallback component?')) {
    deletePath('src/components/ErrorFallback');
    deletePath('docs/components/ErrorFallback');
    
    // Update package.json to remove react-error-boundary if desired
    const removeLib = await askQuestion(rl, 'Also remove react-error-boundary dependency?');
    if (removeLib) {
      const pkg = readJsonFile(packageJsonPath);
      delete pkg.dependencies['react-error-boundary'];
      writeJsonFile(packageJsonPath, pkg);
    }
    
    console.log(`${colors.yellow}Note: Update RootComponent.tsx to remove ErrorBoundary usage.${colors.reset}`);
    return true;
  }
  return false;
}

// Remove NotFoundPage
async function removeNotFoundPage(rl) {
  console.log(`\n${colors.blue}━━━ Not Found Page ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: You'll need to update router.tsx to handle 404 routes differently.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove NotFoundPage component?')) {
    deletePath('src/pages/NotFoundPage');
    deletePath('docs/pages/NotFoundPage');
    
    console.log(`${colors.yellow}Note: Update router.tsx to remove NotFoundPage references.${colors.reset}`);
    return true;
  }
  return false;
}

// Remove README images
async function removeReadmeImages(rl) {
  console.log(`\n${colors.blue}━━━ README Images ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove README images (hero-image.png, react-gears.svg)?')) {
    deletePath('public/hero-image.png');
    deletePath('public/react-gears.svg');
    
    console.log(`${colors.yellow}Note: You should manually update README.md to remove image references.${colors.reset}`);
    return true;
  }
  return false;
}

// Simplify README
async function simplifyReadme(rl) {
  console.log(`\n${colors.blue}━━━ Simplify README ━━━${colors.reset}`);
  console.log(`${colors.yellow}This will replace README.md with a minimal bare-bones version.${colors.reset}`);
  
  if (await askQuestion(rl, 'Replace README.md with bare-bones version?')) {
    const packageName = readJsonFile(packageJsonPath).name;
    
    const bareBonesReadme = `# ${packageName}

A modern React application built with Vite and TypeScript.

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run lint\` - Run ESLint
- \`npm run prettier\` - Format code with Prettier
- \`npm run test\` - Run tests

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Vitest (testing)

## License

See LICENSE file for details.
`;
    
    fs.writeFileSync(path.join(rootDir, 'README.md'), bareBonesReadme, 'utf8');
    console.log(`${colors.green}✓${colors.reset} README.md replaced with bare-bones version`);
    return true;
  }
  return false;
}

// Tidy package.json
async function tidyPackageJson(rl) {
  console.log(`\n${colors.blue}━━━ Package.json Cleanup ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove additional optional scripts from package.json?')) {
    const pkg = readJsonFile(packageJsonPath);
    
    // Remove GitHub Pages related scripts (if not already removed by removeGitHubPages)
    delete pkg.scripts['update:gh-page-details'];
    delete pkg.scripts['build:gh-pages'];
    
    // Clean up pre script
    if (pkg.scripts.pre) {
      const shouldRemovePre = await askQuestion(rl, 'Remove the "pre" script (runs all checks)?');
      if (shouldRemovePre) {
        delete pkg.scripts.pre;
      }
    }
    
    writeJsonFile(packageJsonPath, pkg);
    console.log(`${colors.green}✓${colors.reset} package.json tidied`);
    return true;
  }
  return false;
}

// Rename package
async function renamePackage(rl) {
  console.log(`\n${colors.blue}━━━ Rename Package ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Rename the package in package.json?')) {
    const pkg = readJsonFile(packageJsonPath);
    console.log(`Current package name: ${colors.yellow}${pkg.name}${colors.reset}`);
    
    const newName = await askText(rl, 'Enter new package name:');
    if (newName && newName !== pkg.name) {
      pkg.name = newName;
      writeJsonFile(packageJsonPath, pkg);
      console.log(`${colors.green}✓${colors.reset} Package renamed to: ${newName}`);
      return true;
    } else {
      console.log(`${colors.yellow}Skipped renaming${colors.reset}`);
    }
  }
  return false;
}

// Remove GitHub Pages workflow
async function removeGitHubPages(rl) {
  console.log(`\n${colors.blue}━━━ GitHub Pages Workflow ━━━${colors.reset}`);
  if (await askQuestion(rl, 'Remove GitHub Pages workflow and related files?')) {
    deletePath('.github/workflows/pages.yml');
    deletePath('public/gh-pages-index.html');
    deletePath('scripts/update-gh-pages-details.cjs');
    
    console.log(`${colors.green}✓${colors.reset} GitHub Pages workflow removed`);
    return true;
  }
  return false;
}

// Additional suggestions
async function additionalCleanup(rl) {
  console.log(`\n${colors.blue}━━━ Additional Cleanup Suggestions ━━━${colors.reset}`);
  
  // Remove FEATURES.md
  if (await askQuestion(rl, 'Remove FEATURES.md documentation?')) {
    deletePath('FEATURES.md');
  }
  
  // Remove AGENTS.md
  if (await askQuestion(rl, 'Remove AGENTS.md documentation?')) {
    deletePath('AGENTS.md');
  }
  
  // Remove gitleaks config and secrets hook
  if (await askQuestion(rl, 'Remove gitleaks configuration and pre-commit secrets hook?')) {
    deletePath('.gitleaks.toml');
    deletePath('.gitleaksignore');
    deletePath('.husky/pre-commit-secrets');
    
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.scripts['secrets:scan'];
    delete pkg.scripts['secrets:scan-staged'];
    delete pkg.scripts['secrets:baseline'];
    delete pkg.devDependencies.gitleaks;
    writeJsonFile(packageJsonPath, pkg);
  }
  
  // Remove example schemas
  if (await askQuestion(rl, 'Remove example API schemas (src/schemas/api.ts)?')) {
    deletePath('src/schemas');
  }
  
  // Remove lint-staged and pre-commit hook
  if (await askQuestion(rl, 'Remove lint-staged and pre-commit hook (keeps Husky for commitlint)?')) {
    const pkg = readJsonFile(packageJsonPath);
    delete pkg['lint-staged'];
    delete pkg.devDependencies['lint-staged'];
    writeJsonFile(packageJsonPath, pkg);
    
    deletePath('.husky/pre-commit');
    console.log(`${colors.yellow}Note: Husky is retained for commit-msg hook unless you remove commitlint.${colors.reset}`);
  }
}

// Main execution
async function main() {
  console.log(`${colors.green}
╔═══════════════════════════════════════════════════════════╗
║     Modern React Template - Repository Cleanup Tool      ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  console.log(`${colors.yellow}This script will help you remove optional features and get`);
  console.log(`your repository down to the bare bones.${colors.reset}\n`);
  console.log(`${colors.yellow}⚠️  Make sure you have committed any important changes before proceeding!${colors.reset}\n`);
  
  const rl = createPrompt();
  
  try {
    const proceed = await askQuestion(rl, 'Do you want to proceed with the cleanup?');
    if (!proceed) {
      console.log(`\n${colors.yellow}Cleanup cancelled.${colors.reset}`);
      rl.close();
      return;
    }
    
    let changesCount = 0;
    
    // Run all cleanup functions
    if (await removePlaywright(rl)) changesCount++;
    if (await removeQuickstart(rl)) changesCount++;
    if (await removeCommitlint(rl)) changesCount++;
    if (await removeKnip(rl)) changesCount++;
    if (await removeSonarCloud(rl)) changesCount++;
    if (await removeTypeDoc(rl)) changesCount++;
    if (await removeGitHubPages(rl)) changesCount++;
    if (await removeQueries(rl)) changesCount++;
    if (await removeThemeToggle(rl)) changesCount++;
    if (await removeErrorFallback(rl)) changesCount++;
    if (await removeNotFoundPage(rl)) changesCount++;
    if (await removeReadmeImages(rl)) changesCount++;
    if (await simplifyReadme(rl)) changesCount++;
    if (await tidyPackageJson(rl)) changesCount++;
    
    await additionalCleanup(rl);
    
    if (await renamePackage(rl)) changesCount++;
    
    console.log(`\n${colors.green}╔═══════════════════════════════════════════════════════════╗`);
    console.log(`║                    Cleanup Complete!                      ║`);
    console.log(`╚═══════════════════════════════════════════════════════════╝${colors.reset}\n`);
    
    if (changesCount > 0) {
      console.log(`${colors.cyan}Next steps:${colors.reset}`);
      console.log(`1. Run: ${colors.yellow}npm install${colors.reset} to update dependencies`);
      console.log(`2. Review changes with: ${colors.yellow}git status${colors.reset}`);
      console.log(`3. Update any imports or references that may be broken`);
      console.log(`4. Test your application: ${colors.yellow}npm run dev${colors.reset}`);
      console.log(`5. Run tests: ${colors.yellow}npm run test${colors.reset}`);
      console.log(`6. Commit changes: ${colors.yellow}git add . && git commit -m "chore: cleanup repository"${colors.reset}\n`);
    } else {
      console.log(`${colors.yellow}No changes were made.${colors.reset}\n`);
    }
    
  } catch (error) {
    console.error(`\n${colors.red}Error during cleanup:${colors.reset}`, error);
  } finally {
    rl.close();
  }
}

// Run the script
main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
