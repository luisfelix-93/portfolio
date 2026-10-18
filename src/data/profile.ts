import { Cloud, Code2, Server, Terminal } from "lucide-react";

export const profileData = {
    name: "Luis Felipe Felix Filho",
    title: "Platform Engineer | Cloud & DevOps Specialist",
    about: "Specialist in transforming infrastructure into code. Focus on Kubernetes, automation, and development of internal tools in Go, Python, Shell and NodeJS",
    system: {
        version: "v2026",
        build: "Build 2026.10 (Platform Engineering)",
        specs: ["Kubernetes", "Terraform", "Go", "Python", "CI/CD", "AWS/Azure"],
    },
    social: {
        linkedin: "https://www.linkedin.com/in/luis-felix-filho/",
        github: "https://github.com/luisfelix-93",
        email: "luis.felix.filho@hotmail.com",
    },
    skills: [
        { name: "Kubernetes & Helm", icon: Cloud, color: "text-blue-500" },
        { name: "Terraform & Ansible", icon: Server, color: "text-purple-500" },
        { name: "Go & Python", icon: Code2, color: "text-cyan-500" },
        { name: "CI/CD Pipelines", icon: Terminal, color: "text-green-500" },
    ],
    experience: [
        {
            id: 1,
            role: "Software Engineer (Platform & SRE)",
            company: "Ligo",
            location: "São Paulo, SP (Remoto)",
            period: "2024 - Presente",
            isCurrent: true,
            highlights: [
                "Projetou e automatizou pipelines de CI/CD ponta a ponta com GitHub Actions, GitLab CI e ArgoCD, alcançando deploys com zero downtime e triplicando a velocidade de release.",
                "Gerenciou e escalou infraestrutura de microsserviços em Kubernetes (AKS) e Docker, garantindo alta disponibilidade para sistemas processando mais de 10k requisições diárias.",
                "Provisionou Infraestrutura como Código (IaC) com Terraform e Ansible em nuvens AWS e Azure.",
                "Construiu stacks de observabilidade completas com Prometheus e Grafana, definindo SLOs/SLIs e mantendo 99.9% de uptime em cargas de produção.",
                "Desenvolveu fluxos orientados a eventos com RabbitMQ, reduzindo a latência de processamento em segundo plano em 50% e aprimorando a tolerância a falhas."
            ],
            description: `● Designed and automated end-to-end CI/CD pipelines using Github Actions, GitLab CI, and ArgoCD, achieving zero-downtime deployments and tripling release velocity.
● Managed and scaled microservices infrastructure on Kubernetes (AKS) and Docker, ensuring high availability and reliability for systems processing 10k+ daily requests.
● Provisioned Cloud Infrastructure with Terraform, Ansible on AWS and Azure Cloud.
● Built observability stacks using Prometheus and Grafana, defining SLOs/SLIs and maintaining 99.9% uptime across production workloads.
● Engineered asynchronous event-driven workflows with RabbitMQ, reducing background processing latency by 50% and improving fault tolerance`,
            skills: ["Kubernetes", "Docker", "Azure DevOps", "GitLab CI", "ArgoCD", "Terraform", "Prometheus", "Grafana", "RabbitMQ", "Go"]
        },
        {
            id: 2,
            role: "Infrastructure Support Analyst",
            company: "Code7",
            location: "Florianópolis, SC (Remoto)",
            period: "2021 - 2024",
            isCurrent: false,
            highlights: [
                "Aprimorou a confiabilidade e escalabilidade de plataformas de alto tráfego com mais de 5M de transações mensais em Kubernetes e SQL Server.",
                "Desenvolveu ferramentas internas de automação em Bash, Go e Python para agilizar diagnósticos e acelerar a resolução de incidentes.",
                "Atuou como líder de resposta em incidentes de produção, conduzindo análises de causa raiz (RCA) e implementando ações preventivas duradouras.",
                "Elaborou soluções de confiabilidade focadas no cliente que elevaram a aderência a SLAs e diminuíram o tempo de resposta a chamados.",
                "Mentoria técnica prestada a equipes de suporte L1/L2, resultando em diminuição mensurável do backlog e maior eficiência operacional."
            ],
            description: `● Enhanced system reliability and scalability for high-traffic platforms managing 5M+ monthly transactions on Kubernetes and SQL Server. 
● Developed internal automation tools in Bash, Go, and Python to streamline diagnostics and accelerate incident resolution. 
● Acted as lead responder for production incidents, conducting RCA (Root Cause Analysis) and implementing long-term preventive measures. 
● Designed customer-centric reliability solutions that improved SLA compliance and reduced ticket resolution time. 
● Provided technical mentorship to L1/L2 support teams, resulting in a measurable decrease in backlog and improved incident management efficiency.`,
            skills: ["Kubernetes", "SQL Server", "Bash", "Go", "Python", "RCA", "SLA", "Incident Management"]
        },
        {
            id: 3,
            role: "Software Engineer (.NET)",
            company: "Code7",
            location: "Florianópolis, SC (Remoto)",
            period: "2021",
            isCurrent: false,
            highlights: [
                "Construiu microsserviços .NET resilientes e APIs REST com 99.9% de uptime, atendendo a mais de 10k requisições por dia.",
                "Implementou filas assíncronas com RabbitMQ para maximizar throughput e reduzir o tempo de execução de jobs em 50%.",
                "Introduziu testes unitários automatizados (NUnit), reduzindo defeitos de regressão em 25% e aumentando a segurança dos releases.",
                "Formalizou contratos de API com Swagger e Postman, diminuindo conflitos de integração entre equipes em 40%.",
                "Contribuiu ativamente em cerimônias Ágeis, identificando gargalos de fluxo e elevando a velocidade de entrega dos sprints em 15%."
            ],
            description: `● Built resilient .NET microservices and REST APIs with 99.9% uptime, supporting 10k+ daily requests.
● Implemented asynchronous queues with RabbitMQ to improve throughput and reduce job processing time by 50%.
● Introduced unit testing frameworks (NUnit), cutting regression defects by 25% and increasing release safety.
● Improved cross-team collaboration by formalising API contracts (Swagger, Postman), reducing integration issues by 40%.
● Actively contributed to Agile ceremonies, helping identify bottlenecks and increasing sprint velocity by 15%.`,
            skills: [".NET", "C#", "RabbitMQ", "REST APIs", "NUnit", "Swagger", "Postman", "Agile"]
        },
        {
            id: 4,
            role: "Automation & Development Engineer",
            company: "Menendez & Menendez",
            location: "Aracaju, SE (Presencial)",
            period: "2020 - 2021",
            isCurrent: false,
            highlights: [
                "Desenvolveu e manteve ferramentas internas e plugins customizados em C#/.NET para automatizar fluxos complexos de engenharia, economizando centenas de horas operacionais.",
                "Gerenciou entregas e backlog utilizando Trello/Jira, assegurando pontualidade e rastreabilidade total dos marcos.",
                "Desenvolveu componentes de back-end em C#/.NET e Node.js e prestou suporte técnico avançado às ferramentas administrativas."
            ],
            description: `● Developed and maintained custom internal tools and plugins using C#/.NET to automate complex engineering workflows, replacing manual processes and saving significant engineering hours.
● Managed workflows using Trello/Jira, ensuring on-time delivery and transparent progress tracking.
● Developed back-end features (C#/.NET, Node.js) and provided technical support for internal administrative tools.`,
            skills: ["C#", ".NET", "Node.js", "Trello", "Jira", "Automation"]
        },
        {
            id: 5,
            role: ".NET Automation Developer",
            company: "A Solução Engenharia",
            location: "Aracaju, SE (Presencial)",
            period: "2019 - 2020",
            isCurrent: false,
            highlights: [
                "Automatizou rotinas de projetos de engenharia manipulando desenhos do AutoCAD de forma programática através da AutoCAD.NET API em C#.",
                "Desenvolveu plugins para extração de metadados, posicionamento automático de blocos geométricos e integração do AutoCAD com bibliotecas .NET externas.",
                "Criou ferramentas de geração de relatórios integradas à automação do MS Office, garantindo maior precisão aos dados do projeto."
            ],
            description: `● Automated engineering tasks by programmatically manipulating AutoCAD drawings using C# and the AutoCAD.NET API.
● Developed plugins to extract metadata, insert and position geometric blocks, and integrate AutoCAD with external .NET libraries.
● Built reporting tools leveraging MS Office automation to enhance project tracking and data accuracy.`,
            skills: ["C#", ".NET", "AutoCAD.NET API", "MS Office Automation"]
        }
    ],
    featuredProjects: [
        {
            name: "load-tester",
            repo: "https://github.com/luisfelix-93/load-tester",
            readme: "https://github.com/luisfelix-93/load-tester#readme",
            demo: "https://github.com/luisfelix-93/load-tester#usage",
            language: "Shell",
            executable: "load-tester.sh",
            summary: "Utilitário em Shell Script para testes de carga e estresse HTTP, gerando telemetria de latência e relatórios de throughput.",
            tags: ["Shell", "Bash", "Performance", "DevOps"],
        },
        {
            name: "jobs-bot",
            repo: "https://github.com/luisfelix-93/jobs-bot",
            readme: "https://github.com/luisfelix-93/jobs-bot/blob/main/docs/en-us/README.md",
            demo: "https://github.com/luisfelix-93/jobs-bot/blob/main/docs/en-us/README.md",
            language: "Go",
            executable: "jobs-bot.exe",
            summary: "Bot em Go para monitoramento e web scraping de vagas de tecnologia, disparando notificações estruturadas via Telegram.",
            tags: ["Go", "Telegram API", "Web Scraping", "Automation"],
        },
        {
            name: "lab-devops",
            repo: "https://github.com/luisfelix-93/lab-devops",
            readme: "https://github.com/luisfelix-93/lab-devops#readme",
            demo: "https://github.com/luisfelix-93/lab-devops#readme",
            language: "Go",
            executable: "lab-devops.exe",
            summary: "Laboratório prático de engenharia de plataforma: automação com Go, provisionamento Terraform, Kubernetes e observabilidade.",
            tags: ["Go", "Kubernetes", "Terraform", "CI/CD"],
        },
        {
            name: "support-agent",
            repo: "https://github.com/luisfelix-93/support-agent",
            readme: "https://github.com/luisfelix-93/support-agent#readme",
            demo: "https://github.com/luisfelix-93/support-agent#readme",
            language: "TypeScript",
            executable: "support-agent.exe",
            summary: "Agente autônomo de atendimento e suporte técnico com inteligência artificial para categorização e resposta de chamados.",
            tags: ["TypeScript", "AI Agent", "LLM", "Node.js"],
        },
    ],
    education: [
        {
            id: 1,
            institution: "Universidade Federal de Sergipe (UFS)",
            degree: "Bacharelado em Engenharia Mecânica",
            location: "Brasil",
            status: "Graduado",
        },
        {
            id: 2,
            institution: "Polytech Orléans",
            degree: "Programa de Intercâmbio em Energia, Aeronáutica & Tecnologias de Motores",
            location: "Orléans, França",
            status: "Concluído",
        },
    ],
    languages: [
        { language: "Português", level: "Nativo" },
        { language: "Inglês", level: "Fluente (C1)" },
        { language: "Francês", level: "Fluente (C1)" },
        { language: "Alemão", level: "Proficiente (A2/B1)" },
    ],
    technicalMetrics: [
        { label: "Uptime em Produção", value: "99.9%", detail: "SLA cumprido em clusters Kubernetes" },
        { label: "Transações Mensais", value: "5M+", detail: "Plataformas de alta escala monitoradas" },
        { label: "Requisições Diárias", value: "10k+", detail: "Microsserviços em produção" },
        { label: "Redução de Latência", value: "50%", detail: "Otimização de filas assíncronas com RabbitMQ" },
        { label: "Downtime em Deployments", value: "0", detail: "Pipelines CI/CD com ArgoCD e GitLab CI" },
    ]
}
