import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { FavoritesProvider } from './components/FavContext.jsx';
import { SearchProvider } from './components/SearchContext.jsx';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e458aa',
    },
    secondary: {
      main: '#ffc402',
    },
    background: {
      default: '#fff8f8',
    },
    error: {
      main: '#da0036',
    },
    
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e458aa',
    },
    secondary: {
      main: '#ffc402',
    },
      error: {
      main: '#ff0845',
    },

    background: {
      default: '#121212', // Set your preferred dark background color
    },
  },
});

const MyApp = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.palette.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <FavoritesProvider>
             
          <CssBaseline />
          <App toggleTheme={toggleTheme} />
          </FavoritesProvider>
        </SearchProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MyApp />);