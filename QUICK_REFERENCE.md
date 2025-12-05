# UnSmoke Admin Panel - Quick Reference Guide

## 🚀 Getting Started

### Run the Application
```bash
npm run dev
```

### Login
Navigate to `/login` and use admin credentials

---

## 📍 Navigation Routes

### Main Sections
| Route | Description |
|-------|-------------|
| `/` | Dashboard - Overview of all metrics |
| `/users` | Users Management Hub |
| `/streaks` | Streaks & Progress Dashboard |
| `/rewards` | Rewards & Medals Management |
| `/challenges` | Challenges Management |
| `/community` | Community Moderation |
| `/analytics` | Analytics Dashboard |
| `/faqs` | FAQs Management |
| `/setting` | App Settings |

### Users Management
| Route | Page |
|-------|------|
| `/users/all` | All Users List |
| `/users/active` | Active Users Only |
| `/users/banned` | Banned Users |
| `/users/activity` | User Activity Logs |
| `/users/profile/:id` | Individual User Profile |

### Streaks & Progress
| Route | Page |
|-------|------|
| `/streaks/overview` | Overview of All Streaks |
| `/streaks/longest` | Longest Streaks Leaderboard |
| `/streaks/broken` | Broken Streaks History |
| `/streaks/daily-logs` | Daily Activity Logs |

### Rewards & Medals
| Route | Page |
|-------|------|
| `/rewards/medals` | All Medals List |
| `/rewards/create` | Create New Medal |
| `/rewards/stats` | Medal Statistics |
| `/rewards/achievements` | User Achievements |

### Challenges
| Route | Page |
|-------|------|
| `/challenges/all` | All Challenges |
| `/challenges/active` | Active Challenges Only |
| `/challenges/templates` | Challenge Templates |
| `/challenges/moderation` | Moderation Queue |

### Community
| Route | Page |
|-------|------|
| `/community/posts` | All Community Posts |
| `/community/reported` | Reported Content |
| `/community/moderation` | Moderation Dashboard |
| `/community/feedback` | User Feedback |

### Settings
| Route | Page |
|-------|------|
| `/setting/app` | App Settings |
| `/setting/privacy` | Privacy Policy |
| `/setting/terms` | Terms & Conditions |
| `/setting/notifications` | Notification Settings |

---

## 🎨 Component Usage

### StatCard Component
```jsx
<StatCard
  title="Total Users"
  value="15,847"
  icon={<Users className="size-6" />}
  color="bg-blue-500"
/>
```

### User Profile Actions
```jsx
// Ban User
<button onClick={handleBanUser}>Ban User</button>

// Activate User
<button onClick={handleActivateUser}>Activate User</button>

// Reset Streak
<button onClick={handleResetStreak}>Reset Streak</button>
```

---

## 🎯 Key Features by Section

### Dashboard (Home)
- **Stats Cards**: Total Users, Active Streaks, Medals Awarded, Active Challenges, Community Posts, Reported Content
- **Quick Actions**: Manage Users, Review Reports, Create Medal
- **Leaderboards**: Top 5 Streaks, Recent Medals

### Users Management
- **Search & Filter**: By name, email, status
- **User Actions**: View, Ban, Activate, Reset Streak
- **User Profile**: Detailed stats, medals, challenges, activity log
- **Statistics**: Current streak, longest streak, money saved, cigarettes avoided

### Streaks & Progress
- **Leaderboard**: Top performers by streak length
- **Monitoring**: Active vs broken streaks
- **Analytics**: Average streak, broken today
- **Logs**: Daily activity tracking

### Rewards & Medals
- **Medal Types**: Bronze, Silver, Gold, Diamond, Platinum + Custom
- **Management**: Create, Edit, Enable/Disable
- **Conditions**: Set earning criteria (days, actions, etc.)
- **Statistics**: Times awarded, popular medals

### Challenges
- **Overview**: All challenges with stats
- **Moderation**: Ban fake/spam challenges
- **Templates**: Pre-built challenge formats
- **Tracking**: Participants, completion rates

### Community
- **Post Management**: View all posts, likes, comments
- **Moderation**: Reported content review
- **Actions**: Approve, Delete, Warn, Ban
- **Sorting**: By reports, date, engagement

### Analytics
- **Active Users**: Daily, Weekly, Monthly
- **Engagement**: Posts, Challenges, Medals
- **Success Rates**: By challenge duration
- **Trends**: Growth indicators

---

## 🔍 Search & Filter

### Users
- Search by: Name, Email
- Filter by: All, Active, Inactive, Banned

### Challenges
- Filter by: All, Active, Completed, Reported

### Community Posts
- Sort by: Reports, Date, Engagement
- Filter by: Status

---

## 🎨 Color Coding

### Status Indicators
```jsx
// Active
className="bg-green-100 text-green-800"

// Inactive
className="bg-gray-100 text-gray-800"

// Banned/Reported
className="bg-red-100 text-red-800"

// Pending
className="bg-yellow-100 text-yellow-800"
```

### Primary Actions
```jsx
// Primary Button
className="bg-[#836852] text-white hover:bg-[#6b5442]"

// Success
className="bg-green-500 text-white hover:bg-green-600"

// Danger
className="bg-red-500 text-white hover:bg-red-600"

// Warning
className="bg-orange-500 text-white hover:bg-orange-600"
```

---

## 📊 Mock Data Structure

### User Object
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  status: "active", // active | inactive | banned
  currentStreak: 45,
  longestStreak: 67,
  totalSmokeFree: 120,
  medals: [...],
  challenges: [...],
  activityLog: [...]
}
```

### Medal Object
```javascript
{
  id: 1,
  name: "Bronze Medal",
  icon: "🥉",
  description: "Complete 7 consecutive smoke-free days",
  condition: "7 days streak",
  isActive: true,
  totalAwarded: 8543
}
```

### Challenge Object
```javascript
{
  id: 1,
  title: "7 Days Smoke Free Challenge",
  creator: "Admin",
  participants: 2341,
  completions: 1876,
  status: "active", // active | completed | reported
  duration: "7 days"
}
```

---

## 🛠️ Common Tasks

### Add New User
1. Navigate to `/users/all`
2. Click user to view profile
3. Use action buttons for management

### Create New Medal
1. Navigate to `/rewards/create`
2. Fill in medal details
3. Set earning conditions
4. Save and activate

### Moderate Reported Content
1. Navigate to `/community/reported`
2. Review reported posts
3. Take action: Approve, Delete, Warn, Ban

### View Analytics
1. Navigate to `/analytics`
2. Select time period
3. View metrics and trends
4. Export reports if needed

---

## 🔐 Admin Actions

### User Management
- ✅ View user profile
- ✅ Ban/Unban user
- ✅ Activate/Deactivate user
- ✅ Reset user streak
- ✅ View activity history

### Content Moderation
- ✅ Review reported posts
- ✅ Delete inappropriate content
- ✅ Warn users
- ✅ Ban abusive users
- ✅ Approve legitimate content

### System Management
- ✅ Create/Edit medals
- ✅ Enable/Disable medals
- ✅ Manage challenge templates
- ✅ Monitor app statistics
- ✅ Export reports

---

## 💡 Tips

1. **Use Search**: All tables have search functionality
2. **Filter Data**: Use status filters to narrow results
3. **Quick Actions**: Dashboard has shortcuts to common tasks
4. **Check Reports**: Monitor `/community/reported` regularly
5. **Track Success**: Use analytics to measure app effectiveness

---

## 📞 Support

For technical issues or questions, refer to:
- Component code in `src/pages/`
- Sidebar configuration in `src/layouts/partials/sidebar.jsx`
- Routes in `src/App.jsx`

---

## 🎉 Ready to Use!

All components are built with:
- ✅ Responsive design
- ✅ Search & filter functionality
- ✅ Sorting capabilities
- ✅ Modal confirmations
- ✅ Loading states (ready for API)
- ✅ Error handling (ready for API)
- ✅ Consistent styling
- ✅ Accessible UI

Just integrate with your backend API and you're good to go! 🚀
