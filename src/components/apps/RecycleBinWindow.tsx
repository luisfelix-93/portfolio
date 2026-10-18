import React, { useState } from 'react';
import { WindowFrame } from '../win2k/WindowFrame';
import { RECYCLE_BIN_ITEMS, type RecycleBinItem } from '../../data/recycleBin';
import { playStartupChime } from '../../utils/audioChime';
import { Trash2, RotateCcw, Volume2, Info, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const RecycleBinWindow: React.FC = () => {
  const [items, setItems] = useState<RecycleBinItem[]>(RECYCLE_BIN_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(items[0]?.id || null);
  const [activeItemDetails, setActiveItemDetails] = useState<RecycleBinItem | null>(null);
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);
  const [easterEggNotification, setEasterEggNotification] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === selectedItemId) || null;

  const handleEmptyTrash = () => {
    setShowEmptyConfirm(true);
  };

  const confirmEmptyTrash = () => {
    setItems([]);
    setSelectedItemId(null);
    setShowEmptyConfirm(false);
    setEasterEggNotification('Lixeira esvaziada! 0 débitos técnicos remanescentes em produção.');
  };

  const handleRestoreAll = () => {
    setItems(RECYCLE_BIN_ITEMS);
    setSelectedItemId(RECYCLE_BIN_ITEMS[0]?.id || null);
    setEasterEggNotification('Itens restaurados para análise técnica.');
  };

  const handleRowDoubleClick = (item: RecycleBinItem) => {
    setActiveItemDetails(item);
  };

  const handlePlaySound = () => {
    playStartupChime();
    setEasterEggNotification('Reproduzindo acorde sintetizado do Windows 2000!');
  };

  return (
    <WindowFrame
      id="trash"
      statusBar={
        <div className="flex justify-between items-center w-full px-2 text-win-caption text-black">
          <span>{items.length} objeto(s)</span>
          <span>0 bytes de dívida técnica ativa</span>
        </div>
      }
    >
      <div className="flex flex-col h-full bg-win-face text-win-body select-none">
        {/* Menu Bar */}
        <div className="flex items-center gap-3 px-2 py-0.5 border-b border-win-shadow text-win-caption text-black bg-win-face">
          <span className="hover:bg-win-selection hover:text-white px-1 cursor-default">Arquivo</span>
          <span className="hover:bg-win-selection hover:text-white px-1 cursor-default">Editar</span>
          <span className="hover:bg-win-selection hover:text-white px-1 cursor-default">Exibir</span>
          <span className="hover:bg-win-selection hover:text-white px-1 cursor-default">Ferramentas</span>
          <span className="hover:bg-win-selection hover:text-white px-1 cursor-default">Ajuda</span>
        </div>

        {/* Toolbar / Action buttons */}
        <div className="flex items-center gap-1.5 p-1 border-b border-win-shadow bg-win-face text-win-caption flex-wrap">
          <button
            type="button"
            className="win-button flex items-center gap-1 px-2 py-0.5 text-black font-normal"
            onClick={handleEmptyTrash}
            disabled={items.length === 0}
            title="Esvaziar a lixeira e neutralizar bugs do passado"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Esvaziar Lixeira</span>
          </button>

          <button
            type="button"
            className="win-button flex items-center gap-1 px-2 py-0.5 text-black font-normal"
            onClick={handleRestoreAll}
            title="Restaurar lista de aprendizados"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Restaurar Todos</span>
          </button>

          <div className="w-[1px] h-4 bg-win-shadow mx-1" />

          <button
            type="button"
            className="win-button flex items-center gap-1 px-2 py-0.5 text-black font-normal"
            onClick={handlePlaySound}
            title="Easter Egg sonoro: Tocar inicialização clássica do Windows 2000"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tocar Som Win2K 🔊</span>
          </button>

          {easterEggNotification && (
            <span className="ml-auto text-emerald-800 font-bold text-[10px] animate-fade-in flex items-center gap-1 bg-emerald-100 px-1.5 py-0.5 border border-emerald-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {easterEggNotification}
            </span>
          )}
        </div>

        {/* Main Layout: Left Web-View Panel + Right File Table */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Win2K Web View Sidebar */}
          <div className="w-48 sm:w-56 bg-gradient-to-b from-[#2B547E] to-[#4863A0] text-white p-3 flex flex-col justify-between shrink-0 overflow-y-auto hidden xs:flex">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                <Trash2 className="w-7 h-7 text-white" />
                <div>
                  <h3 className="font-bold text-win-headline text-white leading-tight">Lixeira</h3>
                  <span className="text-[10px] text-blue-200">Bugs & Ideias Antigas</span>
                </div>
              </div>

              {selectedItem ? (
                <div className="flex flex-col gap-1.5 text-win-caption text-blue-100 mt-1">
                  <span className="font-bold text-white break-words">{selectedItem.name}</span>
                  <span className="text-[10px]">{selectedItem.type}</span>
                  <span className="text-[10px]">Tamanho: {selectedItem.size}</span>
                  <div className="mt-2 p-1.5 bg-black/20 border border-white/20 text-white rounded-[2px]">
                    <span className="font-bold block text-yellow-300 text-[10px] mb-0.5">Lição Aprendida:</span>
                    <p className="text-[10px] leading-tight text-blue-100">{selectedItem.lessonLearned}</p>
                  </div>
                  <span className="text-[9px] text-blue-200 italic mt-1">
                    Dê duplo-clique no item para abrir as propriedades.
                  </span>
                </div>
              ) : (
                <div className="text-win-caption text-blue-100 flex flex-col gap-2 mt-1">
                  <p className="text-[11px] leading-relaxed">
                    Esta pasta armazena histórico de erros superados e lições aprendidas em produção.
                  </p>
                  <p className="text-[10px] text-blue-200">
                    Selecione um arquivo para ver detalhes ou clique em "Tocar Som Win2K".
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] text-blue-200 border-t border-white/20 pt-2 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span>Zero bugs tolerados em produção.</span>
            </div>
          </div>

          {/* Right ListView / Table */}
          <div className="flex-1 bg-white bevel-inset m-1 overflow-auto">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
                <Trash2 className="w-12 h-12 text-gray-400 mb-2" />
                <p className="font-bold text-win-headline text-gray-700">A Lixeira está vazia.</p>
                <p className="text-win-caption text-gray-500 max-w-xs mt-1">
                  Nenhum débito técnico ativo ou prática antiga encontrada.
                </p>
                <button
                  type="button"
                  className="win-button mt-3 px-3 py-1 text-win-caption text-black"
                  onClick={handleRestoreAll}
                >
                  Restaurar Itens para Análise
                </button>
              </div>
            ) : (
              <table className="w-full text-left text-win-caption border-collapse select-none">
                <thead className="sticky top-0 bg-win-face border-b border-win-shadow text-black">
                  <tr>
                    <th className="p-1.5 font-normal border-r border-win-shadow bevel-outset-thin">Nome</th>
                    <th className="p-1.5 font-normal border-r border-win-shadow bevel-outset-thin">Localização Original</th>
                    <th className="p-1.5 font-normal border-r border-win-shadow bevel-outset-thin">Data da Exclusão</th>
                    <th className="p-1.5 font-normal border-r border-win-shadow bevel-outset-thin">Tamanho</th>
                    <th className="p-1.5 font-normal bevel-outset-thin">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <tr
                        key={item.id}
                        className={`cursor-default ${
                          isSelected ? 'bg-win-selection text-white' : 'hover:bg-blue-50 text-black'
                        }`}
                        onClick={() => setSelectedItemId(item.id)}
                        onDoubleClick={() => handleRowDoubleClick(item)}
                      >
                        <td className="p-1.5 flex items-center gap-1.5 truncate max-w-[200px]">
                          <FileText
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isSelected ? 'text-white' : 'text-gray-600'
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </td>
                        <td className="p-1.5 truncate max-w-[180px]">{item.originalLocation}</td>
                        <td className="p-1.5 whitespace-nowrap">{item.dateDeleted}</td>
                        <td className="p-1.5 whitespace-nowrap">{item.size}</td>
                        <td className="p-1.5 truncate max-w-[160px]">{item.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal: Item Properties */}
        {activeItemDetails && (
          <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveItemDetails(null)}
          >
            <div
              className="w-full max-w-md bg-win-face bevel-outset p-2 text-win-body shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Titlebar */}
              <div className="titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold text-win-caption mb-2">
                <span>Propriedades de: {activeItemDetails.name}</span>
                <button
                  type="button"
                  className="win-control-button text-black font-bold px-1.5"
                  onClick={() => setActiveItemDetails(null)}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-3 bg-win-face bevel-inset flex flex-col gap-2.5 text-win-caption text-black">
                <div className="flex items-center gap-2 border-b border-win-shadow pb-2">
                  <FileText className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-win-headline text-black">{activeItemDetails.name}</h4>
                    <span className="text-gray-600">{activeItemDetails.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 py-1 border-b border-win-shadow">
                  <span className="text-gray-600">Localização:</span>
                  <span className="col-span-2 font-mono text-[10px] break-all">{activeItemDetails.originalLocation}</span>

                  <span className="text-gray-600">Excluído em:</span>
                  <span className="col-span-2">{activeItemDetails.dateDeleted}</span>

                  <span className="text-gray-600">Tamanho:</span>
                  <span className="col-span-2">{activeItemDetails.size}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-black">O que aconteceu:</span>
                  <p className="text-gray-800 leading-relaxed text-[11px] bg-white p-2 bevel-inset">
                    {activeItemDetails.details}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-emerald-800">Lição de Engenharia Consolidada:</span>
                  <p className="text-emerald-900 font-medium leading-relaxed text-[11px] bg-emerald-50 p-2 bevel-inset border border-emerald-200">
                    {activeItemDetails.lessonLearned}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 mt-2 pt-1">
                <button
                  type="button"
                  className="win-button px-4 py-1 font-bold text-black text-win-caption"
                  onClick={() => setActiveItemDetails(null)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Confirmation to Empty Trash */}
        {showEmptyConfirm && (
          <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEmptyConfirm(false)}
          >
            <div
              className="w-full max-w-sm bg-win-face bevel-outset p-2 text-win-body shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold text-win-caption mb-2">
                <span>Confirmar Exclusão de Arquivos</span>
                <button
                  type="button"
                  className="win-control-button text-black font-bold px-1.5"
                  onClick={() => setShowEmptyConfirm(false)}
                >
                  ✕
                </button>
              </div>

              <div className="p-3 flex items-start gap-3 text-win-caption text-black">
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Tem certeza de que deseja esvaziar a Lixeira?</p>
                  <p className="text-gray-700 text-[10px]">
                    Estes {items.length} itens e más práticas foram neutralizados para sempre e nunca mais voltarão à produção.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2 pt-1 border-t border-win-shadow">
                <button
                  type="button"
                  className="win-button px-4 py-1 font-bold text-black text-win-caption"
                  onClick={confirmEmptyTrash}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className="win-button px-4 py-1 text-black text-win-caption"
                  onClick={() => setShowEmptyConfirm(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WindowFrame>
  );
};
