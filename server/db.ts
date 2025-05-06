import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// WebSocket-Konfiguration für Neon-Datenbank
neonConfig.webSocketConstructor = ws;

// Prüfen, ob Datenbankurl verfügbar ist
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL muss gesetzt sein. Haben Sie vergessen, eine Datenbank bereitzustellen?",
  );
}

// Datenbankverbindung herstellen
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Export einer Funktion für Clean-Up bei Serverbeendigung
export const closeDatabaseConnection = async () => {
  await pool.end();
  console.log('Datenbankverbindung geschlossen');
};