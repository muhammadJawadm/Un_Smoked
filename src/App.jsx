import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Faqs from './pages/Faqs'
import UserFeedBack from './pages/UserFeedBack'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Setting from './pages/Setting'

// Users Management
import Users from './pages/Users/Users'
import AllUsers from './pages/Users/AllUsers'
import UserProfile from './pages/Users/UserProfile'

// Streaks & Progress
import Streaks from './pages/Streaks/Streaks'

// Rewards & Medals
import Rewards from './pages/Rewards/Rewards'

// Challenges
import Challenges from './pages/Challenges/Challenges'

// Community
import Community from './pages/Community/Community'

// Analytics
import Analytics from './pages/Analytics/Analytics'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          {/* Dashboard */}
          <Route index element={<Home />} />
          
          {/* Users Management */}
          <Route path='users' element={<Users />} />
          <Route path='users/all' element={<AllUsers />} />
          <Route path='users/active' element={<AllUsers />} />
          <Route path='users/banned' element={<AllUsers />} />
          <Route path='users/activity' element={<AllUsers />} />
          <Route path='users/profile/:id' element={<UserProfile />} />
          
          {/* Streaks & Progress */}
          <Route path='streaks' element={<Streaks />} />
          <Route path='streaks/overview' element={<Streaks />} />
          <Route path='streaks/longest' element={<Streaks />} />
          <Route path='streaks/broken' element={<Streaks />} />
          <Route path='streaks/daily-logs' element={<Streaks />} />
          
          {/* Rewards & Medals */}
          <Route path='rewards' element={<Rewards />} />
          <Route path='rewards/medals' element={<Rewards />} />
          <Route path='rewards/create' element={<Rewards />} />
          <Route path='rewards/stats' element={<Rewards />} />
          <Route path='rewards/achievements' element={<Rewards />} />
          
          {/* Challenges */}
          <Route path='challenges' element={<Challenges />} />
          <Route path='challenges/all' element={<Challenges />} />
          <Route path='challenges/active' element={<Challenges />} />
          <Route path='challenges/templates' element={<Challenges />} />
          <Route path='challenges/moderation' element={<Challenges />} />
          
          {/* Community */}
          <Route path='community' element={<Community />} />
          <Route path='community/posts' element={<Community />} />
          <Route path='community/reported' element={<Community />} />
          <Route path='community/moderation' element={<Community />} />
          <Route path='community/feedback' element={<UserFeedBack />} />
          
          {/* Analytics */}
          <Route path='analytics' element={<Analytics />} />
          <Route path='analytics/usage' element={<Analytics />} />
          <Route path='analytics/engagement' element={<Analytics />} />
          <Route path='analytics/success' element={<Analytics />} />
          <Route path='analytics/reports' element={<Analytics />} />
          
          {/* Settings & Others */}
          <Route path='faqs' element={<Faqs />} />
          <Route path='setting' element={<Setting />} />
          <Route path='setting/app' element={<Setting />} />
          <Route path='setting/privacy' element={<PrivacyPolicy />} />
          <Route path='setting/terms' element={<TermsAndConditions />} />
          <Route path='setting/notifications' element={<Setting />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
