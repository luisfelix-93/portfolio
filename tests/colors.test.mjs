import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('1.2.1 - tailwind.config.js defines Win2K surface, desktop, and bevel colors', async () => {
  const configPath = path.join(projectRoot, 'tailwind.config.js');
  const configModule = await import(`file://${configPath}`);
  const config = configModule.default;
  const colors = config.theme?.extend?.colors?.win;

  assert.ok(colors, 'theme.extend.colors.win must be defined');
  assert.strictEqual(colors.desktop.toUpperCase(), '#3A6EA5', 'win.desktop must be #3A6EA5');
  assert.strictEqual(colors.teal.toUpperCase(), '#008080', 'win.teal must be #008080');
  assert.strictEqual(colors.face.toUpperCase(), '#D4D0C8', 'win.face must be #D4D0C8 (3D Face gray)');
  assert.strictEqual(colors.light.toUpperCase(), '#FFFFFF', 'win.light must be #FFFFFF (High light)');
  assert.strictEqual(colors.soft.toUpperCase(), '#DFDFDF', 'win.soft must be #DFDFDF (Soft light)');
  assert.strictEqual(colors.shadow.toUpperCase(), '#808080', 'win.shadow must be #808080');
  assert.strictEqual(colors.dark.toUpperCase(), '#404040', 'win.dark must be #404040 (Dark shadow)');
  assert.strictEqual(colors.link.toUpperCase(), '#0000EE', 'win.link must be #0000EE (Classic Win32 link)');
  assert.strictEqual(colors.selection.toUpperCase(), '#0A246A', 'win.selection must be #0A246A (Active selection)');
});

test('1.2.2 - tailwind.config.js defines active and inactive titlebar gradient colors', async () => {
  const configPath = path.join(projectRoot, 'tailwind.config.js');
  const configModule = await import(`file://${configPath}`);
  const config = configModule.default;
  const titleColors = config.theme?.extend?.colors?.win?.title;

  assert.ok(titleColors, 'theme.extend.colors.win.title must be defined');
  assert.strictEqual(titleColors.activeStart.toUpperCase(), '#0A246A', 'Active titlebar start must be #0A246A');
  assert.strictEqual(titleColors.activeEnd.toUpperCase(), '#A6CAF0', 'Active titlebar end must be #A6CAF0');
  assert.strictEqual(titleColors.inactiveStart.toUpperCase(), '#808080', 'Inactive titlebar start must be #808080');
  assert.strictEqual(titleColors.inactiveEnd.toUpperCase(), '#C0C0C0', 'Inactive titlebar end must be #C0C0C0');
});

test('1.2.3 - tailwind.config.js defines terminal CRT colors', async () => {
  const configPath = path.join(projectRoot, 'tailwind.config.js');
  const configModule = await import(`file://${configPath}`);
  const config = configModule.default;
  const termColors = config.theme?.extend?.colors?.terminal;

  assert.ok(termColors, 'theme.extend.colors.terminal must be defined');
  assert.strictEqual(termColors.bg.toUpperCase(), '#000000', 'terminal.bg must be #000000');
  assert.strictEqual(termColors.green.toUpperCase(), '#00FF66', 'terminal.green must be #00FF66 (Phosphor green)');
  assert.strictEqual(termColors.gray.toUpperCase(), '#CCCCCC', 'terminal.gray must be #CCCCCC');
});

test('1.2.4 - src/index.css exposes CSS custom properties in :root', () => {
  const cssPath = path.join(projectRoot, 'src', 'index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /--win-desktop:\s*#3A6EA5/i, 'CSS should have --win-desktop');
  assert.match(css, /--win-face:\s*#D4D0C8/i, 'CSS should have --win-face');
  assert.match(css, /--win-title-active-start:\s*#0A246A/i, 'CSS should have --win-title-active-start');
  assert.match(css, /--terminal-green:\s*#00FF66/i, 'CSS should have --terminal-green');
});
