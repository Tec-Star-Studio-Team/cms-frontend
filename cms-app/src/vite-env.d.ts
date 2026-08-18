/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_DELAY_MS: string;
  readonly VITE_CMS_API_URL: string;
  readonly VITE_USER_DEFAULT_EMAIL: string;
  readonly VITE_USER_DEFAULT_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
