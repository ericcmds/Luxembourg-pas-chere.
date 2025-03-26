import { Request, Response, NextFunction } from 'express';

/**
 * Verbesserte Middleware zum Umgehen der Host-Einschränkungen in Vite
 * Diese Middleware sollte vor allen anderen Middleware-Komponenten in express hinzugefügt werden
 */
export const bypassHostCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Erkennen der aktuellen Umgebung
    const isDevMode = process.env.NODE_ENV !== 'production';
    const isViteRequest = 
      req.path.includes('/@vite/') || 
      req.path.includes('/@fs/') || 
      req.path.includes('/@id/') ||
      req.headers.referer?.includes('__replco/workspace_iframe');
    
    // Debug-Informationen in reduzierter Form (nur bei bestimmten Anfragen)
    if (isViteRequest) {
      console.log(`🔍 Request Host: ${req.headers.host}`);
      console.log(`🔍 Origin: ${req.headers.origin}`);
      console.log(`🔍 Referer: ${req.headers.referer}`);
    }

    // Host-Header modifizieren, um Einschränkungen zu umgehen
    if (req.headers && req.headers.host && isDevMode) {
      const allowedHost = 'localhost:5000'; // Immer erlaubter Host
      
      if (isViteRequest) {
        console.log(`🔄 Changing host from ${req.headers.host} to ${allowedHost}`);
      }
      
      req.headers.host = allowedHost;
      
      // Zusätzliche Headers für Vite HMR
      if (req.headers.referer && req.headers.referer.includes('/@vite/client')) {
        req.headers['cache-control'] = 'no-cache, no-store, must-revalidate';
        req.headers['pragma'] = 'no-cache';
      }
    }

    // CORS-Header hinzufügen - umfassende Lösung
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Wenn es ein CORS-Preflight-Request ist, sofort mit 200 OK antworten
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // WebSocket-Verbindungen besonders behandeln
    if (req.headers.upgrade === 'websocket') {
      req.headers.host = 'localhost:5000';
    }
    
    // Mit dem nächsten Middleware fortfahren
    next();
  } catch (error) {
    console.error('❌ Error in bypassHostCheck middleware:', error);
    next();
  }
};