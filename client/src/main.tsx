// Host-Einschränkungen umgehen als erstes importieren
import "./lib/bypassHostRestriction";

import { createRoot } from "react-dom/client";
import React from 'react';
import "./index.css";

// Importiere die vollständig statische Version der App
import StaticApp from "./StaticApp";

// Deaktivieren des Hot-Module-Reloadings, da dies zu Flackern führen kann
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept(() => {});
}

// Render-Funktion mit Fehlerbehandlung
try {
  console.log("🚀 Anwendung wird gestartet...");
  const root = createRoot(document.getElementById("root")!);
  
  // Statische App ohne jegliches responsives Design rendern
  root.render(<StaticApp />);
  console.log("✅ Statische Anwendung erfolgreich gerendert!");
  
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
