import { useState } from "react";
import { Link } from "react-router-dom";
import { Users as UsersIcon, UserCheck, UserX, Activity, Search, Filter } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - replace with API call
  const stats = {
    totalUsers: 15847,
    activeUsers: 12453,
    bannedUsers: 234,
    newToday: 156
  };

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", streak: 45, joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", streak: 23, joinDate: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "banned", streak: 0, joinDate: "2024-03-10" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "active", streak: 67, joinDate: "2023-12-05" },
    { id: 5, name: "David Brown", email: "david@example.com", status: "inactive", streak: 12, joinDate: "2024-01-28" }
  ];

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Users Management</h1>
        <p className="text-gray-600">Manage and monitor all UnSmoke users</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={UsersIcon}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          growth="+2.3%"
        />
        <StatCard
          label="Active Users"
          value={stats.activeUsers.toLocaleString()}
          icon={UserCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          growth="+5.1%"
        />
        <StatCard
          label="Banned Users"
          value={stats.bannedUsers.toLocaleString()}
          icon={UserX}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          growth="-0.5%"
        />
        <StatCard
          label="New Today"
          value={stats.newToday.toLocaleString()}
          icon={Activity}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          growth="+8.2%"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/users/all" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UsersIcon className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">View All Users</h3>
              <p className="text-sm text-gray-600">Browse complete user list</p>
            </div>
          </div>
        </Link>

        <Link to="/users/active" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Active Users</h3>
              <p className="text-sm text-gray-600">Users with active streaks</p>
            </div>
          </div>
        </Link>

        <Link to="/users/banned" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <UserX className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Banned Users</h3>
              <p className="text-sm text-gray-600">View banned accounts</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#836852]"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#836852] appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'banned' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.streak} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/users/profile/${user.id}`} className="text-[#836852] hover:text-[#6b5442] mr-4">
                      View
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      {user.status === 'banned' ? 'Unban' : 'Ban'}
                    </button>
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
