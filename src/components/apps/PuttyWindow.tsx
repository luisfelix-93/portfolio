import React, { useState, useRef, useEffect } from 'react';
import { WindowFrame } from '../win2k';
import { telemetryApi } from '../../services/telemetryApi';
import { profileData } from '../../data/profile';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'banner';
  text: string;
}

const WELCOME_BANNER = `   __  __                      _       _       
  |  \\/  |                    | |     | |      
  | \\  / | ___  _ __ ___   ___| | __ _| |__    
  | |\\/| |/ _ \\| '_ \` _ \\ / _ \\ |/ _\` | '_ \\   
  | |  | | (_) | | | | | |  __/ | (_| | |_) |  
  |_|  |_|\\___/|_| |_| |_|\\___|_|\\__,_|_.__/   
HOMELAB-CORE GATEWAY [SSH-2.0-OpenSSH_9.2p1 Debian-12]
Conexão estabelecida com sucesso com homelab-core:22.
Digite 'help' para listar comandos disponíveis (status, services, nodes, neofetch...).`;

export const PuttyWindow: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'welcome-banner',
      type: 'banner',
      text: WELCOME_BANNER,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [latencyMs, setLatencyMs] = useState(18);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ao adicionar linhas no terminal
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Checa disponibilidade da Telemetry API na inicialização
  useEffect(() => {
    let isMounted = true;
    const start = performance.now();
    telemetryApi
      .checkHealth()
      .then((health) => {
        if (!isMounted) return;
        const elapsed = Math.round(performance.now() - start);
        setIsOnline(health.isOnline);
        if (elapsed > 0 && elapsed < 1000) {
          setLatencyMs(elapsed);
        }
      })
      .catch(() => {
        if (isMounted) setIsOnline(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const executeCommand = async (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Atualiza histórico de comandos do terminal
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const userLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      text: `visitante@homelab-core:~$ ${trimmed}`,
    };

    const lower = trimmed.toLowerCase();

    // Comando CLEAR: limpa o buffer
    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    setHistory((prev) => [...prev, userLine]);
    setInputVal('');
    setIsExecuting(true);

    try {
      let outputText = '';

      // Comandos locais rápidos
      if (lower === 'help') {
        outputText =
          'Comandos disponíveis no Homelab Console:\n' +
          '  status          - Resumo de saúde e recursos do cluster K3s\n' +
          '  services        - Listagem dos microserviços monitorados e latências\n' +
          '  nodes           - Métricas de nós e hardware (CPU/RAM)\n' +
          '  neofetch        - Especificações do sistema operacional do host\n' +
          '  docker ps       - Lista de containers em execução no cluster\n' +
          '  cat contato.txt - Exibe canais de contato de Luis Felipe\n' +
          '  ping [host]     - Simula teste de latência de rede ICMP\n' +
          '  clear           - Limpa o terminal\n' +
          '  help            - Exibe esta mensagem de ajuda';
      } else if (lower === 'neofetch' || lower === 'fastfetch') {
        outputText =
          `       _,met$$$$$gg.          visitante@homelab-core\n` +
          `    ,g$$$$$$$$$$$$$$$P.       ----------------------\n` +
          `  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 12 (bookworm) x86_64\n` +
          ` ,$$P'              \`$$$.     Host: K3s Edge Homelab Node (Bare-Metal)\n` +
          `',$$P       ,ggs.     \`$$b:   Kernel: 6.1.0-21-amd64\n` +
          `\`d$$'     ,$P"'   .    $$$    Uptime: 14 days, 8 hours, 20 mins\n` +
          ` $$P      d$'     ,    $$$P   Packages: 842 (dpkg), 12 (k3s-pods)\n` +
          ` $$:      $$.   -    ,d$$'    Shell: bash 5.2.15 (PuTTY Emulated)\n` +
          ` $$;      Y$b._   _,d$P'      Terminal: PuTTY (SSH-2.0)\n` +
          ` Y$$.    \`."Y$$$$P"'          CPU: AMD Ryzen 7 5700X (16) @ 3.400GHz\n` +
          ` \`$$b      "-.__              GPU: Headless Display\n` +
          `  \`Y$$                        Memory: 8192MB / 32768MB\n` +
          `   \`$$b.                      Profile: ${profileData.name}\n` +
          `     \`Y$$b.                   Specialty: ${profileData.title}`;
      } else if (lower.startsWith('docker')) {
        outputText =
          'CONTAINER ID   IMAGE                                COMMAND                  CREATED        STATUS        PORTS                    NAMES\n' +
          'a1b2c3d4e5f6   homelab/telemetry-api:v1.0.0         "./telemetry-api"        3 days ago     Up 3 days     0.0.0.0:8080->8080/tcp   telemetry-api\n' +
          'b2c3d4e5f6a1   luisfelix/support-agent:latest       "node dist/index.js"     1 week ago     Up 1 week     0.0.0.0:3001->3001/tcp   support-agent\n' +
          'c3d4e5f6a1b2   luisfelix/jobs-bot:v2                "/bin/jobs-bot"          2 weeks ago    Up 2 weeks                             jobs-bot\n' +
          'd4e5f6a1b2c3   rancher/k3s:v1.28.2-k3s1             "/bin/k3s server"        3 weeks ago    Up 3 weeks    0.0.0.0:6443->6443/tcp   k3s-control-plane';
      } else if (lower.includes('contato')) {
        outputText =
          `=======================================================\n` +
          ` Informações de Contato Profissional — ${profileData.name}\n` +
          `=======================================================\n` +
          ` Função:    ${profileData.title}\n` +
          ` E-mail:    ${profileData.social.email}\n` +
          ` LinkedIn:  ${profileData.social.linkedin}\n` +
          ` GitHub:    ${profileData.social.github}\n` +
          ` Telemetria: https://telemetry.support-homelab.api.br\n` +
          ` Local:     ${profileData.social.linkedin ? 'Brasil' : 'Remoto'}\n` +
          `=======================================================`;
      } else if (lower.startsWith('ping')) {
        const target = trimmed.split(' ')[1] || 'gateway.homelab.local';
        outputText =
          `PING ${target} (192.168.1.1) 56(84) bytes of data.\n` +
          `64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=${latencyMs.toFixed(1)} ms\n` +
          `64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=${(latencyMs + 0.4).toFixed(1)} ms\n` +
          `64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=${(latencyMs - 0.2).toFixed(1)} ms\n` +
          `--- ${target} ping statistics ---\n` +
          `3 packets transmitted, 3 received, 0% packet loss, time 2003ms`;
      } else if (['status', 'services', 'nodes'].includes(lower)) {
        // Envia comando para a Homelab Telemetry API
        const startReq = performance.now();
        const res = await telemetryApi.sendCommand(lower);
        const elapsed = Math.round(performance.now() - startReq);
        if (elapsed > 0) setLatencyMs(elapsed);
        outputText = res.output_text || 'Comando executado com sucesso.';
      } else {
        // Envia qualquer outro comando para a API verificar se há suporte remoto ou retornar erro
        const res = await telemetryApi.sendCommand(trimmed);
        outputText =
          res.output_text ||
          `Command not found: '${trimmed}'. Type 'help' for available commands.`;
      }

      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          text: outputText,
        },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Falha ao contatar terminal gateway.';
      setHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'output',
          text: `Erro de execução: ${errorMsg}\nDigite 'help' para comandos válidos.`,
        },
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyPointer === -1
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(commandHistory[nextIndex] || '');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExecuting) return;
    executeCommand(inputVal);
  };

  return (
    <WindowFrame
      id="putty"
      menuItems={[]}
      contentClassName="bg-black text-terminal-green font-terminal flex flex-col flex-1 min-h-0 select-text"
      statusBar={
        <div className="flex justify-between w-full text-win-caption text-terminal-gray bg-black px-2 py-0.5 select-none font-terminal">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                isOnline ? 'bg-terminal-green animate-pulse' : 'bg-red-500'
              }`}
            />
            <span>SSH-2.0-OpenSSH_9.2p1</span>
            <span>|</span>
            <span className={isOnline ? 'text-white' : 'text-red-400'}>
              {isOnline ? 'ONLINE [AES-256]' : 'OFFLINE [AES-256]'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>LATÊNCIA: {latencyMs}ms</span>
            <span className={isOnline ? 'text-terminal-green' : 'text-yellow-400'}>
              {isOnline ? 'CONECTADO' : 'FALLBACK LOCAL'}
            </span>
          </div>
        </div>
      }
    >
      <div
        className="p-3 bg-black text-terminal-green font-terminal text-terminal-sm h-full flex flex-col flex-1 overflow-y-auto cursor-text"
        onClick={handleFocus}
      >
        <div className="flex-1 flex flex-col gap-1">
          {history.map((line) => (
            <pre
              key={line.id}
              className={`leading-tight whitespace-pre-wrap font-terminal ${
                line.type === 'input'
                  ? 'text-white font-bold'
                  : line.type === 'banner'
                  ? 'text-terminal-green'
                  : 'text-terminal-green'
              }`}
            >
              {line.text}
            </pre>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 mt-2 pt-1 border-t border-gray-800">
          <span className="text-terminal-green select-none shrink-0 font-bold">
            visitante@homelab-core:~$
          </span>
          <div className="flex items-center flex-1 min-w-0 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isExecuting}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent border-none text-white font-terminal text-terminal-sm outline-none p-0 focus:ring-0"
            />
            <span className="w-2 h-3.5 bg-terminal-green animate-pulse inline-block shrink-0 ml-0.5" />
          </div>
        </form>
      </div>
    </WindowFrame>
  );
};
