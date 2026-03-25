# Full Stack Portfolio Application

A complete full-stack portfolio application built with the **MERN stack**. Features a modern, responsive frontend for showcasing projects, blog posts, and skills, plus a powerful admin panel for content management. The backend provides RESTful APIs with JWT authentication, file uploads, and role-based access control.

## 🔗 Links

- **Frontend (Vercel):** [https://my-portfolio-q9h8.vercel.app](https://my-portfolio-q9h8.vercel.app)
- **Backend API (Render):** [https://my-portfolio-ler8.onrender.com/api](https://my-portfolio-ler8.onrender.com/api)
- **GitHub:** [https://github.com/MuhammadShoaib20/my-portfolio](https://github.com/MuhammadShoaib20/my-portfolio)

> ⚠️ The backend may sleep on Render's free tier. If the API returns 404, wait a moment and retry.

---

## 🚀 Features

### Frontend
- 🎨 **Modern UI** – Tailwind CSS, dark mode, Framer Motion animations
- 🔐 **Authentication** – JWT login with role-based access (superadmin, admin, editor)
- ✍️ **Admin Dashboard** – Manage projects, blogs, messages, profile, and resumes
- 📁 **File Uploads** – Images and PDF/DOC resumes via Cloudinary
- 📨 **Contact Form** – Visitors message you; admin marks read/replied/deleted
- 🧾 **Resume Downloads** – Multiple versions with download tracking
- 📊 **Analytics** – View and like counts on projects and blogs

### Backend
- 🔐 **Auth** – JWT + bcrypt, role-based middleware
- 📝 **Projects & Blogs** – Full CRUD with categories, tags, featured status, slugs
- 💬 **Contact** – Message storage with status management
- 👤 **Profile** – Public profile with social links and bio
- 👥 **User Management** – Superadmin creates/deletes admin accounts
- 📄 **Resumes** – Upload, toggle, and track downloads
- 📊 **Analytics** – Auto-tracking of views and likes

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router DOM 7, Tailwind CSS 3, Axios, Framer Motion, React Hot Toast, React Icons, date-fns |
| **Backend** | Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, Cloudinary, Multer, cookie-parser, cors |

---

## 📁 Project Structure

```
my-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/           # Admin pages
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth, Theme contexts
│   │   ├── pages/           # Public pages
│   │   ├── utils/           # Axios instance + API modules
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── config/              # DB connection
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Token generator
│   ├── .env.example
│   └── server.js
│
└── README.md
```

---

## 📦 Prerequisites

- Node.js **v18 or higher**
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadShoaib20/my-portfolio.git
cd my-portfolio
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev    # starts on http://localhost:5000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start    # starts on http://localhost:3000
```

---

## 🌍 Environment Variables

### Backend

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | JWT signing secret | ✅ Yes |
| `CLIENT_URL` | Frontend URL for CORS | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `PORT` | Server port | No (5000) |
| `JWT_EXPIRE` | Token expiry | No (30d) |

### Frontend

| Variable | Description | Required |
|---|---|---|
| `REACT_APP_API_URL` | Backend API base URL | ✅ Yes |

---

## 📡 API Summary

All endpoints prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

| Module | Public | Admin+ |
|---|---|---|
| **Auth** | POST `/auth/login` | GET `/auth/me` · PUT `/auth/changepassword` |
| **Projects** | GET `/projects` · GET `/projects/:id` · PUT `/projects/:id/like` | POST/PUT/DELETE `/projects` |
| **Blogs** | GET `/blogs` · GET `/blogs/:slug` · PUT `/blogs/:id/like` | GET `/blogs/admin` · POST/PUT/DELETE `/blogs` |
| **Contact** | POST `/contact` | GET/PUT/DELETE `/contact/:id` |
| **Profile** | GET `/profile` | PUT `/profile` |
| **Users** | — | GET/POST/DELETE `/users` (superadmin) |
| **Resumes** | GET `/resumes/active` · GET `/resumes/download/:id` | POST/PUT/DELETE `/resumes` |
| **Upload** | — | POST `/upload` |

---

## 🚀 Deployment

### Backend → Render

1. Connect GitHub repo to Render as a Web Service
2. Build: `npm install` · Start: `npm start`
3. Add all environment variables
4. Set `NODE_ENV=production` and `CLIENT_URL` to your Vercel domain

### Frontend → Vercel

1. Import GitHub repo in Vercel
2. Set `REACT_APP_API_URL` to your Render backend URL + `/api`
3. Deploy — Vercel auto-detects Create React App

> ⚠️ Make sure MongoDB Atlas whitelists all IPs (`0.0.0.0/0`) or Render's specific IP.

---

## 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request. For major changes, discuss first.

---

## 📄 License

Licensed under the **MIT License**.

---

<div align="center">Built with ❤️ by <a href="https://github.com/MuhammadShoaib20">Muhammad Shoaib</a></div>