import { Link } from "react-router-dom";
import { BarChart3, Users, TrendingUp, Activity, Calendar } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Analytics() {
  // Mock data
  const stats = {
    dailyActiveUsers: 8453,
    weeklyActiveUsers: 12847,
    monthlyActiveUsers: 15234,
    averageSessionTime: "12 mins"
  };

  const engagementData = {
    postsThisWeek: 2341,
    challengesStarted: 987,
    medalsEarned: 1567,
    averageStreak: 23
  };

  const successMetrics = {
    sevenDaySuccess: 78,
    thirtyDaySuccess: 56,
    ninetyDaySuccess: 34,
    oneYearSuccess: 12
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor app usage, engagement, and success metrics</p>
      </div>

      {/* Active Users Stats */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Daily Active"
            value={stats.dailyActiveUsers.toLocaleString()}
            icon={Activity}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            growth="+3.5%"
          />
          <StatCard
            label="Weekly Active"
            value={stats.weeklyActiveUsers.toLocaleString()}
            icon={Calendar}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            growth="+2.8%"
          />
          <StatCard
            label="Monthly Active"
            value={stats.monthlyActiveUsers.toLocaleString()}
            icon={Users}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            growth="+1.9%"
          />
          <StatCard
            label="Avg Session Time"
            value={stats.averageSessionTime}
            icon={TrendingUp}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            growth="+5.2%"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link to="/analytics/usage" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">App Usage</h3>
              <p className="text-sm text-gray-600">Detailed stats</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics/engagement" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Engagement</h3>
              <p className="text-sm text-gray-600">User activity</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics/success" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Success Rates</h3>
              <p className="text-sm text-gray-600">Completion metrics</p>
            </div>
          </div>
        </Link>

        <Link to="/analytics/reports" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="size-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Reports</h3>
              <p className="text-sm text-gray-600">Export data</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">This Week's Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#836852] mb-2">{engagementData.postsThisWeek.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Posts Created</div>
            <div className="mt-2 text-xs text-green-600">↑ 12% from last week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#836852] mb-2">{engagementData.challengesStarted.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Challenges Started</div>
            <div className="mt-2 text-xs text-green-600">↑ 8% from last week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#836852] mb-2">{engagementData.medalsEarned.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Medals Earned</div>
            <div className="mt-2 text-xs text-green-600">↑ 15% from last week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#836852] mb-2">{engagementData.averageStreak}</div>
            <div className="text-sm text-gray-600">Average Streak (days)</div>
            <div className="mt-2 text-xs text-green-600">↑ 3% from last week</div>
          </div>
        </div>
      </div>

      {/* Success Rates */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Success Rates by Duration</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">7 Days Challenge</span>
              <span className="text-sm font-semibold text-[#836852]">{successMetrics.sevenDaySuccess}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#836852] h-3 rounded-full transition-all"
                style={{ width: `${successMetrics.sevenDaySuccess}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">30 Days Challenge</span>
              <span className="text-sm font-semibold text-[#836852]">{successMetrics.thirtyDaySuccess}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#836852] h-3 rounded-full transition-all"
                style={{ width: `${successMetrics.thirtyDaySuccess}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">90 Days Challenge</span>
              <span className="text-sm font-semibold text-[#836852]">{successMetrics.ninetyDaySuccess}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#836852] h-3 rounded-full transition-all"
                style={{ width: `${successMetrics.ninetyDaySuccess}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">1 Year Milestone</span>
              <span className="text-sm font-semibold text-[#836852]">{successMetrics.oneYearSuccess}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#836852] h-3 rounded-full transition-all"
                style={{ width: `${successMetrics.oneYearSuccess}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">User Growth (Last 30 Days)</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="size-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization coming soon</p>
            <p className="text-sm text-gray-400">Integration with charting library required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
