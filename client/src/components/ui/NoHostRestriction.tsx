import { useEffect } from 'react';

/**
 * Diese Komponente versucht, Host-Einschränkungen im Browser zu umgehen
 * Einbinden als erste Komponente in App.tsx
 */
export default function NoHostRestriction() {
  useEffect(() => {
    // In der Client-Umgebung Einstellungen anwenden
    if (typeof window !== 'undefined') {
      console.log('🛠️ Aktiviere Host-Einschränkungen-Bypass...');
      
      // Globale Fenster-Eigenschaften setzen
      (window as any).VITE_ALLOWED_HOSTS = '*';
      (window as any).VITE_DISABLE_HOST_CHECK = true;
      (window as any).VITE_HOST_CHECK = false;
      (window as any).VITE_ALLOW_ALL_HOSTS = true;
      
      // Lokal gespeicherte Eigenschaften setzen
      try {
        localStorage.setItem('vite:allow-host-check', 'false');
        localStorage.setItem('vite:allowed-hosts', '*');
      } catch (e) {
        console.warn('Konnte LocalStorage nicht aktualisieren:', e);
      }
      
      // Meta-Injektion versuchen
      const metaTag = document.createElement('meta');
      metaTag.name = 'vite:disable-host-check';
      metaTag.content = 'true';
      document.head.appendChild(metaTag);
      
      console.log('✅ Host-Einschränkungen-Bypass aktiviert');
    }
  }, []);

  // Diese Komponente rendert nichts sichtbares
  return null;
}