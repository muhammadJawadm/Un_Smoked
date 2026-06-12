/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users as UsersIcon,
  UserCheck,
  UserX,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";

// ── small helpers ──────────────────────────────────────────────────────────────

function Avatar({ user }) {
  if (user.profile_picture) {
    return (
      <img
        src={user.profile_picture}
        alt={user.name}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
      style={{ backgroundColor: "#836852" }}>
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
}

function Badge({ value, trueLabel = "Yes", falseLabel = "No", trueStyle = "bg-green-100 text-green-700", falseStyle = "bg-red-100 text-red-700" }) {
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${value ? trueStyle : falseStyle}`}>
      {value ? trueLabel : falseLabel}
    </span>
  );
}

function ProviderBadge({ provider }) {
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
      provider === "google" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
    }`}>
      {provider}
    </span>
  );
}

const FILTERS = [
  { key: "all",        label: "All"        },
  { key: "verified",   label: "Verified"   },
  { key: "unverified", label: "Unverified" },
];

const USERS_PER_PAGE = 10;

// ── page component ─────────────────────────────────────────────────────────────

export default function Users() {
  const [apiPage, setApiPage]     = useState(1);
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("all");

  const { data, loading, error, refetch } = useFetch(
    `/admin/users?page=${apiPage}&limit=20`
  );

  const users      = data?.users ?? [];
  const pagination = data?.pagination ?? {};

  // client-side filter + search on the fetched page
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone ?? "").includes(q);

      const matchFilter =
        activeFilter === "all" ||
        (activeFilter === "verified"   && u.is_verified) ||
        (activeFilter === "unverified" && !u.is_verified);

      return matchSearch && matchFilter;
    });
  }, [users, search, activeFilter]);

  // local pagination on the filtered slice
  const [localPage, setLocalPage] = useState(1);
  const totalLocalPages = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  const paginated = filtered.slice(
    (localPage - 1) * USERS_PER_PAGE,
    localPage * USERS_PER_PAGE
  );

  const handleSearchChange = (val) => {
    setSearch(val);
    setLocalPage(1);
  };

  const handleFilterChange = (key) => {
    setFilter(key);
    setLocalPage(1);
  };

  // stats derived from current fetch
  const verifiedCount   = users.filter((u) => u.is_verified).length;
  const unverifiedCount = users.filter((u) => !u.is_verified).length;
  const activeCount     = users.filter((u) => u.is_active).length;

  return (
    <div>
      <Header header="Users Management" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={UsersIcon} iconBg="bg-blue-100"   iconColor="text-blue-600"
              label="Total Users"  value={pagination.total ?? "—"} />
            <StatCard icon={UserCheck} iconBg="bg-green-100"  iconColor="text-green-600"
              label="Verified"     value={loading ? "—" : verifiedCount}   sub="on this page" />
            <StatCard icon={UserX}     iconBg="bg-red-100"    iconColor="text-red-600"
              label="Unverified"   value={loading ? "—" : unverifiedCount} sub="on this page" />
            <StatCard icon={UserCheck} iconBg="bg-purple-100" iconColor="text-purple-600"
              label="Active"       value={loading ? "—" : activeCount}     sub="on this page" />
          </div>

          {/* Table card */}
          <div className="bg-white rounded-xl shadow overflow-hidden">

            {/* Toolbar */}
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#836852]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="size-4 text-gray-400 shrink-0" />
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => handleFilterChange(f.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      activeFilter === f.key
                        ? "text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={activeFilter === f.key ? { backgroundColor: "#836852" } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table body */}
            {loading ? (
              <PageLoader />
            ) : error ? (
              <PageError message={error} onRetry={refetch} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {["User", "Phone", "Provider", "Verified", "Active", "Cigs/Day", "Health Goal", "Joined", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-5 py-12 text-center text-gray-400">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      paginated.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar user={user} />
                              <div>
                                <p className="font-medium text-gray-900 whitespace-nowrap">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                            {user.phone || <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-5 py-3">
                            <ProviderBadge provider={user.authProvider} />
                          </td>
                          <td className="px-5 py-3">
                            <Badge value={user.is_verified} trueLabel="Verified" falseLabel="Unverified" />
                          </td>
                          <td className="px-5 py-3">
                            <Badge value={user.is_active} trueLabel="Active" falseLabel="Inactive" />
                          </td>
                          <td className="px-5 py-3 text-gray-600 text-center">
                            {user.cigarettes_per_day || <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-5 py-3">
                            {user.health_goal ? (
                              <span className="px-2 py-0.5 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">
                                {user.health_goal}
                              </span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3">
                            <Link
                              to={`/users/profile/${user._id}`}
                              className="text-sm font-medium text-[#836852] hover:text-[#6b5442]"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination row */}
            {!loading && !error && (
              <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Local page info */}
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium text-gray-800">
                    {filtered.length === 0 ? 0 : (localPage - 1) * USERS_PER_PAGE + 1}
                  </span>{" "}
                  –{" "}
                  <span className="font-medium text-gray-800">
                    {Math.min(localPage * USERS_PER_PAGE, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-800">{filtered.length}</span> users
                  {pagination.pages > 1 && (
                    <span className="text-gray-400">
                      {" "}(page {apiPage} of {pagination.pages} from server)
                    </span>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  {/* Local prev */}
                  <button
                    onClick={() => setLocalPage((p) => Math.max(p - 1, 1))}
                    disabled={localPage === 1}
                    className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <span className="px-3 py-1 text-sm font-medium text-white rounded-lg"
                    style={{ backgroundColor: "#836852" }}>
                    {localPage} / {totalLocalPages}
                  </span>

                  {/* Local next */}
                  <button
                    onClick={() => setLocalPage((p) => Math.min(p + 1, totalLocalPages))}
                    disabled={localPage === totalLocalPages}
                    className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
                  >
                    <ChevronRight className="size-4" />
                  </button>

                  {/* Server page controls */}
                  {pagination.pages > 1 && (
                    <div className="flex items-center gap-1 ml-2 border-l border-gray-200 pl-2">
                      <button
                        onClick={() => { setApiPage((p) => Math.max(p - 1, 1)); setLocalPage(1); }}
                        disabled={apiPage === 1}
                        className="px-2 py-1 text-xs border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
                      >
                        Prev page
                      </button>
                      <button
                        onClick={() => { setApiPage((p) => Math.min(p + 1, pagination.pages)); setLocalPage(1); }}
                        disabled={apiPage === pagination.pages}
                        className="px-2 py-1 text-xs border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
                      >
                        Next page
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
