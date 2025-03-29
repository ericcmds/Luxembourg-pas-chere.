const fs = require('fs-extra');
const path = require('path');

// Pfade definieren
const sourceDir = path.resolve(__dirname, 'client/public');
const targetDir = path.resolve(__dirname, 'dist/public');

// Service Worker-Dateien kopieren
async function copyServiceWorker() {
  try {
    // Stelle sicher, dass Zielverzeichnis existiert
    await fs.ensureDir(targetDir);
    
    // Kopiere service-worker.js
    await fs.copy(
      path.join(sourceDir, 'service-worker.js'),
      path.join(targetDir, 'service-worker.js')
    );
    
    // Kopiere offline.html
    await fs.copy(
      path.join(sourceDir, 'offline.html'),
      path.join(targetDir, 'offline.html')
    );
    
    console.log('Service Worker-Dateien erfolgreich kopiert!');
  } catch (err) {
    console.error('Fehler beim Kopieren der Service Worker-Dateien:', err);
  }
}

copyServiceWorker();