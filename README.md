# MaulOnlineShop — Enterprise PPOB System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Architecture-Clean-orange" alt="Clean Architecture">
  <img src="https://img.shields.io/badge/Database-LowDB%20%28JSON%29-lightgrey" alt="LowDB">
  <img src="https://img.shields.io/badge/License-ISC-yellow" alt="License">
</p>

**MaulOnlineShop** adalah sistem aplikasi **PPOB (Payment Point Online Bank)** skala *Enterprise* yang dirancang untuk melayani transaksi pengisian **Saldo Emoney**, **Pulsa**, dan **Game Top-Up**. Dibangun di atas **Node.js + TypeScript** dengan pendekatan **Clean Architecture**, sistem ini dioptimalkan untuk performa tinggi, konkurensi aman, dan keamanan ketat.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🤖 **4 Ekosistem Bot** | Bot Order (CS), Bot Notif (OTP/Alert), Bot Status (Promo via User API), Bot Assistant (Admin Panel) |
| 💳 **Transaksi Otomatis & Manual** | Integrasi DigiFlazz (sync 30 detik) + Midtrans (QRIS & Virtual Account) + Fallback Manual |
| 🌐 **Responsive Web UI** | Halaman utama modern, filter multi-layer (Kategori → Brand → Produk), banner dinamis otomatis |
| 🔒 **Keamanan Strict** | OTP Verifikasi (Email, WA, Tele), Anti-spam pending order, sanitasi & validasi input |
| 📊 **Dashboard Admin** | Panel web & Telegram (Inline Keyboard), log aktivitas 100%, auto-backup database ke Telegram |
| ⚡ **Caching In-Memory** | Sinkronisasi real-time setiap 30 detik untuk data produk |

---

## 🏗️ Arsitektur (Clean Architecture)

```
MaulOnlineShop/
├── data/                         # File database JSON (LowDB)
│   ├── db.json                   # Database utama
│   └── backups/                  # Hasil auto-backup (.zip)
├── src/
│   ├── domain/                   # Lapisan Domain (Entitas & Interface)
│   │   ├── entities/             # TypeScript Interfaces/Types
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Transaction.ts
│   │   │   └── DatabaseSchema.ts
│   │   └── repositories/         # Interface repositori data
│   ├── usecases/                 # Lapisan Use Cases (Logika Bisnis)
│   │   ├── auth/                 # Autentikasi & Verifikasi OTP
│   │   └── transactions/         # Proses & manajemen transaksi
│   ├── infrastructure/           # Lapisan Infrastruktur (Layanan Eksternal)
│   │   ├── database/             # Konfigurasi & inisialisasi LowDB
│   │   │   └── db.ts
│   │   ├── payment/              # Midtrans client & fallback manual
│   │   ├── provider/             # DigiFlazz API client
│   │   └── caching/              # Manager cache in-memory
│   ├── presentation/             # Entry Points (API, Web, Bots)
│   │   ├── web/                  # Express.js API & frontend
│   │   └── bots/                 # Ekosistem bot
│   │       ├── bot-order/        # CS & Tiket Bantuan
│   │       ├── bot-notif/        # OTP & Alert Admin
│   │       ├── bot-status/       # Promo & Stories otomatis
│   │       └── bot-assistant/    # Admin Panel (Inline Keyboard)
│   └── app.ts                    # Bootstrap & seeder aplikasi
├── public/                       # Aset Frontend (HTML, CSS, JS, Gambar)
├── .env                          # Konfigurasi kredensial (JANGAN di-commit)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗂️ Skema Database (LowDB)

Database tersimpan di `data/db.json` dengan struktur:

```typescript
interface DatabaseSchema {
  users: User[];           // Data pengguna terdaftar
  products: Product[];     // Katalog produk PPOB
  transactions: Transaction[]; // Riwayat transaksi
  activityLogs: ActivityLog[]; // Log aktivitas seluruh user
  settings: {
    isStoreOpen: boolean;      // Status toko buka/tutup
    maintenanceMode: boolean;  // Mode maintenance
  };
}
```

### Entitas Utama

- **User**: `id`, `username`, `email`, `phoneWA`, `role` (`SUPER_ADMIN`|`ADMIN`|`USER`), `balance`, `status`, `isBlocked`, `telegramId`
- **Product**: `sku`, `category`, `brand`, `name`, `price`, `providerPrice`, `status`
- **Transaction**: `id`, `userId`, `sku`, `targetId`, `amount`, `paymentMethod`, `status`

---

## 🚀 Instalasi & Menjalankan

### Prasyarat

- **Node.js** v18.x atau lebih baru
- **npm** v9+
- Akun **DigiFlazz** (Username & API Key)
- Akun **Midtrans** (Server Key & Client Key)
- Token **Telegram Bot** (untuk bot-order, bot-notif, bot-assistant)
- Sesi **WhatsApp Web/Baileys** (untuk bot-notif & bot-status)

### 1. Clone Repository

```bash
git clone https://github.com/abbimaulana/MaulOnlineShop.git
cd MaulOnlineShop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di direktori root:

```env
# Server
PORT=3000

# DigiFlazz
DIGIFLAZZ_USERNAME=your_digiflazz_username
DIGIFLAZZ_API_KEY=your_digiflazz_api_key

# Midtrans
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# Telegram Bot Tokens
BOT_ORDER_TOKEN=your_bot_order_token
BOT_NOTIF_TOKEN=your_bot_notif_token
BOT_ASSISTANT_TOKEN=your_bot_assistant_token

# Super Admin (override default values via env vars)
SUPER_ADMIN_EMAIL=your_super_admin_email@example.com
SUPER_ADMIN_PHONE=628xxxxxxxxxx
SUPER_ADMIN_TELE_ID=your_telegram_user_id
```

### 4. Inisialisasi Database & Build

```bash
npm run build
```

### 5. Jalankan Pertama Kali (Seeder Otomatis)

Saat pertama dijalankan, sistem akan otomatis membuat:
- Akun **Super Admin** (`abbimaulanhamalik80@gmail.com`)
- Akun testing **`member_dummy`** dengan saldo Rp 50.000

```bash
npm run dev
# atau setelah build:
npm run start
```

Output yang diharapkan:
```
✅ Database seeded successfully!
   Super Admin : abbimaulanhamalik80@gmail.com (Tele: 8462557913)
   Dummy User  : member_dummy (Balance: Rp 50.000)
   Settings    : Store Open=true, Maintenance=false
```

---

## 👤 Akun Default

| Role | Username | Email | Keterangan |
|---|---|---|---|
| `SUPER_ADMIN` | `super_admin` | `abbimaulanhamalik80@gmail.com` | Owner utama sistem |
| `USER` | `member_dummy` | `member_dummy@example.com` | Akun testing (Saldo: Rp 50.000) |

---

## 🔧 Scripts NPM

| Script | Perintah | Fungsi |
|---|---|---|
| `dev` | `npm run dev` | Jalankan dengan `tsx` (development) |
| `build` | `npm run build` | Kompilasi TypeScript ke JavaScript |
| `start` | `npm run start` | Jalankan hasil build (production) |

---

## 🛡️ Fitur Keamanan

- **OTP Verifikasi**: Kode angka via Bot Notif (WA/Telegram), bukan QR Code
- **Anti-spam**: Cek pending deposit sebelum membuat order baru
- **Input Sanitasi**: Validasi ketat untuk semua input pengguna
- **Role-based Access**: `SUPER_ADMIN` > `ADMIN` > `USER`
- **Block/Unblock User**: Admin dapat memblokir user yang bermasalah

---

## 🤝 Kontribusi

Sistem ini menggunakan **Clean Architecture**. Saat menambahkan fitur baru:

1. Definisikan entitas/interface baru di `src/domain/entities/`
2. Buat use case di `src/usecases/`
3. Implementasikan infrastruktur (DB, API eksternal) di `src/infrastructure/`
4. Ekspos melalui `src/presentation/` (Web/Bot)

---

## 📄 Lisensi

ISC License © 2024 [Abbi Maulana Malik](https://github.com/abbimaulana) 
