# 🚀 SOLUSI ALTERNATIF - Deploy dengan Render.com

## Kenapa Render.com?

- ✅ Lebih mudah handle monorepo
- ✅ Free tier yang bagus
- ✅ Auto-detect Node.js
- ✅ Tidak ribet dengan build config

---

## 📋 Deploy Backend ke Render (10 menit)

### 1. Setup Account Render

1. Buka https://render.com
2. Klik "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render

### 2. Create Web Service

1. Di dashboard, klik "New +"
2. Pilih "Web Service"
3. Connect GitHub repository: `porto-app`
4. Klik "Connect"

### 3. Configure Service

```
Name: portfolio-backend
Environment: Node
Region: Singapore
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 4. Add Environment Variables

Klik "Advanced" → Add Environment Variables:

```
MONGO_URI = mongodb+srv://portofolio:1rwNr0ZRRIPPT29w@portofolio.wdg71al.mongodb.net/portfolio
JWT_SECRET = hosea-portfolio-secret-key-2025
PORT = 5000
NODE_ENV = production
```

### 5. Deploy

1. Klik "Create Web Service"
2. Tunggu deployment (5-10 menit)
3. Copy URL yang diberikan

✅ **Backend siap di Render!**

**URL Backend Example**: https://portofolio-backend-gjl5.onrender.com

### 6. Test Backend

Test API endpoints:

- Profile: https://portofolio-backend-gjl5.onrender.com/api/profile
- Projects: https://portofolio-backend-gjl5.onrender.com/api/projects
- Social Links: https://portofolio-backend-gjl5.onrender.com/api/social-links

---

## 📋 Deploy Frontend ke Vercel (tetap sama)

### 1. Setup Vercel

1. Buka https://vercel.com
2. Import project `porto-app`
3. Root Directory: `frontend`
4. Environment Variables:

```
NEXT_PUBLIC_API_URL = https://portofolio-backend-gjl5.onrender.com
```

### 2. Deploy

1. Klik "Deploy"
2. Tunggu selesai
3. Copy URL frontend

✅ **Selesai! Website live!**

---

## 🎉 Hasil Akhir:

- **Backend**: Render.com (gratis 750 jam/bulan)
- **Frontend**: Vercel.com (gratis)
- **Database**: MongoDB Atlas (gratis)

**Total biaya: Rp 0/bulan**
