import { useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

// icons
import { RiCloseFill, RiHome4Line, RiLogoutCircleLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { 
  Users, 
  Award, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  TrendingUp,
  Trophy,
  Target,
  MessageSquare,
  BarChart3,
  Shield,
  Flag,
  AlertCircle,
  UserCheck,
  UserX,
  Activity,
  Medal,
  Gift,
  Zap,
  FileText,
  Lock,
  Bell
} from "lucide-react";

/**
 * 1) Icon registry — keeps the MENU "JSON" clean by using string keys.
 */
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
  Award,
  Shield,
  Flag,
  AlertCircle,
  UserCheck,
  UserX,
  Activity,
  Medal,
  Gift,
  Zap,
  FileText,
  Lock,
  Bell
};

/**
 * 2) Single source of truth for all links - UnSmoke Admin Panel
 *    - Change order/labels/paths by editing this array only.
 *    - "icon" is a key into ICONS above.
 */
const MENU = [
  { 
    key: "dashboard", 
    label: "Dashboard", 
    to: "/", 
    icon: "RiHome4Line" 
  },
  { 
    key: "users", 
    label: "Users Management", 
    to: "/users", 
    icon: "Users",
    subItems: [
      { key: "all-users", label: "All Users", to: "/users/all" },
      { key: "active-users", label: "Active Users", to: "/users/active" },
      { key: "banned-users", label: "Banned Users", to: "/users/banned" },
      { key: "user-activity", label: "User Activity", to: "/users/activity" }
    ]
  },
  { 
    key: "streaks", 
    label: "Streaks & Progress", 
    to: "/streaks", 
    icon: "TrendingUp",
    subItems: [
      { key: "streaks-overview", label: "Overview", to: "/streaks/overview" },
      { key: "longest-streaks", label: "Longest Streaks", to: "/streaks/longest" },
      { key: "broken-streaks", label: "Broken Streaks", to: "/streaks/broken" },
      { key: "daily-logs", label: "Daily Logs", to: "/streaks/daily-logs" }
    ]
  },
  { 
    key: "rewards", 
    label: "Rewards & Medals", 
    to: "/rewards", 
    icon: "Trophy",
    subItems: [
      { key: "all-medals", label: "All Medals", to: "/rewards/medals" },
      { key: "create-medal", label: "Create Medal", to: "/rewards/create" },
      { key: "medal-stats", label: "Medal Statistics", to: "/rewards/stats" },
      { key: "user-achievements", label: "User Achievements", to: "/rewards/achievements" }
    ]
  },
  { 
    key: "challenges", 
    label: "Challenges", 
    to: "/challenges", 
    icon: "Target",
    subItems: [
      { key: "all-challenges", label: "All Challenges", to: "/challenges/all" },
      { key: "active-challenges", label: "Active Challenges", to: "/challenges/active" },
      { key: "challenge-templates", label: "Templates", to: "/challenges/templates" },
      { key: "challenge-moderation", label: "Moderation", to: "/challenges/moderation" }
    ]
  },
  { 
    key: "community", 
    label: "Community", 
    to: "/community", 
    icon: "MessageSquare",
    subItems: [
      { key: "all-posts", label: "All Posts", to: "/community/posts" },
      { key: "reported-content", label: "Reported Content", to: "/community/reported" },
      { key: "moderation", label: "Moderation", to: "/community/moderation" },
      { key: "user-feedback", label: "User Feedback", to: "/community/feedback" }
    ]
  },
  { 
    key: "analytics", 
    label: "Analytics", 
    to: "/analytics", 
    icon: "BarChart3",
    subItems: [
      { key: "app-usage", label: "App Usage", to: "/analytics/usage" },
      { key: "user-engagement", label: "User Engagement", to: "/analytics/engagement" },
      { key: "success-rates", label: "Success Rates", to: "/analytics/success" },
      { key: "reports", label: "Reports", to: "/analytics/reports" }
    ]
  },
  { 
    key: "faqs", 
    label: "FAQs", 
    to: "/faqs", 
    icon: "HelpCircle" 
  },
  { 
    key: "settings", 
    label: "Settings", 
    to: "/setting", 
    icon: "Settings",
    subItems: [
      { key: "app-settings", label: "App Settings", to: "/setting/app" },
      { key: "privacy-policy", label: "Privacy Policy", to: "/setting/privacy" },
      { key: "terms", label: "Terms & Conditions", to: "/setting/terms" },
      { key: "notifications", label: "Notifications", to: "/setting/notifications" }
    ]
  }
];

/**
 * 3) Utility: shared classes for active/inactive states.
 */
const navClasses = (isActive, small) =>
  isActive
    ? `flex items-center ${small ? 'justify-center' : 'px-5'} gap-1.5 py-2 rounded-lg shadow text-white font-semibold`
    : "flex items-center gap-1.5 py-2 px-5 text-gray-600 rounded-lg hover:bg-[#F7F5F3] drop-shadow hover:text-[#836852] hover:font-medium outline-none transition-all";

/**
 * 4) Reusable item renderer with nested subitems support.
 */
function SidebarItem({ item, small, onMenuClose, expandedMenus, toggleMenu, level = 0 }) {
  const Icon = ICONS[item.icon] ?? Fragment;
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedMenus[item.key];

  // If item has subitems, render as a button to toggle
  if (hasSubItems) {
    return (
      <>
        <li>
          <button
            onClick={() => toggleMenu(item.key)}
            className={`w-full flex items-center justify-between gap-1.5 py-2 px-5 text-gray-600 rounded-lg hover:bg-[#F7F5F3] drop-shadow hover:text-[#836852] hover:font-medium outline-none transition-all ${
              level > 0 ? 'pl-8' : ''
            }`}
            style={{ paddingLeft: level > 0 ? `${20 + level * 16}px` : undefined }}
          >
            <div className="flex items-center gap-1.5">
              {level === 0 && <Icon className="size-5" />}
              {!small && <span className="whitespace-nowrap">{item.label}</span>}
            </div>
            {!small && (
              isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )
            )}
          </button>
        </li>

        {/* Render subitems when expanded */}
        {isExpanded && !small && (
          <ul className="space-y-1">
            {item.subItems.map((subItem) => (
              <SidebarItem
                key={subItem.key}
                item={subItem}
                small={small}
                onMenuClose={onMenuClose}
                expandedMenus={expandedMenus}
                toggleMenu={toggleMenu}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
  
  // Regular item without subitems - render as NavLink
  return (
    <li>
      <NavLink
        to={item.to}
        onClick={onMenuClose}
        className={({ isActive }) => navClasses(isActive, small)}
        style={({ isActive }) =>
          isActive
            ? { 
                backgroundColor: '#836852',
                paddingLeft: level > 0 ? `${20 + level * 16}px` : undefined 
              }
            : { paddingLeft: level > 0 ? `${20 + level * 16}px` : undefined }
        }
      >
        {level === 0 && <Icon className="size-5" />}
        {!small && <span className="whitespace-nowrap">{item.label}</span>}
      </NavLink>
    </li>
  );
}

export default function Sidebar({ smallSidebar, setSmallSidebar }) {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (key) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };


  return (
    <>
      {/* Mobile top bar */}
      <div className="px-4 sm:px-8 py-2 lg:py-0" style={{ backgroundColor: '#F7F5F3' }}>
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          className="flex items-center p-2 text-sm text-white border-2 rounded-lg lg:hidden hover:opacity-80"
          style={{ backgroundColor: '#836852', borderColor: '#836852' }}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        aria-label="Sidebar"
        className={`fixed top-2.5 left-2.5 z-40 bottom-2.5 rounded-2xl border-2 border-black/10 ${showMenu ? "" : "hidden"} ${smallSidebar ? "w-20" : "w-64"} lg:block`}
        style={{ backgroundColor: '#F7F5F3' }}
      >
        <div className="h-full px-3 py-4 overflow-y-visible relative">
          {/* Close (mobile) */}
          {showMenu && (
            <button
              className="absolute top-4 -right-4 rounded-xl size-8 flex items-center justify-center text-xl text-white lg:hidden hover:opacity-80"
              style={{ backgroundColor: '#836852' }}
              onClick={() => setShowMenu(false)}
              aria-label="Close sidebar"
            >
              <RiCloseFill className="size-6" />
            </button>
          )}

          <div className="flex flex-col justify-between h-full">
            <ul className="space-y-2 font-normal text-sm">
              {/* Collapse toggle */}


              {/* Logo (hidden when collapsed) */}
              {!smallSidebar && (
                <li>
                  <Link to="/" className="flex items-center justify-center  rounded-lg">
                    <img src={logo}  alt="Logo" className="object-cover w-48 h-12 mb-5" />
                  </Link>
                </li>
              )}

              {/* Logo (hidden when collapsed) */}
              {smallSidebar && (
                <li className="my-8">
                </li>
              )}

              {/* Menu items */}
              {MENU.map((item) => (
                <SidebarItem
                  key={item.key}
                  item={item}
                  small={smallSidebar}
                  onMenuClose={() => setShowMenu(false)}
                  expandedMenus={expandedMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </ul>

            {/* Footer / Logout */}
            <div>
              <Link to="/login">
                <div 
                  className="flex items-center px-5 py-2 rounded-lg text-gray-600 gap-2.5 cursor-pointer font-medium hover:text-white drop-shadow transition-all"
                  style={{ backgroundColor: 'rgba(131, 104, 82, 0.1)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#836852'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(131, 104, 82, 0.1)'}
                >
                  <RiLogoutCircleLine />
                  {!smallSidebar && <p>Logout</p>}
                </div>
              </Link>
            </div>
          </div>

          {/* Open and close the sidebar */}
          <div className="hidden lg:block absolute bg-white top-2.5 -right-5 rounded-lg w-fit border-2 border-black/20 outline-none">
            <div className="flex items-end justify-end">
              <button
                onClick={() => setSmallSidebar((v) => !v)}
                className="text-xs px-2 py-1.5 hover:opacity-70 transition-opacity"
                style={{ color: '#836852' }}
              >
                {smallSidebar ? <div className=""><GoSidebarCollapse className="size-5" /></div> : <GoSidebarExpand className="size-7" />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
