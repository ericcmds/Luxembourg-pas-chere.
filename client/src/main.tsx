// Host-Einschränkungen umgehen als erstes importieren
import "./lib/bypassHostRestriction";

import { createRoot } from "react-dom/client";
// Vereinfachte Version der App verwenden
import MinimalAppSimplified from "./MinimalAppSimplified";
import "./index.css";

// Initialisiere den Bypass
(window as any).VITE_ALLOWED_HOSTS = '*';
(window as any).VITE_DISABLE_HOST_CHECK = true;
(window as any).VITE_HOST_CHECK = false;
(window as any).VITE_ALLOW_ALL_HOSTS = true;

// Render-Funktion mit Fehlerbehandlung
try {
  console.log("🚀 Anwendung wird gestartet...");
  const root = createRoot(document.getElementById("root")!);
  
  // Vereinfachte App ohne komplexe CSS-in-JS Probleme rendern
  root.render(<MinimalAppSimplified />);
  console.log("✅ Vereinfachte Anwendung erfolgreich gerendert!");
  
} catch (error) {
  console.error("❌ Kritischer Fehler beim Starten der Anwendung:", error);
  
  // Zeige eine Fehlermeldung im DOM
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.margin = '20px';
  errorDiv.style.backgroundColor = '#ffebee';
  errorDiv.style.border = '1px solid #f44336';
  errorDiv.style.borderRadius = '4px';
  errorDiv.innerHTML = `
    <h2 style="color: #d32f2f;">Die Anwendung konnte nicht geladen werden</h2>
    <p>Es ist ein kritischer Fehler aufgetreten. Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.</p>
  `;
  document.body.appendChild(errorDiv);
}
