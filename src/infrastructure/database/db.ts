import path from 'path';
import fs from 'fs';
import { Low, JSONFile } from 'lowdb';
import { DatabaseSchema } from '../../domain/entities/DatabaseSchema.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultData: DatabaseSchema = {
  users: [],
  products: [],
  transactions: [],
  activityLogs: [],
  settings: {
    isStoreOpen: true,
    maintenanceMode: false,
  },
};

const adapter = new JSONFile<DatabaseSchema>(DB_FILE);
export const db = new Low<DatabaseSchema>(adapter);

export async function initDatabase(): Promise<void> {
  await db.read();
  db.data ??= defaultData;
  await db.write();
}
