# 🚭 UnSmoke Admin Panel

A comprehensive admin dashboard for managing the UnSmoke app - helping people quit smoking through streaks, challenges, and community support.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)

---

## 🎯 Overview

UnSmoke Admin Panel is a powerful, feature-rich dashboard for administrators to manage users, monitor progress, moderate content, and analyze success metrics for the UnSmoke app.

**Key Capabilities:**
- 👥 User Management (15,000+ users)
- 🔥 Streak Tracking & Leaderboards
- 🏆 Rewards & Medals System
- 🎯 Challenge Management
- 💬 Community Moderation
- 📊 Analytics & Reports
- ⚙️ App Settings & Configuration

---

## ✨ Features

### 1. **Dashboard** 
- Real-time statistics overview
- Top streaks leaderboard
- Recent medals awarded
- Quick action cards

### 2. **Users Management**
- View all users with search & filter
- Detailed user profiles
- Ban/Activate users
- Reset streaks
- Activity logs

### 3. **Streaks & Progress**
- Monitor active streaks
- Longest streaks leaderboard
- Broken streaks history
- Daily smoke-free logs

### 4. **Rewards & Medals**
- Create and manage medals
- Set earning conditions
- 12+ Pre-built medals (Bronze, Silver, Gold, Diamond, Platinum, etc.)
- Award statistics

### 5. **Challenges Management**
- View all user challenges
- Ban fake/spam challenges
- Challenge templates
- Completion tracking

### 6. **Community Moderation**
- View all community posts
- Review reported content
- Delete abusive posts
- Ban violators

### 7. **Analytics**
- Daily/Weekly/Monthly active users
- User engagement metrics
- Success rates by duration
- Exportable reports

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Unsmoked-adminfrontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.jsx                    # Dashboard
│   ├── Users/                      # User management
│   ├── Streaks/                    # Streaks tracking
│   ├── Rewards/                    # Medals management
│   ├── Challenges/                 # Challenges hub
│   ├── Community/                  # Community moderation
│   ├── Analytics/                  # Analytics dashboard
│   ├── Login.jsx                   # Authentication
│   ├── Faqs.jsx                    # FAQs
│   └── Setting.jsx                 # Settings
├── layouts/
│   └── partials/
│       ├── header.jsx              # Header component
│       └── sidebar.jsx             # Sidebar with nested menu
├── components/
│   └── StatCard.jsx                # Reusable stat card
└── App.jsx                         # Routes configuration
```

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

1. **[UNSMOKE_ADMIN_PANEL_CHANGES.md](./UNSMOKE_ADMIN_PANEL_CHANGES.md)** - Complete transformation overview
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick start guide & routes
3. **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - Backend API integration
4. **[COMPONENT_DOCS.md](./COMPONENT_DOCS.md)** - Component patterns & usage

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite

---

## 🎨 Design System

- **Primary Color:** `#836852` (Warm brown - smoke-free theme)
- **Secondary:** `#6b5442` (Dark brown)
- **Background:** `#F7F5F3` (Light cream)

---

## 📊 Status

### ✅ Completed
- Dashboard with statistics
- Users management (view, ban, activate, reset)
- Streaks tracking & leaderboards
- Rewards & medals system
- Challenges management
- Community moderation
- Analytics dashboard
- Responsive design

### 🔄 Ready for Backend Integration
- API endpoints (see API guide)
- Authentication
- Real-time data

---

## 📝 Notes

- All data is currently **mock data** for demonstration
- Backend API integration required for production
- See documentation files for detailed guides

---

**Last Updated:** December 4, 2025  
**Version:** 2.0.0 - UnSmoke Admin Panel
