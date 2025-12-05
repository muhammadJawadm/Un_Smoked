import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Award, Medal, Plus } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Rewards() {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data
  const stats = {
    totalMedals: 12,
    activeMedals: 10,
    totalAwarded: 45892,
    mostPopular: "Bronze Medal"
  };

  const medals = [
    {
      id: 1,
      name: "Bronze Medal",
      icon: "🥉",
      description: "Complete 7 consecutive smoke-free days",
      condition: "7 days streak",
      isActive: true,
      totalAwarded: 8543,
      color: "bg-orange-100"
    },
    {
      id: 2,
      name: "Silver Medal",
      icon: "🥈",
      description: "Complete 30 consecutive smoke-free days",
      condition: "30 days streak",
      isActive: true,
      totalAwarded: 4521,
      color: "bg-gray-100"
    },
    {
      id: 3,
      name: "Gold Medal",
      icon: "🥇",
      description: "Complete 90 consecutive smoke-free days",
      condition: "90 days streak",
      isActive: true,
      totalAwarded: 1876,
      color: "bg-yellow-100"
    },
    {
      id: 4,
      name: "Diamond Medal",
      icon: "💎",
      description: "Complete 180 consecutive smoke-free days",
      condition: "180 days streak",
      isActive: true,
      totalAwarded: 654,
      color: "bg-blue-100"
    },
    {
      id: 5,
      name: "Platinum Medal",
      icon: "⭐",
      description: "Complete 365 consecutive smoke-free days",
      condition: "365 days streak",
      isActive: true,
      totalAwarded: 234,
      color: "bg-purple-100"
    },
    {
      id: 6,
      name: "First Week Warrior",
      icon: "🛡️",
      description: "Successfully complete your first week",
      condition: "7 days streak",
      isActive: true,
      totalAwarded: 9823,
      color: "bg-green-100"
    },
    {
      id: 7,
      name: "Money Saver",
      icon: "💰",
      description: "Save over $500 by not smoking",
      condition: "Save $500",
      isActive: true,
      totalAwarded: 3456,
      color: "bg-emerald-100"
    },
    {
      id: 8,
      name: "Health Champion",
      icon: "❤️",
      description: "Avoid 1000+ cigarettes",
      condition: "1000 cigarettes avoided",
      isActive: true,
      totalAwarded: 2341,
      color: "bg-red-100"
    },
    {
      id: 9,
      name: "Community Hero",
      icon: "🌟",
      description: "Help 10 users by sharing encouragement",
      condition: "Help 10 users",
      isActive: true,
      totalAwarded: 1567,
      color: "bg-indigo-100"
    },
    {
      id: 10,
      name: "Motivator",
      icon: "💪",
      description: "Post 50 motivational messages",
      condition: "50 posts",
      isActive: true,
      totalAwarded: 876,
      color: "bg-pink-100"
    },
    {
      id: 11,
      name: "Legacy Medal",
      icon: "👑",
      description: "Maintain streak for 2 years",
      condition: "730 days streak",
      isActive: false,
      totalAwarded: 12,
      color: "bg-amber-100"
    },
    {
      id: 12,
      name: "Test Medal",
      icon: "🧪",
      description: "Testing new medal system",
      condition: "Test condition",
      isActive: false,
      totalAwarded: 0,
      color: "bg-slate-100"
    }
  ];

  const filteredMedals = medals.filter(medal => {
    if (activeTab === "active") return medal.isActive;
    if (activeTab === "inactive") return !medal.isActive;
    return true;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards & Medals</h1>
          <p className="text-gray-600">Manage achievement medals and rewards</p>
        </div>
        <Link
          to="/rewards/create"
          className="flex items-center gap-2 px-4 py-2 bg-[#836852] text-white rounded-lg hover:bg-[#6b5442] transition-colors"
        >
          <Plus className="size-5" />
          Create Medal
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Medals"
          value={stats.totalMedals.toString()}
          icon={Trophy}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          growth="+0.0%"
        />
        <StatCard
          label="Active Medals"
          value={stats.activeMedals.toString()}
          icon={Award}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          growth="+0.0%"
        />
        <StatCard
          label="Total Awarded"
          value={stats.totalAwarded.toLocaleString()}
          icon={Medal}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          growth="+12.5%"
        />
        <StatCard
          label="Most Popular"
          value={stats.mostPopular}
          icon={Trophy}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/rewards/create" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Plus className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Create Medal</h3>
              <p className="text-sm text-gray-600">Add new achievement</p>
            </div>
          </div>
        </Link>

        <Link to="/rewards/stats" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Statistics</h3>
              <p className="text-sm text-gray-600">View medal stats</p>
            </div>
          </div>
        </Link>

        <Link to="/rewards/achievements" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">User Achievements</h3>
              <p className="text-sm text-gray-600">Browse by user</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Medals Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Medals</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-[#836852] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({medals.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "active"
                    ? "bg-[#836852] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active ({medals.filter(m => m.isActive).length})
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "inactive"
                    ? "bg-[#836852] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Inactive ({medals.filter(m => !m.isActive).length})
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedals.map((medal) => (
            <div
              key={medal.id}
              className={`${medal.color} rounded-lg p-6 border-2 ${
                medal.isActive ? "border-gray-200" : "border-red-200"
              } hover:shadow-lg transition-shadow relative`}
            >
              {!medal.isActive && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                  Inactive
                </div>
              )}
              <div className="text-6xl mb-4 text-center">{medal.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{medal.name}</h3>
              <p className="text-sm text-gray-600 mb-3 text-center">{medal.description}</p>
              <div className="bg-white rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Condition:</p>
                <p className="text-sm font-semibold text-[#836852]">{medal.condition}</p>
              </div>
              <div className="bg-white rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Times Awarded:</p>
                <p className="text-lg font-bold text-gray-800">{medal.totalAwarded.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-[#836852] text-white rounded-lg hover:bg-[#6b5442] text-sm font-medium">
                  Edit
                </button>
                <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                  medal.isActive
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}>
                  {medal.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
