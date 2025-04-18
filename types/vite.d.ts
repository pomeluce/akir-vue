/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_MOCK_ENABLE: boolean;
  VITE_PROXY_ENABLE: boolean;
  VITE_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
