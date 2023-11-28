import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SearchProvider } from './components/SearchContext.jsx';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e458aa',
    },
    secondary: {
      main: '#7857e6',
    },
    background: {
      default: '#fff8f8',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
       <SearchProvider>
        <CssBaseline />
      <App />
       </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);