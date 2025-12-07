#!/usr/bin/env node

// Simple script to inject the current package.json version into a copy of gh-pages-index.html
// Usage (for deploy only, not committed):
//   node ./scripts/update-gh-pages-version.cjs path/to/output/gh-pages-index.html
// It will read the source from public/gh-pages-index.html, replace __APP_VERSION__
// with packageJson.version, and write the result to the output path.

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');
const sourceGhPagesIndexPath = path.join(rootDir, 'public', 'gh-pages-index.html');

function main() {
  const outputPathArg = process.argv[2];

  if (!outputPathArg) {
    console.error('[update-gh-pages-version] Missing output path argument');
    console.error('Usage: node ./scripts/update-gh-pages-version.cjs dist/gh-pages-index.html');
    process.exit(1);
  }

  const outputPath = path.isAbsolute(outputPathArg)
    ? outputPathArg
    : path.join(rootDir, outputPathArg);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  const original = fs.readFileSync(sourceGhPagesIndexPath, 'utf8');

  const updated = original.replace(/__APP_VERSION__/g, version);

  if (updated === original) {
    console.warn('[update-gh-pages-version] No __APP_VERSION__ placeholder found in source gh-pages-index.html');
  } else {
    console.log(`[update-gh-pages-version] Injected version ${version} into output file`);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, updated, 'utf8');
}

main();
