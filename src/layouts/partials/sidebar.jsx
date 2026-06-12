/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { RiCloseFill, RiHome4Line, RiLogoutCircleLine } from "react-icons/ri";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import {
  Users,
  TrendingUp,
  Trophy,
  Target,
  MessageSquare,
  BarChart3,
  HelpCircle,
  Settings,
  Milestone,
} from "lucide-react";
import logo from "../../assets/logo.png";

const ICONS = {
  RiHome4Line,
  Users,
  TrendingUp,
  Trophy,
  Target,
  MessageSquare,
  BarChart3,
  HelpCircle,
  Settings,
  Milestone,
};

const MENU = [
  { key: "dashboard",   label: "Dashboard",   to: "/",             icon: "RiHome4Line"  },
  { key: "users",       label: "Users",        to: "/users",        icon: "Users"        },
  { key: "streaks",     label: "Streaks",      to: "/streaks",      icon: "TrendingUp"   },
  { key: "rewards",     label: "Rewards",      to: "/rewards",      icon: "Trophy"       },
  { key: "challenges",  label: "Challenges",   to: "/challenges",   icon: "Target"       },
  { key: "milestones",  label: "Milestones",   to: "/milestones",   icon: "Milestone"    },
  { key: "community",   label: "Community",    to: "/community",    icon: "MessageSquare"},
  { key: "analytics",   label: "Analytics",    to: "/analytics",    icon: "BarChart3"    },
  { key: "faqs",        label: "FAQs",         to: "/faqs",         icon: "HelpCircle"   },
  { key: "settings",    label: "Settings",     to: "/setting",      icon: "Settings"     },
];

function SidebarItem({ item, small, onMenuClose }) {
  const Icon = ICONS[item.icon];

  return (
    <li>
      <NavLink
        to={item.to}
        end={item.to === "/"}
        onClick={onMenuClose}
        className={({ isActive }) => [
          "flex items-center gap-3 py-2.5 rounded-lg transition-all",
          small ? "justify-center px-2" : "px-5",
          isActive
            ? "text-white font-semibold shadow-sm"
            : "text-gray-600 hover:bg-[#ede9e5] hover:text-[#836852] hover:font-medium",
        ].join(" ")}
        style={({ isActive }) => (isActive ? { backgroundColor: "#836852" } : {})}
      >
        {Icon && <Icon className="size-5 shrink-0" />}
        {!small && <span className="whitespace-nowrap">{item.label}</span>}
      </NavLink>
    </li>
  );
}

export default function Sidebar({ smallSidebar, setSmallSidebar }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const closeMenu = () => setShowMenu(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="px-4 sm:px-8 py-2 lg:hidden" style={{ backgroundColor: "#F7F5F3" }}>
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          className="flex items-center p-2 text-white rounded-lg hover:opacity-80"
          style={{ backgroundColor: "#836852" }}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile backdrop overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={[
          "fixed top-2.5 left-2.5 z-40 bottom-2.5 rounded-2xl border border-black/10",
          showMenu ? "block" : "hidden",
          smallSidebar ? "w-20" : "w-72",
          "lg:block",
        ].join(" ")}
        style={{ backgroundColor: "#F7F5F3" }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">

          {/* Mobile close button */}
          <button
            className="absolute top-4 -right-4 rounded-xl size-8 flex items-center justify-center text-white lg:hidden hover:opacity-80"
            style={{ backgroundColor: "#836852" }}
            onClick={closeMenu}
            aria-label="Close sidebar"
          >
            <RiCloseFill className="size-6" />
          </button>

          {/* Logo */}
          <div className="mb-4">
            {!smallSidebar ? (
              <Link to="/" className="flex items-center justify-center">
                {/* w-full + object-contain prevents the image from overflowing the sidebar */}
                <img src={logo} alt="UnSmoke" className="w-full h-10 object-contain" />
              </Link>
            ) : (
              <div className="h-10" />
            )}
          </div>

          {/* Nav items */}
          <ul className="space-y-1 font-normal text-sm flex-1">
            {MENU.map((item) => (
              <SidebarItem
                key={item.key}
                item={item}
                small={smallSidebar}
                onMenuClose={closeMenu}
              />
            ))}
          </ul>

          {/* Logout — button element, not a div inside an anchor */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleLogout}
              className={[
                "w-full flex items-center gap-3 px-5 py-2.5 rounded-lg",
                "text-gray-600 font-medium transition-all",
                "hover:text-white",
                smallSidebar ? "justify-center" : "",
              ].join(" ")}
              style={{ backgroundColor: "rgba(131, 104, 82, 0.1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#836852")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(131, 104, 82, 0.1)")}
            >
              <RiLogoutCircleLine className="size-5 shrink-0" />
              {!smallSidebar && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:block absolute bg-white top-2.5 -right-5 rounded-lg border border-black/20">
          <button
            type="button"
            onClick={() => setSmallSidebar((v) => !v)}
            className="px-2 py-1.5 hover:opacity-70 transition-opacity"
            style={{ color: "#836852" }}
            aria-label={smallSidebar ? "Expand sidebar" : "Collapse sidebar"}
          >
            {smallSidebar ? (
              <GoSidebarCollapse className="size-5" />
            ) : (
              <GoSidebarExpand className="size-5" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
