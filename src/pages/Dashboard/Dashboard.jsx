import { Link } from "react-router-dom";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import {
  Users,
  FileText,
  BookOpen,
  MessageSquare,
  Target,
  Trophy,
  Flag,
  Mail,
  Bell,
  ThumbsUp,
} from "lucide-react";

export default function Dashboard() {
  const { data, loading, error, refetch } = useFetch("/admin/dashboard/stats");

  if (loading) return <><Header header="UnSmoke Admin Dashboard" /><PageLoader /></>;
  if (error)   return <><Header header="UnSmoke Admin Dashboard" /><PageError message={error} onRetry={refetch} /></>;

  const s = data.stats;

  const primaryCards = [
    { label: "Total Users",     value: s.users.total,          sub: `${s.users.active} active`,      icon: Users,        iconBg: "bg-blue-100",   iconColor: "text-blue-600",   to: "/users"     },
    { label: "Total Posts",     value: s.posts.total,          sub: `${s.comments.total} comments`,  icon: FileText,     iconBg: "bg-indigo-100", iconColor: "text-indigo-600", to: "/community" },
    { label: "Blogs",           value: s.blogs.total,          sub: "published",                     icon: BookOpen,     iconBg: "bg-purple-100", iconColor: "text-purple-600", to: "/community" },
    { label: "Challenges",      value: s.challenges.total,     sub: `${s.challenges.active} active`, icon: Target,       iconBg: "bg-green-100",  iconColor: "text-green-600",  to: "/challenges"},
    { label: "Competitions",    value: s.competitions.total,   sub: "running",                       icon: Trophy,       iconBg: "bg-yellow-100", iconColor: "text-yellow-600", to: "/challenges"},
    { label: "Post Reports",    value: s.postReports.total,    sub: "need review",                   icon: Flag,         iconBg: "bg-red-100",    iconColor: "text-red-600",    to: "/community" },
    { label: "Pending Contacts",value: s.contacts.pending,     sub: `${s.contacts.total} total`,     icon: Mail,         iconBg: "bg-orange-100", iconColor: "text-orange-600", to: "/setting"   },
    { label: "Feedback",        value: s.feedback.total,       sub: "received",                      icon: ThumbsUp,     iconBg: "bg-pink-100",   iconColor: "text-pink-600",   to: "/setting"   },
    { label: "Notifications",   value: s.notifications.total,  sub: "sent",                          icon: Bell,         iconBg: "bg-teal-100",   iconColor: "text-teal-600",   to: "/setting"   },
    { label: "Comments",        value: s.comments.total,       sub: "on posts",                      icon: MessageSquare,iconBg: "bg-cyan-100",   iconColor: "text-cyan-600",   to: "/community" },
  ];

  return (
    <div>
      <Header header="UnSmoke Admin Dashboard" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-8">

          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-[#836852] to-[#6b5442] rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">Welcome to UnSmoke Admin Panel</h2>
            <p className="text-white/80 text-sm">Monitor and manage your smoke-free community platform</p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {primaryCards.map(({ label, value, sub, icon, iconBg, iconColor, to }) => (
              <Link key={label} to={to}>
                <StatCard
                  icon={icon}
                  iconBg={iconBg}
                  iconColor={iconColor}
                  value={value?.toLocaleString() ?? "0"}
                  label={label}
                  sub={sub}
                />
              </Link>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/users" className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg shrink-0">
                    <Users className="size-7 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Manage Users</h4>
                    <p className="text-sm text-gray-500">{s.users.total} total · {s.users.active} active</p>
                  </div>
                </div>
              </Link>

              <Link to="/community" className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg shrink-0">
                    <Flag className="size-7 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Review Reports</h4>
                    <p className="text-sm text-gray-500">{s.postReports.total} reported posts pending</p>
                  </div>
                </div>
              </Link>

              <Link to="/challenges" className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg shrink-0">
                    <Target className="size-7 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Challenges</h4>
                    <p className="text-sm text-gray-500">{s.challenges.total} total · {s.challenges.active} active</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
