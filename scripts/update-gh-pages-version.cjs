#!/usr/bin/env node

// Simple script to inject the current package.json version into public/gh-pages-index.html
// Replaces all occurrences of __APP_VERSION__ with the value of packageJson.version

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');
const ghPagesIndexPath = path.join(rootDir, 'public', 'gh-pages-index.html');

function main() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  const original = fs.readFileSync(ghPagesIndexPath, 'utf8');

  const updated = original.replace(/__APP_VERSION__/g, version);

  if (updated === original) {
    console.warn('[update-gh-pages-version] No __APP_VERSION__ placeholder found in gh-pages-index.html');
  } else {
    console.log(`[update-gh-pages-version] Injected version ${version} into gh-pages-index.html`);
  }

  fs.writeFileSync(ghPagesIndexPath, updated, 'utf8');
}

main();
