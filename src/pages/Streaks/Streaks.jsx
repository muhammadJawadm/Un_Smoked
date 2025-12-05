import { Link } from "react-router-dom";
import { TrendingUp, Award, TrendingDown, Activity } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Streaks() {
  // Mock data
  const stats = {
    activeStreaks: 8543,
    averageStreak: 23,
    brokenToday: 87,
    longestStreak: 365
  };

  const topStreaks = [
    { id: 1, userName: "Sarah Johnson", email: "sarah@example.com", streak: 365, startDate: "2024-01-01" },
    { id: 2, userName: "Michael Brown", email: "michael@example.com", streak: 287, startDate: "2024-03-15" },
    { id: 3, userName: "Emily Davis", email: "emily@example.com", streak: 245, startDate: "2024-04-12" },
    { id: 4, userName: "James Wilson", email: "james@example.com", streak: 198, startDate: "2024-05-20" },
    { id: 5, userName: "Jessica Martinez", email: "jessica@example.com", streak: 176, startDate: "2024-06-10" }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Streaks & Progress</h1>
        <p className="text-gray-600">Monitor user streaks and smoke-free progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Active Streaks"
          value={stats.activeStreaks.toLocaleString()}
          icon={Activity}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          growth="+3.2%"
        />
        <StatCard
          label="Average Streak"
          value={`${stats.averageStreak} days`}
          icon={TrendingUp}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          growth="+1.5%"
        />
        <StatCard
          label="Broken Today"
          value={stats.brokenToday.toLocaleString()}
          icon={TrendingDown}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          growth="-2.1%"
        />
        <StatCard
          label="Longest Streak"
          value={`${stats.longestStreak} days`}
          icon={Award}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          growth="+0.0%"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/streaks/overview" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Overview</h3>
              <p className="text-sm text-gray-600">All streaks</p>
            </div>
          </div>
        </Link>

        <Link to="/streaks/longest" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Top Streaks</h3>
              <p className="text-sm text-gray-600">Highest performing</p>
            </div>
          </div>
        </Link>

        <Link to="/streaks/broken" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Broken Streaks</h3>
              <p className="text-sm text-gray-600">Recent breaks</p>
            </div>
          </div>
        </Link>

        <Link to="/streaks/daily-logs" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Daily Logs</h3>
              <p className="text-sm text-gray-600">Activity logs</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Top Streaks Leaderboard */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Top 5 Longest Streaks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Streak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topStreaks.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#836852] text-white font-bold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🔥</span>
                      <span className="text-lg font-bold text-[#836852]">{user.streak}</span>
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/users/profile/${user.id}`} className="text-[#836852] hover:text-[#6b5442]">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
