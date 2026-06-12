/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Search, Mail, Clock, CheckCircle, X, Filter } from "lucide-react";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

// ── helpers ────────────────────────────────────────────────────────────────────

function UserCell({ user }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <span className="text-xs text-gray-400">?</span>
        </div>
        <span className="text-sm text-gray-400 italic">Anonymous</span>
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

function StatusBadge({ status }) {
  return status === "resolved" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
      <CheckCircle className="size-3" /> Resolved
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
      <Clock className="size-3" /> Pending
    </span>
  );
}

const STATUS_FILTERS = [
  { key: "all",      label: "All"      },
  { key: "pending",  label: "Pending"  },
  { key: "resolved", label: "Resolved" },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function Contacts() {
  const [search,       setSearch      ] = useState("");
  const [filter,       setFilter      ] = useState("all");
  const [selected,     setSelected    ] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [respondBusy,  setRespondBusy ] = useState(false);
  const [respondErr,   setRespondErr  ] = useState(null);

  const { data, loading, error, refetch } = useFetch("/admin/contacts");

  const contactsRaw = data?.contacts;
  const total       = data?.pagination?.total ?? 0;

  const filtered = useMemo(() => {
    const items = contactsRaw ?? [];
    const q = search.toLowerCase();
    return items.filter((c) => {
      const matchSearch =
        !q ||
        c.issue.toLowerCase().includes(q) ||
        (c.userId?.name ?? "").toLowerCase().includes(q);
      const matchFilter = filter === "all" || c.status === filter;
      return matchSearch && matchFilter;
    });
  }, [contactsRaw, search, filter]);

  const items    = contactsRaw ?? [];
  const pending  = items.filter((c) => c.status === "pending").length;
  const resolved = items.filter((c) => c.status === "resolved").length;

  const openSelected = (item) => {
    setSelected(item);
    setResponseText("");
    setRespondErr(null);
  };

  const handleRespond = async () => {
    if (!responseText.trim()) return;
    setRespondBusy(true);
    setRespondErr(null);
    try {
      await api.patch(`/admin/contacts/${selected._id}/respond`, { response: responseText.trim() });
      await refetch();
      setSelected(null);
    } catch (err) {
      setRespondErr(err.response?.data?.message ?? err.message ?? "Failed to send response.");
    } finally {
      setRespondBusy(false);
    }
  };

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Mail}         iconBg="bg-blue-100"   iconColor="text-blue-600"
          label="Total Contacts" value={total} />
        <StatCard icon={Clock}        iconBg="bg-amber-100"  iconColor="text-amber-600"
          label="Pending"        value={pending}  sub="on this page" />
        <StatCard icon={CheckCircle}  iconBg="bg-green-100"  iconColor="text-green-600"
          label="Resolved"       value={resolved} sub="on this page" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl shadow px-5 py-3">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="search"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#836852]"
            placeholder="Search by issue or user..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-gray-400 shrink-0" />
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
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
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Issue</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4"><UserCell user={item.userId} /></td>
                    <td className="px-6 py-4 text-gray-600 max-w-sm">
                      <p className="line-clamp-2">{item.issue}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openSelected(item)}
                        className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        {item.status === "resolved" ? "View" : "Respond"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Contact Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">From</p>
                <UserCell user={selected.userId} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Issue</p>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.issue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Status</p>
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Submitted</p>
                <p className="text-sm text-gray-600">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {/* Existing admin response */}
            {selected.adminResponse && (
              <div className="px-6 pb-4 space-y-1">
                <p className="text-xs text-gray-400 uppercase font-medium">Admin Response</p>
                <p className="text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-2">
                  {selected.adminResponse}
                </p>
              </div>
            )}

            {/* Respond form — only for pending */}
            {selected.status !== "resolved" && (
              <div className="px-6 pb-5 space-y-3">
                <p className="text-xs text-gray-400 uppercase font-medium">Send Response</p>
                <textarea
                  rows={3}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
                />
                {respondErr && (
                  <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{respondErr}</p>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelected(null)}
                    disabled={respondBusy}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRespond}
                    disabled={respondBusy || !responseText.trim()}
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 disabled:opacity-50"
                    style={{ backgroundColor: "#836852" }}
                  >
                    {respondBusy ? "Sending…" : "Send Response"}
                  </button>
                </div>
              </div>
            )}

            {selected.status === "resolved" && (
              <div className="px-6 py-4 border-t flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
