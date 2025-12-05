import { Link } from "react-router-dom";
import Header from "../layouts/partials/header";
import { Users, TrendingUp, Trophy, Target, MessageSquare, Flag, Activity } from "lucide-react";
import StatCard from "../components/StatCard";

export default function Home() {
  // Mock data
  const stats = {
    totalUsers: 15847,
    activeStreaks: 8543,
    totalMedals: 45892,
    activeChallenges: 856,
    communityPosts: 12341,
    reportedContent: 87
  };

  return (
    <div>
      <Header header={"UnSmoke Admin Dashboard"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-[#836852] to-[#6b5442] rounded-lg p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to UnSmoke Admin Panel</h2>
            <p className="text-white/90">Monitor and manage your smoke-free community platform</p>
          </div>

          {/* Top KPI cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6 2xl:gap-7 mb-8">
            <Link to="/users">
              <StatCard
                icon={Users}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
                value={stats.totalUsers.toLocaleString()}
                label="Total Users"
                growth="+2.3%"
              />
            </Link>

            <Link to="/streaks">
              <StatCard
                icon={TrendingUp}
                iconBg="bg-green-100"
                iconColor="text-green-600"
                value={stats.activeStreaks.toLocaleString()}
                label="Active Streaks"
                growth="+5.1%"
              />
            </Link>

            <Link to="/rewards">
              <StatCard
                icon={Trophy}
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
                value={stats.totalMedals.toLocaleString()}
                label="Medals Awarded"
                growth="+3.7%"
              />
            </Link>

            <Link to="/challenges">
              <StatCard
                icon={Target}
                iconBg="bg-purple-100"
                iconColor="text-purple-600"
                value={stats.activeChallenges.toLocaleString()}
                label="Active Challenges"
                growth="+1.8%"
              />
            </Link>

            <Link to="/community">
              <StatCard
                icon={MessageSquare}
                iconBg="bg-indigo-100"
                iconColor="text-indigo-600"
                value={stats.communityPosts.toLocaleString()}
                label="Community Posts"
                growth="+4.2%"
              />
            </Link>

            <Link to="/community/reported">
              <StatCard
                icon={Flag}
                iconBg="bg-red-100"
                iconColor="text-red-600"
                value={stats.reportedContent.toString()}
                label="Reported Content"
                growth="-0.5%"
              />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Link to="/users/all" className="bg-white rounded-lg shadow p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="size-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Manage Users</h3>
                  <p className="text-sm text-gray-600">View, activate, or ban users</p>
                </div>
              </div>
            </Link>

            <Link to="/community/reported" className="bg-white rounded-lg shadow p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Flag className="size-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Review Reports</h3>
                  <p className="text-sm text-gray-600">Moderate reported content</p>
                </div>
              </div>
            </Link>

            <Link to="/rewards/create" className="bg-white rounded-lg shadow p-6 border-2 border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Trophy className="size-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Create Medal</h3>
                  <p className="text-sm text-gray-600">Add new achievement rewards</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Streaks This Week</h3>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", streak: 365, badge: "🥇" },
                  { name: "Michael Brown", streak: 287, badge: "🥈" },
                  { name: "Emily Davis", streak: 245, badge: "🥉" },
                  { name: "James Wilson", streak: 198, badge: "🔥" },
                  { name: "Jessica Martinez", streak: 176, badge: "⭐" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{user.badge}</span>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                    <span className="font-bold text-[#836852]">{user.streak} days</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Medals Awarded</h3>
              <div className="space-y-3">
                {[
                  { medal: "Bronze Medal", count: 234, icon: "🥉" },
                  { medal: "Silver Medal", count: 156, icon: "🥈" },
                  { medal: "Gold Medal", count: 89, icon: "🥇" },
                  { medal: "30 Days Warrior", count: 145, icon: "🛡️" },
                  { medal: "Health Champion", count: 98, icon: "❤️" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-gray-800">{item.medal}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.count} awarded today</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
