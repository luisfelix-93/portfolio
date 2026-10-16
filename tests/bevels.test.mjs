import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const cssPath = path.join(projectRoot, 'src', 'index.css');

test('1.3.1 - src/index.css defines .bevel-outset with 3D directional lighting', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /\.bevel-outset\s*\{/, '.bevel-outset class must be defined');
  assert.match(css, /border-top:\s*1px\s+solid\s+var\(--win-light\)/, 'bevel-outset top border must be win-light');
  assert.match(css, /border-left:\s*1px\s+solid\s+var\(--win-light\)/, 'bevel-outset left border must be win-light');
  assert.match(css, /border-right:\s*1px\s+solid\s+var\(--win-dark\)/, 'bevel-outset right border must be win-dark');
  assert.match(css, /border-bottom:\s*1px\s+solid\s+var\(--win-dark\)/, 'bevel-outset bottom border must be win-dark');
  assert.match(css, /box-shadow:.*var\(--win-soft\).*var\(--win-shadow\)/, 'bevel-outset must have dual-tone inner shadow');
});

test('1.3.2 - src/index.css defines .bevel-inset for sunken controls and viewports', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /\.bevel-inset\s*\{/, '.bevel-inset class must be defined');
  assert.match(css, /border-top:\s*1px\s+solid\s+var\(--win-shadow\)/, 'bevel-inset top border must be win-shadow');
  assert.match(css, /border-left:\s*1px\s+solid\s+var\(--win-shadow\)/, 'bevel-inset left border must be win-shadow');
  assert.match(css, /border-right:\s*1px\s+solid\s+var\(--win-light\)/, 'bevel-inset right border must be win-light');
  assert.match(css, /border-bottom:\s*1px\s+solid\s+var\(--win-light\)/, 'bevel-inset bottom border must be win-light');
});

test('1.3.3 - src/index.css defines active and inactive titlebar linear gradients', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /\.titlebar-active\s*\{/, '.titlebar-active class must be defined');
  assert.match(css, /var\(--win-title-active-start\).*var\(--win-title-active-end\)/, 'titlebar-active should use active gradient tokens');

  assert.match(css, /\.titlebar-inactive\s*\{/, '.titlebar-inactive class must be defined');
  assert.match(css, /var\(--win-title-inactive-start\).*var\(--win-title-inactive-end\)/, 'titlebar-inactive should use inactive gradient tokens');
});

test('1.3.4 - src/index.css defines .win-button with normal, active, focus and disabled states', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /\.win-button\s*\{/, '.win-button class must be defined');
  assert.match(css, /\.win-button:active:not\(:disabled\)/, 'win-button should have active state');
  assert.match(css, /\.win-button:disabled/, 'win-button should have disabled state');
  assert.match(css, /text-shadow:\s*1px\s+1px\s+0px\s+var\(--win-light\)/, 'disabled win-button should have Win32 recessed text shadow');
});

test('1.3.5 - src/index.css defines .win-window and .win-control-button', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /\.win-window\s*\{/, '.win-window class must be defined');
  assert.match(css, /\.win-control-button\s*\{/, '.win-control-button class must be defined');
  assert.match(css, /\.bevel-etched\s*\{/, '.bevel-etched divider class must be defined');
});
