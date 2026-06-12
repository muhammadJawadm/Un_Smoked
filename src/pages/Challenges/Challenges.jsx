/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Layers,
  Search,
  Filter,
  Zap,
  Grid,
  Clock,
  ChevronLeft,
  ChevronRight,
  InboxIcon,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";

// ── helpers ────────────────────────────────────────────────────────────────────

function UserCell({ user }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <span className="text-xs text-gray-400">?</span>
        </div>
        <span className="text-sm text-gray-400 italic">Deleted User</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {user.profile_picture ? (
        <img src={user.profile_picture} alt={user.name}
          className="w-7 h-7 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: "#836852" }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-gray-800 whitespace-nowrap">{user.name}</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
    </div>
  );
}

const STATUS_STYLES = {
  pending:   "bg-amber-100 text-amber-700",
  waiting:   "bg-blue-100 text-blue-700",
  active:    "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

const MODE_STYLES = {
  "1v1":  "bg-purple-100 text-purple-700",
  open:   "bg-sky-100 text-sky-700",
};

const MODERATION_STYLES = {
  ok:      "bg-green-100 text-green-700",
  flagged: "bg-red-100 text-red-700",
};

const SOURCE_STYLES = {
  custom:   "bg-orange-100 text-orange-700",
  template: "bg-indigo-100 text-indigo-700",
};

const STATUS_FILTERS = [
  { key: "all",       label: "All"       },
  { key: "pending",   label: "Pending"   },
  { key: "waiting",   label: "Waiting"   },
  { key: "active",    label: "Active"    },
  { key: "completed", label: "Completed" },
];

const TABS = [
  { key: "challenges", label: "Challenges", icon: Target  },
  { key: "templates",  label: "Templates",  icon: Layers  },
];

const PAGE_SIZE = 10;

// ── Challenges tab ─────────────────────────────────────────────────────────────

function ChallengesTab() {
  const [apiPage,  setApiPage ] = useState(1);
  const [search,   setSearch  ] = useState("");
  const [filter,   setFilter  ] = useState("all");
  const [local,    setLocal   ] = useState(1);

  const { data, loading, error, refetch } = useFetch(
    `/admin/challenges?page=${apiPage}&limit=20`
  );

  const challenges = data?.challenges ?? [];
  const pagination = data?.pagination  ?? {};

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return challenges.filter((c) => {
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.createdBy?.name  ?? "").toLowerCase().includes(q) ||
        (c.category?.name   ?? "").toLowerCase().includes(q);

      const matchFilter = filter === "all" || c.status === filter;
      return matchSearch && matchFilter;
    });
  }, [challenges, search, filter]);

  const totalLocal = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice  = filtered.slice((local - 1) * PAGE_SIZE, local * PAGE_SIZE);

  const handleSearch = (v) => { setSearch(v); setLocal(1); };
  const handleFilter = (k) => { setFilter(k); setLocal(1); };

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, creator, category..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#836852]"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="size-4 text-gray-400 shrink-0" />
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === f.key ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={filter === f.key ? { backgroundColor: "#836852" } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Challenge", "Creator", "Category", "Mode", "Duration", "XP", "Status", "Moderation", "Date", ""].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-12 text-center text-gray-400">
                    No challenges found.
                  </td>
                </tr>
              ) : pageSlice.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 max-w-xs">
                    <p className="font-medium text-gray-900 whitespace-nowrap">{c.title}</p>
                    {c.description && (
                      <p className="text-xs text-gray-400 line-clamp-1">{c.description}</p>
                    )}
                    <span className={`inline-block mt-1 px-1.5 py-0.5 text-xs font-medium rounded ${SOURCE_STYLES[c.sourceType] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.sourceType}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <UserCell user={c.createdBy} />
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">
                      {c.category?.name ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${MODE_STYLES[c.mode] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.mode}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3 text-gray-400" />
                      {c.durationDays}d
                    </div>
                    <p className="text-xs text-gray-400">Board: {c.boardSize}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Zap className="size-3" />{c.xpReward}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${STATUS_STYLES[c.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${MODERATION_STYLES[c.moderationStatus] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.moderationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/challenges/${c._id}`}
                      className="px-3 py-1 text-xs font-medium text-[#836852] bg-orange-50 rounded-md hover:bg-orange-100"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-800">
              {filtered.length === 0 ? 0 : (local - 1) * PAGE_SIZE + 1}
            </span> – <span className="font-medium text-gray-800">
              {Math.min(local * PAGE_SIZE, filtered.length)}
            </span> of <span className="font-medium text-gray-800">{filtered.length}</span>
            {pagination.pages > 1 && (
              <span className="text-gray-400"> (server page {apiPage}/{pagination.pages})</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setLocal((p) => Math.max(p - 1, 1))} disabled={local === 1}
              className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-white rounded-lg"
              style={{ backgroundColor: "#836852" }}>
              {local} / {totalLocal}
            </span>
            <button onClick={() => setLocal((p) => Math.min(p + 1, totalLocal))} disabled={local === totalLocal}
              className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              <ChevronRight className="size-4" />
            </button>
            {pagination.pages > 1 && (
              <div className="flex items-center gap-1 ml-2 border-l border-gray-200 pl-2">
                <button
                  onClick={() => { setApiPage((p) => Math.max(p - 1, 1)); setLocal(1); }}
                  disabled={apiPage === 1}
                  className="px-2 py-1 text-xs border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
                  Prev page
                </button>
                <button
                  onClick={() => { setApiPage((p) => Math.min(p + 1, pagination.pages)); setLocal(1); }}
                  disabled={apiPage === pagination.pages}
                  className="px-2 py-1 text-xs border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
                  Next page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Templates tab ──────────────────────────────────────────────────────────────

function TemplatesTab() {
  const [search, setSearch] = useState("");
  const [local,  setLocal ] = useState(1);

  const { data, loading, error, refetch } = useFetch("/admin/challenge-templates");

  const templates  = data?.templates  ?? [];
  const pagination = data?.pagination ?? {};

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? templates : templates.filter(
      (t) =>
        (t.title ?? "").toLowerCase().includes(q) ||
        (t.category?.name ?? "").toLowerCase().includes(q)
    );
  }, [templates, search]);

  const totalLocal = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice  = filtered.slice((local - 1) * PAGE_SIZE, local * PAGE_SIZE);

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  if (pagination.total === 0) {
    return (
      <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-20 text-center">
        <InboxIcon className="size-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-500 mb-1">No Templates Yet</h3>
        <p className="text-sm text-gray-400">Challenge templates will appear here once created.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setLocal(1); }}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#836852]"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Category", "Duration", "Board Size", "XP Reward", "Mode", "Date"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                    No templates found.
                  </td>
                </tr>
              ) : pageSlice.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{t.title}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full">
                      {t.category?.name ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{t.durationDays}d</td>
                  <td className="px-5 py-3 text-gray-600">{t.boardSize}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Zap className="size-3" />{t.xpReward}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${MODE_STYLES[t.mode] ?? "bg-gray-100 text-gray-600"}`}>
                      {t.mode}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            {filtered.length} of {pagination.total} templates
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setLocal((p) => Math.max(p - 1, 1))} disabled={local === 1}
              className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-white rounded-lg"
              style={{ backgroundColor: "#836852" }}>
              {local} / {totalLocal}
            </span>
            <button onClick={() => setLocal((p) => Math.min(p + 1, totalLocal))} disabled={local === totalLocal}
              className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Challenges() {
  const [activeTab, setActiveTab] = useState("challenges");

  const { data } = useFetch("/admin/challenges");
  const challenges = data?.challenges ?? [];

  const pending   = challenges.filter((c) => c.status === "pending").length;
  const waiting   = challenges.filter((c) => c.status === "waiting").length;
  const active    = challenges.filter((c) => c.status === "active").length;
  const total     = data?.pagination?.total ?? "—";

  return (
    <div>
      <Header header="Challenges Management" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Target}    iconBg="bg-blue-100"   iconColor="text-blue-600"
              label="Total Challenges" value={total} />
            <StatCard icon={Clock}     iconBg="bg-amber-100"  iconColor="text-amber-600"
              label="Pending"          value={data ? pending : "—"} sub="on this page" />
            <StatCard icon={Grid}      iconBg="bg-sky-100"    iconColor="text-sky-600"
              label="Waiting"          value={data ? waiting : "—"} sub="on this page" />
            <StatCard icon={Zap}       iconBg="bg-green-100"  iconColor="text-green-600"
              label="Active"           value={data ? active  : "—"} sub="on this page" />
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 border-b border-gray-200">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-[#836852] text-[#836852]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "challenges" && <ChallengesTab />}
          {activeTab === "templates"  && <TemplatesTab  />}

        </div>
      </div>
    </div>
  );
}
