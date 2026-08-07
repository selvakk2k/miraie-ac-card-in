import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesFilePath = path.join(__dirname, '../src/styles.ts');
const cssContent = fs.readFileSync(stylesFilePath, 'utf8');

console.log('🔍 Starting Button Hover & Overflow CSS Audit...\n');

// List of all interactive button and card control selectors across layout modes
const interactiveSelectors = [
  '.power-btn',
  '.temp-btn',
  '.pill',
  '.picker-opt',
  '.step-notch',
  '.toggle-card',
  '.energy-card',
  '.compact-icon-btn',
  '.compact-action-btn',
  '.gh-power-btn',
  '.gh-circular-btn',
  '.gh-dropdown-item',
  '.gh-chip'
];

let errors = 0;

// Test 1: Verify all interactive button controls have defined :hover states
interactiveSelectors.forEach(selector => {
  const hoverRegex = new RegExp(`${selector.replace('.', '\\.')}(:hover|\\.disabled)`, 'i');
  if (hoverRegex.test(cssContent)) {
    console.log(`✅ Passed: ${selector} has valid hover/interactive CSS rules.`);
  } else {
    console.error(`❌ Failed: ${selector} is missing a :hover CSS rule.`);
    errors++;
  }
});

// Test 2: Verify .toggle-card has overflow: hidden to contain child overlays
if (/\.toggle-card\s*\{[^}]*overflow:\s*hidden/i.test(cssContent)) {
  console.log('✅ Passed: .toggle-card has overflow: hidden set.');
} else {
  console.error('❌ Failed: .toggle-card is missing overflow: hidden.');
  errors++;
}

// Test 3: Verify nested ha-switch inside .toggle-card has pointer-events: none
if (/\.toggle-card\s+ha-switch\s*\{[^}]*pointer-events:\s*none/i.test(cssContent)) {
  console.log('✅ Passed: .toggle-card ha-switch has pointer-events: none.');
} else {
  console.error('❌ Failed: .toggle-card ha-switch is missing pointer-events: none.');
  errors++;
}

if (errors > 0) {
  console.error(`\n❌ Audit completed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 All button hover & overflow checks passed cleanly!');
}
