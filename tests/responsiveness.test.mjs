import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const contextFilePath = path.join(projectRoot, 'src', 'context', 'WindowManagerContext.tsx');
const taskbarFilePath = path.join(projectRoot, 'src', 'components', 'win2k', 'Taskbar.tsx');

test('7.1.1 - WindowManagerContext exports isSmallScreen detection helper for < 768px', () => {
  assert.ok(fs.existsSync(contextFilePath), 'WindowManagerContext.tsx must exist');
  const code = fs.readFileSync(contextFilePath, 'utf8');

  assert.match(code, /export\s+const\s+isSmallScreen\s*=\s*\(\)/, 'Must export isSmallScreen function');
  assert.match(code, /innerWidth\s*<\s*768/, 'isSmallScreen must check for width < 768px');
});

test('7.1.2 - OPEN_WINDOW action auto-maximizes window on small screens (< 768px)', () => {
  const code = fs.readFileSync(contextFilePath, 'utf8');

  assert.match(code, /case\s+'OPEN_WINDOW':/, 'Must contain OPEN_WINDOW case');
  assert.match(code, /isSmallScreen\(\)\s*\|\|\s*win\.isMaximized/, 'OPEN_WINDOW must auto-maximize on small screens');
});

test('7.1.3 - WindowManagerProvider triggers auto-maximize on initial mount for small screens', () => {
  const code = fs.readFileSync(contextFilePath, 'utf8');

  assert.match(code, /useEffect\(\(\)\s*=>\s*\{[\s\S]*isSmallScreen\(\)[\s\S]*TOGGLE_MAXIMIZE/, 'Provider must maximize open windows on mount if isSmallScreen');
});

test('7.1.4 - Taskbar tabs adapt responsively on mobile/tablet viewports', () => {
  assert.ok(fs.existsSync(taskbarFilePath), 'Taskbar.tsx must exist');
  const code = fs.readFileSync(taskbarFilePath, 'utf8');

  assert.match(code, /min-w-\[36px\]\s+sm:min-w-\[80px\]/, 'Tabs must adapt minimum width from 36px on mobile to 80px on desktop');
  assert.match(code, /overflow-x-auto/, 'Tab container must support horizontal scrolling');
  assert.match(code, /min-w-0/, 'Tab container must allow flex child compression without overflowing');
});

test('7.1.5 - Taskbar systray shows time and hides secondary icons on ultra-compact screens', () => {
  const code = fs.readFileSync(taskbarFilePath, 'utf8');

  assert.match(code, /hidden\s+sm:block/, 'Volume and Wifi icons should hide on small screens to save space');
  assert.match(code, /tabular-nums/, 'Systray clock must display with tabular nums');
});
