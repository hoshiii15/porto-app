# ✅ CHECKLIST DEPLOYMENT - Centang Satu-Satu

## 📋 Persiapan (5 menit)

- [ ] Buka 3 tab browser
- [ ] Tab 1: MongoDB Atlas
- [ ] Tab 2: Railway
- [ ] Tab 3: Vercel
- [ ] Siapkan notepad untuk catat URL dan password

---

## 🗄️ STEP 1: Database (MongoDB Atlas)

### Setup Account & Cluster

- [ ] Buka mongodb.com/cloud/atlas
- [ ] Klik "Try Free"
- [ ] Daftar dengan Google
- [ ] Pilih "Build a Database"
- [ ] Pilih "M0 Sandbox" (FREE)
- [ ] Provider: AWS, Region: Singapore
- [ ] Cluster name: "portfolio"
- [ ] Klik "Create Cluster"

### Buat User Database

- [ ] Username: `admin`
- [ ] Klik "Autogenerate Secure Password"
- [ ] **COPY PASSWORD KE NOTEPAD!**
- [ ] Database User Privileges: "Read and write to any database"
- [ ] Klik "Add User"

### Setup Network Access

- [ ] Klik "Add My Current IP Address"
- [ ] Klik "Finish and Close"

### Ambil Connection String

- [ ] Klik "Connect" di cluster
- [ ] Pilih "Connect your application"
- [ ] Copy connection string
- [ ] **PASTE KE NOTEPAD!**
- [ ] Ganti `<password>` dengan password tadi

**✅ SELESAI - DATABASE SIAP!**

---

## 🚂 STEP 2: Backend (Railway)

### Setup Account

- [ ] Buka railway.app
- [ ] Klik "Start a New Project"
- [ ] Login with GitHub
- [ ] Authorize Railway

### Deploy Project

- [ ] Klik "Deploy from GitHub repo"
- [ ] Pilih repository "porto-app"
- [ ] Klik "Deploy Now"
- [ ] **TUNGGU 5-10 MENIT** (minum kopi dulu ☕)

### Konfigurasi Root Directory

- [ ] Klik project yang baru dibuat
- [ ] Klik tab "Settings"
- [ ] Di "Deploy" → "Root Directory": ketik `backend`
- [ ] Klik "Save"

### Setup Environment Variables

- [ ] Klik tab "Variables"
- [ ] Tambah variable 1:
  ```
  Name: MONGO_URI
  Value: (paste connection string dari notepad)
  ```
- [ ] Tambah variable 2:
  ```
  Name: JWT_SECRET
  Value: my-super-secret-jwt-key-123
  ```
- [ ] Tambah variable 3:
  ```
  Name: PORT
  Value: 5000
  ```
- [ ] Tambah variable 4:
  ```
  Name: NODE_ENV
  Value: production
  ```

### Redeploy

- [ ] Klik tab "Deployments"
- [ ] Klik "Redeploy"
- [ ] Tunggu sampai status "SUCCESS"
- [ ] Copy URL backend (contoh: https://porto-app-production-xxx.up.railway.app)
- [ ] **SIMPAN URL KE NOTEPAD!**

### Test Backend

- [ ] Buka URL: `{backend-url}/api/profile`
- [ ] Harus muncul JSON response

**✅ SELESAI - BACKEND ONLINE!**

---

## 🖥️ STEP 3: Frontend (Vercel)

### Setup Account

- [ ] Buka vercel.com
- [ ] Klik "Start Deploying"
- [ ] Continue with GitHub
- [ ] Authorize Vercel

### Import Project

- [ ] Klik "Add New..." → "Project"
- [ ] Cari repository "porto-app"
- [ ] Klik "Import"

### Configure Project

- [ ] Framework Preset: Next.js (auto-detect)
- [ ] **Root Directory**: `frontend` (PENTING!)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `out`

### Environment Variables

- [ ] Klik "Add" di Environment Variables
- [ ] Name: `NEXT_PUBLIC_API_URL`
- [ ] Value: (paste backend URL dari notepad)
- [ ] Klik "Add"

### Deploy

- [ ] Klik "Deploy"
- [ ] **TUNGGU 3-5 MENIT**
- [ ] Akan muncul "Congratulations!"
- [ ] Copy URL frontend
- [ ] **SIMPAN URL KE NOTEPAD!**

### Test Frontend

- [ ] Buka URL frontend
- [ ] Check apakah website loading
- [ ] Check apakah data muncul

**✅ SELESAI - WEBSITE LIVE!**

---

## 🧪 FINAL TEST

### Test Website

- [ ] Buka frontend URL
- [ ] Website loading dengan baik
- [ ] Data profile muncul
- [ ] Projects tampil
- [ ] Social links working

### Test Admin Panel

- [ ] Buka `{frontend-url}/admin/register`
- [ ] Daftar akun admin baru
- [ ] Login berhasil
- [ ] Bisa edit profile
- [ ] Bisa tambah project

**🎉 SELAMAT! DEPLOYMENT BERHASIL!**

---

## 📝 CATAT HASIL

**Frontend URL**: **************\_\_\_\_**************

**Backend URL**: **************\_\_\_\_**************

**Admin Panel**: **************\_\_\_\_**************

**MongoDB**: ✅ Connected

---

## 🆘 JIKA ADA MASALAH

### Backend Error

- [ ] Check Railway deployment logs
- [ ] Verify environment variables
- [ ] Check MongoDB connection string

### Frontend Error

- [ ] Check Vercel function logs
- [ ] Verify NEXT_PUBLIC_API_URL
- [ ] Test backend URL manual

### Database Error

- [ ] Check MongoDB Atlas network access
- [ ] Verify password in connection string
- [ ] Check user permissions

---

## 🎊 SHARE HASIL

Website Anda sudah LIVE! Bagikan ke:

- [ ] LinkedIn
- [ ] WhatsApp ke teman
- [ ] CV untuk job application
- [ ] Portfolio untuk client

**Selamat! Anda sudah berhasil deploy website ke production!** 🚀
