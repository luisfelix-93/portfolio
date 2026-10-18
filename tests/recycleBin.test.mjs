import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const dataFilePath = path.join(projectRoot, 'src', 'data', 'recycleBin.ts');
const windowFilePath = path.join(projectRoot, 'src', 'components', 'apps', 'RecycleBinWindow.tsx');
const audioFilePath = path.join(projectRoot, 'src', 'utils', 'audioChime.ts');
const desktopFilePath = path.join(projectRoot, 'src', 'components', 'win2k', 'DesktopCanvas.tsx');
const taskbarFilePath = path.join(projectRoot, 'src', 'components', 'win2k', 'Taskbar.tsx');
const appFilePath = path.join(projectRoot, 'src', 'App.tsx');

test('7.2.1 - src/data/recycleBin.ts exports historical bugs and lessons learned', () => {
  assert.ok(fs.existsSync(dataFilePath), 'recycleBin.ts must exist');
  const code = fs.readFileSync(dataFilePath, 'utf8');

  assert.match(code, /export\s+interface\s+RecycleBinItem/, 'Must export RecycleBinItem interface');
  assert.match(code, /export\s+const\s+RECYCLE_BIN_ITEMS/, 'Must export RECYCLE_BIN_ITEMS list');
  assert.match(code, /deploy_na_sexta_18h\.sh/, 'Must contain legacy bug examples');
  assert.match(code, /lessonLearned/, 'Must include lessons learned for engineering growth');
});

test('7.2.2 - RecycleBinWindow.tsx renders authentic Win2K Recycle Bin window', () => {
  assert.ok(fs.existsSync(windowFilePath), 'RecycleBinWindow.tsx must exist');
  const code = fs.readFileSync(windowFilePath, 'utf8');

  assert.match(code, /export\s+const\s+RecycleBinWindow/, 'Must export RecycleBinWindow');
  assert.match(code, /WindowFrame\s+id="trash"/, 'Must wrap content in WindowFrame bound to trash');
  assert.match(code, /Esvaziar Lixeira/, 'Must contain Esvaziar Lixeira action button');
  assert.match(code, /Restaurar Todos/, 'Must contain Restaurar Todos action button');
  assert.match(code, /Tocar Som Win2K/, 'Must provide button to trigger classic startup chime');
});

test('7.2.3 - audioChime.ts synthesizes classic Windows 2000 chime with muted default', () => {
  assert.ok(fs.existsSync(audioFilePath), 'audioChime.ts must exist');
  const code = fs.readFileSync(audioFilePath, 'utf8');

  assert.match(code, /let\s+isMuted\s*=\s*true/, 'Audio must be muted by default (respecting user preference)');
  assert.match(code, /export\s+const\s+playStartupChime/, 'Must export playStartupChime');
  assert.match(code, /AudioContext/, 'Must use Web Audio API for zero external dependency sound synthesis');
});

test('7.2.4 - DesktopCanvas.tsx binds Lixeira to windowId trash', () => {
  assert.ok(fs.existsSync(desktopFilePath), 'DesktopCanvas.tsx must exist');
  const code = fs.readFileSync(desktopFilePath, 'utf8');

  assert.match(code, /id:\s*'trash'[\s\S]*windowId:\s*'trash'/, 'Lixeira desktop icon must have windowId: trash');
});

test('7.2.5 - Taskbar.tsx integrates trash tab icon and Systray audio mute/unmute control', () => {
  assert.ok(fs.existsSync(taskbarFilePath), 'Taskbar.tsx must exist');
  const code = fs.readFileSync(taskbarFilePath, 'utf8');

  assert.match(code, /case\s+'trash':/, 'Taskbar must render trash tab icon');
  assert.match(code, /handleToggleAudio/, 'Taskbar must handle audio mute toggle');
  assert.match(code, /playStartupChime/, 'Unmuting or clicking audio plays classic startup chime');
});

test('7.2.6 - App.tsx renders RecycleBinWindow inside DesktopCanvas', () => {
  assert.ok(fs.existsSync(appFilePath), 'App.tsx must exist');
  const code = fs.readFileSync(appFilePath, 'utf8');

  assert.match(code, /RecycleBinWindow/, 'App.tsx must import RecycleBinWindow');
  assert.match(code, /<RecycleBinWindow\s*\/>/, 'App.tsx must render RecycleBinWindow');
});
