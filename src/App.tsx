import { WindowManagerProvider } from './context/WindowManagerContext';
import { DesktopCanvas, WindowFrame } from './components/win2k';
import { WinverWindow, ExplorerWindow, MmcWindow, RecycleBinWindow } from './components/apps';

function PortfolioDesktop() {
  return (
    <DesktopCanvas>
      {/* Tela 1: Apresentação - Quem Sou Eu */}
      <WinverWindow />

      {/* Tela 2: Meus Projetos (Windows Explorer) */}
      <ExplorerWindow />

      {/* Tela 3: Experiência Profissional (MMC) */}
      <MmcWindow />

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

      {/* Lixeira: Ideias Antigas e Bugs Superados */}
      <RecycleBinWindow />
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
