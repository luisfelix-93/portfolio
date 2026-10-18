import test, { describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const readSource = (...segments) => fs.readFileSync(path.join(projectRoot, ...segments), 'utf8');

const mmcPath = ['src', 'components', 'apps', 'MmcWindow.tsx'];

describe('Phase 5.1 - MMC Console Structure (MmcWindow.tsx)', () => {
  test('5.1.0 - component file exists and is exported via apps barrel', () => {
    assert.ok(fs.existsSync(path.join(projectRoot, ...mmcPath)), 'MmcWindow.tsx must exist');

    const code = readSource(...mmcPath);
    const barrel = readSource('src', 'components', 'apps', 'index.ts');

    assert.match(code, /export\s+const\s+MmcWindow/, 'Must export MmcWindow');
    assert.match(barrel, /export \* from '\.\/MmcWindow'/, 'apps/index.ts must re-export MmcWindow');
  });

  test('5.1.1 - wraps content in WindowFrame bound to mmc id with MMC classic menus', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /const\s+WINDOW_ID\s*=\s*'mmc'/, 'Must target the mmc window id');
    assert.match(code, /<WindowFrame[\s\S]*?id=\{WINDOW_ID\}/, 'Must render WindowFrame with WINDOW_ID');

    for (const menu of ['Console', 'Ação', 'Exibir', 'Favoritos', 'Ajuda']) {
      assert.ok(code.includes(menu), `Must contain MMC menu: ${menu}`);
    }
  });

  test('5.1.2 - renders MMC retro toolbar with navigation and management buttons', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /label="Voltar"/, 'Must contain Voltar button');
    assert.match(code, /label="Avançar"/, 'Must contain Avançar button');
    assert.match(code, /label="Subir"/, 'Must contain Subir button');
    assert.match(code, /label="Propriedades"/, 'Must contain Propriedades button');
    assert.match(code, /label="Exportar Lista\.\.\."/, 'Must contain Exportar Lista button');
  });

  test('5.1.3 - renders left console tree with "Raiz do Console" and "Gerenciamento do Computador"', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /aria-label="Árvore do Console"/, 'Must contain accessible aside label');
    assert.match(code, />Raiz do Console<\/span>/, 'Must display Raiz do Console header');
    assert.match(code, />Gerenciamento do Computador<\/span>/, 'Must display Gerenciamento do Computador node');
  });

  test('5.1.4 - renders all 3 required MMC topic indexes', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /Histórico Profissional/, 'Must contain Histórico Profissional topic');
    assert.match(code, /Habilidades Técnicas & Métricas/, 'Must contain Habilidades Técnicas & Métricas topic');
    assert.match(code, /Formação & Certificações/, 'Must contain Formação & Certificações topic');
  });

  test('5.1.5 - renders segmented status bar with tree path, record count and MMC version', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /Raiz do Console \\ Gerenciamento do Computador/, 'Status bar must display active tree path');
    assert.match(code, /MMC v1\.2/, 'Status bar must show MMC version');
    assert.match(code, /Snap-in MMC Ativo/, 'Status bar must show active snap-in status');
    assert.match(code, /bevel-inset-thin/, 'Status bar cells must use bevel-inset-thin styling');
  });

  test('5.1.6 - App.tsx integrates MmcWindow component without duplicate WindowFrame', () => {
    const app = readSource('src', 'App.tsx');

    assert.match(app, /import \{[^}]*MmcWindow[^}]*\} from '\.\/components\/apps'/, 'App must import MmcWindow');
    assert.match(app, /<MmcWindow\s*\/>/, 'App must render <MmcWindow />');
    assert.doesNotMatch(app, /WindowFrame\s+id="mmc"/, 'App must not duplicate WindowFrame id="mmc"');
  });
});
