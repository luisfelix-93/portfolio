import { Cloud, Code2, Server, Terminal } from "lucide-react";

export const profileData = {
    name: "Luis Felipe Felix Filho",
    title: "Platform Engineer | Cloud & Devops Specialist",
    about: "Specialist in transforming infrastructure into code. Focus on Kubernetes, automation, and development of internal tools in Go, Python, Shell and NodeJS",
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
            role: "Software Engineer (Platform & SRE Focus)",
            company: "Ligo",
            period: "2024 - Present",
            description: `● Designed and automated end-to-end CI/CD pipelines using Github Actions, GitLab CI, and ArgoCD, achieving zero-downtime deployments and tripling release velocity.
            ● Managed and scaled microservices infrastructure on Kubernetes (AKS) and Docker, ensuring high availability and reliability for systems processing 10k+ daily requests.
            ● Collaborated with backend teams to design, instrument, and optimise distributed APIs for performance and scalability.
            ● Provisioned Cloud Infrastructure with Terraform, Ansible on AWS and Azure Cloud.
            ● Built observability stacks using Prometheus and Grafana, defining SLOs/SLIs and maintaining 99.9% uptime across production workloads.
            ● Engineered asynchronous event-driven workflows with RabbitMQ, reducing background processing latency by 50% and improving fault tolerance`,
            skills: ["Kubernetes", "AWS", "Terraform", "Go"]
        },
        {
            id: 2,
            role: "Infrastructure Support Analyst",
            company: "Code7",
            period: "2021 - 2024",
            description: `● Enhanced system reliability and scalability for high-traffic platforms managing 5M+ monthly transactions on Kubernetes and SQL Server. 
            ● Developed internal automation tools in Bash, Go, and Python to streamline diagnostics and accelerate incident resolution. 
            ● Acted as lead responder for production incidents, conducting RCA (Root Cause Analysis) and implementing long-term preventive measures. 
            ● Designed customer-centric reliability solutions that improved SLA compliance and reduced ticket resolution time. 
            ● Provided technical mentorship to L1/L2 support teams, resulting in a measurable decrease in backlog and improved incident management efficiency.`,
            skills: ["Kubernetes", "AWS", "Terraform", "Go"]
        },
        {
            id: 3,
            role: "Software Engineer",
            company: "Code7",
            period: "2021",
            description: `● Built resilient .NET microservices and REST APIs with 99.9% uptime, supporting 10k+ daily requests.
            ● Implemented asynchronous queues with RabbitMQ to improve throughput and reduce job processing time by 50%.
            ● Introduced unit testing frameworks (NUnit), cutting regression defects by 25% and increasing release safety.
            ● Improved cross-team collaboration by formalising API contracts (Swagger, Postman), reducing integration issues by 40%.
            ● Actively contributed to Agile ceremonies, helping identify bottlenecks and increasing sprint velocity by 15%.`,
            skills: [".NET", "C#", "RabbitMQ", "NUnit", "Swagger", "Agile"]
        },
        {
            id: 4,
            role: "Early Engineering Experience (Development & Automation)",
            company: "Menendez & Menedez",
            period: "2020 - 2021",
            description: `● Developed and maintained custom internal tools and plugins using C#/.NET to automate complex engineering workflows, replacing manual processes and saving significant engineering hours.
            ● Managed workflows using Trello/Jira, ensuring on-time delivery and transparent progress tracking.
            ● Developed back-end features (C#/.NET, Node.js) and provided technical support for internal administrative tools.`,
            skills: ["C#", ".NET", "Node.js", "Trello", "Jira"]
        },
        {
            id: 5,
            role: ".NET Automation Developer",
            company: "A Solução Engenharia",
            period: "2019 - 2020",
            description: `● Automated engineering tasks by programmatically manipulating AutoCAD drawings using C# and the AutoCAD.NET API.
            ● Developed plugins to extract metadata, insert and position geometric blocks, and integrate AutoCAD with external .NET libraries.
            ● Built reporting tools leveraging MS Office automation to enhance project tracking and data accuracy.`,
            skills: ["C#", ".NET", "AutoCAD API", "MS Office Automation"]
        }
    ],
    featuredProjects: [
        {
            name: "load-tester",
            repo: "https://github.com/luisfelix-93/load-tester",
            readme: "https://github.com/luisfelix-93/load-tester#readme",
            language: "Shell",
        },
        {
            name: "jobs-bot",
            repo: "https://github.com/luisfelix-93/jobs-bot",
            readme: "https://github.com/luisfelix-93/jobs-bot/blob/main/docs/en-us/README.md",
            language: "Go",
        },
        {
            name: "lab-devops",
            repo: "https://github.com/luisfelix-93/lab-devops",
            readme: "https://github.com/luisfelix-93/lab-devops#readme",
            language: "Go",
        },
        {
            name: "support-agent",
            repo: "https://github.com/luisfelix-93/support-agent",
            readme: "https://github.com/luisfelix-93/support-agent#readme",
            language: "TypeScript",
        },
    ]
}
