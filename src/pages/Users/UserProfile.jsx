import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Award, 
  Ban, 
  CheckCircle, 
  RotateCcw,
  Activity,
  Flame,
  Shield,
  AlertCircle
} from "lucide-react";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBanModal, setShowBanModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Mock user data - replace with API call
  const user = {
    id: id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-12-03",
    currentStreak: 45,
    longestStreak: 67,
    totalSmokeFree: 120,
    cigarettesAvoided: 2400,
    moneySaved: 720,
    medals: [
      { id: 1, name: "Bronze Medal", icon: "🥉", earnedDate: "2024-02-01" },
      { id: 2, name: "Silver Medal", icon: "🥈", earnedDate: "2024-03-15" },
      { id: 3, name: "30 Days Warrior", icon: "🔥", earnedDate: "2024-02-15" }
    ],
    challenges: [
      { id: 1, name: "7 Day Challenge", status: "completed", date: "2024-01-22" },
      { id: 2, name: "30 Day Challenge", status: "active", date: "2024-02-15" },
      { id: 3, name: "60 Day Challenge", status: "upcoming", date: "2024-03-15" }
    ],
    activityLog: [
      { date: "2024-12-03", action: "Marked day as smoke-free", streak: 45 },
      { date: "2024-12-02", action: "Marked day as smoke-free", streak: 44 },
      { date: "2024-12-01", action: "Completed challenge", streak: 43 },
      { date: "2024-11-30", action: "Earned Silver Medal", streak: 42 }
    ]
  };

  const handleBanUser = () => {
    // Ban user logic
    alert(`User ${user.name} has been banned`);
    setShowBanModal(false);
  };

  const handleActivateUser = () => {
    // Activate user logic
    alert(`User ${user.name} has been activated`);
  };

  const handleResetStreak = () => {
    // Reset streak logic
    alert(`Streak reset for ${user.name}`);
    setShowResetModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[#836852] hover:text-[#6b5442] mb-4 flex items-center gap-2"
        >
          ← Back to Users
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#836852] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'banned' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user.status}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="size-5" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="size-5" />
                <span className="text-sm">Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Activity className="size-5" />
                <span className="text-sm">Last Active: {new Date(user.lastActive).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-gray-800 mb-3">Admin Actions</h3>
              
              {user.status === 'active' ? (
                <button
                  onClick={() => setShowBanModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Ban className="size-4" />
                  Ban User
                </button>
              ) : (
                <button
                  onClick={handleActivateUser}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="size-4" />
                  Activate User
                </button>
              )}

              <button
                onClick={() => setShowResetModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <RotateCcw className="size-4" />
                Reset Streak
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 text-[#836852] mb-2">
                <Flame className="size-5" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{user.currentStreak} days</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="size-5" />
                <span className="text-sm font-medium">Longest Streak</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{user.longestStreak} days</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="size-5" />
                <span className="text-sm font-medium">Smoke Free</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{user.totalSmokeFree} days</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Award className="size-5" />
                <span className="text-sm font-medium">Medals</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{user.medals.length}</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements & Medals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.medals.map((medal) => (
                <div key={medal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-2 text-center">{medal.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-center mb-1">{medal.name}</h4>
                  <p className="text-sm text-gray-600 text-center">
                    {new Date(medal.earnedDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Challenges</h3>
            <div className="space-y-3">
              {user.challenges.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{challenge.name}</h4>
                    <p className="text-sm text-gray-600">{new Date(challenge.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    challenge.status === 'completed' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {user.activityLog.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-[#836852] bg-gray-50 rounded">
                  <Activity className="size-5 text-[#836852] mt-0.5" />
                  <div>
                    <p className="text-gray-800 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()} • Streak: {activity.streak} days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ban Confirmation Modal */}
      {showBanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle className="size-6" />
              <h3 className="text-xl font-bold">Ban User</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to ban {user.name}? This action can be reversed later.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBanModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBanUser}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Streak Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-orange-600 mb-4">
              <RotateCcw className="size-6" />
              <h3 className="text-xl font-bold">Reset Streak</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset the streak for {user.name}? Current streak: {user.currentStreak} days. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetStreak}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Reset Streak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
