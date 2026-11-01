import test, { describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const fileExists = (...segments) => fs.existsSync(path.join(projectRoot, ...segments));
const readSource = (...segments) => {
  const filePath = path.join(projectRoot, ...segments);
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
};

const puttyPath = ['src', 'components', 'apps', 'PuttyWindow.tsx'];
const typesPath = ['src', 'types', 'telemetry.ts'];
const apiPath = ['src', 'services', 'telemetryApi.ts'];

describe('Phase 6.0 - Telemetry Types & Service Contracts', () => {
  test('6.0.1 - src/types/telemetry.ts defines all required telemetry interfaces', () => {
    assert.ok(fileExists(...typesPath), 'src/types/telemetry.ts must exist');

    const typesCode = readSource(...typesPath);
    assert.match(typesCode, /export\s+type\s+ServiceStatus\s*=/, 'Must export ServiceStatus type');
    assert.match(typesCode, /export\s+interface\s+ServiceTelemetry/, 'Must export ServiceTelemetry interface');
    assert.match(typesCode, /export\s+interface\s+NodeTelemetry/, 'Must export NodeTelemetry interface');
    assert.match(typesCode, /export\s+interface\s+ClusterResources/, 'Must export ClusterResources interface');
    assert.match(typesCode, /export\s+interface\s+ClusterOverview/, 'Must export ClusterOverview interface');
    assert.match(typesCode, /export\s+interface\s+TerminalCommandRequest/, 'Must export TerminalCommandRequest interface');
    assert.match(typesCode, /export\s+interface\s+TerminalCommandResponse/, 'Must export TerminalCommandResponse interface');
    assert.match(typesCode, /export\s+interface\s+ApiErrorResponse/, 'Must export ApiErrorResponse interface');
  });

  test('6.0.2 - src/services/telemetryApi.ts exports client and fallback configurations', () => {
    assert.ok(fileExists(...apiPath), 'src/services/telemetryApi.ts must exist');

    const apiCode = readSource(...apiPath);
    assert.match(apiCode, /export\s+const\s+DEFAULT_TELEMETRY_API_URL/, 'Must export DEFAULT_TELEMETRY_API_URL');
    assert.match(apiCode, /export\s+const\s+FALLBACK_OVERVIEW/, 'Must export FALLBACK_OVERVIEW');
    assert.match(apiCode, /export\s+const\s+FALLBACK_SERVICES/, 'Must export FALLBACK_SERVICES');
    assert.match(apiCode, /export\s+const\s+FALLBACK_NODES/, 'Must export FALLBACK_NODES');
    assert.match(apiCode, /export\s+const\s+generateLocalCommandResponse/, 'Must export generateLocalCommandResponse');
    assert.match(apiCode, /export\s+const\s+telemetryApi\s*=/, 'Must export telemetryApi object');
    assert.match(apiCode, /checkHealth:/, 'telemetryApi must provide checkHealth method');
    assert.match(apiCode, /getOverview:/, 'telemetryApi must provide getOverview method');
    assert.match(apiCode, /getServices:/, 'telemetryApi must provide getServices method');
    assert.match(apiCode, /getNodes:/, 'telemetryApi must provide getNodes method');
    assert.match(apiCode, /sendCommand:/, 'telemetryApi must provide sendCommand method');
  });

  test('6.0.3 - telemetryApi implements timeout protection and HTTP 400 response handling', () => {
    const apiCode = readSource(...apiPath);
    assert.match(apiCode, /AbortController/, 'Fetch client must use AbortController for timeouts');
    assert.match(apiCode, /output_text/, 'Client must preserve output_text on HTTP 400 responses');
  });
});

describe('Phase 6.1 - PuttyWindow Component & Barrel Integration', () => {
  test('6.1.1 - PuttyWindow.tsx exists and is exported via apps barrel', () => {
    assert.ok(fileExists(...puttyPath), 'PuttyWindow.tsx must exist');

    const code = readSource(...puttyPath);
    const barrel = readSource('src', 'components', 'apps', 'index.ts');

    assert.match(code, /export\s+const\s+PuttyWindow/, 'Must export PuttyWindow component');
    assert.match(barrel, /export\s+\*\s+from\s+['"]\.\/PuttyWindow['"]/, 'apps/index.ts must re-export PuttyWindow');
  });

  test('6.1.2 - wraps content in WindowFrame bound to the putty window id', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /id=["']putty["']/, 'Must render WindowFrame bound to "putty" id');
  });

  test('6.1.3 - App.tsx renders PuttyWindow component instead of inline placeholder', () => {
    const app = readSource('src', 'App.tsx');

    assert.match(app, /import\s+\{[^}]*PuttyWindow[^}]*\}\s+from\s+['"]\.\/components\/apps['"]/, 'App must import PuttyWindow');
    assert.match(app, /<PuttyWindow\s*\/>/, 'App must render <PuttyWindow />');
    assert.doesNotMatch(app, /<WindowFrame[^>]*id="putty"/, 'App must not contain inline WindowFrame with id="putty"');
  });
});

describe('Phase 6.2 - PuTTY Visual Shell & CRT Aesthetic', () => {
  test('6.2.1 - uses authentic CRT terminal typography and phosphor green color scheme', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /font-terminal/, 'Terminal must use font-terminal (Courier Prime)');
    assert.match(code, /bg-terminal-bg|bg-black/, 'Terminal background must be black / bg-terminal-bg');
    assert.match(code, /text-terminal-green|#00FF66|#00ff66/, 'Terminal text must be CRT phosphor green');
  });

  test('6.2.2 - renders ASCII Art banner and initial connection greeting', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /HOMELAB|homelab/i, 'Must display Homelab ASCII Art or header banner');
    assert.match(code, /SSH-2\.0|OpenSSH|homelab-core:22/, 'Must display SSH connection banner message');
  });

  test('6.2.3 - renders authentic block cursor with pulsing animation', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /animate-pulse/, 'Terminal cursor must pulse');
    assert.match(code, /bg-terminal-green|bg-\[\#00FF66\]/, 'Cursor must have phosphor green background');
  });
});

describe('Phase 6.3 - Interactive CLI Prompt & Command Parser', () => {
  test('6.3.1 - renders interactive prompt with visitante@homelab-core:~$', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /visitante@homelab-core:~\$/, 'Prompt must display visitante@homelab-core:~$');
    assert.match(code, /<input[^>]*type=["']text["']/, 'Must render text input for command typing');
  });

  test('6.3.2 - terminal automatically focuses input on canvas click', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /inputRef|focus\(\)/, 'Must hold input ref and support auto-focus on terminal click');
  });

  test('6.3.3 - supports command history navigation with ArrowUp and ArrowDown', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /ArrowUp/, 'Must handle ArrowUp for history navigation');
    assert.match(code, /ArrowDown/, 'Must handle ArrowDown for history navigation');
  });

  test('6.3.4 - implements local commands: help, clear, neofetch, docker ps, cat contato.txt', () => {
    const code = readSource(...puttyPath);

    for (const cmd of ['help', 'clear', 'neofetch', 'docker', 'contato']) {
      assert.ok(code.toLowerCase().includes(cmd), `Must implement handler or response for command: ${cmd}`);
    }
  });

  test('6.3.5 - integrates telemetryApi.sendCommand for status, services, and nodes commands', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /telemetryApi|sendCommand/, 'Must integrate telemetryApi.sendCommand for live cluster commands');
  });

  test('6.3.6 - displays helpful error message on unrecognized commands', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /Command not found|Comando não reconhecido/i, 'Must show helpful message for unrecognized commands');
  });
});

describe('Phase 6.4 - Status Bar & Telemetry Indicator', () => {
  test('6.4.1 - status bar displays SSH encryption, protocol version, and latency/status', () => {
    const code = readSource(...puttyPath);

    assert.match(code, /SSH-2\.0/, 'Status bar must show SSH-2.0 protocol');
    assert.match(code, /AES-256/, 'Status bar must show AES-256 encryption');
    assert.match(code, /ONLINE|OFFLINE|Conectado/i, 'Status bar must show connection status indicator');
  });
});
