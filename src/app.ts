import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { db, initDatabase } from './infrastructure/database/db.js';
import { User } from './domain/entities/User.js';

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL ?? 'abbimaulanhamalik80@gmail.com';
const SUPER_ADMIN_PHONE = process.env.SUPER_ADMIN_PHONE ?? '6287872369848';
const SUPER_ADMIN_TELE_ID = process.env.SUPER_ADMIN_TELE_ID ?? '8462557913';

async function seed(): Promise<void> {
  await initDatabase();

  const data = db.data!;

  if (data.users.length > 0) {
    console.log('Database already seeded. Skipping...');
    return;
  }

  const now = new Date().toISOString();

  const superAdmin: User = {
    id: uuidv4(),
    username: 'super_admin',
    email: SUPER_ADMIN_EMAIL,
    phoneWA: SUPER_ADMIN_PHONE,
    role: 'SUPER_ADMIN',
    balance: 0,
    status: 'VERIFIED',
    isBlocked: false,
    createdAt: now,
    telegramId: SUPER_ADMIN_TELE_ID,
  };

  const dummyUser: User = {
    id: uuidv4(),
    username: 'member_dummy',
    email: 'member_dummy@example.com',
    phoneWA: '628000000000',
    role: 'USER',
    balance: 50000,
    status: 'VERIFIED',
    isBlocked: false,
    createdAt: now,
  };

  data.users.push(superAdmin, dummyUser);

  data.settings = {
    isStoreOpen: true,
    maintenanceMode: false,
  };

  await db.write();

  console.log('✅ Database seeded successfully!');
  console.log(`   Super Admin : ${superAdmin.email} (Tele: ${superAdmin.telegramId})`);
  console.log(`   Dummy User  : ${dummyUser.username} (Balance: Rp ${dummyUser.balance.toLocaleString('id-ID')})`);
  console.log(`   Settings    : Store Open=${data.settings.isStoreOpen}, Maintenance=${data.settings.maintenanceMode}`);
}

seed().catch((err: unknown) => {
  console.error('❌ Failed to seed database:', err);
  process.exit(1);
});
