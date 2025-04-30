import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KeycloakProvider from './hooks/KeycloakContext.tsx';
import { MessageProvider } from './hooks/MessageContext.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProviderWrapper } from './hooks/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <KeycloakProvider>
    <ThemeProviderWrapper>
      <CssBaseline />
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </ThemeProviderWrapper>
  </KeycloakProvider>
);
