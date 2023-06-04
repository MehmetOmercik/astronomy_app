/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASTRONOMY_APPLICATION_ID: string;
  readonly VITE_ASTRONOMY_APPLICATION_SECRET: string;
  readonly VITE_ASTRONOMY_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
