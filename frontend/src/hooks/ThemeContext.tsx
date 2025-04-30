import { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ThemeContext = createContext({
  toggleDarkMode: () => {},
  themeMode: 'light',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === 'dark' ? '#101923' : '#f5f5f5',
        paper: themeMode === 'dark' ? '#1b2d3e' : '#fff',
      },
      primary: {
        main: '#005a8f',
      },
      secondary: {
        main: '#4dacff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
    typography: {
      h1: {
        fontSize: '2.125rem',
        fontWeight: 400,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 400,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
    },
  });

  useEffect(() => {
    setDarkMode(prefersDarkMode);
    setThemeMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setThemeMode(!darkMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, themeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
