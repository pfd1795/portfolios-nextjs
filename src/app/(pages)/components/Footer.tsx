import Link from 'next/link';
// Hooks
import { useClipboard } from '@/libs/hooks/useClipboard';
import { useThemeController } from '@/libs/hooks/useThemeController';
// Icons
import { GitHubIcon, GmailIcon, LinkedInIcon } from '@/utils/icons';

export const Footer = () => {
  const { tones } = useThemeController();
  const { copied, copyToClipboard } = useClipboard();

  return (
    <footer className={`bg-stone-900 text-stone-200 outline-2 ${tones.outlineColor.normal} space-y-4 p-4 md:py-10 md:px-28`}>
      <header>
        <h3 className="text-2xl md:text-3xl font-bold uppercase">informacin de contacto</h3>
      </header>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 px-4">
        <span className="space-x-2 flex items-center">
          <span><LinkedInIcon width={42} height={42} /></span>
          <strong className="font-bold">LinkedIn:</strong>
          <Link href="https://www.linkedin.com/in/pfd-dev/" title="LinkedIn" target="_blank" className="text-sky-500 hover:text-sky-600 underline">pfd-dev</Link>
        </span>

        <div className="flex items-center gap-4 relative">
          <span className="space-x-2 flex items-center" onClick={() => copyToClipboard("pfd1795@gmail.com")}>
            <span><GmailIcon width={42} height={42} /></span>
            <strong className="font-bold">Gmail:</strong>
            <span title="Gmail" className="text-sky-500 hover:text-sky-600 underline cursor-pointer">pfd1795@gmail.com</span>
          </span>

          {copied &&
            <span className="bg-green-600 text-stone-200 absolute -bottom-10 right-5 rounded-xl py-1 px-2 text-nowrap">
              ¡Correo copiado!
            </span>
          }
        </div>

        <span className="space-x-2 flex items-center">
          <span><GitHubIcon width={42} height={42} /></span>
          <strong className="font-bold">GitHub:</strong>
          <Link href="https://github.com/pfd1795" title="GitHub" target="_blank" className="text-sky-500 hover:text-sky-600 underline">pfd1795</Link>
        </span>
      </div>

      <hr className="border-stone-700" />

      <p className="text-stone-400 md:text-center">
        Los vectores y iconos son de <Link href="https://github.com/garudatechnologydevelopers/sketch-icons?ref=svgrepo.com" title="GitHub" target="_blank" className="text-sky-500 hover:text-sky-600 underline">githun/GarudaTechnology</Link> y <Link href="https://www.svgrepo.com/author/Garuda%20Technology/" target="_blank" className="text-sky-500 hover:text-sky-600 underline">svgrepo/GarudaTechnology</Link> con la licencia MIT de <Link href="https://www.svgrepo.com/" target="_blank" className="text-sky-500 hover:text-sky-600 underline">SVG Repo</Link>. Y de <Link href={"https://fonts.google.com/icons"} target="_blank" className="text-sky-500 hover:text-sky-600 underline">google/icons</Link>
      </p>

      <hr className="border-stone-700" />

      <div className="flex justify-between items-end">
        <div className="grid">
          <p className="text-sm text-stone-400">
            SITIO DESARROLLADOR POR<br />
          </p>
          <Link href="https://github.com/pfd1795" target="_blank" className="text-stone-200 text-xl hover:underline text-nowrap italic text-center">pfd1795</Link>
        </div>

        <p className="text-sm text-stone-400 text-end">Ver. 0.01</p>
      </div>
    </footer>
  );
}