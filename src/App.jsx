import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Faqs from "./pages/Faqs/Faqs";
import Settings from "./pages/Settings/Settings";

import Users from "./pages/Users/Users";
import AllUsers from "./pages/Users/AllUsers";
import UserProfile from "./pages/Users/UserProfile";

import Streaks from "./pages/Streaks/Streaks";
import Rewards from "./pages/Rewards/Rewards";
import Challenges from "./pages/Challenges/Challenges";
import ChallengeDetail from "./pages/Challenges/ChallengeDetail";
import Community from "./pages/Community/Community";
import Analytics from "./pages/Analytics/Analytics";
import Milestones from "./pages/Milestones/Milestones";
import Notifications from "./pages/Notifications/Notifications";
import Badges from "./pages/Badges/Badges";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route — redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* All private routes are protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/all" element={<AllUsers />} />
          <Route path="users/profile/:id" element={<UserProfile />} />
          <Route path="streaks" element={<Streaks />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="challenges/:id" element={<ChallengeDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="badges" element={<Badges />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="setting" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
