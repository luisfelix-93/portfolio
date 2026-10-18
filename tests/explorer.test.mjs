import test, { describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const readSource = (...segments) => fs.readFileSync(path.join(projectRoot, ...segments), 'utf8');

const explorerPath = ['src', 'components', 'apps', 'ExplorerWindow.tsx'];

describe('Phase 4.1 - ExplorerWindow Structure (Windows Explorer)', () => {
  test('4.1.0 - component file exists and is exported via apps barrel', () => {
    assert.ok(fs.existsSync(path.join(projectRoot, ...explorerPath)), 'ExplorerWindow.tsx must exist');

    const code = readSource(...explorerPath);
    const barrel = readSource('src', 'components', 'apps', 'index.ts');

    assert.match(code, /export\s+const\s+ExplorerWindow/, 'Must export ExplorerWindow');
    assert.match(barrel, /export \* from '\.\/ExplorerWindow'/, 'apps/index.ts must re-export ExplorerWindow');
  });

  test('4.1.1 - wraps content in WindowFrame bound to the explorer window id with classic explorer menus', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /const\s+WINDOW_ID\s*=\s*'explorer'/, 'Must target the explorer window id');
    assert.match(code, /<WindowFrame[\s\S]*?id=\{WINDOW_ID\}/, 'Must render WindowFrame with WINDOW_ID');

    for (const menu of ['Arquivo', 'Editar', 'Exibir', 'Favoritos', 'Ferramentas', 'Ajuda']) {
      assert.ok(code.includes(menu), `Must contain classic Explorer menu: ${menu}`);
    }
  });

  test('4.1.2 - renders retro toolbar with Voltar, Avançar, Subir, and Visualizar buttons', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /label="Voltar"/, 'Must contain Voltar button');
    assert.match(code, /label="Avançar"/, 'Must contain Avançar button');
    assert.match(code, /label="Subir"/, 'Must contain Subir button');
    assert.match(code, /label="Visualizar"/, 'Must contain Visualizar button');
    assert.match(code, /label="Pastas"/, 'Must contain Pastas button');
  });

  test('4.1.3 - renders address bar with C:\\Projetos\\Destaques and Ir button', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /Endereço/, 'Must render Endereço label');
    assert.match(code, /C:\\\\Projetos\\\\Destaques/, 'Must have initial address set to C:\\Projetos\\Destaques');
    assert.match(code, />Ir<\/span>|Ir/, 'Must render Ir navigation button');
    assert.match(code, /<input[^>]*value=\{pathInput\}/, 'Must bind address input');
  });

  test('4.1.4 - renders segmented status bar with item count and GitHub sync status', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /objeto\(s\)\s+selecionado\(s\)/, 'Status bar must display selected object count');
    assert.match(code, /sincronizado.*GitHub/i, 'Status bar must display GitHub synchronization status');
    assert.match(code, /Meu Computador/, 'Status bar must show security zone / Meu Computador');
    assert.match(code, /bevel-inset-thin/, 'Status bar cells must use bevel-inset-thin styling');
  });

  test('4.1.5 - App.tsx integrates ExplorerWindow component', () => {
    const app = readSource('src', 'App.tsx');

    assert.match(app, /import \{[^}]*ExplorerWindow[^}]*\} from '\.\/components\/apps'/, 'App must import ExplorerWindow');
    assert.match(app, /<ExplorerWindow\s*\/>/, 'App must render <ExplorerWindow />');
    assert.doesNotMatch(app, /id="explorer"/, 'App must not duplicate WindowFrame id="explorer"');
  });
});

describe('Phase 4.2 - Left Folders Tree View (Painel Lateral de Pastas)', () => {
  test('4.2.1 - renders left aside panel with "Pastas" header and close button', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /aria-label="Árvore de Pastas"/, 'Must contain accessible aside label');
    assert.match(code, />Pastas<\/span>/, 'Must display Pastas header');
    assert.match(code, /title="Fechar painel Pastas"/, 'Must have button to close folders pane');
  });

  test('4.2.2 - renders hierarchical tree nodes: Meu Computador -> Disco Local (C:) -> Projetos', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /label:\s*'Meu Computador'/, 'Must define Meu Computador node');
    assert.match(code, /label:\s*'Disco Local \(C:\)'/, 'Must define Disco Local (C:) node');
    assert.match(code, /label:\s*'Projetos'/, 'Must define Projetos folder');
    assert.match(code, /path:\s*'C:\\\\Projetos'/, 'Must target C:\\Projetos path');
  });

  test('4.2.3 - renders all category subfolders: DevOps & Infra, Full-Stack & Bots, Ferramentas Go/Shell', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /label:\s*'DevOps & Infra'/, 'Must contain DevOps & Infra folder');
    assert.match(code, /label:\s*'Full-Stack & Bots'/, 'Must contain Full-Stack & Bots folder');
    assert.match(code, /label:\s*'Ferramentas Go\/Shell'/, 'Must contain Ferramentas Go/Shell folder');
    assert.match(code, /label:\s*'Destaques'/, 'Must contain Destaques folder');
  });

  test('4.2.4 - renders tree expand/collapse [+] and [-] triggers with aria labels', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /toggleExpand/, 'Must provide toggleExpand handler');
    assert.match(code, /aria-label=\{isExpanded \? 'Recolher pasta' : 'Expandir pasta'\}/, 'Must have accessible expand/collapse label');
    assert.match(code, /\{isExpanded \? '-' : '\+'\}/, 'Must visually display + and - signs');
  });

  test('4.2.5 - supports toggling folder pane via toolbar "Pastas" button', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /setShowFoldersPane\(!showFoldersPane\)/, 'Toolbar Pastas button must toggle showFoldersPane');
    assert.match(code, /active=\{showFoldersPane\}/, 'Toolbar Pastas button must reflect active state');
  });

  test('4.2.6 - filters visible projects based on active folder category', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /getProjectsByCategory/, 'Must define category filtering logic');
    assert.match(code, /resolveActiveCategory/, 'Must resolve category from active folder or path');
    assert.match(code, /visibleProjects\.map/, 'Must render filtered visible projects');
  });
});

