# 📋 TODO — Implementação do Portfólio Windows 2000 Professional

> **Status Geral do Projeto:** 🟡 Planejado / Pronto para Início  
> **Referência de Design:** Stitch Project `12725235522476295905`  
> **Plano Base:** [`plans/retro-win2k-portfolio.md`](plans/retro-win2k-portfolio.md)  
> **Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React  

---

## Legenda de Status
- ⬜ `[ ]` Não iniciado
- 🟡 `[/]` Em andamento
- ✅ `[x]` Concluído
- ⛔ `[!]` Bloqueado / Impedimento

---

## 🎨 Fase 1: Design Tokens & Sistema de Chanfros Win2K ✅
*Meta: Estabelecer a fundação estética inegociável do Windows 2000 (cores, chanfros 3D e fontes).*

- [x] **1.1 Configuração Tipográfica & Fontes**
  - [x] Importar fontes clássicas via Google Fonts / webfonts (`Tahoma`, `Courier Prime` / `Lucida Console`).
  - [x] Configurar fallbacks no `index.html` e `index.css` (`Tahoma, MS Sans Serif, sans-serif`).
  - [x] Definir tamanhos fixos sem anti-aliasing borrado (8pt a 12pt).
- [x] **1.2 Tokens de Cores & Configuração Tailwind**
  - [x] Estender `tailwind.config.js` com a paleta oficial Win2K:
    - Fundo do Desktop: `#3A6EA5` (Classic Desktop Blue) e `#008080` (Teal).
    - 3D Face (Neutro): `#D4D0C8`.
    - Realces e Sombras: High Light `#FFFFFF`, Soft Light `#DFDFDF`, Shadow `#808080`, Dark Shadow `#404040`.
    - Barra de Título Ativa: `#0A246A` -> `#A6CAF0`.
    - Barra de Título Inativa: `#808080` -> `#C0C0C0`.
    - Terminal: Fundo `#000000`, Verde Fósforo `#00FF66`, Cinza `#CCCCCC`.
- [x] **1.3 Classes Utilitárias de Chanfros 3D (Bevels)**
  - [x] Criar classe `.bevel-outset` (relevo projetado: bordas superiores claras, inferiores escuras).
  - [x] Criar classe `.bevel-inset` (relevo rebaixado: bordas superiores escuras, inferiores claras).
  - [x] Criar classe `.win-button` (botão Win32 com efeito óptico de clique e deslocamento 1px).
  - [x] Criar gradientes utilitários para barras de título ativas e inativas.
- [x] **1.4 Validação e Teste Visual dos Primitivos**
  - [x] Validar contraste de texto contra superfícies `#D4D0C8` e azul marinho `#0A246A`.

---

## 🪟 Fase 2: Window Manager & Shell Base (Desktop + Taskbar) ✅
*Meta: Criar o ambiente de sistema operacional completo que gerencia múltiplas janelas e foco.*

- [x] **2.1 Contexto e Gerenciador de Janelas (`WindowManagerContext`)**
  - [x] Criar tipo `WindowState` (`id`, `title`, `icon`, `isOpen`, `isMinimized`, `isMaximized`, `zIndex`, `position`, `size`).
  - [x] Implementar hook e reducer para: `openWindow`, `closeWindow`, `minimizeWindow`, `toggleMaximize`, `bringToFront`.
  - [x] Gerenciar ordem Z (`z-index`) para alternar foco ao clicar em qualquer parte de uma janela.
- [x] **2.2 Componente Base de Janela (`WindowFrame.tsx`)**
  - [x] Barra de título com gradiente ativo/inativo, ícone da janela e nome em negrito.
  - [x] Trio de botões clássicos `[ _ ] [ 口 ] [ X ]` funcionais.
  - [x] Barra de menus opcional (`Arquivo`, `Editar`, `Exibir`, `Ajuda`).
  - [x] Suporte a arrastar janela pela barra de título (drag & drop com limites na tela).
- [x] **2.3 Barra de Tarefas Inferior (`Taskbar.tsx`)**
  - [x] Fixada no rodapé inferior (altura ~30px, cor `#D4D0C8`, borda superior `#FFFFFF`).
  - [x] Botão Iniciar com logotipo clássico de 4 cores e estado ativo rebaixado.
  - [x] Lista de botões das janelas abertas (relevo normal quando minimizada/em fundo, rebaixado quando focada).
  - [x] Bandeja do sistema (Systray rebaixado com relógio digital em tempo real e ícones de status).
- [x] **2.4 Menu Iniciar (`StartMenu.tsx`)**
  - [x] Faixa vertical clássica lateral "Windows 2000 Professional".
  - [x] Atalhos para abrir cada uma das 4 aplicações do portfólio.
  - [x] Botão "Desligar / Reiniciar" com diálogo de confirmação retrô.
- [x] **2.5 Área de Trabalho (`DesktopCanvas.tsx`)**
  - [x] Fundo sólido `#3A6EA5` preenchendo 100vw x 100vh sem rolagem indesejada.
  - [x] Grade de ícones clássicos no lado esquerdo com rótulo de texto e seleção ao clicar.
  - [x] Suporte a duplo-clique (e clique simples em mobile) para abrir a aplicação associada.

---

## 👤 Fase 3: Tela 1 — Apresentação ("Quem Sou Eu" / `winver.exe`) ✅
*Meta: Primeira impressão do recrutador apresentando Luis Felipe com estética de specs de sistema.*

- [x] **3.1 Componente `WinverWindow.tsx`**
  - [x] Cabeçalho com banner clássico do Windows 2000 / Foto de perfil com filtro retrô.
  - [x] Bloco de especificações de sistema:
    - Sistema: "Luis Felipe Felix Filho - v2026".
    - Função: "Platform Engineer | Cloud & DevOps Specialist".
    - Specs: Kubernetes, Terraform, Go, Python, CI/CD, AWS/Azure.
- [x] **3.2 Bio e Hiperlinks de Contato**
  - [x] Resumo profissional baseado em `src/data/profile.ts`.
  - [x] Links sociais estilizados como links do Win32 (`#0000EE` sublinhado): LinkedIn, GitHub, Email.
- [x] **3.3 Integração com Desktop**
  - [x] Ícone na Área de Trabalho "Meu Computador" configurado para abrir esta janela por padrão no boot.

---

## 📁 Fase 4: Tela 2 — Meus Projetos ("Windows Explorer" - `C:\Projetos`)
*Meta: Navegador de arquivos do Windows Explorer exibindo o portfólio técnico de forma exploratória.*

- [x] **4.1 Estrutura do Windows Explorer (`ExplorerWindow.tsx`)**
  - [x] Barra de ferramentas com botões retrô: "Voltar", "Avançar", "Subir", "Visualizar".
  - [x] Barra de endereços com campo de texto exibindo `C:\Projetos\Destaques`.
  - [x] Barra de status inferior: contagem de itens e status de sincronização com o GitHub.
- [x] **4.2 Painel Lateral Esquerdo (Tree View de Pastas)**
  - [x] Árvore hierárquica navegável:
    - `[+] Meu Computador` -> `[-] Disco Local (C:)` -> `[v] Projetos`
    - Subpastas de categorias: `DevOps & Infra`, `Full-Stack & Bots`, `Ferramentas Go/Shell`.
- [ ] **4.3 Painel de Conteúdo de Projetos**
  - [ ] Listagem dos projetos reais de `profileData.featuredProjects`:
    - `load-tester` (Shell)
    - `jobs-bot` (Go)
    - `lab-devops` (Go)
    - `support-agent` (TypeScript)
  - [ ] Cards com thumbnail retrô, resumo da solução e tags de stack.
  - [ ] Botões Win32: `[ Executar / Demo ]` e `[ Repositório GitHub ]`.
- [ ] **4.4 Integração com API do GitHub**
  - [ ] Buscar métricas reais via `src/services/github.ts` (estrelas, forks, linguagens) para enriquecer a exibição.

---

## 💼 Fase 5: Tela 3 — Experiência Profissional ("MMC / Central de Ajuda")
*Meta: Linha do tempo corporativa e competências estruturadas na metáfora de console administrativo.*

- [ ] **5.1 Estrutura do Console (`MmcWindow.tsx`)**
  - [ ] Interface baseada no Microsoft Management Console (`mmc.exe`) ou Ajuda (`hh.exe`).
  - [ ] Painel esquerdo com índice de tópicos:
    - *Histórico Profissional*
    - *Habilidades Técnicas & Métricas*
    - *Formação & Certificações*
- [ ] **5.2 Painel de Conteúdo: Histórico Profissional**
  - [ ] Renderizar cargos a partir de `profileData.experience`:
    - Ligo (Software Engineer - Platform & SRE)
    - Code7 (Infrastructure Support Analyst)
    - Code7 (Software Engineer .NET)
    - Menendez & Menendez (Automation & Development)
    - A Solução Engenharia (.NET Automation)
  - [ ] Descrições com bullets, conquistas e tags de tecnologias.
- [ ] **5.3 Medidores de Habilidades Técnicas**
  - [ ] Barras de progresso com blocos segmentados clássicos (ex: Kubernetes, Terraform, Go, CI/CD, AWS).
- [ ] **5.4 Ação de Download do Currículo**
  - [ ] Botão Win32 `[ Baixar Currículo (.PDF) ]` integrado à geração existente `jspdf` com `docs/resume.md`.

---

## 💻 Fase 6: Tela 4 — Terminal Homelab ("PuTTY SSH / MS-DOS")
*Meta: O diferencial técnico do portfólio — terminal interativo conectando a persona dev/devops ao homelab.*

- [ ] **6.1 Shell Visual do PuTTY (`PuttyWindow.tsx`)**
  - [ ] Moldura com barra de título `homelab-gateway:22 - PuTTY (SSH-2.0-OpenSSH_9.2p1)`.
  - [ ] Área de console com fundo `#000000`, fonte `Courier Prime` e texto verde fósforo `#00FF66`.
  - [ ] Cursor de bloco piscante autêntico.
- [ ] **6.2 Parser Interativo de Comandos CLI**
  - [ ] Prompt interativo: `visitante@homelab-core:~$`.
  - [ ] Suporte a histórico de comandos com setas para cima/baixo (`ArrowUp` / `ArrowDown`).
  - [ ] Tratamento de foco automático ao clicar na área do console.
- [ ] **6.3 Implementação dos Comandos Simulados**
  - [ ] `help`: Lista os comandos disponíveis com descrições.
  - [ ] `neofetch` / `fastfetch`: Banner ASCII Art com especificações do Homelab (Debian Linux, kernel, CPU, RAM, Uptime).
  - [ ] `docker ps`: Tabela simulando containers ativos (Nginx, Portainer, Grafana, Postgres, etc.).
  - [ ] `ping [host]`: Simulação de pacotes ICMP com latências realistas.
  - [ ] `cat contato.txt`: Exibição formatada dos canais de contato.
  - [ ] `clear`: Limpeza da tela do terminal.
  - [ ] Mensagem de fallback amigável para comandos desconhecidos (`Comando não reconhecido. Digite 'help'`).
- [ ] **6.4 Barra de Status de Telemetria**
  - [ ] Indicador pulsante: `CONEXÃO CRIPTOGRAFADA [AES-256-GCM] | LATÊNCIA: 18ms | STATUS: ONLINE`.

---

## 🚀 Fase 7: Polimento, Responsividade & Validação Final
*Meta: Garantir qualidade de produção, ausência de bugs e experiência impecável.*

- [ ] **7.1 Responsividade Mobile & Tablet**
  - [ ] Detecção de telas pequenas: abrir janelas maximizadas por padrão em resoluções < 768px.
  - [ ] Barra de tarefas com rolagem horizontal ou botões compactados em telas menores.
- [ ] **7.2 Lixeira e Easter Eggs**
  - [ ] Ícone da Lixeira funcional no desktop com lista de "ideias antigas / bugs superados".
  - [ ] Efeito sonoro clássico de inicialização (opcional, com mute ativado por padrão).
- [ ] **7.3 Acessibilidade & SEO**
  - [ ] Meta tags, título semântico no `index.html` e acessibilidade via teclado (`Tab` e `Enter`).
- [ ] **7.4 Build & Lint Verification**
  - [ ] Executar `npm run build` e garantir compilação TypeScript com 0 erros.
  - [ ] Executar `npm run lint` para conformidade de código.
