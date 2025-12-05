import { Link } from "react-router-dom";
import { Target, Play, CheckCircle, Ban, Users } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Challenges() {
  // Mock data
  const stats = {
    totalChallenges: 1247,
    activeChallenges: 856,
    completedToday: 234,
    reportedChallenges: 12
  };

  const recentChallenges = [
    {
      id: 1,
      title: "7 Days Smoke Free Challenge",
      creator: "Admin",
      participants: 2341,
      completions: 1876,
      status: "active",
      created: "2024-01-15",
      duration: "7 days"
    },
    {
      id: 2,
      title: "30 Day Master Challenge",
      creator: "Sarah Johnson",
      participants: 1567,
      completions: 987,
      status: "active",
      created: "2024-02-01",
      duration: "30 days"
    },
    {
      id: 3,
      title: "Weekend Warrior",
      creator: "Mike Brown",
      participants: 876,
      completions: 654,
      status: "active",
      created: "2024-03-10",
      duration: "3 days"
    },
    {
      id: 4,
      title: "Smoke Free Month",
      creator: "Admin",
      participants: 3421,
      completions: 2341,
      status: "completed",
      created: "2024-01-01",
      duration: "30 days"
    },
    {
      id: 5,
      title: "Fake Challenge Test",
      creator: "Spam User",
      participants: 2,
      completions: 0,
      status: "reported",
      created: "2024-12-01",
      duration: "1 day"
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Challenges Management</h1>
          <p className="text-gray-600">Monitor and moderate user challenges</p>
        </div>
        <Link
          to="/challenges/templates"
          className="flex items-center gap-2 px-4 py-2 bg-[#836852] text-white rounded-lg hover:bg-[#6b5442] transition-colors"
        >
          <Target className="size-5" />
          Manage Templates
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Challenges"
          value={stats.totalChallenges.toLocaleString()}
          icon={Target}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          growth="+5.3%"
        />
        <StatCard
          label="Active Challenges"
          value={stats.activeChallenges.toLocaleString()}
          icon={Play}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          growth="+2.1%"
        />
        <StatCard
          label="Completed Today"
          value={stats.completedToday.toLocaleString()}
          icon={CheckCircle}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          growth="+8.7%"
        />
        <StatCard
          label="Reported"
          value={stats.reportedChallenges.toString()}
          icon={Ban}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          growth="-1.2%"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link to="/challenges/all" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">All Challenges</h3>
              <p className="text-sm text-gray-600">View all</p>
            </div>
          </div>
        </Link>

        <Link to="/challenges/active" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Active</h3>
              <p className="text-sm text-gray-600">Ongoing challenges</p>
            </div>
          </div>
        </Link>

        <Link to="/challenges/templates" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Templates</h3>
              <p className="text-sm text-gray-600">Default challenges</p>
            </div>
          </div>
        </Link>

        <Link to="/challenges/moderation" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Ban className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Moderation</h3>
              <p className="text-sm text-gray-600">Reported content</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Challenges Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Challenges</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentChallenges.map((challenge) => (
                <tr key={challenge.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                      <div className="text-sm text-gray-500">Duration: {challenge.duration}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{challenge.creator}</div>
                    <div className="text-sm text-gray-500">{new Date(challenge.created).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{challenge.participants.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {challenge.participants > 0 
                          ? Math.round((challenge.completions / challenge.participants) * 100)
                          : 0}%
                      </span>
                      <span className="text-xs text-gray-500">
                        {challenge.completions} completed
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                      challenge.status === 'reported' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {challenge.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#836852] hover:text-[#6b5442] mr-4">
                      View
                    </button>
                    {challenge.status === 'reported' && (
                      <button className="text-red-600 hover:text-red-900">
                        Ban
                      </button>
                    )}
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
