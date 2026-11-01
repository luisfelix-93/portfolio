import { WindowManagerProvider } from './context/WindowManagerContext';
import { DesktopCanvas } from './components/win2k';
import {
  WinverWindow,
  ExplorerWindow,
  MmcWindow,
  RecycleBinWindow,
  PuttyWindow,
} from './components/apps';

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
      <PuttyWindow />

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
