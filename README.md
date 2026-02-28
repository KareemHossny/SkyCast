# SkyCast – Real-Time Weather Web App

![React](https://img.shields.io/badge/Frontend-React_18-blue)
![Vite](https://img.shields.io/badge/Build-Vite_5-purple)
![Tailwind](https://img.shields.io/badge/Styles-TailwindCSS-green)
![Express](https://img.shields.io/badge/Backend-Express-yellow)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)
![Production](https://img.shields.io/badge/Status-Production-green)

**SkyCast** is a **production-ready weather web application** providing **current conditions and short-term forecasts** for any city or your current location.  
It uses a **React frontend** and an **Express backend** that proxies and normalizes OpenWeather data for a clean, fast, and reliable weather experience.

---

## 🚀 Live Demo (Fully Functional)

- **Frontend:** [https://skycast-xi-ecru.vercel.app](https://skycast-xi-ecru.vercel.app)  
- **Backend API:** [https://skycast-backend.vercel.app](https://skycast-backend.vercel.app)

> Fully operational: Users can get weather by city or coordinates, view forecasts, manage favorite cities, and enjoy dynamic UI themes.

---

## 📦 Source Code

- **Frontend Repository:** [SkyCast-Frontend](https://github.com/KareemHossny/SkyCast-Frontend)  
- **Backend Repository:** [SkyCast-Backend](https://github.com/KareemHossny/SkyCast-Backend)

---

## 🧠 System Architecture

```
User
  ↓
Frontend (React SPA with Vite, Tailwind, React Query)
  ↓
Backend (Express API)
  ↓
OpenWeather API
```

- Frontend: React 18 + Vite 5, Tailwind, Framer Motion, React Query, Recharts, React Icons  
- Backend: Node.js, Express, CORS, dotenv, centralized error handling  
- Database: None (theme & favorites stored in localStorage)  
- Deployment: Vercel (Frontend + Backend separate services)

---

## ✨ Core Features (Fully Working)

### 🌤 Weather

- Current weather by city or coordinates  
- Short-term forecast timeline  
- Temperature trend chart  

### 📍 Location

- Browser geolocation support with high-accuracy retry  
- IP-based fallback when GPS fails  
- Persistent favorite cities  

### 🌗 User Experience

- Weather-based dynamic UI theme  
- Dark/light mode with localStorage persistence  
- Search suggestions from favorites + popular cities  
- Keyboard navigation in suggestions dropdown  
- Loading, error, and last-updated states  

### ⚙️ Operations

- Health check endpoint  
- Vercel rewrite-based routing  

> All features are fully implemented and functional in the live demo.

---

## 🔐 Authentication & Security

- No authentication required (open app)  
- CORS allowlist configured for production  
- Input validation for required query parameters  
- Centralized API error handling  
- OpenWeather API key loaded from environment variables  

---

## 📡 API Documentation

**Base URL:** https://skycast-backend.vercel.app

| Endpoint | Description |
|----------|-------------|
| GET /health | Health check |
| GET /api/weather?city={city} | Current weather by city |
| GET /api/weather?lat={lat}&lon={lon} | Current weather by coordinates |
| GET /api/weather/forecast?city={city} | Forecast by city |
| GET /weather?city={city} | Alias for current weather by city |
| GET /weather?lat={lat}&lon={lon} | Alias for current weather by coordinates |
| GET /weather/forecast?city={city} | Alias for forecast |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repositories

```bash
# Frontend
git clone https://github.com/KareemHossny/SkyCast-Frontend.git

# Backend
git clone https://github.com/KareemHossny/SkyCast-Backend.git
```

### 2️⃣ Backend Setup

```bash
cd SkyCast-Backend
npm install
```

**.env**

```
OPENWEATHER_API_KEY=<your_openweather_api_key>
PORT=5000
```

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd SkyCast-Frontend
npm install
npm run dev
```

**Production Build**

```bash
cd frontend
npm run build
npm run preview
cd ../backend
npm start
```

---

## 📈 Performance Optimizations

- React Query caching (`staleTime: 5 min`, `refetchOnWindowFocus: false`)  
- Vite manual chunk splitting + esbuild/CSS minification  
- Build-time image optimization via vite-plugin-image-optimizer  
- Backend response mapping for lean payloads  

---

## 🧪 Future Improvements

- Add API rate limiting & request throttling  
- Automated backend & frontend tests  
- Fahrenheit/Celsius unit switch  
- Daily aggregated forecast view  
- PWA/offline support for last fetched results  

---

## 👨‍💻 Author

**Kareem Hossny** – Full Stack MERN Developer  
Open to freelance & junior full-stack opportunities
