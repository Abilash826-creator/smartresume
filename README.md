# 🤖 SmartResume AI

> AI-powered resume builder for students. Build stunning, professional resumes with AI assistance, multiple templates, and instant PDF export.

---

## 📁 Project Structure

```
smartresume/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── api/               # Axios API calls
│   │   ├── components/
│   │   │   ├── resume/        # Form, Preview, Templates, AI button
│   │   │   └── ui/            # Shared UI components
│   │   ├── hooks/             # useAuth context
│   │   ├── pages/             # Landing, Login, Register, Dashboard, Builder
│   │   ├── App.jsx            # Router + auth guards
│   │   └── index.css          # Tailwind + custom styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                    # Node.js + Express backend
    ├── controllers/           # authController, resumeController, aiController
    ├── middleware/            # JWT auth middleware
    ├── models/               # User, Resume Mongoose schemas
    ├── routes/               # auth, resume, ai routes
    ├── server.js             # Entry point
    └── package.json
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)
- npm or yarn

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

Create `server/.env` from `server/.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartresume
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Create `client/.env` (optional for custom API URL):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev     # Runs on http://localhost:5000

# Terminal 2 - Frontend
cd client
npm run dev     # Runs on http://localhost:5173
```

---

## 🌐 API Reference

### Auth Endpoints
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Resume Endpoints
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/resume/create` | Create new resume | Yes |
| GET | `/api/resume/user` | Get all user resumes | Yes |
| GET | `/api/resume/:id` | Get single resume | Yes |
| PUT | `/api/resume/update/:id` | Update resume | Yes |
| DELETE | `/api/resume/delete/:id` | Delete resume | Yes |

### AI Endpoint
| Method | Route | Body | Description |
|--------|-------|------|-------------|
| POST | `/api/ai/improve-text` | `{ text, type }` | AI text improvement |

**Type values:** `objective`, `project`, `experience`, `skill`, `general`

---

## 📊 Database Schemas

### User Schema
```js
{
  name: String (required, 2-50 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  createdAt: Date
}
```

### Resume Schema
```js
{
  userId: ObjectId (ref: User),
  title: String,
  template: String (modern | professional | minimal),
  personalInfo: {
    fullName, email, phone, linkedin, github, address, objective
  },
  education: [{ collegeName, degree, year, gpa }],
  skills: [String],
  projects: [{ title, description, technologies, link }],
  experience: [{ company, role, duration, description }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Resume Templates

| Template | Style | Best For |
|----------|-------|----------|
| **Modern** | Blue gradient header, two-column | Tech / Engineering |
| **Professional** | Teal sidebar, classic layout | Business / Finance |
| **Minimal** | Typography-first, no colors | Creative / Design |

---

## 🔐 Security Features

- Passwords hashed with **bcrypt** (12 salt rounds)
- **JWT tokens** expire in 7 days
- Routes protected with auth middleware
- Input validation with **express-validator**
- CORS configured for specific origins

---

## 📦 Deployment Guide

### Frontend → Vercel

1. Push your `client/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Set **Root Directory** to `client`
5. Set **Framework** to Vite
6. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
7. Click **Deploy**

### Backend → Render

1. Push your `server/` folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect repository
4. Set **Root Directory** to `server`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node server.js`
7. Add environment variables:
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = strong random string
   - `CLIENT_URL` = your Vercel URL
   - `NODE_ENV` = `production`
8. Click **Create Web Service**

### Database → MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create database user with password
4. Whitelist IP `0.0.0.0/0` (all IPs, for Render)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/smartresume`

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Styling | TailwindCSS 3 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Validation | express-validator |
| PDF Export | html2pdf.js |

---

## ✨ Features

- ✅ JWT Authentication (Register / Login / Logout)
- ✅ Dashboard with resume management (CRUD)
- ✅ 5-step resume builder form wizard
- ✅ AI text improvement (objective, projects, experience)
- ✅ 3 professional resume templates
- ✅ Live resume preview
- ✅ PDF download with html2pdf.js
- ✅ Responsive design (mobile + desktop)
- ✅ Input validation (frontend + backend)
- ✅ Protected routes

---

## 📝 License

MIT © SmartResume AI
