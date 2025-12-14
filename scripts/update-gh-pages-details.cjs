#!/usr/bin/env node

// Simple script to inject build details into a copy of gh-pages-index.html
// Usage (for deploy only, not committed):
//   node ./scripts/update-gh-pages-details.cjs path/to/output/gh-pages-index.html
// It reads public/gh-pages-index.html, replaces __APP_VERSION__, __BUILD_DATE__, and
// __BUILD_TIME__ with values from package.json and the current date/time, and writes
// the result to the output path.

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');
const sourceGhPagesIndexPath = path.join(rootDir, 'public', 'gh-pages-index.html');

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  const lastDigit = day % 10;

  if (lastDigit === 1) {
    return 'st';
  }

  if (lastDigit === 2) {
    return 'nd';
  }

  if (lastDigit === 3) {
    return 'rd';
  }

  return 'th';
}

function formatBuildDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const ordinal = getOrdinalSuffix(day);

  return `${day}${ordinal} ${monthNames[monthIndex]} ${year}`;
}

function formatBuildTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function main() {
  const outputPathArg = process.argv[2];

  if (!outputPathArg) {
    console.error('[update-gh-pages-build-details] Missing output path argument');
    console.error('Usage: node ./scripts/update-gh-pages-details.cjs dist/gh-pages-index.html');
    process.exit(1);
  }

  const outputPath = path.isAbsolute(outputPathArg)
    ? outputPathArg
    : path.join(rootDir, outputPathArg);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  const now = new Date();
  const buildDate = formatBuildDate(now);
  const buildTime = formatBuildTime(now);

  const original = fs.readFileSync(sourceGhPagesIndexPath, 'utf8');

  const updated = original
    .replace(/__APP_VERSION__/g, version)
    .replace(/__BUILD_DATE__/g, buildDate)
    .replace(/__BUILD_TIME__/g, buildTime);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, updated, 'utf8');
}

main();
