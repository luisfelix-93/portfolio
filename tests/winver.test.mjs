import test, { describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const readSource = (...segments) => fs.readFileSync(path.join(projectRoot, ...segments), 'utf8');

const winverPath = ['src', 'components', 'apps', 'WinverWindow.tsx'];
const REQUIRED_SPECS = ['Kubernetes', 'Terraform', 'Go', 'Python', 'CI/CD', 'AWS/Azure'];

describe('Phase 3.1 - WinverWindow (winver.exe)', () => {
  test('3.1.0 - component file exists and is exported via apps barrel', () => {
    assert.ok(fs.existsSync(path.join(projectRoot, ...winverPath)), 'WinverWindow.tsx must exist');

    const code = readSource(...winverPath);
    const barrel = readSource('src', 'components', 'apps', 'index.ts');

    assert.match(code, /export\s+const\s+WinverWindow/, 'Must export WinverWindow');
    assert.match(barrel, /export \* from '\.\/WinverWindow'/, 'apps/index.ts must re-export WinverWindow');
  });

  test('3.1.1 - wraps content in WindowFrame bound to the winver window id', () => {
    const code = readSource(...winverPath);

    assert.match(code, /const\s+WINDOW_ID\s*=\s*'winver'/, 'Must target the winver window id');
    assert.match(code, /<WindowFrame[\s\S]*?id=\{WINDOW_ID\}/, 'Must render WindowFrame with WINDOW_ID');
    assert.match(code, /menuItems=\{\[\]\}/, 'winver dialog must not render a menu bar');
  });

  test('3.1.2 - renders classic Windows 2000 banner with 4-color flag', () => {
    const code = readSource(...winverPath);

    assert.match(code, /className="winver-banner/, 'Must use winver-banner class');
    assert.match(code, /Windows <span[^>]*>2000<\/span>/, 'Banner must show "Windows 2000"');
    assert.match(code, /Professional/, 'Banner must show "Professional"');
    assert.match(code, /Built on NT Technology/, 'Banner must show NT tagline');
    for (const color of ['#F25022', '#7FBA00', '#00A4EF', '#FFB900']) {
      assert.ok(code.includes(color), `Flag must include color ${color}`);
    }
  });

  test('3.1.3 - profile photo uses retro filter, accessible alt text and initials fallback', () => {
    const code = readSource(...winverPath);

    assert.match(code, /className="retro-photo/, 'Photo frame must use retro-photo class');
    assert.match(code, /alt=\{`Foto de perfil de \$\{profileData\.name\}`\}/, 'Photo must have descriptive alt');
    assert.match(code, /onError=\{\(\) => setHasPhotoFailed\(true\)\}/, 'Must handle image load failure');
    assert.match(code, /getInitials\(profileData\.name\)/, 'Fallback must render initials');
  });

  test('3.1.4 - system specs block renders Sistema, Função and Specs from profile data', () => {
    const code = readSource(...winverPath);

    assert.match(code, /label="Sistema"/, 'Must render Sistema row');
    assert.match(code, /\{profileData\.name\} - \{profileData\.system\.version\}/, 'Sistema must be "<name> - <version>"');
    assert.match(code, /label="Função">\{profileData\.title\}/, 'Função must come from profileData.title');
    assert.match(code, /label="Specs"/, 'Must render Specs row');
    assert.match(code, /profileData\.system\.specs\.map/, 'Specs must be rendered from profileData.system.specs');
    for (const tag of ['dl', 'dt', 'dd']) {
      assert.match(code, new RegExp(`<${tag}\\b`), `Specs must use semantic <${tag}>`);
    }
  });

  test('3.1.5 - OK button closes the window like the original dialog', () => {
    const code = readSource(...winverPath);

    assert.match(code, /id="winver-ok-button"/, 'OK button must have a unique id');
    assert.match(code, /className="win-button/, 'OK button must use Win32 button style');
    assert.match(code, /onClick=\{\(\) => closeWindow\(WINDOW_ID\)\}/, 'OK must close the winver window');
  });

  test('3.1.6 - keeps a single h1 and no hardcoded identity strings', () => {
    const code = readSource(...winverPath);

    assert.strictEqual((code.match(/<h1\b/g) || []).length, 1, 'Must have exactly one h1');
    assert.ok(!code.includes('Luis Felipe Felix Filho'), 'Name must come from profileData, not be hardcoded');
    assert.ok(!code.includes('luisfelix-93'), 'GitHub handle must come from profileData');
  });
});

describe('Phase 3.1 - profile data contract', () => {
  const profile = readSource('src', 'data', 'profile.ts');

  test('3.1.7 - profile exposes system version v2026 and build label', () => {
    assert.match(profile, /system:\s*\{/, 'profileData must define a system block');
    assert.match(profile, /version:\s*"v2026"/, 'System version must be v2026');
    assert.match(profile, /build:\s*"[^"]+"/, 'System must define a build label');
  });

  test('3.1.8 - role matches "Platform Engineer | Cloud & DevOps Specialist"', () => {
    assert.match(profile, /title:\s*"Platform Engineer \| Cloud & DevOps Specialist"/);
  });

  test('3.1.9 - specs list contains every required technology', () => {
    const specsMatch = profile.match(/specs:\s*\[([^\]]*)\]/);
    assert.ok(specsMatch, 'system.specs array must exist');

    const specs = [...specsMatch[1].matchAll(/"([^"]+)"/g)].map(([, spec]) => spec);
    assert.deepStrictEqual(specs, REQUIRED_SPECS);
  });
});

describe('Phase 3.1 - styles & integration', () => {
  test('3.1.10 - index.css defines winver banner and retro photo filter', () => {
    const css = readSource('src', 'index.css');

    assert.match(css, /\.winver-banner\s*\{[\s\S]*?linear-gradient/, 'winver-banner must use a gradient');
    assert.match(css, /\.retro-photo img\s*\{[\s\S]*?filter:/, 'retro-photo must filter the image');
    assert.match(css, /\.retro-photo::after\s*\{[\s\S]*?repeating-linear-gradient/, 'retro-photo must draw scanlines');
  });

  test('3.1.11 - App renders WinverWindow instead of inline winver markup', () => {
    const app = readSource('src', 'App.tsx');

    assert.match(app, /import \{ WinverWindow \} from '\.\/components\/apps'/, 'App must import WinverWindow');
    assert.match(app, /<WinverWindow\s*\/>/, 'App must render <WinverWindow />');
    assert.doesNotMatch(app, /id="winver"/, 'App must not duplicate the winver WindowFrame');
  });

  test('3.1.12 - winver window opens on boot with room for the new layout', () => {
    const context = readSource('src', 'context', 'WindowManagerContext.tsx');
    const winverBlock = context.match(/winver:\s*\{([\s\S]*?)\n\s{2}\},/);
    assert.ok(winverBlock, 'INITIAL_WINDOWS must define winver');

    assert.match(winverBlock[1], /isOpen:\s*true/, 'winver must be open on boot');
    assert.match(winverBlock[1], /size:\s*\{\s*width:\s*560,\s*height:\s*520\s*\}/, 'winver must be 560x520');
    assert.match(context, /activeWindowId:\s*'winver'/, 'winver must be focused on boot');
  });
});
