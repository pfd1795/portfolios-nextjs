import { createContext, useState, useEffect, useContext, useMemo } from "react";

// Define types for theme and colors.
type Tone = "light" | "normal" | "dark";

interface ThemeContextType {
  theme: "light" | "dark";
  stageColor: string;
  tones: {
    fromColor: Record<Tone, string>;
    bgColor: Record<Tone, string>;
    borderColor: Record<Tone, string>;
    outlineColor: Record<Tone, string>;
    textColor: string;
  };
  toggleTheme: () => void;
  setStageColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const calculateTextColor = (color: string) => {
  // const lightTextColors = ["red", "sky", "green", "black"];
  const darkTextColors = ["white"];

  return darkTextColors.includes(color) ? "text-stone-900" : "text-stone-200";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>("light");
  const [stageColor, setStageColor] = useState<ThemeContextType["stageColor"]>("blue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeContextType["theme"];
    const savedColor = localStorage.getItem("stageColor") as ThemeContextType["stageColor"];
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setStageColor(savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("stageColor", stageColor);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme, stageColor]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const tones = useMemo(() => ({
    fromColor: {
      light: `from-${stageColor}-500`,
      normal: `from-${stageColor}-700`,
      dark: `from-${stageColor}-900`,
    },
    bgColor: {
      light: `bg-${stageColor}-500`,
      normal: `bg-${stageColor}-700`,
      dark: `bg-${stageColor}-900`,
    },
    borderColor: {
      light: `border-${stageColor}-500`,
      normal: `border-${stageColor}-700`,
      dark: `border-${stageColor}-900`,
    },
    outlineColor: {
      light: `outline-${stageColor}-500`,
      normal: `outline-${stageColor}-700`,
      dark: `outline-${stageColor}-900`,
    },
    textColor: calculateTextColor(stageColor),
  }), [stageColor]);

  return (
    <ThemeContext.Provider value={{ theme, stageColor, tones, toggleTheme, setStageColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};