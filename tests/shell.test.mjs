import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

test('2.2.1 - WindowFrame.tsx contains Win2K chrome, titlebar, and control buttons', () => {
  const filePath = path.join(projectRoot, 'src', 'components', 'win2k', 'WindowFrame.tsx');
  assert.ok(fs.existsSync(filePath), 'WindowFrame.tsx must exist');

  const code = fs.readFileSync(filePath, 'utf8');
  assert.match(code, /export\s+const\s+WindowFrame/, 'Must export WindowFrame component');
  assert.match(code, /win-control-button/, 'Must render win-control-button controls');
  assert.match(code, /title="Minimizar"/, 'Must contain minimize button');
  assert.match(code, /title="Fechar"/, 'Must contain close button');
  assert.match(code, /titlebar-active/, 'Must switch between titlebar-active and titlebar-inactive');
});

test('2.3.1 - Taskbar.tsx contains Start button, window tabs, and system tray clock', () => {
  const filePath = path.join(projectRoot, 'src', 'components', 'win2k', 'Taskbar.tsx');
  assert.ok(fs.existsSync(filePath), 'Taskbar.tsx must exist');

  const code = fs.readFileSync(filePath, 'utf8');
  assert.match(code, /export\s+const\s+Taskbar/, 'Must export Taskbar component');
  assert.match(code, /Iniciar/, 'Must render Iniciar button');
  assert.match(code, /bg-\[\#F25022\]/, 'Must render Windows 4-color flag icon');
  assert.match(code, /bevel-inset-thin/, 'Must render sunken Systray container');
});

test('2.4.1 - StartMenu.tsx renders vertical Windows 2000 banner and app shortcuts', () => {
  const filePath = path.join(projectRoot, 'src', 'components', 'win2k', 'StartMenu.tsx');
  assert.ok(fs.existsSync(filePath), 'StartMenu.tsx must exist');

  const code = fs.readFileSync(filePath, 'utf8');
  assert.match(code, /export\s+const\s+StartMenu/, 'Must export StartMenu component');
  assert.match(code, /Windows.*2000 Professional/, 'Must contain Windows 2000 banner');
  assert.match(code, /Quem Sou Eu/, 'Must contain shortcut to winver');
  assert.match(code, /Meus Projetos/, 'Must contain shortcut to explorer');
  assert.match(code, /Terminal Homelab/, 'Must contain shortcut to putty');
  assert.match(code, /Desligar\.\.\./, 'Must contain shutdown button');
});

test('2.5.1 - DesktopCanvas.tsx renders classic icons and connects to openWindow', () => {
  const filePath = path.join(projectRoot, 'src', 'components', 'win2k', 'DesktopCanvas.tsx');
  assert.ok(fs.existsSync(filePath), 'DesktopCanvas.tsx must exist');

  const code = fs.readFileSync(filePath, 'utf8');
  assert.match(code, /export\s+const\s+DesktopCanvas/, 'Must export DesktopCanvas component');
  assert.match(code, /Meu Computador/, 'Must render Meu Computador icon');
  assert.match(code, /Meus Projetos/, 'Must render Meus Projetos icon');
  assert.match(code, /Homelab SSH/, 'Must render Homelab SSH icon');
  assert.match(code, /Lixeira/, 'Must render Lixeira icon');
});

test('2.5.2 - src/App.tsx integrates WindowManagerProvider and DesktopCanvas', () => {
  const filePath = path.join(projectRoot, 'src', 'App.tsx');
  assert.ok(fs.existsSync(filePath), 'src/App.tsx must exist');

  const code = fs.readFileSync(filePath, 'utf8');
  assert.match(code, /WindowManagerProvider/, 'App must use WindowManagerProvider');
  assert.match(code, /DesktopCanvas/, 'App must render DesktopCanvas');
  assert.match(code, /<WinverWindow\s*\/>/, 'App must render winver window (WinverWindow)');
  assert.match(code, /WindowFrame\s+id="explorer"/, 'App must render explorer window');
  assert.match(code, /WindowFrame\s+id="mmc"/, 'App must render mmc window');
  assert.match(code, /WindowFrame\s+id="putty"/, 'App must render putty window');
});
