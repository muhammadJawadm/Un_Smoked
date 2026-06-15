/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronLeft, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header({ header, link, arrow }) {
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
const { logout } = useAuth();

const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="mr-8 ml-8">
        <nav>
          <div className="flex items-center justify-between px-8 py-4 sm:px-8 rounded-xl border bg-white">
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

            <div className="flex items-center gap-3 relative">
              <button
                onClick={() => setNotifOpen(true)}
                className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Bell className="size-5 text-gray-600" />
                <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500" />
              </button>

              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2 text-sm"
              >
                <img
                  className="rounded-full w-9 h-9 object-cover"
                  src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Admin avatar"
                  loading="lazy"
                />
                <span className="hidden sm:block font-medium text-gray-700">Jane Doe</span>
              </button>

              {dropOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setDropOpen(false)}
                        className="block px-4 py-2 text-sm text-white rounded-md mx-2 my-1"
                        style={{ backgroundColor: "#836852" }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => {
                          setDropOpen(false);
                          handleLogout();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md mx-2"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Notifications panel */}
      {notifOpen && (
        <div className="fixed top-0 right-0 z-50 w-80 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-semibold text-gray-800">Notifications</h2>
            <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {["New user registered", "Reported post needs review", "Medal awarded to 50 users"].map(
              (msg, i) => (
                <div key={i} className="border border-gray-100 rounded-lg px-4 py-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-800">{msg}</p>
                  <p className="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
