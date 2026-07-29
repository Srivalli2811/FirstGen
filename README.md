# 🎓 FirstGen - AI-Powered Student Support Platform

> Empowering first-generation college students through AI-powered career guidance, scholarship discovery, mental wellness support, and counselor assistance.

## 🌐 Live Demo

**Frontend:** https://first-gen-nine.vercel.app

**Backend API:** https://firstgen-backend.onrender.com

---

## 📖 Overview

FirstGen is a full-stack MERN application designed to support first-generation college students by providing a centralized platform for academic guidance, mental wellness, scholarship discovery, and career assistance.

The platform includes role-based dashboards for Students and Counselors, secure authentication, AI-powered assistance, mood tracking, and burnout detection.

---

## ✨ Features

### 👨‍🎓 Student

- Secure Signup & Login (JWT Authentication)
- Personalized Dashboard
- AI Career Guidance Chatbot
- Mood Tracking
- Mood History & Analytics
- Burnout Detection
- Scholarship Explorer
- Profile Management

### 👩‍🏫 Counselor

- Secure Login
- Student Dashboard
- Monitor Student Mood Trends
- Identify Students at Risk
- View Student Profiles

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

### AI

- OpenAI API

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

```
FirstGen
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication

- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Srivalli2811/FirstGen.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙ Environment Variables

Backend `.env`

```env
PORT=
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
FRONTEND_URL=
```

Frontend `.env`

```env
VITE_API_URL=
```

---

## 📸 Screenshots

> Add screenshots here after deployment.

- Login Page
- Student Dashboard
- Counselor Dashboard
- AI Chatbot
- Mood Tracker
- Scholarship Portal

---

## 🔮 Future Improvements

- Dark/Light Theme
- Email Notifications
- Scholarship Recommendation Engine
- Real-time Chat
- Mobile Application
- Analytics Dashboard

---

## 👩‍💻 Author

**Srivalli Patta**

- GitHub: https://github.com/Srivalli2811

---

## ⭐ If you found this project interesting, consider giving it a star.