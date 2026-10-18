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

describe('Phase 5.2 - MMC Experience Panel Content', () => {
  test('5.2.1 - profileData.experience contains all 5 companies and roles', () => {
    const profile = readSource('src', 'data', 'profile.ts');

    assert.match(profile, /company:\s*"Ligo"/, 'Must include Ligo');
    assert.strictEqual((profile.match(/company:\s*"Code7"/g) || []).length, 2, 'Must include 2 positions at Code7');
    assert.match(profile, /company:\s*"Menendez & Menendez"/, 'Must include Menendez & Menendez');
    assert.match(profile, /company:\s*"A Solução Engenharia"/, 'Must include A Solução Engenharia');
  });

  test('5.2.2 - each experience entry defines role, company, period, highlights, and skills', () => {
    const profile = readSource('src', 'data', 'profile.ts');
    const expBlockMatch = profile.match(/experience:\s*\[([\s\S]*?)\]\s*,\s*featuredProjects:/);
    assert.ok(expBlockMatch, 'experience array must exist');
    const expBlock = expBlockMatch[1];

    assert.strictEqual((expBlock.match(/role:\s*"/g) || []).length, 5, 'Must define 5 roles');
    assert.strictEqual((expBlock.match(/company:\s*"/g) || []).length, 5, 'Must define 5 companies');
    assert.strictEqual((expBlock.match(/period:\s*"/g) || []).length, 5, 'Must define 5 periods');
    assert.strictEqual((expBlock.match(/location:\s*"/g) || []).length, 5, 'Must define 5 locations');
    assert.strictEqual((expBlock.match(/highlights:\s*\[/g) || []).length, 5, 'Must define 5 highlights arrays');
    assert.strictEqual((expBlock.match(/skills:\s*\[/g) || []).length, 5, 'Must define 5 skills arrays');
  });

  test('5.2.3 - MmcWindow renders corporate experience cards with metadata and retro icons', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /profileData\.experience\.map/, 'Must map through profileData.experience');
    assert.match(code, /exp\.role/, 'Must display exp.role');
    assert.match(code, /exp\.company/, 'Must display exp.company');
    assert.match(code, /exp\.location/, 'Must display exp.location');
    assert.match(code, /exp\.period/, 'Must display exp.period');
  });

  test('5.2.4 - MmcWindow renders bulleted achievements with retro markers', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /exp\.highlights/, 'Must support exp.highlights array');
    assert.match(code, />\s*▸\s*<\/span>/, 'Must render retro bullet marker');
  });

  test('5.2.5 - MmcWindow renders technology tags with Win2K chip styling', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /exp\.skills\.map/, 'Must map through exp.skills');
    assert.match(code, /Stack:/, 'Must label tech stack chips');
    assert.match(code, /bevel-outset-thin bg-win-face/, 'Skill chips must use Win2K bevel-outset-thin');
  });

  test('5.2.6 - MmcWindow indicates active position with current badge', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /exp\.isCurrent/, 'Must check exp.isCurrent flag');
    assert.match(code, /Atual/, 'Must render active role badge');
  });
});

describe('Phase 5.3 - Technical Skills MMC Services Matrix', () => {
  test('5.3.1 - profileData.skills defines required competencies including Kubernetes, Terraform, Go, CI/CD, and AWS', () => {
    const profile = readSource('src', 'data', 'profile.ts');
    const skillsBlockMatch = profile.match(/skills:\s*\[([\s\S]*?)\]\s*,\s*experience:/);
    assert.ok(skillsBlockMatch, 'skills array must exist before experience');
    const skillsBlock = skillsBlockMatch[1];

    for (const tech of ['Kubernetes', 'Terraform', 'Go', 'CI/CD', 'AWS']) {
      assert.ok(skillsBlock.includes(tech), `skills array must contain ${tech}`);
    }
  });

  test('5.3.2 - each skill defines category, real production application and status', () => {
    const profile = readSource('src', 'data', 'profile.ts');
    const skillsBlockMatch = profile.match(/skills:\s*\[([\s\S]*?)\]\s*,\s*experience:/);
    const skillsBlock = skillsBlockMatch[1];

    assert.ok((skillsBlock.match(/category:\s*"/g) || []).length >= 5, 'Must define categories');
    assert.ok((skillsBlock.match(/application:\s*"/g) || []).length >= 5, 'Must define real production application');
    assert.ok((skillsBlock.match(/status:\s*"/g) || []).length >= 5, 'Must define status');
  });

  test('5.3.3 - MmcWindow renders MMC Snap-in / services table with classic headers', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /<table\b/, 'Must render table element');
    assert.match(code, /Nome do Componente/, 'Must have Nome do Componente column header');
    assert.match(code, /Domínio \/ Categoria/, 'Must have Domínio / Categoria column header');
    assert.match(code, /Aplicação Prática em Produção/, 'Must have Aplicação Prática column header');
    assert.match(code, /Status/, 'Must have Status column header');
    assert.match(code, /bevel-outset-thin px-2 py-1/, 'Table headers must use Win2K bevel-outset-thin styling');
  });

  test('5.3.4 - MmcWindow iterates profileData.skills displaying name, category, and real application', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /profileData\.skills\.map/, 'Must map through profileData.skills');
    assert.match(code, /\{skill\.name\}/, 'Must display skill.name');
    assert.match(code, /\{skill\.category\}/, 'Must display skill.category');
    assert.match(code, /\{skill\.application\}/, 'Must display skill.application');
  });

  test('5.3.5 - MmcWindow displays retro status chip for each service in the matrix', () => {
    const code = readSource(...mmcPath);

    assert.match(code, /\{skill\.status\}/, 'Must display skill.status');
    assert.match(code, /skill\.status === 'Em Produção'/, 'Must style Em Produção status');
    assert.match(code, /skill\.status === 'Especialidade'/, 'Must style Especialidade status');
  });
});
