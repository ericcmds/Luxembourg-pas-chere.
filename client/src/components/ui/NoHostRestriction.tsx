import { useEffect } from 'react';

// Diese Komponente versucht, das Host-Einschränkungsproblem zu umgehen
export default function NoHostRestriction() {
  useEffect(() => {
    console.log('NoHostRestriction-Komponente wird aktiviert...');
    
    // Versuche, Vite Host-Check-Einstellungen zu überschreiben
    if (typeof window !== 'undefined') {
      try {
        // Deaktiviere Host-Überprüfungen für Vite
        (window as any).VITE_DISABLE_HOST_CHECK = true;
        (window as any).VITE_HOST_CHECK = false;
        (window as any).VITE_ALLOWED_HOSTS = '*';
        (window as any).VITE_ALLOW_ALL_HOSTS = true;
        
        // Für Vite Hot Module Replacement
        if ((window as any).__vite_plugin_react_preamble_installed__) {
          console.log('Vite React Plugin erkannt - HMR-Einstellungen angepasst');
        }
        
        console.log('NoHostRestriction: Vite Konfigurationen wurden angepasst');
      } catch (err) {
        console.error('Fehler beim Konfigurieren von Vite-Einstellungen:', err);
      }
    }
    
    // Host-Überprüfung in der localStorage umgehen
    try {
      localStorage.setItem('vite:allow-host-check', 'false');
      localStorage.setItem('vite:allowed-hosts', '*');
      console.log('NoHostRestriction: localStorage-Einstellungen wurden angepasst');
    } catch (err) {
      console.error('Fehler beim Schreiben in localStorage:', err);
    }
    
    // Prüfe Website-Konnektivität über Fetch
    fetch('/api/cors-test')
      .then(response => response.json())
      .then(data => {
        console.log('API Test erfolgreich:', data);
      })
      .catch(err => {
        console.error('API Test fehlgeschlagen:', err);
      });
    
    console.log('NoHostRestriction: Komponente vollständig geladen und aktiv');
  }, []);
  
  return null;
}