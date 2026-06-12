import { useState } from "react";
import { Trophy, Award, Medal, Plus } from "lucide-react";
import StatCard from "../../components/StatCard";

const stats = {
  totalMedals: 12,
  activeMedals: 10,
  totalAwarded: 45892,
  mostPopular: "Bronze Medal",
};

const medals = [
  { id: 1,  name: "Bronze Medal",        icon: "🥉", description: "Complete 7 consecutive smoke-free days",    condition: "7 days streak",           isActive: true,  totalAwarded: 8543, color: "bg-orange-50" },
  { id: 2,  name: "Silver Medal",        icon: "🥈", description: "Complete 30 consecutive smoke-free days",   condition: "30 days streak",          isActive: true,  totalAwarded: 4521, color: "bg-gray-50"   },
  { id: 3,  name: "Gold Medal",          icon: "🥇", description: "Complete 90 consecutive smoke-free days",   condition: "90 days streak",          isActive: true,  totalAwarded: 1876, color: "bg-yellow-50" },
  { id: 4,  name: "Diamond Medal",       icon: "💎", description: "Complete 180 consecutive smoke-free days",  condition: "180 days streak",         isActive: true,  totalAwarded: 654,  color: "bg-blue-50"   },
  { id: 5,  name: "Platinum Medal",      icon: "⭐", description: "Complete 365 consecutive smoke-free days",  condition: "365 days streak",         isActive: true,  totalAwarded: 234,  color: "bg-purple-50" },
  { id: 6,  name: "First Week Warrior",  icon: "🛡️", description: "Successfully complete your first week",     condition: "7 days streak",           isActive: true,  totalAwarded: 9823, color: "bg-green-50"  },
  { id: 7,  name: "Money Saver",         icon: "💰", description: "Save over $500 by not smoking",             condition: "Save $500",               isActive: true,  totalAwarded: 3456, color: "bg-emerald-50"},
  { id: 8,  name: "Health Champion",     icon: "❤️", description: "Avoid 1,000+ cigarettes",                  condition: "1000 cigarettes avoided", isActive: true,  totalAwarded: 2341, color: "bg-red-50"    },
  { id: 9,  name: "Community Hero",      icon: "🌟", description: "Help 10 users by sharing encouragement",   condition: "Help 10 users",           isActive: true,  totalAwarded: 1567, color: "bg-indigo-50" },
  { id: 10, name: "Motivator",           icon: "💪", description: "Post 50 motivational messages",             condition: "50 posts",                isActive: true,  totalAwarded: 876,  color: "bg-pink-50"   },
  { id: 11, name: "Legacy Medal",        icon: "👑", description: "Maintain streak for 2 years",              condition: "730 days streak",         isActive: false, totalAwarded: 12,   color: "bg-amber-50"  },
  { id: 12, name: "Test Medal",          icon: "🧪", description: "Testing new medal system",                  condition: "Test condition",          isActive: false, totalAwarded: 0,    color: "bg-slate-50"  },
];

const TABS = [
  { key: "all",      label: (m) => `All (${m.length})` },
  { key: "active",   label: (m) => `Active (${m.filter((x) => x.isActive).length})` },
  { key: "inactive", label: (m) => `Inactive (${m.filter((x) => !x.isActive).length})` },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = medals.filter((m) => {
    if (activeTab === "active") return m.isActive;
    if (activeTab === "inactive") return !m.isActive;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rewards & Medals</h1>
          <p className="text-gray-500 mt-1">Manage achievement medals and rewards</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
          style={{ backgroundColor: "#836852" }}
        >
          <Plus className="size-4" />
          Create Medal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Medals"  value={stats.totalMedals.toString()}          icon={Trophy} iconBg="bg-yellow-100" iconColor="text-yellow-600" growth="+0.0%" />
        <StatCard label="Active Medals" value={stats.activeMedals.toString()}          icon={Award}  iconBg="bg-green-100"  iconColor="text-green-600"  growth="+0.0%" />
        <StatCard label="Total Awarded" value={stats.totalAwarded.toLocaleString()}    icon={Medal}  iconBg="bg-blue-100"   iconColor="text-blue-600"   growth="+12.5%"/>
        <StatCard label="Most Popular"  value={stats.mostPopular}                      icon={Trophy} iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">All Medals</h2>
            <div className="flex gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={activeTab === tab.key ? { backgroundColor: "#836852" } : {}}
                >
                  {tab.label(medals)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((medal) => (
            <div
              key={medal.id}
              className={`${medal.color} rounded-xl p-5 border ${
                medal.isActive ? "border-gray-200" : "border-red-200"
              } hover:shadow-md transition-shadow relative`}
            >
              {!medal.isActive && (
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Inactive
                </span>
              )}
              <div className="text-5xl text-center mb-3">{medal.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 text-center mb-1">{medal.name}</h3>
              <p className="text-sm text-gray-500 text-center mb-3">{medal.description}</p>
              <div className="bg-white rounded-lg px-3 py-2 mb-2">
                <p className="text-xs text-gray-400">Condition</p>
                <p className="text-sm font-semibold text-[#836852]">{medal.condition}</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-gray-400">Times Awarded</p>
                <p className="text-lg font-bold text-gray-800">{medal.totalAwarded.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-[#836852] text-white rounded-lg text-sm font-medium hover:opacity-80">
                  Edit
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    medal.isActive
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {medal.isActive ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Medal Modal placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Medal</h2>
            <p className="text-gray-500 text-sm mb-6">Medal creation form coming soon.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
