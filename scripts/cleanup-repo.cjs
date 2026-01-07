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

// CLI args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-n');

function logDry(action) {
  if (dryRun) {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} ${action}`);
    return true;
  }
  return false;
}

function safeWriteFile(relativePath, content) {
  const fullPath = path.join(rootDir, relativePath);
  if (dryRun) {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} Would write file: ${relativePath}`);
    return true;
  }
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`${colors.green}✓${colors.reset} Wrote file: ${relativePath}`);
  return true;
}

// Helper to read/write JSON files
function readJsonFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

function writeJsonFile(filepath, data) {
  const content = JSON.stringify(data, null, 2) + '\n';
  if (logDry(`Would update JSON file: ${filepath}`)) return;
  fs.writeFileSync(filepath, content, 'utf8');
}

// Helper to delete file or directory
function deletePath(filepath) {
  const fullPath = path.join(rootDir, filepath);
  if (!fs.existsSync(fullPath)) return false;

  if (dryRun) {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} Would remove: ${filepath}`);
    return true;
  }

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

// Helper to remove import statement from a file
function removeImportFromFile(filepath, importName) {
  const fullPath = path.join(rootDir, filepath);
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const newLines = lines.filter(line => {
    // Remove lines that import the specified component
    return !line.includes(`import`) || !line.includes(importName);
  });
  
  if (lines.length !== newLines.length) {
    if (!logDry(`Would remove import ${importName} from ${filepath}`)) {
      fs.writeFileSync(fullPath, newLines.join('\n'), 'utf8');
      console.log(`${colors.green}✓${colors.reset} Removed ${importName} import from ${filepath}`);
    }
    return true;
  }
  return false;
}

// Helper to remove component usage from App.tsx (ThemeToggleButton)
function removeThemeToggleFromApp() {
  const appPath = path.join(rootDir, 'src/App.tsx');
  if (!fs.existsSync(appPath)) {
    return false;
  }
  
  let content = fs.readFileSync(appPath, 'utf8');
  
  // Remove import line
  content = content.replace(/import\s*{\s*ThemeToggleButton\s*}\s*from\s*['"].*ThemeToggleButton['"];?\n?/g, '');
  
  // Remove the theme toggle div and its content (with the comment)
  content = content.replace(/\s*{\/\*\s*Theme toggle button.*?\*\/}\s*<div[^>]*>\s*<ThemeToggleButton\s*\/>\s*<\/div>\s*/gs, '');
  
  if (!logDry(`Would update App.tsx to remove ThemeToggleButton usage`)) {
    fs.writeFileSync(appPath, content, 'utf8');
    console.log(`${colors.green}✓${colors.reset} Removed ThemeToggleButton usage from App.tsx`);
  } else {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} Would remove ThemeToggleButton usage from App.tsx`);
  }
  return true;
}

// Helper to remove ErrorFallback from main.tsx
function removeErrorFallbackFromMain() {
  const mainPath = path.join(rootDir, 'src/main.tsx');
  if (!fs.existsSync(mainPath)) {
    return false;
  }
  
  let content = fs.readFileSync(mainPath, 'utf8');
  
  // Remove import lines
  content = content.replace(/import\s*{\s*ErrorBoundary\s*}\s*from\s*['"]react-error-boundary['"];?\n?/g, '');
  content = content.replace(/import\s*{\s*ErrorFallback\s*}\s*from\s*['"].*ErrorFallback['"];?\n?/g, '');
  
  // Remove ErrorBoundary wrapper, keeping the App component
  content = content.replace(
    /<ErrorBoundary\s+FallbackComponent={ErrorFallback}\s+onReset={\(\)\s*=>\s*globalThis\.location\.reload\(\)}\s*>\s*<App\s*\/>\s*<\/ErrorBoundary>/gs,
    '<App />'
  );
  
  if (!logDry(`Would update main.tsx to remove ErrorFallback usage`)) {
    fs.writeFileSync(mainPath, content, 'utf8');
    console.log(`${colors.green}✓${colors.reset} Removed ErrorFallback usage from main.tsx`);
  } else {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} Would remove ErrorFallback usage from main.tsx`);
  }
  return true;
}

// Helper to remove NotFoundPage from router.tsx
function removeNotFoundPageFromRouter() {
  const routerPath = path.join(rootDir, 'src/router.tsx');
  if (!fs.existsSync(routerPath)) {
    return false;
  }
  
  let content = fs.readFileSync(routerPath, 'utf8');
  
  // Step 1: Remove import line
  content = content.replace(/import\s*{\s*NotFoundPageAdapter\s*}\s*from\s*['"].*NotFoundPageAdapter['"];?\s*\n?/g, '');
  
  // Step 2: Remove notFoundComponent from root route (with trailing comma handling)
  content = content.replace(/,?\s*notFoundComponent:\s*NotFoundPageAdapter\s*,?/g, '');
  
  // Step 3: Remove the notFoundRoute definition more precisely
  // Match: JSDoc comment specific to notFoundRoute + const notFoundRoute = createRoute({ ... });
  content = content.replace(/\/\*\*\s*\n\s*\*\s*Route tree configuration[\s\S]*?\*\/\s*\n?\s*const notFoundRoute\s*=\s*createRoute\s*\(\s*\{[\s\S]*?\}\s*\)\s*;?\s*\n*/g, '');
  
  // Step 4: Remove notFoundRoute from routeTree.addChildren
  content = content.replace(/,\s*notFoundRoute/g, '');
  
  // Step 5: Remove defaultNotFoundComponent from router config (with trailing comma handling)
  content = content.replace(/,?\s*defaultNotFoundComponent:\s*NotFoundPageAdapter\s*,?/g, '');
  
  // Step 6: Clean up any trailing commas in objects
  content = content.replace(/,(\s*\})/g, '$1');
  
  if (!logDry(`Would update router.tsx to remove NotFoundPageAdapter usage`)) {
    fs.writeFileSync(routerPath, content, 'utf8');
    console.log(`${colors.green}✓${colors.reset} Removed NotFoundPageAdapter usage from router.tsx`);
  } else {
    console.log(`${colors.yellow}DRY RUN:${colors.reset} Would remove NotFoundPageAdapter usage from router.tsx`);
  }
  return true;
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

// Helper to ask for multiple choice
function askChoice(rl, question, choices) {
  return new Promise((resolve) => {
    console.log(`\n${colors.cyan}${question}${colors.reset}`);
    choices.forEach((choice, index) => {
      console.log(`  ${colors.yellow}${index + 1}.${colors.reset} ${choice}`);
    });
    rl.question(`${colors.cyan}Enter your choice (1-${choices.length}): ${colors.reset}`, (answer) => {
      const choice = parseInt(answer.trim());
      if (choice >= 1 && choice <= choices.length) {
        resolve(choice);
      } else {
        resolve(null);
      }
    });
  });
}

// Helper to ask for multi-select with numbers
function askMultiSelect(rl, options) {
  return new Promise((resolve) => {
    console.log(`\n${colors.cyan}Select items to remove (enter numbers separated by spaces, or 'all' for everything):${colors.reset}`);
    options.forEach((option, index) => {
      console.log(`  ${colors.yellow}${index + 1}.${colors.reset} ${option.label}`);
    });
    console.log(`\n  ${colors.yellow}Example:${colors.reset} 1 3 5 or ${colors.yellow}all${colors.reset}`);
    
    rl.question(`${colors.cyan}Your selection: ${colors.reset}`, (answer) => {
      const input = answer.trim().toLowerCase();
      
      if (input === 'all') {
        resolve(options.map((_, i) => i));
      } else if (input === '') {
        resolve([]);
      } else {
        const selections = input
          .split(/\s+/)
          .map(s => parseInt(s) - 1)
          .filter(i => i >= 0 && i < options.length);
        resolve(selections);
      }
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
  console.log(`${colors.yellow}Warning: This will also update App.tsx to remove the ThemeToggleButton.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove ThemeToggleButton component?')) {
    deletePath('src/components/ThemeToggleButton');
    deletePath('docs/components/ThemeToggleButton');
    
    // Remove from App.tsx
    removeThemeToggleFromApp();
    
    return true;
  }
  return false;
}

// Remove ErrorFallback
async function removeErrorFallback(rl) {
  console.log(`\n${colors.blue}━━━ Error Fallback Component ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: This will update main.tsx to remove the ErrorBoundary.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove ErrorFallback component?')) {
    deletePath('src/components/ErrorFallback');
    deletePath('docs/components/ErrorFallback');
    
    // Remove from main.tsx
    removeErrorFallbackFromMain();
    
    // Update package.json to remove react-error-boundary if desired
    const removeLib = await askQuestion(rl, 'Also remove react-error-boundary dependency?');
    if (removeLib) {
      const pkg = readJsonFile(packageJsonPath);
      delete pkg.dependencies['react-error-boundary'];
      writeJsonFile(packageJsonPath, pkg);
    }
    
    return true;
  }
  return false;
}

// Remove NotFoundPage
async function removeNotFoundPage(rl) {
  console.log(`\n${colors.blue}━━━ Not Found Page ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: This will update router.tsx to remove NotFoundPage references.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove NotFoundPage component?')) {
    deletePath('src/pages/NotFoundPage');
    deletePath('docs/pages/NotFoundPage');
    
    // Remove from router.tsx
    removeNotFoundPageFromRouter();
    
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
    
    safeWriteFile('README.md', bareBonesReadme);
    if (!dryRun) console.log(`${colors.green}✓${colors.reset} README.md replaced with bare-bones version`);
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

// Remove all test files
async function removeAllTests(rl) {
  console.log(`\n${colors.blue}━━━ Test Files ━━━${colors.reset}`);
  console.log(`${colors.yellow}Warning: This will remove ALL test files (.test.tsx, .test.ts, .spec.tsx, .spec.ts).${colors.reset}`);
  console.log(`${colors.yellow}This includes unit tests, component tests, and test setup files.${colors.reset}`);
  
  if (await askQuestion(rl, 'Remove all test files?')) {
    // Remove test files from src directory
    const testFiles = [
      'src/components/Button/Button.test.tsx',
      'src/components/ErrorFallback/ErrorFallback.test.tsx',
      'src/components/RootComponent.test.tsx',
      'src/components/ThemeToggleButton/ThemeToggleButton.test.tsx',
      'src/pages/HomePage/HomePage.test.tsx',
      'src/pages/NotFoundPage/NotFoundPage.test.tsx',
    ];
    
    let filesRemoved = 0;
    testFiles.forEach(file => {
      if (deletePath(file)) {
        filesRemoved++;
      }
    });
    
    // Remove test setup directory
    deletePath('src/test');
    
    // Update package.json to remove test-related scripts and dependencies
    const pkg = readJsonFile(packageJsonPath);
    delete pkg.scripts.test;
    delete pkg.scripts['test:unit'];
    delete pkg.scripts['test:coverage'];
    delete pkg.scripts['test:ui'];
    delete pkg.devDependencies['@testing-library/jest-dom'];
    delete pkg.devDependencies['@testing-library/react'];
    delete pkg.devDependencies['@testing-library/user-event'];
    delete pkg.devDependencies['@vitest/coverage-v8'];
    delete pkg.devDependencies['@vitest/ui'];
    delete pkg.devDependencies['happy-dom'];
    delete pkg.devDependencies['jsdom'];
    delete pkg.devDependencies['vitest'];
    delete pkg.devDependencies['eslint-plugin-testing-library'];
    delete pkg.devDependencies['eslint-plugin-vitest'];
    
    // Update pre script if it exists
    if (pkg.scripts.pre) {
      pkg.scripts.pre = pkg.scripts.pre.replace(/npm run test &&\s*/g, '');
      pkg.scripts.pre = pkg.scripts.pre.replace(/&&\s*npm run test/g, '');
      pkg.scripts.pre = pkg.scripts.pre.replace(/npm run test/g, '');
    }
    
    writeJsonFile(packageJsonPath, pkg);
    
    // Remove vitest config
    deletePath('vitest.config.ts');
    
    console.log(`${colors.green}✓${colors.reset} Removed ${filesRemoved} test files and test infrastructure`);
    console.log(`${colors.yellow}Note: Update .husky/pre-commit if it references test commands.${colors.reset}`);
    return true;
  }
  return false;
}

// Make HomePage blank
async function makeHomePageBlank(rl) {
  console.log(`\n${colors.blue}━━━ HomePage Content ━━━${colors.reset}`);
  console.log(`${colors.yellow}This will replace HomePage with a minimal blank page.${colors.reset}`);
  
  if (await askQuestion(rl, 'Make HomePage a blank page?')) {
    const blankHomePage = `/**
 * HomePage
 *
 * Minimal home page for the application.
 *
 * @returns JSX.Element representing the Home page
 */
export function HomePage() {
  return (
    <main
      className="bg-surface text-text-primary min-h-screen"
      id="main-content"
    >
      <div className="container">
        <h1 className="text-primary">Welcome</h1>
        <p>Your application is ready.</p>
      </div>
    </main>
  );
}
`;
    
    safeWriteFile('src/pages/HomePage/HomePage.tsx', blankHomePage);
    if (!dryRun) console.log(`${colors.green}✓${colors.reset} HomePage replaced with blank template`);
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
║     Modern React Template - Repository Cleanup Tool       ║
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
    
    // Ask for cleanup mode
    const mode = await askChoice(rl, 'Select cleanup mode:', [
      'Interactive (prompt for each item one-by-one)',
      'Batch Select (choose multiple items at once)',
      'Remove All (remove everything without prompts)'
    ]);
    
    if (!mode) {
      console.log(`\n${colors.red}Invalid choice. Cleanup cancelled.${colors.reset}`);
      rl.close();
      return;
    }
    
    let changesCount = 0;
    let selectedItems = [];
    
    // Define all cleanup options
    const cleanupOptions = [
      { label: 'Playwright E2E testing', fn: () => removePlaywright(rl) },
      { label: 'QUICKSTART.md', fn: () => removeQuickstart(rl) },
      { label: 'Commitlint configuration', fn: () => removeCommitlint(rl) },
      { label: 'Knip unused code detection', fn: () => removeKnip(rl) },
      { label: 'SonarCloud integration', fn: () => removeSonarCloud(rl) },
      { label: 'TypeDoc documentation', fn: () => removeTypeDoc(rl) },
      { label: 'GitHub Pages workflow', fn: () => removeGitHubPages(rl) },
      { label: 'TanStack Query utilities (src/queries)', fn: () => removeQueries(rl) },
      { label: 'ThemeToggle component', fn: () => removeThemeToggle(rl) },
      { label: 'ErrorFallback component', fn: () => removeErrorFallback(rl) },
      { label: 'NotFoundPage component', fn: () => removeNotFoundPage(rl) },
      { label: 'README images', fn: () => removeReadmeImages(rl) },
      { label: 'Simplify README to bare bones', fn: () => simplifyReadme(rl) },
      { label: 'Tidy package.json scripts', fn: () => tidyPackageJson(rl) },
      { label: 'All test files and infrastructure', fn: () => removeAllTests(rl) },
      { label: 'Make HomePage blank', fn: () => makeHomePageBlank(rl) },
    ];
    
    if (mode === 1) {
      // Interactive mode - prompt for each item
      for (const option of cleanupOptions) {
        if (await option.fn()) changesCount++;
      }
      await additionalCleanup(rl);
      if (await renamePackage(rl)) changesCount++;
      
    } else if (mode === 2) {
      // Batch select mode
      selectedItems = await askMultiSelect(rl, cleanupOptions);
      
      if (selectedItems.length === 0) {
        console.log(`\n${colors.yellow}No items selected.${colors.reset}`);
      } else {
        console.log(`\n${colors.blue}━━━ Processing ${selectedItems.length} selected items ━━━${colors.reset}\n`);
        
        for (const index of selectedItems) {
          // Execute the cleanup function directly without prompting
          const option = cleanupOptions[index];
          console.log(`${colors.blue}━━━ ${option.label} ━━━${colors.reset}`);
          
          // Call the function but skip the internal prompt
          // We need to modify functions to accept a "skipPrompt" parameter
          const result = await executeCleanupDirect(index);
          if (result) changesCount++;
        }
        
        // Ask about additional cleanup and rename
        const wantAdditional = await askQuestion(rl, 'Configure additional cleanup options (FEATURES.md, AGENTS.md, etc)?');
        if (wantAdditional) {
          await additionalCleanup(rl);
        }
        
        const wantRename = await askQuestion(rl, 'Rename package in package.json?');
        if (wantRename) {
          if (await renamePackage(rl)) changesCount++;
        }
      }
      
    } else if (mode === 3) {
      // Remove all mode
      console.log(`\n${colors.red}⚠️  WARNING: This will remove ALL optional features!${colors.reset}`);
      const confirmAll = await askQuestion(rl, 'Are you absolutely sure you want to remove everything?');
      
      if (confirmAll) {
        console.log(`\n${colors.blue}━━━ Removing all optional features ━━━${colors.reset}\n`);
        
        for (let i = 0; i < cleanupOptions.length; i++) {
          const result = await executeCleanupDirect(i);
          if (result) changesCount++;
        }
        
        // Execute additional cleanup without prompts
        console.log(`\n${colors.blue}━━━ Additional Cleanup ━━━${colors.reset}`);
        deletePath('FEATURES.md');
        deletePath('AGENTS.md');
        deletePath('.gitleaks.toml');
        deletePath('.gitleaksignore');
        deletePath('.husky/pre-commit-secrets');
        deletePath('src/schemas');
        deletePath('.husky/pre-commit');
        
        const pkg = readJsonFile(packageJsonPath);
        delete pkg.scripts['secrets:scan'];
        delete pkg.scripts['secrets:scan-staged'];
        delete pkg.scripts['secrets:baseline'];
        delete pkg.devDependencies.gitleaks;
        delete pkg['lint-staged'];
        delete pkg.devDependencies['lint-staged'];
        writeJsonFile(packageJsonPath, pkg);
        
        console.log(`${colors.green}✓${colors.reset} Additional cleanup completed`);
        changesCount++;
        
        // Ask if they want to rename package
        const wantRename = await askQuestion(rl, 'Rename package in package.json?');
        if (wantRename) {
          if (await renamePackage(rl)) changesCount++;
        }
      } else {
        console.log(`\n${colors.yellow}Remove all cancelled.${colors.reset}`);
      }
    }
    
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

// Helper function to execute cleanup without prompts for batch/remove-all modes
async function executeCleanupDirect(index) {
  switch(index) {
    case 0: // Playwright
      deletePath('playwright');
      deletePath('playwright.config.ts');
      deletePath('.github/workflows/codeql.yml');
      const pkg0 = readJsonFile(packageJsonPath);
      delete pkg0.scripts['test:e2e'];
      delete pkg0.devDependencies['@playwright/test'];
      delete pkg0.devDependencies['playwright'];
      delete pkg0.devDependencies['@axe-core/playwright'];
      delete pkg0.devDependencies['@vitest/browser-playwright'];
      if (pkg0.scripts.pre) {
        pkg0.scripts.pre = pkg0.scripts.pre.replace(/&& npm run test:e2e/g, '');
        pkg0.scripts.pre = pkg0.scripts.pre.replace(/npm run test:e2e &&/g, '');
        pkg0.scripts.pre = pkg0.scripts.pre.replace(/npm run test:e2e/g, '');
      }
      writeJsonFile(packageJsonPath, pkg0);
      return true;
      
    case 1: // QUICKSTART.md
      return deletePath('QUICKSTART.md');
      
    case 2: // Commitlint
      deletePath('commitlint.config.cjs');
      deletePath('.husky/commit-msg');
      const pkg2 = readJsonFile(packageJsonPath);
      delete pkg2.devDependencies['@commitlint/cli'];
      delete pkg2.devDependencies['@commitlint/config-conventional'];
      writeJsonFile(packageJsonPath, pkg2);
      return true;
      
    case 3: // Knip
      deletePath('knip.toml');
      const pkg3 = readJsonFile(packageJsonPath);
      delete pkg3.scripts.knip;
      delete pkg3.scripts['knip:ci'];
      delete pkg3.devDependencies.knip;
      writeJsonFile(packageJsonPath, pkg3);
      return true;
      
    case 4: // SonarCloud
      deletePath('sonar-project.properties');
      deletePath('.github/workflows/sonarcloud.yml');
      return true;
      
    case 5: // TypeDoc
      deletePath('typedoc.json');
      deletePath('typedoc.html.json');
      deletePath('docs');
      deletePath('docs-html');
      const pkg5 = readJsonFile(packageJsonPath);
      delete pkg5.scripts['docs:md'];
      delete pkg5.scripts['docs:html'];
      delete pkg5.scripts.docs;
      delete pkg5.devDependencies.typedoc;
      delete pkg5.devDependencies['typedoc-plugin-markdown'];
      delete pkg5.devDependencies.jsdoc;
      delete pkg5.devDependencies['jsdoc-to-markdown'];
      writeJsonFile(packageJsonPath, pkg5);
      return true;
      
    case 6: // GitHub Pages
      deletePath('.github/workflows/pages.yml');
      deletePath('public/gh-pages-index.html');
      deletePath('scripts/update-gh-pages-details.cjs');
      return true;
      
    case 7: // Queries
      deletePath('src/queries');
      deletePath('docs/queries');
      return true;
      
    case 8: // ThemeToggle
      deletePath('src/components/ThemeToggleButton');
      deletePath('docs/components/ThemeToggleButton');
      removeThemeToggleFromApp();
      return true;
      
    case 9: // ErrorFallback
      deletePath('src/components/ErrorFallback');
      deletePath('docs/components/ErrorFallback');
      removeErrorFallbackFromMain();
      return true;
      
    case 10: // NotFoundPage
      deletePath('src/pages/NotFoundPage');
      deletePath('docs/pages/NotFoundPage');
      removeNotFoundPageFromRouter();
      return true;
      
    case 11: // README images
      deletePath('public/hero-image.png');
      deletePath('public/react-gears.svg');
      return true;
      
    case 12: // Simplify README
      const pkg12 = readJsonFile(packageJsonPath);
      const packageName = pkg12.name;
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
      safeWriteFile('README.md', bareBonesReadme);
      return true;
      
    case 13: // Tidy package.json
      const pkg13 = readJsonFile(packageJsonPath);
      delete pkg13.scripts['update:gh-page-details'];
      delete pkg13.scripts['build:gh-pages'];
      writeJsonFile(packageJsonPath, pkg13);
      return true;
      
    case 14: // Remove all tests
      const testFiles = [
        'src/components/Button/Button.test.tsx',
        'src/components/ErrorFallback/ErrorFallback.test.tsx',
        'src/components/RootComponent.test.tsx',
        'src/components/ThemeToggleButton/ThemeToggleButton.test.tsx',
        'src/pages/HomePage/HomePage.test.tsx',
        'src/pages/NotFoundPage/NotFoundPage.test.tsx',
      ];
      testFiles.forEach(file => deletePath(file));
      deletePath('src/test');
      deletePath('vitest.config.ts');
      const pkg14 = readJsonFile(packageJsonPath);
      delete pkg14.scripts.test;
      delete pkg14.scripts['test:unit'];
      delete pkg14.scripts['test:coverage'];
      delete pkg14.scripts['test:ui'];
      delete pkg14.devDependencies['@testing-library/jest-dom'];
      delete pkg14.devDependencies['@testing-library/react'];
      delete pkg14.devDependencies['@testing-library/user-event'];
      delete pkg14.devDependencies['@vitest/coverage-v8'];
      delete pkg14.devDependencies['@vitest/ui'];
      delete pkg14.devDependencies['happy-dom'];
      delete pkg14.devDependencies['jsdom'];
      delete pkg14.devDependencies['vitest'];
      delete pkg14.devDependencies['eslint-plugin-testing-library'];
      delete pkg14.devDependencies['eslint-plugin-vitest'];
      if (pkg14.scripts.pre) {
        pkg14.scripts.pre = pkg14.scripts.pre.replace(/npm run test &&\s*/g, '');
        pkg14.scripts.pre = pkg14.scripts.pre.replace(/&&\s*npm run test/g, '');
        pkg14.scripts.pre = pkg14.scripts.pre.replace(/npm run test/g, '');
      }
      writeJsonFile(packageJsonPath, pkg14);
      return true;
      
    case 15: // Make HomePage blank
      const blankHomePage = `/**
 * HomePage
 *
 * Minimal home page for the application.
 *
 * @returns JSX.Element representing the Home page
 */
export function HomePage() {
  return (
    <main
      className="bg-surface text-text-primary min-h-screen"
      id="main-content"
    >
      <div className="container">
        <h1 className="text-primary">Welcome</h1>
        <p>Your application is ready.</p>
      </div>
    </main>
  );
}
`;
      safeWriteFile('src/pages/HomePage/HomePage.tsx', blankHomePage);
      return true;
      
    default:
      return false;
  }
}

// Run the script
main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
