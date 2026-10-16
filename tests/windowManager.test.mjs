import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// Load reducer code or test against logic extracted from src/context/WindowManagerContext.tsx
const projectRoot = process.cwd();
const contextFilePath = path.join(projectRoot, 'src', 'context', 'WindowManagerContext.tsx');

test('2.1.1 - WindowManagerContext.tsx file exists and exports types and reducer', () => {
  assert.ok(fs.existsSync(contextFilePath), 'WindowManagerContext.tsx must exist');
  const code = fs.readFileSync(contextFilePath, 'utf8');

  assert.match(code, /export\s+interface\s+WindowState/, 'Must export WindowState');
  assert.match(code, /export\s+function\s+windowManagerReducer/, 'Must export windowManagerReducer');
  assert.match(code, /export\s+const\s+INITIAL_WINDOWS/, 'Must export INITIAL_WINDOWS');
  assert.match(code, /export\s+function\s+useWindowManager/, 'Must export useWindowManager hook');
});

test('2.1.2 - Initial windows include all 4 PRD screens', () => {
  const code = fs.readFileSync(contextFilePath, 'utf8');
  assert.match(code, /id:\s*'winver'/, 'Must define winver window');
  assert.match(code, /id:\s*'explorer'/, 'Must define explorer window');
  assert.match(code, /id:\s*'mmc'/, 'Must define mmc window');
  assert.match(code, /id:\s*'putty'/, 'Must define putty window');
});

test('2.1.3 - Window actions handle OPEN, CLOSE, MINIMIZE, FOCUS, MAXIMIZE', () => {
  const code = fs.readFileSync(contextFilePath, 'utf8');
  assert.match(code, /case\s+'OPEN_WINDOW':/, 'Reducer must handle OPEN_WINDOW');
  assert.match(code, /case\s+'CLOSE_WINDOW':/, 'Reducer must handle CLOSE_WINDOW');
  assert.match(code, /case\s+'MINIMIZE_WINDOW':/, 'Reducer must handle MINIMIZE_WINDOW');
  assert.match(code, /case\s+'TOGGLE_MAXIMIZE':/, 'Reducer must handle TOGGLE_MAXIMIZE');
  assert.match(code, /case\s+'FOCUS_WINDOW':/, 'Reducer must handle FOCUS_WINDOW');
  assert.match(code, /case\s+'UPDATE_POSITION':/, 'Reducer must handle UPDATE_POSITION');
});
