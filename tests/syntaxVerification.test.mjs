import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('Phase 2 Code Verification - WindowManagerContext imports and exports', () => {
  const filePath = path.join(projectRoot, 'src', 'context', 'WindowManagerContext.tsx');
  assert.ok(fs.existsSync(filePath), 'WindowManagerContext.tsx exists');
  const code = fs.readFileSync(filePath, 'utf8');

  // Verify key types
  assert.match(code, /export interface WindowPosition/);
  assert.match(code, /export interface WindowSize/);
  assert.match(code, /export interface WindowState/);
  assert.match(code, /export interface WindowManagerState/);
  assert.match(code, /export type WindowAction/);

  // Verify reducer actions
  const requiredActions = [
    'OPEN_WINDOW',
    'CLOSE_WINDOW',
    'MINIMIZE_WINDOW',
    'TOGGLE_MAXIMIZE',
    'FOCUS_WINDOW',
    'UPDATE_POSITION',
    'UPDATE_SIZE',
  ];
  for (const action of requiredActions) {
    assert.ok(code.includes(`case '${action}':`), `Missing action handler for ${action}`);
  }

  // Verify hook
  assert.match(code, /export function useWindowManager/);
});

test('Phase 2 Code Verification - Win2K Components Barrel (index.ts)', () => {
  const indexPath = path.join(projectRoot, 'src', 'components', 'win2k', 'index.ts');
  assert.ok(fs.existsSync(indexPath), 'index.ts exists');
  const code = fs.readFileSync(indexPath, 'utf8');

  assert.match(code, /export \* from '\.\/WindowFrame'/);
  assert.match(code, /export \* from '\.\/Taskbar'/);
  assert.match(code, /export \* from '\.\/StartMenu'/);
  assert.match(code, /export \* from '\.\/DesktopCanvas'/);
});

test('Phase 2 Code Verification - WindowFrame props and interactions', () => {
  const framePath = path.join(projectRoot, 'src', 'components', 'win2k', 'WindowFrame.tsx');
  assert.ok(fs.existsSync(framePath), 'WindowFrame.tsx exists');
  const code = fs.readFileSync(framePath, 'utf8');

  // Verify mouse drag handling
  assert.match(code, /handleMouseMove/);
  assert.match(code, /handleTitleBarMouseDown/);
  assert.match(code, /updatePosition/);

  // Verify controls
  assert.match(code, /minimizeWindow/);
  assert.match(code, /toggleMaximize/);
  assert.match(code, /closeWindow/);
  assert.match(code, /focusWindow/);
});

test('Phase 2 Code Verification - Taskbar and StartMenu synchronization', () => {
  const taskbarPath = path.join(projectRoot, 'src', 'components', 'win2k', 'Taskbar.tsx');
  const startMenuPath = path.join(projectRoot, 'src', 'components', 'win2k', 'StartMenu.tsx');

  assert.ok(fs.existsSync(taskbarPath), 'Taskbar.tsx exists');
  assert.ok(fs.existsSync(startMenuPath), 'StartMenu.tsx exists');

  const taskbarCode = fs.readFileSync(taskbarPath, 'utf8');
  const startMenuCode = fs.readFileSync(startMenuPath, 'utf8');

  // Verify StartMenu integration inside Taskbar
  assert.match(taskbarCode, /<StartMenu/);
  assert.match(taskbarCode, /isStartOpen/);

  // Verify all 4 PRD window IDs are wired to openWindow in StartMenu
  assert.match(startMenuCode, /handleItemClick\('winver'\)/);
  assert.match(startMenuCode, /handleItemClick\('explorer'\)/);
  assert.match(startMenuCode, /handleItemClick\('mmc'\)/);
  assert.match(startMenuCode, /handleItemClick\('putty'\)/);
});

test('Phase 2 Code Verification - App.tsx integration with data/profile', () => {
  const appPath = path.join(projectRoot, 'src', 'App.tsx');
  const winverPath = path.join(projectRoot, 'src', 'components', 'apps', 'WinverWindow.tsx');
  const explorerPath = path.join(projectRoot, 'src', 'components', 'apps', 'ExplorerWindow.tsx');
  const mmcPath = path.join(projectRoot, 'src', 'components', 'apps', 'MmcWindow.tsx');
  assert.ok(fs.existsSync(appPath), 'src/App.tsx exists');
  const code =
    fs.readFileSync(appPath, 'utf8') +
    fs.readFileSync(winverPath, 'utf8') +
    fs.readFileSync(explorerPath, 'utf8') +
    fs.readFileSync(mmcPath, 'utf8');

  assert.match(code, /profileData\.name/);
  assert.match(code, /profileData\.featuredProjects/);
  assert.match(code, /profileData\.experience/);
  assert.match(code, /profileData\.social/);
});
