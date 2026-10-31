/**
 * Cliente HTTP e Camada de Resiliência para a Homelab Telemetry API
 * Documentação: homelab-telemetry-api/docs/frontend-integration.md
 */

import type {
  ClusterOverview,
  NodeTelemetry,
  ServiceTelemetry,
  TerminalCommandResponse,
} from '../types/telemetry';

export const DEFAULT_TELEMETRY_API_URL =
  'https://telemetry.support-homelab.api.br/api/v1';

export const getTelemetryApiUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TELEMETRY_API_URL) {
    return import.meta.env.VITE_TELEMETRY_API_URL;
  }
  return DEFAULT_TELEMETRY_API_URL;
};

// Snapshot de contingência (fallback gracioso em caso de API offline ou falha de rede)
export const FALLBACK_OVERVIEW: ClusterOverview = {
  cluster_name: 'homelab-alpha',
  environment: 'bare-metal-edge',
  uptime_seconds: 124580,
  last_updated: new Date().toISOString(),
  resources: {
    cpu_usage_percent: 14.8,
    memory_used_bytes: 8589934592,
    memory_total_bytes: 34359738368,
    memory_usage_percent: 25.0,
  },
  total_nodes: 1,
  healthy_nodes: 1,
  total_services: 2,
  healthy_services: 2,
};

export const FALLBACK_SERVICES: ServiceTelemetry[] = [
  {
    name: 'mcp-server',
    status: 'UP',
    latency_ms: 32,
    last_check: new Date().toISOString(),
    message: 'HTTP 200 OK',
  },
  {
    name: 'support-agent',
    status: 'UP',
    latency_ms: 58,
    last_check: new Date().toISOString(),
    message: 'HTTP 200 OK',
  },
];

export const FALLBACK_NODES: NodeTelemetry[] = [
  {
    id: 'master-node-01',
    role: 'control-plane',
    status: 'Ready',
    cpu_cores: 16,
    cpu_percent: 12.5,
    memory_total_mb: 32768,
    memory_used_mb: 8192,
    uptime_seconds: 124580,
  },
];

/**
 * Gera respostas formatadas para comandos do terminal quando executados em modo offline/fallback.
 */
export const generateLocalCommandResponse = (
  rawCommand: string
): TerminalCommandResponse => {
  const timestamp = new Date().toISOString();
  const cleanCmd = rawCommand.trim().toLowerCase();

  if (cleanCmd === 'status') {
    return {
      command: 'status',
      timestamp,
      output_text:
        `Cluster: ${FALLBACK_OVERVIEW.cluster_name} (${FALLBACK_OVERVIEW.environment})\n` +
        `Uptime: ${FALLBACK_OVERVIEW.uptime_seconds}s | Nodes: ${FALLBACK_OVERVIEW.healthy_nodes}/${FALLBACK_OVERVIEW.total_nodes} Healthy | Services: ${FALLBACK_OVERVIEW.healthy_services}/${FALLBACK_OVERVIEW.total_services} Healthy\n` +
        `CPU Usage: ${FALLBACK_OVERVIEW.resources.cpu_usage_percent.toFixed(1)}% | Memory Usage: ${FALLBACK_OVERVIEW.resources.memory_usage_percent.toFixed(1)}% [Offline Cache]`,
      data: FALLBACK_OVERVIEW,
    };
  }

  if (cleanCmd === 'services') {
    const lines = [
      'NAME             STATUS    LATENCY    MESSAGE',
      '----             ------    -------    -------',
      ...FALLBACK_SERVICES.map(
        (s) =>
          `${s.name.padEnd(16)} ${s.status.padEnd(9)} ${`${s.latency_ms}ms`.padEnd(10)} ${s.message}`
      ),
    ];
    return {
      command: 'services',
      timestamp,
      output_text: lines.join('\n') + '\n(Dados em cache offline)',
      data: FALLBACK_SERVICES,
    };
  }

  if (cleanCmd === 'nodes') {
    const lines = [
      'NODE ID          ROLE             STATUS    CPU CORES    CPU%     MEM USED/TOTAL',
      '-------          ----             ------    ---------    ----     --------------',
      ...FALLBACK_NODES.map(
        (n) =>
          `${n.id.padEnd(16)} ${n.role.padEnd(16)} ${n.status.padEnd(9)} ${String(n.cpu_cores).padEnd(12)} ${`${n.cpu_percent}%`.padEnd(8)} ${Math.round(n.memory_used_mb / 1024)}GB / ${Math.round(n.memory_total_mb / 1024)}GB`
      ),
    ];
    return {
      command: 'nodes',
      timestamp,
      output_text: lines.join('\n') + '\n(Dados em cache offline)',
      data: FALLBACK_NODES,
    };
  }

  if (cleanCmd === 'help') {
    return {
      command: 'help',
      timestamp,
      output_text:
        'Comandos disponíveis:\n' +
        '  status       - Resumo de saúde e recursos do cluster\n' +
        '  services     - Listagem dos microserviços e latências\n' +
        '  nodes        - Métricas de hardware dos nós K3s\n' +
        '  neofetch     - Informações do sistema do host homelab\n' +
        '  docker ps    - Lista de containers em execução\n' +
        '  cat contato.txt - Exibe contatos e links profissionais\n' +
        '  ping [host]  - Mede latência de rede\n' +
        '  clear        - Limpa o terminal\n' +
        '  help         - Exibe esta mensagem de ajuda',
      data: {
        commands: [
          'status',
          'services',
          'nodes',
          'neofetch',
          'docker ps',
          'cat contato.txt',
          'ping',
          'clear',
          'help',
        ],
      },
    };
  }

  if (cleanCmd === 'clear') {
    return {
      command: 'clear',
      timestamp,
      output_text: '',
      data: null,
    };
  }

  return {
    command: rawCommand,
    timestamp,
    output_text: `Command not found: '${rawCommand}'. Type 'help' for available commands.`,
  };
};

/**
 * Wrapper de Fetch com suporte a timeout e abort
 */
export async function fetchWithTimeout<T>(
  endpoint: string,
  options?: RequestInit,
  timeoutMs: number = 3000
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const baseUrl = getTelemetryApiUrl();
  const url = `${baseUrl.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        // A API de telemetria responde HTTP 400 com body formatado para o terminal
        if (errorData && typeof errorData.output_text === 'string') {
          return errorData as T;
        }
      } catch {
        // Ignora caso a resposta de erro não seja JSON
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export const telemetryApi = {
  checkHealth: async (): Promise<{ status: string; isOnline: boolean }> => {
    try {
      const data = await fetchWithTimeout<{ status: string }>('/health', { method: 'GET' }, 2000);
      return { status: data.status || 'ok', isOnline: true };
    } catch {
      return { status: 'offline', isOnline: false };
    }
  },

  getOverview: async (): Promise<ClusterOverview> => {
    try {
      return await fetchWithTimeout<ClusterOverview>('/telemetry/overview', { method: 'GET' });
    } catch (err) {
      console.warn('Telemetry overview offline, using fallback:', err);
      return FALLBACK_OVERVIEW;
    }
  },

  getServices: async (): Promise<ServiceTelemetry[]> => {
    try {
      return await fetchWithTimeout<ServiceTelemetry[]>('/telemetry/services', { method: 'GET' });
    } catch (err) {
      console.warn('Telemetry services offline, using fallback:', err);
      return FALLBACK_SERVICES;
    }
  },

  getNodes: async (): Promise<NodeTelemetry[]> => {
    try {
      return await fetchWithTimeout<NodeTelemetry[]>('/telemetry/nodes', { method: 'GET' });
    } catch (err) {
      console.warn('Telemetry nodes offline, using fallback:', err);
      return FALLBACK_NODES;
    }
  },

  sendCommand: async (command: string, args?: string[]): Promise<TerminalCommandResponse> => {
    const trimmed = command.trim();
    if (trimmed.toLowerCase() === 'clear') {
      return {
        command: 'clear',
        timestamp: new Date().toISOString(),
        output_text: '',
        data: null,
      };
    }

    try {
      const payload: { command: string; args?: string[] } = { command: trimmed };
      if (args && args.length > 0) {
        payload.args = args;
      }

      return await fetchWithTimeout<TerminalCommandResponse>('/cmd', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn(`Telemetry API sendCommand offline for '${command}', using local generator:`, err);
      return generateLocalCommandResponse(trimmed);
    }
  },
};
