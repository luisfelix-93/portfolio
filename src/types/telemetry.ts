/**
 * Tipos TypeScript para a Homelab Telemetry API
 * Documentação base: homelab-telemetry-api/docs/frontend-integration.md
 */

export type ServiceStatus = 'UP' | 'DEGRADED' | 'DOWN';

export interface ServiceTelemetry {
  name: string;
  status: ServiceStatus;
  latency_ms: number;
  last_check: string; // ISO 8601 UTC string (ex: "2026-10-31T18:00:00Z")
  message: string;
}

export interface NodeTelemetry {
  id: string;
  role: 'control-plane' | 'worker' | 'standalone' | string;
  status: 'Ready' | 'NotReady' | string;
  cpu_cores: number;
  cpu_percent: number;
  memory_total_mb: number;
  memory_used_mb: number;
  uptime_seconds: number;
}

export interface ClusterResources {
  cpu_usage_percent: number;
  memory_used_bytes: number;
  memory_total_bytes: number;
  memory_usage_percent: number;
}

export interface ClusterOverview {
  cluster_name: string;
  environment: string;
  uptime_seconds: number;
  last_updated: string; // ISO 8601 UTC string
  resources: ClusterResources;
  total_nodes: number;
  healthy_nodes: number;
  total_services: number;
  healthy_services: number;
}

export interface TerminalCommandRequest {
  command: string;
  args?: string[];
}

export interface TerminalCommandResponse {
  command: string;
  output?: string;
  timestamp: string; // ISO 8601 UTC string
  output_text: string;
  data?: unknown;
}

export interface ApiErrorResponse {
  error: string;
}
