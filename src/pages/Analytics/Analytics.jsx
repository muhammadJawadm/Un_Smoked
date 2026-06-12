import { BarChart3, Users, TrendingUp, Activity, Calendar } from "lucide-react";
import StatCard from "../../components/StatCard";

const activeUsers = {
  dailyActiveUsers: 8453,
  weeklyActiveUsers: 12847,
  monthlyActiveUsers: 15234,
  averageSessionTime: "12 mins",
};

const engagement = {
  postsThisWeek: 2341,
  challengesStarted: 987,
  medalsEarned: 1567,
  averageStreak: 23,
};

const successRates = [
  { label: "7 Days Challenge",   rate: 78 },
  { label: "30 Days Challenge",  rate: 56 },
  { label: "90 Days Challenge",  rate: 34 },
  { label: "1 Year Milestone",   rate: 12 },
];

const engagementItems = [
  { value: engagement.postsThisWeek,      label: "Posts Created",          change: "↑ 12% from last week" },
  { value: engagement.challengesStarted,  label: "Challenges Started",     change: "↑ 8% from last week"  },
  { value: engagement.medalsEarned,       label: "Medals Earned",          change: "↑ 15% from last week" },
  { value: engagement.averageStreak,      label: "Avg Streak (days)",      change: "↑ 3% from last week"  },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor app usage, engagement, and success metrics</p>
      </div>

      {/* Active users */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Daily Active"    value={activeUsers.dailyActiveUsers.toLocaleString()}   icon={Activity}   iconBg="bg-blue-100"   iconColor="text-blue-600"   growth="+3.5%" />
          <StatCard label="Weekly Active"   value={activeUsers.weeklyActiveUsers.toLocaleString()}  icon={Calendar}   iconBg="bg-green-100"  iconColor="text-green-600"  growth="+2.8%" />
          <StatCard label="Monthly Active"  value={activeUsers.monthlyActiveUsers.toLocaleString()} icon={Users}      iconBg="bg-purple-100" iconColor="text-purple-600" growth="+1.9%" />
          <StatCard label="Avg Session"     value={activeUsers.averageSessionTime}                  icon={TrendingUp} iconBg="bg-orange-100" iconColor="text-orange-600" growth="+5.2%" />
        </div>
      </section>

      {/* Engagement */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">This Week's Engagement</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {engagementItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl font-bold text-[#836852] mb-1">{item.value.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className="mt-1 text-xs text-green-600">{item.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Success rates */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Success Rates by Duration</h2>
        <div className="space-y-4">
          {successRates.map(({ label, rate }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-[#836852]">{rate}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-[#836852] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth (Last 30 Days)</h2>
        <div className="h-56 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-center">
            <BarChart3 className="size-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Chart visualization — connect your data source</p>
          </div>
        </div>
      </div>
    </div>
  );
}
