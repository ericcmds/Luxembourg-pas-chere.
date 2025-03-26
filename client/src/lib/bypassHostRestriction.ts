/**
 * Module zur Umgehung von Host-Einschränkungen im Entwicklungsmodus
 * Diese Datei wird direkt beim Laden der Anwendung ausgeführt
 */

// Setze globale Variablen, die von Vite/HMR möglicherweise verwendet werden
if (typeof window !== 'undefined') {
  // Host-Check-Einstellungen
  (window as any).VITE_ALLOWED_HOSTS = '*';
  (window as any).VITE_DISABLE_HOST_CHECK = true;
  (window as any).VITE_HOST_CHECK = false;
  (window as any).VITE_ALLOW_ALL_HOSTS = true;
  
  // HMR-Einstellungen
  (window as any).__vite_plugin_react_timeout = 120000;
  
  // Setze lokale Speicheroptionen
  try {
    localStorage.setItem('vite:allow-host-check', 'false');
    localStorage.setItem('vite:allowed-hosts', '*');
  } catch (e) {
    console.error('Konnte lokalen Speicher nicht aktualisieren:', e);
  }
  
  console.log('🌐 Host-Einschränkungen werden umgangen...');
}

export default function initBypass() {
  // Diese Funktion macht nichts, aber stellt sicher, dass das Modul initialisiert wird
  console.log('🔓 Host-Einschränkungen-Bypass initialisiert');
}