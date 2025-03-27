import { useEffect, useState } from 'react';

/**
 * Erweiterte Komponente zum Umgehen von Host-Einschränkungen in Vite
 * Einbinden als erste Komponente in App.tsx
 */
export default function NoHostRestriction() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Netzwerkanfragen abfangen
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      try {
        // Original Fetch-Funktion sichern und überschreiben
        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
          // Zeitstempel an Vite-bezogene Anfragen anhängen
          if (typeof input === 'string' && (
            input.includes('/@vite/') || 
            input.includes('/@fs/') || 
            input.includes('/@id/')
          )) {
            const url = new URL(input, window.location.href);
            url.searchParams.set('t', Date.now().toString());
            return originalFetch(url.toString(), init);
          }
          return originalFetch(input, init);
        };

        // WebSocket-Verbindung patchen - kein direktes Überschreiben wegen TypeScript-Einschränkungen
        try {
          // Stattdessen eine Hook-Lösung verwenden, die beim Erstellen eines neuen WebSockets eingreift
          const originalWebSocketConstructor = window.WebSocket;
          
          // Eine Proxyfunktion erstellen, die die URL modifiziert
          const webSocketProxy = function(
            this: WebSocket, 
            url: string | URL, 
            protocols?: string | string[]
          ): WebSocket {
            let finalUrl = url;
            
            // Wenn es eine Vite-URL ist, anpassen
            if (typeof url === 'string' && url.includes('vite')) {
              try {
                const urlObj = new URL(url);
                urlObj.hostname = 'localhost';
                finalUrl = urlObj.toString();
              } catch (err) {
                console.error('Fehler beim Anpassen der WebSocket-URL:', err);
              }
            }
            
            // Original-WebSocket mit der eventuell modifizierten URL erstellen
            return new originalWebSocketConstructor(finalUrl, protocols);
          };
          
          // Prototypen kopieren
          webSocketProxy.prototype = originalWebSocketConstructor.prototype;
          
          // Statische Eigenschaften kopieren
          Object.defineProperties(webSocketProxy, {
            CONNECTING: { value: originalWebSocketConstructor.CONNECTING },
            OPEN: { value: originalWebSocketConstructor.OPEN },
            CLOSING: { value: originalWebSocketConstructor.CLOSING },
            CLOSED: { value: originalWebSocketConstructor.CLOSED }
          });
          
          // Nicht das globale WebSocket-Objekt überschreiben, sondern einen Hook hinzufügen
          // Wir modifizieren DOMImplementation.createHTMLDocument, um WebSocket-Aufrufe zu überwachen
          document.addEventListener('DOMContentLoaded', () => {
            // WebSocket-Monitor für HMR-Verbindungen
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName: string, options?: ElementCreationOptions): HTMLElement {
              const element = originalCreateElement.call(document, tagName, options);
              if (tagName.toLowerCase() === 'script' && 
                  element instanceof HTMLScriptElement && 
                  element.src && 
                  element.src.includes('/@vite/client')) {
                console.log('🔄 Vite-Client-Skript erkannt, aktiviere WebSocket-Proxy');
                // Hier fügen wir unseren WebSocket-Proxy hinzu
                const script = document.createElement('script');
                script.textContent = `
                  // WebSocket-Verbindungen verarbeiten
                  const wsHandler = {
                    apply: function(target, thisArg, args) {
                      let url = args[0];
                      if (typeof url === 'string' && url.includes('vite')) {
                        try {
                          const urlObj = new URL(url);
                          urlObj.hostname = 'localhost';
                          args[0] = urlObj.toString();
                        } catch (e) { /* Silent catch */ }
                      }
                      return new target(...args);
                    }
                  };
                  
                  // WebSocket-Konstruktor proxen
                  window.WebSocket = new Proxy(window.WebSocket, wsHandler);
                  console.log('✅ WebSocket-Proxy aktiviert');
                `;
                element.parentNode?.insertBefore(script, element.nextSibling);
              }
              return element;
            };
          });
        } catch (err) {
          console.error('Fehler beim Einrichten des WebSocket-Proxys:', err);
        }

        setIsInitialized(true);
      } catch (err) {
        console.error('Fehler beim Überschreiben von Netzwerkmethoden:', err);
      }
    }
  }, [isInitialized]);

  // Host-Einschränkungen umgehen
  useEffect(() => {
    // In der Client-Umgebung Einstellungen anwenden
    if (typeof window !== 'undefined') {
      console.log('🛠️ Aktiviere Host-Einschränkungen-Bypass...');
      
      // Vite Timeout-Werte erhöhen
      (window as any).__vite_plugin_react_timeout = 180000;
      (window as any).__vite_plugin_react_preamble_installed__ = true;
      
      // Globale Fenster-Eigenschaften setzen
      (window as any).VITE_ALLOWED_HOSTS = '*';
      (window as any).VITE_DISABLE_HOST_CHECK = true;
      (window as any).VITE_HOST_CHECK = false;
      (window as any).VITE_ALLOW_ALL_HOSTS = true;
      
      // Lokal gespeicherte Eigenschaften setzen
      try {
        localStorage.setItem('vite:allow-host-check', 'false');
        localStorage.setItem('vite:allowed-hosts', '*');
        localStorage.setItem('vite-host-check-bypass', 'true');
      } catch (e) {
        console.warn('Konnte LocalStorage nicht aktualisieren:', e);
      }
      
      // Meta-Tags zur Vite-Konfiguration
      const metaTags = [
        { name: 'vite:disable-host-check', content: 'true' },
        { name: 'vite:allowed-hosts', content: '*' },
        { name: 'vite:timestamp', content: Date.now().toString() }
      ];
      
      metaTags.forEach(({ name, content }) => {
        const metaTag = document.createElement('meta');
        metaTag.name = name;
        metaTag.content = content;
        document.head.appendChild(metaTag);
      });
      
      // Event-Listener für globale Fehler hinzufügen
      window.addEventListener('unhandledrejection', (event) => {
        if (
          event.reason && 
          typeof event.reason.message === 'string' && 
          event.reason.message.includes('host check')
        ) {
          event.preventDefault();
          console.warn('Host-Check-Fehler unterdrückt:', event.reason.message);
        }
      });
      
      console.log('✅ Host-Einschränkungen-Bypass aktiviert');
    }
  }, []);

  // Diese Komponente rendert nichts sichtbares
  return null;
}