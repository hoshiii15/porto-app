# Portfolio Website - MERN Stack

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) featuring a sleek dark theme and professional design.

## 🚀 Features

- **Modern UI/UX**: Dark theme with gradient backgrounds and smooth animations
- **Responsive Design**: Optimized for all device sizes
- **Admin Dashboard**: Complete content management system
- **Dynamic Content**: Real-time project and profile management
- **Social Media Integration**: Dynamic social media links with auto-detected icons
- **Professional Stats**: Dynamic project counting and skills showcase
- **Contact System**: Contact form with email integration
- **Authentication**: Secure admin authentication system

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.3** - React framework with SSR
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern React development

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/hoshiii15/porto-app.git
cd porto-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

Start the backend server:
Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

## 🌐 Usage

1. **Frontend**: Open [http://localhost:3000](http://localhost:3000) to view the portfolio
2. **Admin Dashboard**: Access [http://localhost:3000/admin](http://localhost:3000/admin) for content management
3. **API**: Backend API runs on [http://localhost:5000](http://localhost:5000)

### Admin Features

- **Profile Management**: Update personal information, bio, contact details
- **Project Management**: Add, edit, delete portfolio projects
- **Social Links**: Manage social media profiles with auto-detected icons
- **Real-time Stats**: View dynamic statistics and project counts

## 📁 Project Structure

```
porto-app/
├── frontend/                 # Next.js frontend application
│   ├── components/          # React components
│   │   ├── admin/          # Admin dashboard components
│   │   ├── shared/         # Shared components (Header, Footer)
│   │   └── ...
│   ├── pages/              # Next.js pages
│   │   ├── admin/          # Admin pages
│   │   └── ...
│   ├── utils/              # Utility functions and API calls
│   └── public/             # Static assets
├── backend/                 # Express.js backend application
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── uploads/            # File uploads (gitignored)
└── README.md
```

## 🎨 Features Showcase

### Dynamic Profile Management

- Real-time profile updates
- Location auto-detection
- Professional contact information
- Skills and bio management

### Project Portfolio

- Image upload and management
- Technology tag system
- GitHub integration
- Live demo links

### Admin Dashboard

- Comprehensive content management
- Real-time statistics
- User-friendly interface
- Secure authentication

## 🔧 Configuration

### Environment Variables

**Backend (.env)**

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

**Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. Set environment variables in your hosting platform
2. Ensure MongoDB connection is configured
3. Deploy the backend folder

### Frontend Deployment (Vercel/Netlify)

1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Deploy the frontend folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hosea Raka N**

- GitHub: [@hoshiii15](https://github.com/hoshiii15)
- Email: hosearakan1226@gmail.com

## 🙏 Acknowledgments

- Thanks to the MERN stack community for excellent documentation
- Tailwind CSS for the beautiful styling system
- Next.js team for the amazing React framework

---

⭐ Star this repository if you found it helpful!

1. Create a Sanity project at https://www.sanity.io/ and note your Project ID and Dataset name.
2. Create a `project` schema in Sanity with fields: title, description, image (image type), tags (array), liveUrl, codeUrl.
3. In your local project, set environment variables (for local dev, create a `.env.local` file):

   SANITY_PROJECT_ID=yourProjectId
   SANITY_DATASET=production

4. Restart the dev server. The app will fetch projects from Sanity when `SANITY_PROJECT_ID` is present; otherwise it falls back to `data/projects.json`.

Notes

- The Sanity client helper is in `lib/sanity.js`. It uses a simple GROQ query to fetch `project` documents.
- If you prefer preview or authenticated fetching, the client can be extended with a token and preview flags.

Embedded Studio in this repo

The Sanity CLI added an embedded Studio to this Next.js project mounted at the route `/admin`.
To run the Next.js app (which serves the Studio at `/admin`):

```powershell
cd 'd:\Kuliah\Kuliah\Butuh Uang SMT an\PortoWeb'
npm install
npm run dev
# open http://localhost:3000/admin
```

If you created a standalone studio (folder `studio-portoweb`), start it with:

```powershell
cd 'd:\Kuliah\Kuliah\Butuh Uang SMT an\PortoWeb\studio-portoweb'
npm install
npm run dev
# open http://localhost:3333
```

Migrating local projects to Sanity

1. Create a token in Sanity with write permissions and add it to `.env.local` as `SANITY_API_TOKEN`.
2. Run the migration script:

```powershell
cd 'd:\Kuliah\Kuliah\Butuh Uang SMT an\PortoWeb'
node scripts/migrate-to-sanity.js
```

Notes

- The migration script creates `project` documents using fields from `data/projects.json`. Images aren't uploaded automatically; you can reference remote image URLs or upload assets separately.
