// Host-Einschränkungen umgehen als erstes importieren
import "./lib/bypassHostRestriction";

import { createRoot } from "react-dom/client";
import App from "./App";
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
  root.render(<App />);
  console.log("✅ Anwendung erfolgreich gerendert!");
} catch (error) {
  console.error("❌ Fehler beim Rendern der Anwendung:", error);
}
