/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Search, Star, X, MessageSquare, ThumbsUp } from "lucide-react";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";

// ── helpers ────────────────────────────────────────────────────────────────────

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </span>
  );
}

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

// ── Component ──────────────────────────────────────────────────────────────────

export default function UserFeedback() {
  const [search,   setSearch  ] = useState("");
  const [selected, setSelected] = useState(null);

  const { data, loading, error, refetch } = useFetch("/admin/feedback");

  const items = data?.feedback ?? [];
  const total = data?.pagination?.total ?? 0;

  const avgRating = items.length
    ? (items.reduce((s, f) => s + f.rating, 0) / items.length).toFixed(1)
    : "—";

  const positive = items.filter((f) => f.rating >= 4).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? items : items.filter(
      (f) =>
        f.message.toLowerCase().includes(q) ||
        (f.userId?.name ?? "").toLowerCase().includes(q)
    );
  }, [items, search]);

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={MessageSquare} iconBg="bg-blue-100"   iconColor="text-blue-600"
          label="Total Feedback" value={total} />
        <StatCard icon={Star}          iconBg="bg-amber-100"  iconColor="text-amber-600"
          label="Avg Rating"     value={avgRating} sub="out of 5" />
        <StatCard icon={ThumbsUp}      iconBg="bg-green-100"  iconColor="text-green-600"
          label="Positive (4–5★)" value={loading ? "—" : positive} sub="on this page" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl shadow px-5 py-3">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="search"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#836852]"
            placeholder="Search feedback or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p className="text-sm text-gray-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Rating</th>
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
                      <p className="line-clamp-2">{item.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <Stars rating={item.rating} />
                        <span className="text-xs text-gray-400">{item.rating}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelected(item)}
                        className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No feedback found.
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
              <h2 className="text-lg font-semibold text-gray-800">Feedback Details</h2>
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
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <Stars rating={selected.rating} />
                  <span className="text-sm font-semibold text-gray-700">{selected.rating} / 5</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Message</p>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-1">Submitted</p>
                <p className="text-sm text-gray-600">
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
