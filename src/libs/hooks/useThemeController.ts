// Contexts
import { useTheme } from '@/libs/contexts/ThemeContext';

export const useThemeController = () => {
  const { theme, stageColor, tones, toggleTheme, setStageColor } = useTheme();

  const isLightTheme = theme === 'light';
  const isDarkTheme = theme === 'dark';

  const updateStageColor = (newColor: string) => {
    setStageColor(newColor);
  };

  const UI_COLORS = {
    container: `bg-stone-200/80 dark:bg-stone-900/80 outline-2 ${tones.outlineColor.normal}`,
    containerWhite: `bg-stone-200/80 text-stone-900 outline-2 ${tones.outlineColor.normal}`,
    card: 'bg-stone-300 hover:bg-stone-200 dark:bg-stone-700 hover:dark:bg-stone-800 shadow-md hover:shadow-stone-700 transition-all',
    cardWhite: 'bg-stone-300 hover:bg-stone-200 shadow-md hover:shadow-stone-700 transition-all',
  }

  return {
    UI_COLORS,
    theme,
    isLightTheme,
    isDarkTheme,
    stageColor,
    tones,
    toggleTheme,
    updateStageColor,
  };
};
