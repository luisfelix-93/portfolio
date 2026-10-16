import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('1.1.1 - index.html imports Courier Prime webfont', () => {
  const indexHtmlPath = path.join(projectRoot, 'index.html');
  assert.ok(fs.existsSync(indexHtmlPath), 'index.html must exist');
  
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  assert.match(content, /fonts\.googleapis\.com/, 'index.html should preconnect or link to Google Fonts');
  assert.match(content, /Courier\+Prime/, 'index.html should link to Courier Prime font');
});

test('1.1.2 - tailwind.config.js defines Win2K typography font families', async () => {
  const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
  assert.ok(fs.existsSync(tailwindConfigPath), 'tailwind.config.js must exist');
  
  const configModule = await import(`file://${tailwindConfigPath}`);
  const config = configModule.default;
  
  assert.ok(config.theme?.extend?.fontFamily?.win, 'fontFamily.win must be defined');
  assert.ok(config.theme?.extend?.fontFamily?.terminal, 'fontFamily.terminal must be defined');
  
  const winFonts = config.theme.extend.fontFamily.win;
  assert.ok(winFonts.includes('Tahoma'), 'win font stack should include Tahoma');
  assert.ok(winFonts.some(f => f.includes('MS Sans Serif')), 'win font stack should include MS Sans Serif');
  
  const termFonts = config.theme.extend.fontFamily.terminal;
  assert.ok(termFonts.some(f => f.includes('Courier Prime')), 'terminal font stack should include Courier Prime');
});

test('1.1.3 - tailwind.config.js defines fixed Win2K font sizes without blurry sub-pixels', async () => {
  const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js');
  const configModule = await import(`file://${tailwindConfigPath}`);
  const config = configModule.default;
  
  const fontSizes = config.theme?.extend?.fontSize;
  assert.ok(fontSizes, 'fontSize extend must be defined');
  assert.strictEqual(fontSizes['win-caption'][0], '10px');
  assert.strictEqual(fontSizes['win-body'][0], '11px');
  assert.strictEqual(fontSizes['win-title'][0], '12px');
  assert.strictEqual(fontSizes['win-headline'][0], '14px');
  assert.strictEqual(fontSizes['terminal-sm'][0], '11px');
  assert.strictEqual(fontSizes['terminal-base'][0], '13px');
});

test('1.1.4 - src/index.css contains Win2K typography base styles and text smoothing', () => {
  const cssPath = path.join(projectRoot, 'src', 'index.css');
  assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');
  
  const css = fs.readFileSync(cssPath, 'utf8');
  assert.match(css, /Tahoma/, 'src/index.css should define Tahoma fallback');
  assert.match(css, /11px/, 'src/index.css should set base font-size to 11px');
  assert.match(css, /font-win/, 'src/index.css body should include font-win');
  assert.match(css, /-webkit-font-smoothing/, 'src/index.css should include font smoothing');
});
