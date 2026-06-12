import { Link } from "react-router-dom";
import { TrendingUp, Award, TrendingDown, Activity } from "lucide-react";
import StatCard from "../../components/StatCard";

const stats = {
  activeStreaks: 8543,
  averageStreak: 23,
  brokenToday: 87,
  longestStreak: 365,
};

const topStreaks = [
  { id: 1, userName: "Sarah Johnson",   email: "sarah@example.com",   streak: 365, startDate: "2024-01-01" },
  { id: 2, userName: "Michael Brown",   email: "michael@example.com", streak: 287, startDate: "2024-03-15" },
  { id: 3, userName: "Emily Davis",     email: "emily@example.com",   streak: 245, startDate: "2024-04-12" },
  { id: 4, userName: "James Wilson",    email: "james@example.com",   streak: 198, startDate: "2024-05-20" },
  { id: 5, userName: "Jessica Martinez",email: "jessica@example.com", streak: 176, startDate: "2024-06-10" },
];

export default function Streaks() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Streaks & Progress</h1>
        <p className="text-gray-500 mt-1">Monitor user streaks and smoke-free progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Streaks"  value={stats.activeStreaks.toLocaleString()}  icon={Activity}    iconBg="bg-blue-100"   iconColor="text-blue-600"   growth="+3.2%" />
        <StatCard label="Average Streak"  value={`${stats.averageStreak} days`}         icon={TrendingUp}  iconBg="bg-green-100"  iconColor="text-green-600"  growth="+1.5%" />
        <StatCard label="Broken Today"    value={stats.brokenToday.toLocaleString()}    icon={TrendingDown}iconBg="bg-red-100"    iconColor="text-red-600"    growth="-2.1%" />
        <StatCard label="Longest Streak"  value={`${stats.longestStreak} days`}         icon={Award}       iconBg="bg-purple-100" iconColor="text-purple-600" growth="+0.0%" />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Top 5 Longest Streaks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Rank","User","Current Streak","Start Date","Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topStreaks.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#836852] text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.userName}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔥</span>
                      <span className="text-lg font-bold text-[#836852]">{user.streak}</span>
                      <span className="text-gray-500">days</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/users/profile/${user.id}`} className="text-[#836852] hover:text-[#6b5442] font-medium">
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
