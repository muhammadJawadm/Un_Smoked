import { useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

// icons
import { BsCalendar2Event } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import { RiCloseFill, RiHome4Line, RiLogoutCircleLine } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { FaRunning } from "react-icons/fa";
import { IoCheckmarkDone, IoMenuOutline, IoStatsChart } from "react-icons/io5";
import { MdAssignmentAdd, MdMenuOpen, MdOutlineAddTask, MdTask } from "react-icons/md";
import logo from "../../assets/logo1.png";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Users, Baby, Award, HelpCircle, Settings } from "lucide-react";

/**
 * 1) Icon registry — keeps the MENU "JSON" clean by using string keys.
 */
const ICONS = {
  RiHome4Line,
  Users,
  Baby,
  Award,
  HelpCircle,
  Settings,
};

/**
 * 2) Single source of truth for all links.
 *    - Change order/labels/paths by editing this array only.
 *    - "icon" is a key into ICONS above.
 */
const MENU = [
  { key: "home", label: "Home", to: "/", icon: "RiHome4Line" },

  { key: "Parents", label: "Total Parents", to: "/TotalParents", icon: "Users" },
  { key: "Children", label: "Total Children", to: "/TotalChildren", icon: "Baby" },
  { key: "Milestones", label: "Total Milestones", to: "/milestones", icon: "Award" },
  { key: "faq", label: "FAQs", to: "/faqs", icon: "HelpCircle" },
  { key: "app-settings", label: "App Settings", to: "/setting", icon: "Settings" },
];

/**
 * 3) Utility: shared classes for active/inactive states.
 */
const navClasses = (isActive, small) =>
  isActive
    ? `flex items-center ${small ? 'justify-center' : 'px-5'} gap-1.5 py-2 rounded-lg shadow text-white font-semibold`
    : "flex items-center gap-1.5 py-2 px-5 text-gray-600 rounded-lg hover:bg-[#F7F5F3] drop-shadow hover:text-[#836852] hover:font-medium outline-none transition-all";

/**
 * 4) Reusable item renderer.
 */
function SidebarItem({ to, label, icon, small, onClick }) {
  const Icon = ICONS[icon] ?? Fragment;
  return (
    <li onClick={onClick}>
      <NavLink 
        to={to} 
        className={({ isActive }) => navClasses(isActive, small)}
        style={({ isActive }) => isActive ? { backgroundColor: '#836852' } : {}}
      >
        <Icon className="size-5" />
        {!small && <span className="whitespace-nowrap">{label}</span>}
      </NavLink>
    </li>
  );
}

export default function Sidebar({ smallSidebar, setSmallSidebar }) {
  const [showMenu, setShowMenu] = useState(false);

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
                    <img src={logo}  alt="Logo" className="object-cover h-24" />
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
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  small={smallSidebar}
                  onClick={() => setShowMenu(false)}
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
