export interface RecycleBinItem {
  id: string;
  name: string;
  originalLocation: string;
  dateDeleted: string;
  size: string;
  type: string;
  lessonLearned: string;
  details: string;
}

export const RECYCLE_BIN_ITEMS: RecycleBinItem[] = [
  {
    id: 'item-1',
    name: 'deploy_na_sexta_18h.sh',
    originalLocation: 'C:\\DevOps\\Scripts\\Perigosos',
    dateDeleted: '12/03/2021 17:58',
    size: '4 KB',
    type: 'Script Shell Obsoleto',
    lessonLearned: 'Pipelines com gates automáticos de aprovação e zero deploys arriscados em horários de pico.',
    details: 'Um script arcaico que realizava upload direto para a VM sem passar por testes automatizados nem verificação de qualidade. Hoje totalmente substituído por esteiras de CI/CD rigorosas no GitLab CI e GitHub Actions com canary/blue-green deployments.',
  },
  {
    id: 'item-2',
    name: 'cluster_k8s_sem_resource_limits.yaml',
    originalLocation: 'C:\\Kubernetes\\Manifests\\Antigos',
    dateDeleted: '05/08/2022 14:22',
    size: '12 KB',
    type: 'Manifesto K8s Inseguro',
    lessonLearned: 'Sempre declarar requests e limits de CPU/memória para prevenir OOMKilled e contenção de nós.',
    details: 'Configuração antiga em que containers disputavam recursos da máquina hospedeira de forma desordenada. Substituído por políticas de LimitRange, ResourceQuota e monitoramento com Prometheus + alertmanager.',
  },
  {
    id: 'item-3',
    name: 'console.log_em_producao.js',
    originalLocation: 'C:\\Frontend\\Legacy\\Debug',
    dateDeleted: '19/11/2022 09:15',
    size: '2 KB',
    type: 'Debug Amador',
    lessonLearned: 'Logs estruturados em formato JSON e observabilidade distribuída com OpenTelemetry.',
    details: 'Snippet clássico de tentativa e erro deixado em produção para acompanhar requisições. Substituído por logs correlacionados por Trace ID, métricas APM e dashboards Grafana.',
  },
  {
    id: 'item-4',
    name: 'query_sem_where_no_banco.sql',
    originalLocation: 'C:\\Database\\Scripts\\Ad-hoc',
    dateDeleted: '27/04/2023 11:40',
    size: '18 KB',
    type: 'Script SQL Destrutivo',
    lessonLearned: 'Execuções de banco controladas por migrations versionadas e transações com rollback automático.',
    details: 'Uma query perigosa que quase atualizou dados em massa em homologação. Resultou na adoção de migrations declarativas versionadas (Flyway / EF Core) e políticas estritas de permissão baseadas em RBAC.',
  },
  {
    id: 'item-5',
    name: 'senha_em_texto_puro_env.txt',
    originalLocation: 'C:\\Projetos\\Configs\\Inseguras',
    dateDeleted: '14/01/2024 16:30',
    size: '1 KB',
    type: 'Falha Crítica de Segurança',
    lessonLearned: 'Segredos e credenciais devem ser injetados em runtime via HashiCorp Vault ou KMS, nunca commitados.',
    details: 'Arquivo de ambiente arcaico contendo tokens de API em texto puro. Hoje, scanners de segredos (TruffleHog e GitGuardian) atuam no pre-commit hook e nos pipelines de integração.',
  },
];
