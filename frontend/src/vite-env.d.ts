/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_REALM: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AVATAR_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
