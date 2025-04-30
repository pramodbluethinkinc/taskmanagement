import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useContext } from 'react';
import { useState } from 'react';

interface MessageContextProps {
  showMessage: (content: string, messageType: MessageType) => void;
}

export const MessageContext = createContext<MessageContextProps>({
  showMessage: () => {},
});

export function useMessage() {
  return useContext(MessageContext);
}

interface MessageProviderProps {
  children: React.ReactNode;
}

type MessageType = 'success' | 'error' | 'info';

export function MessageProvider({ children }: MessageProviderProps) {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<MessageType>('info');

  const showMessage = (messageContent: string, messageType: MessageType) => {
    setContent(messageContent);
    setType(messageType);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={visible}
        autoHideDuration={3000}
        onClose={() => setVisible(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={type} onClose={() => setVisible(false)}>
          {content}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
}
