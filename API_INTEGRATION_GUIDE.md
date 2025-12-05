# UnSmoke Admin Panel - API Integration Guide

## 🔌 Backend Integration Checklist

This guide helps backend developers understand what API endpoints are needed for the admin panel.

---

## 🔑 Authentication

### Required Endpoints

```javascript
// Login
POST /api/admin/login
Body: { email, password }
Response: { token, admin: { id, name, email } }

// Logout
POST /api/admin/logout
Headers: { Authorization: "Bearer {token}" }

// Verify Token
GET /api/admin/verify
Headers: { Authorization: "Bearer {token}" }
Response: { valid: boolean, admin: {...} }
```

---

## 👥 Users Management APIs

### User Listing
```javascript
// Get All Users (with pagination, search, filter)
GET /api/admin/users?page=1&limit=10&search=john&status=active
Response: {
  users: [...],
  total: 15847,
  page: 1,
  totalPages: 1585
}
```

### User Details
```javascript
// Get Single User Profile
GET /api/admin/users/:id
Response: {
  id, name, email, phone, status,
  joinDate, lastActive,
  currentStreak, longestStreak,
  totalSmokeFree, cigarettesAvoided, moneySaved,
  medals: [...],
  challenges: [...],
  activityLog: [...]
}
```

### User Actions
```javascript
// Ban User
POST /api/admin/users/:id/ban
Body: { reason: "Spam/Abuse" }

// Unban/Activate User
POST /api/admin/users/:id/activate

// Reset User Streak
POST /api/admin/users/:id/reset-streak
Body: { reason: "Manual override" }

// Get User Activity
GET /api/admin/users/:id/activity?limit=50
```

### User Statistics
```javascript
// Dashboard User Stats
GET /api/admin/stats/users
Response: {
  totalUsers: 15847,
  activeUsers: 12453,
  bannedUsers: 234,
  newToday: 156,
  dailyActive: 8543,
  weeklyActive: 12847,
  monthlyActive: 15234
}
```

---

## 🔥 Streaks & Progress APIs

### Streak Listing
```javascript
// Get All Streaks
GET /api/admin/streaks?sort=longest&limit=100
Response: {
  streaks: [
    {
      userId, userName, userEmail,
      currentStreak, longestStreak,
      startDate, lastUpdate, status
    }
  ]
}

// Get Longest Streaks (Leaderboard)
GET /api/admin/streaks/leaderboard?limit=10

// Get Broken Streaks
GET /api/admin/streaks/broken?date=2024-12-03

// Get Daily Logs
GET /api/admin/streaks/logs?date=2024-12-03
```

### Streak Statistics
```javascript
// Dashboard Streak Stats
GET /api/admin/stats/streaks
Response: {
  activeStreaks: 8543,
  averageStreak: 23,
  brokenToday: 87,
  longestStreak: 365
}
```

---

## 🏆 Rewards & Medals APIs

### Medal Management
```javascript
// Get All Medals
GET /api/admin/medals?status=active
Response: {
  medals: [
    {
      id, name, icon, description,
      condition, isActive,
      totalAwarded, createdAt
    }
  ]
}

// Get Single Medal
GET /api/admin/medals/:id

// Create Medal
POST /api/admin/medals
Body: {
  name, icon, description,
  condition: { type: "streak", value: 7 },
  isActive: true
}

// Update Medal
PUT /api/admin/medals/:id
Body: { name, description, condition, isActive }

// Delete Medal
DELETE /api/admin/medals/:id

// Enable/Disable Medal
PATCH /api/admin/medals/:id/toggle
```

### Medal Statistics
```javascript
// Dashboard Medal Stats
GET /api/admin/stats/medals
Response: {
  totalMedals: 12,
  activeMedals: 10,
  totalAwarded: 45892,
  mostPopular: "Bronze Medal"
}

// Medal Award History
GET /api/admin/medals/:id/awards?limit=100

// User Achievements
GET /api/admin/users/:id/medals
```

---

## 🎯 Challenges APIs

### Challenge Management
```javascript
// Get All Challenges
GET /api/admin/challenges?status=active&page=1
Response: {
  challenges: [
    {
      id, title, creator, creatorId,
      participants, completions,
      status, created, duration,
      isReported, reportCount
    }
  ]
}

// Get Single Challenge
GET /api/admin/challenges/:id

// Create Challenge Template
POST /api/admin/challenges/templates
Body: {
  title, description, duration,
  conditions, isDefault: true
}

// Ban Challenge
POST /api/admin/challenges/:id/ban
Body: { reason: "Fake/Spam" }

// Get Challenge Statistics
GET /api/admin/challenges/:id/stats
```

### Challenge Statistics
```javascript
// Dashboard Challenge Stats
GET /api/admin/stats/challenges
Response: {
  totalChallenges: 1247,
  activeChallenges: 856,
  completedToday: 234,
  reportedChallenges: 12
}

// Challenge Templates
GET /api/admin/challenges/templates
```

---

## 💬 Community & Moderation APIs

### Post Management
```javascript
// Get All Posts
GET /api/admin/community/posts?sort=reports&page=1
Response: {
  posts: [
    {
      id, content, author, authorId, authorEmail,
      likes, comments, reports,
      status, created, updated
    }
  ]
}

// Get Reported Content
GET /api/admin/community/reported
Response: {
  posts: [...posts with reports > 0],
  totalReported: 87
}

// Get Post Details
GET /api/admin/community/posts/:id
```

### Moderation Actions
```javascript
// Approve Post
POST /api/admin/community/posts/:id/approve

// Delete Post
DELETE /api/admin/community/posts/:id
Body: { reason: "Inappropriate content" }

// Warn User
POST /api/admin/users/:id/warn
Body: { reason: "Violated community guidelines", postId }

// Shadow Ban (Advanced)
POST /api/admin/users/:id/shadow-ban
```

### Community Statistics
```javascript
// Dashboard Community Stats
GET /api/admin/stats/community
Response: {
  totalPosts: 15847,
  reportedContent: 87,
  bannedUsers: 23,
  pendingReviews: 34,
  postsThisWeek: 2341,
  engagementRate: 78
}

// User Feedback
GET /api/admin/feedback?status=pending
```

---

## 📊 Analytics APIs

### Usage Analytics
```javascript
// App Usage Stats
GET /api/admin/analytics/usage?period=30days
Response: {
  dailyActiveUsers: [...],
  weeklyActiveUsers: [...],
  monthlyActiveUsers: [...],
  averageSessionTime: "12 mins",
  userGrowth: [...]
}

// User Engagement
GET /api/admin/analytics/engagement?period=7days
Response: {
  postsCreated: 2341,
  challengesStarted: 987,
  medalsEarned: 1567,
  averageStreak: 23,
  trends: [...]
}

// Success Rates
GET /api/admin/analytics/success
Response: {
  sevenDaySuccess: 78,
  thirtyDaySuccess: 56,
  ninetyDaySuccess: 34,
  oneYearSuccess: 12,
  breakdown: [...]
}

// Export Report
GET /api/admin/analytics/export?format=csv&period=30days
Response: CSV/PDF file
```

---

## ⚙️ Settings APIs

### App Settings
```javascript
// Get Settings
GET /api/admin/settings

// Update Settings
PUT /api/admin/settings
Body: {
  appName, 
  maintenanceMode,
  registrationOpen,
  emailNotifications,
  ...
}
```

### FAQs
```javascript
// Get All FAQs
GET /api/admin/faqs

// Create FAQ
POST /api/admin/faqs
Body: { question, answer, category, order }

// Update FAQ
PUT /api/admin/faqs/:id

// Delete FAQ
DELETE /api/admin/faqs/:id
```

### Content Management
```javascript
// Get Privacy Policy
GET /api/admin/content/privacy

// Update Privacy Policy
PUT /api/admin/content/privacy
Body: { content }

// Get Terms & Conditions
GET /api/admin/content/terms

// Update Terms
PUT /api/admin/content/terms
Body: { content }
```

---

## 🔔 Notifications

### Push Notifications
```javascript
// Send Notification to User
POST /api/admin/notifications/send
Body: {
  userId,
  title, message,
  type: "streak_milestone" | "challenge_complete" | "medal_earned"
}

// Send Broadcast
POST /api/admin/notifications/broadcast
Body: {
  title, message,
  targetUsers: "all" | "active" | [userIds]
}

// Get Notification History
GET /api/admin/notifications/history
```

---

## 📈 Real-time Updates (Optional)

### WebSocket Events
```javascript
// Subscribe to admin updates
ws://api.domain.com/admin/ws?token={jwt}

// Events to emit:
{
  event: "user_registered",
  data: { userId, userName, timestamp }
}

{
  event: "content_reported",
  data: { postId, reportCount, reason }
}

{
  event: "streak_milestone",
  data: { userId, streak, milestone }
}

{
  event: "challenge_completed",
  data: { userId, challengeId }
}
```

---

## 🔒 Security & Permissions

### Admin Roles (Future Enhancement)
```javascript
// Role-based access control
GET /api/admin/permissions
Response: {
  role: "super_admin" | "moderator" | "analyst",
  permissions: [
    "users.view",
    "users.ban",
    "content.moderate",
    "medals.create",
    ...
  ]
}
```

---

## 📝 Request/Response Examples

### Example: Get All Users
**Request:**
```javascript
GET /api/admin/users?page=1&limit=10&search=john&status=active
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "status": "active",
        "currentStreak": 45,
        "joinDate": "2024-01-15T00:00:00Z",
        "lastActive": "2024-12-03T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 15847,
      "page": 1,
      "limit": 10,
      "totalPages": 1585
    }
  }
}
```

### Example: Ban User
**Request:**
```javascript
POST /api/admin/users/123/ban
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIs...",
  Content-Type: "application/json"
}
Body: {
  "reason": "Spam and abusive behavior"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User banned successfully",
  "data": {
    "userId": 123,
    "status": "banned",
    "bannedAt": "2024-12-04T12:00:00Z",
    "bannedBy": "admin@unsmoke.com"
  }
}
```

---

## ⚡ Performance Recommendations

### Caching
- Cache dashboard statistics (refresh every 5 minutes)
- Cache leaderboards (refresh every hour)
- Cache user counts and totals

### Pagination
- Default: 10-20 items per page
- Max: 100 items per page
- Always paginate large lists

### Indexing
- Index user status, email, joinDate
- Index streak values for leaderboard
- Index post reports for moderation

### Rate Limiting
- Admin endpoints: 100 requests/minute
- Export endpoints: 10 requests/hour
- Analytics: 50 requests/minute

---

## 🧪 Testing Endpoints

### Health Check
```javascript
GET /api/admin/health
Response: {
  status: "ok",
  timestamp: "2024-12-04T12:00:00Z",
  services: {
    database: "ok",
    cache: "ok",
    notifications: "ok"
  }
}
```

### Test Data
```javascript
// Seed test data (dev/staging only)
POST /api/admin/test/seed
Body: { count: 100, type: "users" }
```

---

## 📱 Frontend Integration

### Using Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsmoke.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example usage
const getUsers = async (page = 1, search = '', status = 'all') => {
  try {
    const response = await api.get('/api/admin/users', {
      params: { page, search, status }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
```

---

## 🎯 Priority API Endpoints

### Phase 1 (Must Have)
1. ✅ Authentication (login, logout, verify)
2. ✅ Users listing and profile
3. ✅ User actions (ban, activate, reset streak)
4. ✅ Dashboard statistics
5. ✅ Basic content moderation

### Phase 2 (Important)
6. ✅ Streaks leaderboard
7. ✅ Medals management
8. ✅ Challenges listing
9. ✅ Reported content
10. ✅ Analytics basics

### Phase 3 (Nice to Have)
11. ⏳ Advanced analytics
12. ⏳ Real-time updates
13. ⏳ Export reports
14. ⏳ Notification system
15. ⏳ Role-based access

---

## 🚀 Ready to Integrate!

All frontend components are ready and waiting for API integration. Just replace the mock data with actual API calls and you're good to go!

**Contact:** Backend team for API documentation and endpoint details.
