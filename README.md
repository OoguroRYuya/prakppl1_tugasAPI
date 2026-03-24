# Investment Portfolio API

## 1. Deskripsi Project

API Manajemen Portfolio Investasi adalah aplikasi REST API yang dibangun menggunakan Node.js dan Express.js. API ini memungkinkan pengguna untuk mengelola portfolio investasi mereka dengan fitur untuk melihat, menambah, dan menghapus aset investasi seperti cryptocurrency dan instrumen investasi lainnya.

**Fitur Utama:**
- Melihat daftar semua aset investasi
- Menambahkan aset investasi baru
- Menghapus aset investasi berdasarkan ID

---

## 2. Dokumentasi API

### Endpoint List

#### 1. GET /api/assets
**Deskripsi:** Mengambil daftar semua aset investasi dalam portfolio

**Method:** `GET`  
**URL:** `/api/assets`

**Response Success (200 OK):**
```json
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "name": "Bitcoin",
      "type": "Crypto",
      "units": 0.5,
      "price": 60000
    }
  ]
}
```

**Response Error (500 Internal Server Error):**
```json
{
  "status": "ERROR",
  "message": "Terjadi kesalahan pada server"
}
```

---

#### 2. POST /api/assets
**Deskripsi:** Menambahkan aset investasi baru ke dalam portfolio

**Method:** `POST`  
**URL:** `/api/assets`

**Request Body:**
```json
{
  "name": "Ethereum",
  "type": "Crypto",
  "units": 2,
  "price": 3500
}
```

**Response Success (201 Created):**
```json
{
  "status": "OK",
  "message": "Asset added",
  "data": {
    "id": 1711270834000,
    "name": "Ethereum",
    "type": "Crypto",
    "units": 2,
    "price": 3500
  }
}
```

**Response Error (400 Bad Request):**
```json
{
  "status": "ERROR",
  "message": "Request body tidak valid atau field wajib kosong"
}
```

---

#### 3. DELETE /api/assets/:id
**Deskripsi:** Menghapus aset investasi dari portfolio berdasarkan ID

**Method:** `DELETE`  
**URL:** `/api/assets/:id`

**Parameters:**
- `id` (path parameter): ID unik dari aset yang akan dihapus

**Response Success (200 OK):**
```json
{
  "status": "OK",
  "message": "Asset deleted"
}
```

**Response Error (404 Not Found):**
```json
{
  "status": "ERROR",
  "message": "Aset dengan ID tersebut tidak ditemukan"
}
```

---

## 3. Panduan Instalasi (Docker)

### Prasyarat
- Docker dan Docker Compose sudah terinstal di sistem Anda
- Git untuk clone repository

### Langkah-Langkah Menjalankan Aplikasi

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd prakppl1_tugasAPI
   ```

2. **Build dan Jalankan dengan Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Verifikasi Server Berjalan**
   ```
   Server akan berjalan dan Anda akan melihat output:
   Server running on port 5000
   ```

4. **Test API**
   Gunakan tools seperti Postman atau cURL untuk test endpoint:
   ```bash
   curl http://localhost:5000/api/assets
   ```

### Informasi Port

| Tipe | Host | Container | Deskripsi |
|------|------|-----------|-----------|
| HTTP | 5000 | 5000 | Port untuk mengakses API dari host machine |

**Akses API:** http://localhost:5000

### Konfigurasi Docker

**Dockerfile:**
- Base Image: `node:24-alpine` (lightweight Node.js image)
- Working Directory: `/app`
- Expose Port: `5000`
- Command: `npm start`

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:5000"
```

### Menghentikan Aplikasi
```bash
docker-compose down
```

---

## 4. Alur Kerja Git

### Branch Strategy

Project ini menggunakan strategi branching berikut:

| Branch | Deskripsi | Status | Proteksi |
|--------|-----------|--------|----------|
| `main` | Production-ready code | Stabil | ✅ Protected |
| `develop` | Integration branch untuk fitur baru | Staging | ✅ Protected |
| `feature/*` | Branch untuk mengembangkan fitur baru | Development | - |
| `bugfix/*` | Branch untuk memperbaiki bug | Development | - |

### Contoh Alur Branch

```
main (v1.0.0)
 ↑
 └─ develop
     ↑
     ├─ feature/add-update-endpoint
     ├─ feature/add-portfolio-analytics
     └─ bugfix/fix-delete-validation
```

### Conventional Commits

Proyek ini menggunakan **Conventional Commits** untuk standarisasi pesan commit. Format umum:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipe Commit yang Digunakan:**

| Tipe | Deskripsi | Contoh |
|------|-----------|--------|
| `feat` | Menambah fitur baru | `feat(api): add update asset endpoint` |
| `fix` | Memperbaiki bug | `fix(validation): fix empty field validation` |
| `docs` | Dokumentasi | `docs(readme): update installation guide` |
| `style` | Formatting, linting | `style(code): format middleware function` |
| `refactor` | Refactoring tanpa fitur baru | `refactor(app): simplify asset filtering` |
| `test` | Menambah atau update test | `test(api): add comprehensive test cases` |
| `chore` | Build, dependencies, workflow | `chore(deps): update express to v4.18.2` |
| `ci` | CI/CD configuration | `ci(github): add jest workflow` |

### Contoh Conventional Commits di Project Ini

```bash
git commit -m "feat(api): add asset management endpoints

- Implement GET /api/assets to retrieve all assets
- Implement POST /api/assets to add new asset
- Implement DELETE /api/assets/:id to remove asset

Closes #1"
```

```bash
git commit -m "test(portfolio): add comprehensive test cases

- Test GET endpoint for all assets
- Test POST endpoint with validation
- Test DELETE endpoint with ID verification

Closes #2"
```

```bash
git commit -m "docs(readme): add complete documentation

- Add API endpoint documentation
- Add Docker setup guide
- Add testing instructions"
```

### Workflow Commit

1. **Buat feature branch:**
   ```bash
   git checkout -b feature/add-new-feature
   ```

2. **Lakukan perubahan dan test:**
   ```bash
   npm test
   ```

3. **Commit dengan conventional commits:**
   ```bash
   git commit -m "feat(scope): description of changes"
   ```

4. **Push ke remote:**
   ```bash
   git push origin feature/add-new-feature
   ```

5. **Buat Pull Request ke `develop`**

6. **Setelah approval, merge ke `develop`**

7. **Ketika siap release, merge `develop` ke `main`**

---

## 5. Status Automasi (GitHub Actions)

### Workflow yang Dikonfigurasi

Project ini menggunakan GitHub Actions untuk otomasi CI/CD dengan dua workflow utama:

#### A. Workflow: CI Test (Continuous Integration)

**File:** `.github/workflows/test.yml`

**Tujuan:** Menjalankan automated testing setiap kali ada push atau pull request

**Trigger:**
- Push ke branch `main`, `develop`, dan `feature/*`
- Pull Request ke `develop` dan `main`

**Tahapan:**
1. **Setup Environment:** Checkout code dan setup Node.js v24
2. **Install Dependencies:** `npm install`
3. **Run Tests:** `npm run test` (Jest + Supertest)
4. **Report:** Generate test coverage report

**Status:** ![CI Tests](https://img.shields.io/badge/CI-Tests-brightgreen)

```yaml
name: CI - Run Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [develop, main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '24'
      - run: npm install
      - run: npm run test
```

---

#### B. Workflow: Code Quality Scan (Continuous Scanning)

**File:** `.github/workflows/codeql.yml`

**Tujuan:** Melakukan analisis keamanan dan kualitas kode menggunakan CodeQL

**Trigger:**
- Push ke `main` dan `develop`
- Pull Request
- Jadwal (setiap minggu)

**Tahapan:**
1. **Initialize CodeQL:** Setup CodeQL untuk analisis
2. **Autobuild:** Build project
3. **Analyze:** Scan untuk vulnerability dan code issues
4. **Report:** Upload hasil ke GitHub Security tab

**Status:** ![CodeQL Analysis](https://img.shields.io/badge/CodeQL-Analysis-blue)

```yaml
name: CodeQL Analysis
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [develop, main]
  schedule:
    - cron: '0 0 * * 0'
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: github/codeql-action/init@v2
      - uses: github/codeql-action/analyze@v2
```

---

### GitHub Actions Badge di Repository

Untuk menampilkan status badge di halaman depan repository, tambahkan badge di bagian atas README:

```markdown
### Status Badges

![CI Tests](https://github.com/<username>/<repo>/actions/workflows/test.yml/badge.svg)
![CodeQL](https://github.com/<username>/<repo>/actions/workflows/codeql.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-v24-brightgreen)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue)
```

---

### Testing dan QA

Untuk memastikan kualitas kode:

1. **Jalankan test lokal sebelum push:**
   ```bash
   npm test
   ```

2. **Coverage Report:**
   ```bash
   npm test -- --coverage
   ```

3. **Pastikan semua test passed sebelum membuat Pull Request**

---

## Referensi dan Resource Tambahan

- [Express.js Documentation](https://expressjs.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Docker Official Guide](https://docs.docker.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

---

**Terakhir Diupdate:** March 24, 2026  
**Versi:** 1.0.0  
**Author:** PPL Praktikum 1 Team
