# 🔧 Railway Fix - Cara yang Benar

## Masalah: Railway Detect Root Directory Salah

Railway melihat structure:

```
./
├── backend/
├── deployment/
├── frontend/
├── scripts/
├── src/
```

Dan bingung folder mana yang mau di-deploy.

---

## ✅ SOLUSI: Deploy Railway dengan Benar

### Step 1: Hapus Project Lama

1. Di Railway dashboard
2. Klik project yang error
3. Settings → Danger → Delete Project

### Step 2: Buat Project Baru (Cara Benar)

1. Klik "New Project"
2. **PILIH "Empty Project"** (jangan langsung dari GitHub)
3. Kasih nama: `portfolio-backend`

### Step 3: Connect GitHub Setelah Project Dibuat

1. Di project baru, klik "Settings"
2. Klik "Connect Repo"
3. Pilih repository: `porto-app`
4. **PENTING**: Set "Root Directory" = `backend`
5. Save

### Step 4: Configure Deploy Settings

Di Settings:

```
Root Directory: backend
Build Command: npm install
Start Command: npm start
Auto Deploy: Yes
```

### Step 5: Environment Variables

Di Variables tab:

```
MONGO_URI = mongodb+srv://portofolio:1rwNr0ZRRIPPT29w@portofolio.wdg71al.mongodb.net/portfolio
JWT_SECRET = hosea-portfolio-secret-key-2025
PORT = 5000
NODE_ENV = production
```

### Step 6: Manual Deploy

1. Klik "Deployments" tab
2. Klik "New Deployment"
3. Tunggu selesai

---

## 🎯 Mana yang Lebih Mudah?

**REKOMENDASI SAYA:**

1. **Render.com** ← **PALING MUDAH**

   - Auto-detect monorepo
   - User friendly
   - Free tier bagus

2. **Railway (dengan cara baru)**
   - Lebih ribet setup
   - Tapi once work, mantap

Mau coba yang mana? Saya sarankan **Render.com** karena lebih straightforward!
