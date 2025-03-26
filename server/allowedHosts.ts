import { Request, Response, NextFunction } from 'express';

/**
 * Middleware zum manuellen Umgehen der Host-Einschränkungen in Vite
 * Diese Middleware sollte vor allen anderen Middleware-Komponenten in express hinzugefügt werden
 */
export const bypassHostCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Debug-Informationen
    console.log(`🔍 Request Host: ${req.headers.host}`);
    console.log(`🔍 Origin: ${req.headers.origin}`);
    console.log(`🔍 Referer: ${req.headers.referer}`);

    // Host-Header modifizieren, um Einschränkungen zu umgehen
    if (req.headers && req.headers.host) {
      const allowedHost = 'localhost:5000'; // Immer erlaubter Host
      console.log(`🔄 Changing host from ${req.headers.host} to ${allowedHost}`);
      req.headers.host = allowedHost;
    }

    // CORS-Header hinzufügen
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Wenn es ein CORS-Preflight-Request ist, sofort mit 200 OK antworten
    if (req.method === 'OPTIONS') {
      console.log('✅ Handling OPTIONS request with CORS headers');
      return res.status(200).end();
    }
    
    // Mit dem nächsten Middleware fortfahren
    next();
  } catch (error) {
    console.error('❌ Error in bypassHostCheck middleware:', error);
    next();
  }
};