import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import LoadingPage from '../Pages/LoadingPage';
import { setAuthToken } from '../Utils/AxiosInstance';

interface KeycloakContextProps {
  keycloak: Keycloak | null;
  userProfile: KeycloakProfile | null;
}

const KeycloakContext = createContext<KeycloakContextProps | null>(null);

export const useKeycloak = (): KeycloakContextProps => {
  const context = useContext(KeycloakContext);

  if (context === null) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }

  return context;
};

const keycloakInstance = new Keycloak({
  realm: import.meta.env.VITE_REALM,
  url: import.meta.env.VITE_AUTH_URL,
  clientId: import.meta.env.VITE_CLIENT_ID,
});

const useKeycloakState = (): [
  boolean,
  Keycloak | null,
  KeycloakProfile | null,
] => {
  const [isLoading, setIsLoading] = useState(true);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [userProfile, setUserProfile] = useState<KeycloakProfile | null>(null);

  useEffect(() => {
    keycloakInstance
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        silentCheckSsoFallback: true,
        // redirectUri: import.meta.env.VITE_REDIRECT_URI,
      })
      .then((authenticated) => {
        if (authenticated) {
          keycloakInstance.loadUserProfile().then((profile) => {
            setKeycloak(keycloakInstance);
            setIsLoading(false);
            setUserProfile(profile);
          });

          if (keycloakInstance.token) {
            setAuthToken(keycloakInstance.token);
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
        setIsLoading(true);
      });
  }, []);

  return [isLoading, keycloak, userProfile];
};

function KeycloakProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isLoading, keycloak, userProfile] = useKeycloakState();

  useEffect(() => {
    if (keycloak) {
      keycloak.onTokenExpired = () => {
        keycloak
          .updateToken()
          .then((refreshed) => {
            if (refreshed) {
              console.log('Token refreshed');
              console.log(keycloak.token);
              console.log('Token refreshed');
            } else {
              console.log(
                'Token not refreshed, valid for: ',
                `${keycloak.tokenParsed?.exp} seconds`
              );
            }
          })
          .catch((error) => {
            console.error('Token refresh error:', error);
          });
      };
    }
  }, [keycloak]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <KeycloakContext.Provider value={{ keycloak, userProfile }}>
      {!isLoading ? children : <LoadingPage />}
    </KeycloakContext.Provider>
  );
}

export default KeycloakProvider;
export { KeycloakContext };
