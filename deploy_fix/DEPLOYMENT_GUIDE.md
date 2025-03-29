# Luxembourg Pas Chère - Deployment Guide

Dieses Dokument enthält Anweisungen zur Lösung des HTTP 502-Fehlers beim Deployment der Luxembourg Pas Chère Website.

## Fehlerbeschreibung

Der Fehler tritt aufgrund von Inkompatibilitäten zwischen dem ESM-Format des Ursprungsprojekts und dem CommonJS-Format auf, das von Replit Deployments erwartet wird.

## Dateien für die Fehlerbehebung

In diesem Verzeichnis finden Sie:

1. `deploy_package.json` - Eine angepasste package.json-Datei mit korrigierten Build- und Start-Skripten
2. `server.cjs` - Eine kompatible CommonJS-Version des Servers
3. `DEPLOYMENT_GUIDE.md` - Diese Anleitung

## Anleitung zur Fehlerbehebung

### Schritt 1: Deployment starten
1. Klicken Sie auf den "Deploy"-Button in der Replit-Oberfläche (oben rechts)
2. Warten Sie, bis der erste Build-Versuch fehlschlägt (HTTP 502-Fehler)

### Schritt 2: Dateien anpassen
1. Gehen Sie im Deployment-Interface zum Tab "Files"
2. Ersetzen Sie die `package.json` im Hauptverzeichnis mit dem Inhalt von `deploy_fix/deploy_package.json`
3. Falls nicht automatisch im Build-Prozess kopiert: 
   - Kopieren Sie `deploy_fix/server.cjs` in das `dist/`-Verzeichnis
   - Kopieren Sie `client/public/service-worker.js` in das `dist/public/`-Verzeichnis
   - Kopieren Sie `client/public/offline.html` in das `dist/public/`-Verzeichnis

### Schritt 3: Deployment abschließen
1. Speichern Sie alle Änderungen
2. Führen Sie das Deployment erneut durch
3. Die Anwendung sollte nun unter https://luxembourg-pas-chere.replit.app verfügbar sein

## Wichtige Hinweise

- Diese Lösung ändert das Laufzeitverhalten der Anwendung von ESM zu CommonJS
- Alle erforderlichen Funktionen und Endpunkte werden weiterhin unterstützt
- Die API-Endpunkte `/api/contact` und `/api/newsletter` funktionieren wie erwartet
- Die statischen Dateien werden korrekt aus dem `dist/public`-Verzeichnis bereitgestellt
- Der Service Worker ermöglicht Offline-Funktionalität und ein verbessertes Benutzererlebnis
- Die Seite wird als Progressive Web App (PWA) bereitgestellt, die auf Mobilgeräten installiert werden kann

Bei weiteren Problemen kontaktieren Sie bitte den Support.