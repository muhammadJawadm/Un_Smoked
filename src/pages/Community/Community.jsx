import { Link } from "react-router-dom";
import { MessageSquare, AlertTriangle, Flag, UserX, Eye } from "lucide-react";
import StatCard from "../../components/StatCard";

export default function Community() {
  // Mock data
  const stats = {
    totalPosts: 15847,
    reportedContent: 87,
    bannedUsers: 23,
    pendingReviews: 34
  };

  const recentPosts = [
    {
      id: 1,
      content: "Just completed my first week smoke-free! Feeling amazing! 🎉",
      author: "Sarah Johnson",
      authorEmail: "sarah@example.com",
      likes: 234,
      comments: 45,
      reports: 0,
      status: "approved",
      created: "2024-12-03"
    },
    {
      id: 2,
      content: "Day 30! Never thought I could make it this far. Thank you all for the support! ❤️",
      author: "Mike Brown",
      authorEmail: "mike@example.com",
      likes: 567,
      comments: 89,
      reports: 0,
      status: "approved",
      created: "2024-12-02"
    },
    {
      id: 3,
      content: "Struggling today but staying strong. Anyone else having cravings?",
      author: "Emily Davis",
      authorEmail: "emily@example.com",
      likes: 123,
      comments: 67,
      reports: 0,
      status: "approved",
      created: "2024-12-02"
    },
    {
      id: 4,
      content: "This is spam content promoting external products",
      author: "Spam User",
      authorEmail: "spam@example.com",
      likes: 2,
      comments: 0,
      reports: 15,
      status: "reported",
      created: "2024-12-01"
    },
    {
      id: 5,
      content: "Inappropriate and offensive content here...",
      author: "Bad User",
      authorEmail: "bad@example.com",
      likes: 0,
      comments: 2,
      reports: 8,
      status: "reported",
      created: "2024-12-01"
    }
  ];

  const filteredPosts = recentPosts.sort((a, b) => b.reports - a.reports);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Moderation</h1>
        <p className="text-gray-600">Monitor and moderate community posts and content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Posts"
          value={stats.totalPosts.toLocaleString()}
          icon={MessageSquare}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          growth="+4.2%"
        />
        <StatCard
          label="Reported Content"
          value={stats.reportedContent.toString()}
          icon={Flag}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          growth="+0.5%"
        />
        <StatCard
          label="Banned Users"
          value={stats.bannedUsers.toString()}
          icon={UserX}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          growth="-0.3%"
        />
        <StatCard
          label="Pending Reviews"
          value={stats.pendingReviews.toString()}
          icon={AlertTriangle}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          growth="+1.0%"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link to="/community/posts" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">All Posts</h3>
              <p className="text-sm text-gray-600">View all posts</p>
            </div>
          </div>
        </Link>

        <Link to="/community/reported" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Flag className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Reported</h3>
              <p className="text-sm text-gray-600">{stats.reportedContent} reports</p>
            </div>
          </div>
        </Link>

        <Link to="/community/moderation" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="size-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Moderation</h3>
              <p className="text-sm text-gray-600">Moderate content</p>
            </div>
          </div>
        </Link>

        <Link to="/community/feedback" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="size-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">User Feedback</h3>
              <p className="text-sm text-gray-600">View feedback</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Posts (Sorted by Reports)</h2>
        </div>
        <div className="p-6 space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`border rounded-lg p-4 ${
                post.reports > 0 ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#836852] rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{post.author}</h4>
                      <p className="text-sm text-gray-500">{post.authorEmail}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.comments} comments</span>
                    <span className="text-xs text-gray-400">{new Date(post.created).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {post.reports > 0 ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full">
                      <Flag className="size-4" />
                      <span className="text-sm font-semibold">{post.reports} reports</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      Clean
                    </span>
                  )}
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    post.status === 'approved' ? 'bg-green-100 text-green-800' :
                    post.status === 'reported' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                <button className="px-4 py-2 text-sm bg-[#836852] text-white rounded-lg hover:bg-[#6b5442]">
                  View Details
                </button>
                {post.reports > 0 && (
                  <>
                    <button className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      Approve
                    </button>
                    <button className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                      Delete Post
                    </button>
                    <button className="px-4 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">
                      Warn User
                    </button>
                    <button className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                      Ban User
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
