/// <reference types="vite/client" />

// Erweitere die globalen Definitionen für Vite
interface ImportMeta {
  readonly env: {
    readonly VITE_ALLOWED_HOSTS: string;
    readonly VITE_DISABLE_HOST_CHECK: string;
    readonly VITE_HOST_CHECK: string;
    readonly VITE_ALLOW_ALL_HOSTS: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    // Und andere Umgebungsvariablen...
    [key: string]: string | boolean | undefined;
  };
}

// Überschreibe Vite Konfiguration
declare global {
  interface Window {
    __vite_plugin_react_preamble_installed__?: boolean;
    __vite_plugin_react_timeout?: number;
    VITE_ALLOWED_HOSTS?: string;
    VITE_DISABLE_HOST_CHECK?: boolean;
    VITE_HOST_CHECK?: boolean;
    VITE_ALLOW_ALL_HOSTS?: boolean;
  }
}

export {};