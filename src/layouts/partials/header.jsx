/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronLeft, X, User, LogOut, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

// ── Notification panel ────────────────────────────────────────────────────────

function NotifPanel({ onClose }) {
  const { data, loading } = useFetch("/admin/notifications?limit=15");
  const notifications = data?.notifications ?? [];

  return (
    <div className="fixed top-0 right-0 z-50 w-80 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
        <h2 className="font-semibold text-gray-800">Notifications</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-4 border-[#836852] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-5">
            <Bell className="size-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">No notifications yet.</p>
          </div>
        )}

        {!loading && notifications.length > 0 && (
          <div className="divide-y divide-gray-50">
            {notifications.map((n, i) => {
              const sent   = n.status === "sent";
              const timeStr = n.createdAt
                ? new Date(n.createdAt).toLocaleString()
                : "";
              return (
                <div key={n._id ?? i} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      sent ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {sent
                        ? <CheckCircle2 className="size-3.5 text-green-600" />
                        : <Bell className="size-3.5 text-red-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 leading-snug">
                        {n.title ?? "Notification"}
                      </p>
                      {n.body && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.body}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        {n.status && (
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            sent ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                          }`}>
                            {n.status}
                          </span>
                        )}
                        {timeStr && (
                          <span className="text-[10px] text-gray-400">{timeStr}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t shrink-0">
        <Link
          to="/notifications"
          onClick={onClose}
          className="block text-center text-sm font-medium text-[#836852] hover:underline"
        >
          Send a notification →
        </Link>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header({ header, link, arrow }) {
  const [dropOpen,  setDropOpen ] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropRef = useRef(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Fetch full admin profile using the token (interceptor adds Bearer automatically)
  const { data: profileData } = useFetch("/auth/profile");
  const profile = profileData?.user ?? profileData?.admin ?? profileData?.data ?? null;

  // close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setDropOpen(false);
    logout();
    navigate("/login");
  };

  const name    = profile?.name            ?? profile?.email ?? "Admin";
  const email   = profile?.email           ?? "";
  const avatar  = profile?.profile_picture ?? null;
  const initial = name.charAt(0).toUpperCase();
  const role    = profile?.role            ?? "admin";

  return (
    <>
      <div className="mr-8 ml-8">
        <nav>
          <div className="flex items-center justify-between px-8 py-4 sm:px-8 rounded-xl border bg-white">

            {/* Left: page title */}
            <div className="flex items-center gap-2">
              {arrow && (
                <Link to={link} className="text-gray-500 hover:text-gray-700">
                  <ChevronLeft className="size-5" />
                </Link>
              )}
              <span className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                {header}
              </span>
            </div>

            {/* Right: bell + profile */}
            <div className="flex items-center gap-3" ref={dropRef}>

              {/* Notification bell */}
              <button
                onClick={() => setNotifOpen(true)}
                className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Bell className="size-5 text-gray-600" />
              </button>

              {/* Profile button */}
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    loading="lazy"
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: "#836852" }}
                  >
                    {initial}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{name}</p>
                  <p className="text-xs text-gray-400 capitalize leading-tight">{role}</p>
                </div>
              </button>

              {/* Dropdown */}
              {dropOpen && (
                <div className="absolute right-8 top-20 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                    {email && <p className="text-xs text-gray-400 truncate">{email}</p>}
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold bg-[#ede9e5] text-[#836852] rounded-full capitalize">
                      {role}
                    </span>
                  </div>

                  <ul className="py-1.5">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="size-4 text-gray-400" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Notification panel backdrop */}
      {notifOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setNotifOpen(false)}
          />
          <NotifPanel onClose={() => setNotifOpen(false)} />
        </>
      )}
    </>
  );
}
