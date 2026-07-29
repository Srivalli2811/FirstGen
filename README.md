# 🎓 FirstGen – AI-Powered Student Support Platform

> AI-powered MERN platform helping first-generation college students with career guidance, scholarship discovery, mental wellness support, and counselor assistance.

## 🌐 Live Demo

- **Frontend:** https://first-gen-nine.vercel.app
- **Backend API:** https://firstgen-backend.onrender.com

---

## 📖 Overview

FirstGen is a full-stack MERN application designed to support first-generation college students through a centralized platform for academic guidance, mental wellness, scholarship discovery, and career assistance.

The platform features secure role-based authentication for Students and Counselors, AI-powered guidance, mood tracking, burnout detection, and scholarship exploration. It is deployed using **Vercel**, **Render**, and **MongoDB Atlas**.

---

## ✨ Features

### 👨‍🎓 Student Portal

- Secure Signup & Login using JWT Authentication
- Personalized Dashboard
- AI-Powered Career Guidance Chatbot
- Mood Tracking & Mood History
- Burnout Detection
- Scholarship Explorer
- Profile Management

### 👩‍🏫 Counselor Portal

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

### AI Integration

- OpenAI API

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📁 Project Structure

```text
FirstGen
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication & Security

- JWT-based Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Srivalli2811/FirstGen.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```env
PORT=
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
FRONTEND_URL=
```

### Frontend (`.env`)

```env
VITE_API_URL=
```

---

## ❤️ Built With

- React
- Node.js
- Express.js
- MongoDB Atlas
- OpenAI API
- JWT Authentication

---

## 🔮 Future Enhancements

- Light & Dark Theme
- Email Notifications
- Personalized Scholarship Recommendation Engine
- Real-Time Chat
- Mobile Application
- Advanced Analytics Dashboard

---

## 👩‍💻 Author

**Srivalli Patta**

- GitHub: https://github.com/Srivalli2811

---

⭐ **If you found this project interesting, consider giving it a star!**