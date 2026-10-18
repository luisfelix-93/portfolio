import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { WindowFrame } from '../win2k';
import { useWindowManager } from '../../context/WindowManagerContext';
import { profileData } from '../../data/profile';

const WINDOW_ID = 'winver';
const AVATAR_URL = `${profileData.social.github}.png?size=192`;
const FLAG_COLORS = ['bg-[#F25022]', 'bg-[#7FBA00]', 'bg-[#00A4EF]', 'bg-[#FFB900]'];

const getInitials = (fullName: string) =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const WinverBanner: React.FC = () => (
  <header className="winver-banner relative px-4 py-3 flex items-center gap-3 overflow-hidden">
    <div className="grid grid-cols-2 gap-[2px] w-9 h-9 -skew-x-6 shrink-0" aria-hidden="true">
      {FLAG_COLORS.map((color) => (
        <span key={color} className={color} />
      ))}
    </div>
    <div className="leading-none">
      <p className="text-win-caption text-white/80">Microsoft®</p>
      <p className="text-[22px] leading-[24px] font-bold text-white tracking-tight">
        Windows <span className="font-normal">2000</span>
      </p>
      <p className="text-win-body font-bold text-[#FFB900]">Professional</p>
    </div>
    <p className="ml-auto self-end text-win-caption text-white/80 italic">
      Built on NT Technology
    </p>
  </header>
);

const RetroAvatar: React.FC = () => {
  const [hasPhotoFailed, setHasPhotoFailed] = useState(false);

  return (
    <figure className="bevel-inset bg-win-face p-1 shrink-0 w-[104px]">
      <div className="retro-photo w-24 h-24 bg-win-selection">
        {hasPhotoFailed ? (
          <span className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
            {getInitials(profileData.name)}
          </span>
        ) : (
          <img
            src={AVATAR_URL}
            alt={`Foto de perfil de ${profileData.name}`}
            width={96}
            height={96}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setHasPhotoFailed(true)}
          />
        )}
      </div>
      <figcaption className="text-center text-win-caption text-gray-700 mt-1">
        user.bmp
      </figcaption>
    </figure>
  );
};

interface SpecRowProps {
  label: string;
  children: React.ReactNode;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, children }) => (
  <div className="grid grid-cols-[64px_1fr] gap-2 items-start">
    <dt className="text-gray-600">{label}:</dt>
    <dd className="font-bold text-black">{children}</dd>
  </div>
);

const SystemSpecs: React.FC = () => (
  <section aria-labelledby="winver-specs-title" className="flex-1 min-w-0">
    <h2 id="winver-specs-title" className="sr-only">
      Especificações do sistema
    </h2>
    <dl className="flex flex-col gap-1.5">
      <SpecRow label="Sistema">
        {profileData.name} - {profileData.system.version}
      </SpecRow>
      <SpecRow label="Função">{profileData.title}</SpecRow>
      <SpecRow label="Versão">
        <span className="font-normal text-gray-700">{profileData.system.build}</span>
      </SpecRow>
      <SpecRow label="Specs">
        <ul className="bevel-inset bg-white p-1.5 grid grid-cols-2 gap-x-3 gap-y-1 font-normal">
          {profileData.system.specs.map((spec) => (
            <li key={spec} className="flex items-center gap-1">
              <CheckSquare className="w-3 h-3 text-win-selection shrink-0" aria-hidden="true" />
              {spec}
            </li>
          ))}
        </ul>
      </SpecRow>
    </dl>
  </section>
);

const ContactLinks: React.FC = () => (
  <nav aria-label="Contato" className="flex flex-wrap gap-x-3 gap-y-1">
    <a href={profileData.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-win-link underline">
      LinkedIn
    </a>
    <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="text-win-link underline">
      GitHub
    </a>
    <a href={`mailto:${profileData.social.email}`} className="text-win-link underline">
      {profileData.social.email}
    </a>
  </nav>
);

export const WinverWindow: React.FC = () => {
  const { closeWindow } = useWindowManager();

  return (
    <WindowFrame
      id={WINDOW_ID}
      menuItems={[]}
      statusBar={
        <div className="flex justify-between w-full text-win-caption text-gray-700">
          <span>Sistema: Win2K Pro NT 5.0</span>
          <span>Status: Online</span>
        </div>
      }
    >
      <article className="bg-win-face text-black text-win-body min-h-full flex flex-col">
        <WinverBanner />
        <div className="h-1 bg-gradient-to-r from-[#F25022] via-[#FFB900] to-[#00A4EF]" aria-hidden="true" />

        <div className="p-4 flex flex-col gap-3 flex-1">
          <div className="flex gap-4 items-start">
            <RetroAvatar />
            <div className="flex flex-col gap-1 min-w-0">
              <h1 className="text-win-headline font-bold text-win-selection">{profileData.name}</h1>
              <p className="text-gray-700">{profileData.title}</p>
              <p className="text-win-caption text-gray-500">
                Copyright © 1993-{profileData.system.version.slice(1)} Luis Felipe Corp.
              </p>
            </div>
          </div>

          <div className="bevel-etched" />
          <SystemSpecs />
          <div className="bevel-etched" />

          <p className="leading-relaxed">{profileData.about}</p>
          <ContactLinks />

          <footer className="mt-auto pt-2 flex items-end justify-between gap-3">
            <p className="text-win-caption text-gray-600">
              Memória disponível para novos desafios: <strong>1.048.576 KB</strong>
            </p>
            <button
              type="button"
              id="winver-ok-button"
              className="win-button min-w-[75px]"
              onClick={() => closeWindow(WINDOW_ID)}
            >
              OK
            </button>
          </footer>
        </div>
      </article>
    </WindowFrame>
  );
};
