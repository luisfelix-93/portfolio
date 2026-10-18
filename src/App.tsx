import { WindowManagerProvider } from './context/WindowManagerContext';
import { DesktopCanvas, WindowFrame } from './components/win2k';
import { WinverWindow } from './components/apps';
import { profileData } from './data/profile';

function PortfolioDesktop() {
  return (
    <DesktopCanvas>
      {/* Tela 1: Apresentação - Quem Sou Eu */}
      <WinverWindow />

      {/* Tela 2: Meus Projetos (Windows Explorer) */}
      <WindowFrame
        id="explorer"
        statusBar={
          <div className="flex justify-between w-full text-win-caption text-gray-700">
            <span>{profileData.featuredProjects.length} objeto(s) selecionado(s)</span>
            <span>100% de disponibilidade no GitHub</span>
          </div>
        }
      >
        <div className="p-3 bg-white text-black text-win-body">
          <div className="bg-win-face p-1 bevel-inset-thin mb-3 text-win-caption flex items-center gap-1">
            <span className="font-bold">Endereço:</span>
            <span className="bg-white px-2 py-0.5 flex-1 border border-win-shadow">
              C:\Projetos\Destaques
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {profileData.featuredProjects.map((p) => (
              <div key={p.name} className="bevel-outset p-2 bg-win-face flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-win-title text-win-selection">{p.name}</h3>
                  <span className="text-[10px] bg-win-selection text-white px-1.5 py-0.2 rounded-none inline-block my-1">
                    {p.language}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win-button text-win-caption"
                  >
                    Repositório
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </WindowFrame>

      {/* Tela 3: Experiência Profissional (MMC) */}
      <WindowFrame
        id="mmc"
        statusBar={
          <div className="flex justify-between w-full text-win-caption text-gray-700">
            <span>Microsoft Management Console v1.2</span>
            <span>{profileData.experience.length} Registros</span>
          </div>
        }
      >
        <div className="p-3 bg-white text-black text-win-body flex flex-col gap-3">
          <h2 className="font-bold text-win-headline text-win-selection">
            Histórico Corporativo & Registros Profissionais
          </h2>
          <div className="flex flex-col gap-3">
            {profileData.experience.slice(0, 3).map((exp) => (
              <div key={exp.id} className="bevel-inset-thin p-2 bg-[#F9F8F5]">
                <div className="flex justify-between font-bold text-win-title">
                  <span>{exp.role}</span>
                  <span className="text-win-selection">{exp.company}</span>
                </div>
                <span className="text-win-caption text-gray-600">{exp.period}</span>
                <p className="mt-1 text-win-body whitespace-pre-line text-gray-800 line-clamp-3">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </WindowFrame>

      {/* Tela 4: Terminal Homelab (PuTTY) */}
      <WindowFrame
        id="putty"
        contentClassName="bg-terminal-bg text-terminal-green font-terminal"
        statusBar={
          <div className="flex justify-between w-full text-win-caption text-terminal-gray bg-black px-1">
            <span>SSH-2.0-OpenSSH_9.2p1</span>
            <span>ONLINE [AES-256]</span>
          </div>
        }
      >
        <div className="p-3 bg-black text-terminal-green font-terminal text-terminal-sm h-full flex flex-col gap-2">
          <pre className="text-terminal-green leading-tight">
{`   __  __                      _       _       
  |  \\/  |                    | |     | |      
  | \\  / | ___  _ __ ___   ___| | __ _| |__    
  | |\\/| |/ _ \\| '_ \` _ \\ / _ \\ |/ _\` | '_ \\   
  | |  | | (_) | | | | | |  __/ | (_| | |_) |  
  |_|  |_|\\___/|_| |_| |_|\\___|_|\\__,_|_.__/   `}
          </pre>
          <p className="text-terminal-gray">Conexão estabelecida com sucesso com homelab-core:22.</p>
          <p className="text-terminal-gray">Digite 'help' para comandos interativos (Fase 6).</p>
          <div className="flex items-center gap-1 text-terminal-green mt-2">
            <span>visitante@homelab-core:~$</span>
            <span className="w-2 h-3.5 bg-terminal-green animate-pulse inline-block" />
          </div>
        </div>
      </WindowFrame>
    </DesktopCanvas>
  );
}

function App() {
  return (
    <WindowManagerProvider>
      <PortfolioDesktop />
    </WindowManagerProvider>
  );
}

export default App;
