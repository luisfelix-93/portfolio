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

describe('Phase 4.3 - Project Content Cards & Details View', () => {
  test('4.3.1 - lists all 4 real projects from profileData.featuredProjects', () => {
    const profile = readSource('src', 'data', 'profile.ts');

    for (const name of ['load-tester', 'jobs-bot', 'lab-devops', 'support-agent']) {
      assert.ok(profile.includes(`name: "${name}"`), `profile.ts must contain project: ${name}`);
    }
  });

  test('4.3.2 - renders retro Win2K thumbnail bar with executable name and CRT look', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /p\.executable\s*\|\|\s*`\$\{p\.name\}\.exe`/, 'Must display executable name in retro titlebar');
    assert.match(code, /text-terminal-green/, 'Must use CRT phosphor terminal styling in thumbnail preview');
    assert.match(code, /WIN32/, 'Must render WIN32 retro badge in card header');
  });

  test('4.3.3 - renders solution summary and technical descriptions', () => {
    const profile = readSource('src', 'data', 'profile.ts');
    const code = readSource(...explorerPath);

    assert.match(profile, /summary:\s*"Utilitário em Shell Script/, 'load-tester must have solution summary');
    assert.match(profile, /summary:\s*"Bot em Go/, 'jobs-bot must have solution summary');
    assert.match(profile, /summary:\s*"Laboratório prático/, 'lab-devops must have solution summary');
    assert.match(profile, /summary:\s*"Agente autônomo/, 'support-agent must have solution summary');
    assert.match(code, /p\.summary/, 'ExplorerWindow must render project summary');
  });

  test('4.3.4 - renders stack tags with Win32 inset styling', () => {
    const profile = readSource('src', 'data', 'profile.ts');
    const code = readSource(...explorerPath);

    assert.match(profile, /tags:\s*\["Shell"/, 'Projects must include stack tags in profile');
    assert.match(code, /p\.tags\.map/, 'ExplorerWindow must iterate over tags');
    assert.match(code, /bevel-inset-thin bg-\[#F3F1EC\]/, 'Tags must be styled with Win32 bevel inset');
  });

  test('4.3.5 - renders Win32 buttons: [ Executar / Demo ] and [ Repositório GitHub ]', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /Executar \/ Demo/, 'Must render Executar / Demo button');
    assert.match(code, /Repositório GitHub/, 'Must render Repositório GitHub button');
    assert.match(code, /className="win-button[^"]*font-bold"/, 'Executar button must use prominent Win32 button styling');
  });

  test('4.3.6 - supports details table view mode with column headers', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /<table/, 'Must render table element in details mode');
    assert.match(code, />Nome<\/th>/, 'Must include Nome column header');
    assert.match(code, />Linguagem<\/th>/, 'Must include Linguagem column header');
    assert.match(code, />Resumo da Solução<\/th>/, 'Must include Resumo da Solução column header');
    assert.match(code, />Ações<\/th>/, 'Must include Ações column header');
  });
});

describe('Phase 4.4 - GitHub API Integration & Live Metrics', () => {
  test('4.4.1 - src/services/github.ts exports getFeaturedProjectsMetrics and RepoMetrics interface', () => {
    const service = readSource('src', 'services', 'github.ts');

    assert.match(service, /export\s+interface\s+RepoMetrics/, 'Must export RepoMetrics');
    assert.match(service, /export\s+const\s+getFeaturedProjectsMetrics/, 'Must export getFeaturedProjectsMetrics');
    assert.match(service, /forks_count\?:/, 'Repo interface must include forks_count');
  });

  test('4.4.2 - ExplorerWindow imports and invokes getFeaturedProjectsMetrics', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /import \{[^}]*getFeaturedProjectsMetrics[^}]*\} from '\.\.\/\.\.\/services\/github'/, 'Must import getFeaturedProjectsMetrics');
    assert.match(code, /getFeaturedProjectsMetrics\('luisfelix-93'\)/, 'Must fetch metrics for luisfelix-93');
  });

  test('4.4.3 - ExplorerWindow renders GitHub stars and forks metrics on cards', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /gitMetrics\[p\.name\.toLowerCase\(\)\]/, 'Must look up metrics by project name');
    assert.match(code, /stars<\/span>|\.stars/, 'Must render stars count');
    assert.match(code, /forks<\/span>|\.forks/, 'Must render forks count');
  });

  test('4.4.4 - status bar reflects live GitHub synchronization states', () => {
    const code = readSource(...explorerPath);

    assert.match(code, /syncStatus === 'loading'/, 'Status bar must handle loading state');
    assert.match(code, /syncStatus === 'synced'/, 'Status bar must handle synced state');
    assert.match(code, /Sincronizando GitHub\.\.\./, 'Must display loading indicator');
    assert.match(code, /100% sincronizado \(GitHub\)/, 'Must display synced indicator');
  });

  test('4.4.5 - details table includes GitHub metrics column', () => {
    const code = readSource(...explorerPath);

    assert.match(code, />GitHub<\/th>/, 'Table header must include GitHub column');
    assert.match(code, /gitMetrics\[p\.name\.toLowerCase\(\)\]\.stars/, 'Table cell must render stars');
  });
});



