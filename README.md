# Inventory Management

Backend Mini Project

## 🎯 Cara Install dan Menjalankan Aplikasi

### Prerequisites  
- Node.js (v22.12.0)
- NPM (v10.9.0)
- MySQL (v8.0)

### Langkah Instalasi  
1. Clone repository dan buat database dengan nama `inventorydb` di MySQL
   ```bash
   git clone https://github.com/fardanaljihad/inventory-management.git  
   cd inventory-management  
   ```  
2. Install dependencies  
   ```bash
   npm install
   ```  
3. Buat file `.env` dengan menyalin dari `.env.example` dan isi nilai variabel, contohnya:  
    ```
    PORT=3000

    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=inventorydb
    DB_USER=root
    DB_PASS=

    LOG_LEVEL=info

    JWT_SECRET=super_secret_key
    JWT_EXPIRES_IN=1d

    ```  

4. Jalankan migrasi
   ```bash
   npx sequelize-cli db:migrate
   ```  
5. Jalankan aplikasi  
   ```bash
   node src/main.js
   ```  
6. Akses API di `http://localhost:<PORT>` (misalnya `http://localhost:3000`) atau coba kirim request melalui file yang ada dalam folder `api-request`

## 📁 Struktur Folder

Berikut contoh struktur folder yang ditemukan di repo:

```
/
├── api‑request/            # folder dokumentasi request API
├── config/                 # konfigurasi database
├── migrations/             # file migrasi database
├── models/                 # definisi model (ORM)
├── src/                    # kode utama aplikasi (controllers, routes, services, dll)
├── test/                   # unit/integration tests
├── .env.example            # contoh file variabel lingkungan
├── package.json
└── babel.config.json
```

**Penjelasan singkat tiap folder:**
- `api-request/`: Berisi dokumentasi API
- `config/`: Berisi konfigurasi database dengan sequelize.  
- `models/`: Definisi struktur data (ORM atau skema) untuk model User, Category, dan Product.  
- `migrations/`: Script untuk migrasi database.  
- `src/`: Kode aplikasi utama, terdiri dari `route`, `controller`, `service`, `middleware`, dan lain-lain. 
- `test/`: Berisi file test unit atau integrasi.  

## 🛠 Tools / Library yang Digunakan

Beberapa library & tool yang umumnya digunakan dalam proyek ini:

- `express` – web framework untuk Node.js  
- `dotenv` – untuk memuat konfigurasi environment dari file `.env`  
- `sequelize` – ORM
- `Joi` – Library untuk validasi input
- `Jest` dan `supertest` – Library untuk testing
- `winston` – Library untuk logging
- `jsonwebtoken` – Library untuk menggunakan JWT
- `bcrypt` – Library untuk enkripsi password

## 🧪 Contoh Request

### 1. POST product  
```
POST /products  
Content-Type: application/json  
Authorization: Bearer <token>
```
Payload:
```json
{
    "name": "Cola",
    "price": 12.5,
    "stock": 100,
    "categoryId": "de940239-9237-4ecd-9c17-3af93fe98fdb"
}
```
Response sukses:
```json
{
    "data": {
        "name": "Cola",
        "price": 12.5,
        "stock": 100,
        "created_by": "admin@example.com"
    }
}
```
Response gagal:
```json
{
    "errors": "Product already exists"
}
```

### 2. GET products  
```
GET /products?name=&category_name=&page=1&limit=10
Authorization: Bearer <token>
```
Response:
```json
{
    "data": [
        {
            "id": "dead34a3-d638-4100-ac74-dcf6e341097d",
            "name": "Chocolate Bar",
            "price": "12.50",
            "stock": 100,
            "category_name": "Foods"
        },
        {
            "id": "2635ac8f-9098-4fcf-afca-a6a93cd3db98",
            "name": "Cola",
            "price": "12.50",
            "stock": 100,
            "category_name": "Drinks"
        },
        {
            "id": "8eee81ff-9ce6-4180-9ce7-5c1d8f77b22e",
            "name": "Coffe",
            "price": "12.50",
            "stock": 100,
            "category_name": "Drinks"
        },
        {
            "id": "d5e1fab4-b606-4314-9d69-8644121268b5",
            "name": "Colaz",
            "price": "12.50",
            "stock": 100,
            "category_name": "Drinks"
        }
    ],
    "pagination": {
        "page": 1,
        "total_item": 4,
        "total_page": 1
    }
}
```

### 3. PUT product  
```
PUT /products/:id
Content-Type: application/json  
Authorization: Bearer <token>
```
Payload:
```json
{
    "name": "Es Teh Manis",
    "price": 15.5,
    "stock": 100,
    "categoryId": "de940239-9237-4ecd-9c17-3af93fe98fdb"
}
```
Response:
```json
{
    "data": {
        "id": "2635ac8f-9098-4fcf-afca-a6a93cd3db98",
        "name": "Es Teh Manis",
        "price": "15.50",
        "stock": 100,
        "categoryId": "de940239-9237-4ecd-9c17-3af93fe98fdb",
        "modified_by": "admin@example.com",
        "modified_at": "2025-10-29T08:31:31.000Z"
    }
}
```

### 4. DELETE product  
```
DELETE /products/:id  
Authorization: Bearer <token>
```
Response:
```json
{
    "data": {
        "id": "2635ac8f-9098-4fcf-afca-a6a93cd3db98",
        "name": "Es Teh Manis"
    }
}
```

---

## ✏️ Catatan
- Folder `api-requests` berisi file yang dapat digunakan untuk mengirim request. Sebelum itu, install extension `REST Client` dari `Huachao Mao` terlebih dahulu.
- Jika ada autentikasi, jangan lupa mendapatkan token terlebih dahulu melalui endpoint login.  
- Pastikan nilai environment variable telah benar (database, port, secret key). 
- Untuk testing, cek folder `test/` dan jalankan dengan `npm test` jika tersedia.

