'use client'
// Contaxts
import { ThemeProvider } from '@/libs/contexts/ThemeContext';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Local Components
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const PublicPageLayout = ({ children }: { children: React.ReactNode; }) => {
  const { tones } = useThemeController();

  return (
    <div className={`bg-fixed bg-radial ${tones.fromColor.dark} to-stone-950`}>
      <div className='bg-stone-950/50 min-h-screen grid space-y-12'>
        <Header />

        <Main>
          {children}
        </Main>

        <Footer />
      </div>
    </div>
  );
}

export default function PagesLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider>
      <div className="bg-stone-200 dark:bg-stone-900 text-stone-900 dark:text-stone-200 text-lg fill-stone-900 dark:fill-stone-200">
        <PublicPageLayout>
          {children}
        </PublicPageLayout>
      </div>
    </ThemeProvider>
  );
}
