# 🛒 HarishCart — Full-Stack E-Commerce App

A complete e-commerce web application built with React and Node.js, featuring user authentication, product management, and a full shopping cart flow.

🌐 **Live Demo:** [harishcart.vercel.app](https://harishcart.vercel.app)

---

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 🛍️ Product browsing with search and category filters
- 🛒 Add to cart, update quantity, remove items
- 📦 Order placement and order history
- 📱 Fully responsive UI for mobile and desktop
- 🔒 Protected routes for authenticated users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend) · Render (backend) |

---

## 📁 Project Structure

```
harishcart/
├── frontend/          # React (Vite) app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/913122104047-HARISH-V/harishcart.git
cd harishcart
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 🌐 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)

---

## 👨‍💻 Author

**Harish V** — [GitHub](https://github.com/913122104047-HARISH-V) · [LinkedIn](https://linkedin.com/in/harish-v-a19137265)
