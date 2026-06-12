/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import {
  FileText, Flag, Search, Heart, MessageSquare,
  Film, Image, ChevronLeft, ChevronRight, X, Trash2, CheckCircle,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

// ── shared helpers ─────────────────────────────────────────────────────────────

function isVideo(url) {
  return /\/(video\/upload\/|\.mp4|\.mov|\.webm)/i.test(url);
}

function UserCell({ user, fallback = "Deleted User" }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <span className="text-xs text-gray-400">?</span>
        </div>
        <p className="text-sm font-medium text-gray-400 italic">{fallback}</p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {user.profile_picture ? (
        <img src={user.profile_picture} alt={user.name}
          className="w-8 h-8 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
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

function MediaThumb({ media }) {
  if (!media?.length) return <span className="text-gray-300 text-xs">No media</span>;
  const first = media[0];
  return (
    <div className="flex items-center gap-1">
      {isVideo(first) ? (
        <Film className="size-4 text-purple-400 shrink-0" />
      ) : (
        <img src={first} alt="" className="w-8 h-8 rounded object-cover shrink-0"
          onError={(e) => { e.target.style.display = "none"; }} />
      )}
      {media.length > 1 && <span className="text-xs text-gray-400">+{media.length - 1}</span>}
    </div>
  );
}

const REASON_STYLES = {
  "Encourages Smoking/Self-Harm": "bg-red-100 text-red-700",
  "Harassment or Hate Speech":    "bg-orange-100 text-orange-700",
  "Spam or Irrelevant":           "bg-yellow-100 text-yellow-700",
  "Other":                        "bg-gray-100 text-gray-600",
};

function ReasonBadge({ reason }) {
  const cls = REASON_STYLES[reason] ?? "bg-gray-100 text-gray-600";
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${cls}`}>{reason}</span>;
}

const PAGE_SIZE = 10;

// ── Post Detail Modal ──────────────────────────────────────────────────────────

function PostDetailModal({ postId, onClose }) {
  const [page,           setPage         ] = useState(1);
  const [activeTab,      setInnerTab     ] = useState("likes");
  const [commentBusy,    setCommentBusy  ] = useState(null);  // holds comment id being deleted
  const [commentErr,     setCommentErr   ] = useState(null);

  const { data, loading, error, refetch } = useFetch(
    `/admin/posts/${postId}/likes-comments?page=${page}&limit=20`
  );

  const post     = data?.post ?? null;

  // API may return { likes: [...], likesTotal: N } or { likes: { data: [...], total: N } }
  const likesRaw     = data?.likes    ?? [];
  const commentsRaw  = data?.comments ?? [];
  const likesList    = Array.isArray(likesRaw)   ? likesRaw   : (likesRaw.data   ?? []);
  const commentsList = Array.isArray(commentsRaw) ? commentsRaw : (commentsRaw.data ?? []);
  const likesTotal   = data?.likesTotal   ?? (Array.isArray(likesRaw)   ? likesList.length   : (likesRaw.total   ?? likesList.length));
  const commentsTotal = data?.commentsTotal ?? (Array.isArray(commentsRaw) ? commentsList.length : (commentsRaw.total ?? commentsList.length));

  const pagination   = data?.pagination ?? {};
  const totalPages   = pagination.pages ?? 1;

  const innerTabs = [
    { key: "likes",    label: `Likes (${likesTotal})`    },
    { key: "comments", label: `Comments (${commentsTotal})` },
  ];

  const activeList = activeTab === "likes" ? likesList : commentsList;

  const handleDeleteComment = async (commentId) => {
    setCommentBusy(commentId);
    setCommentErr(null);
    try {
      await api.delete(`/admin/comments/${commentId}`);
      await refetch();
    } catch (e) {
      setCommentErr(e.response?.data?.message ?? e.message ?? "Failed to delete comment.");
    } finally {
      setCommentBusy(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Post Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#836852] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && <PageError message={error} onRetry={refetch} />}

          {!loading && !error && (
            <>
              {/* Post preview */}
              {post && (
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                  <UserCell user={post.userId ?? post.author} />
                  <p className="text-sm text-gray-700">{post.description}</p>
                  {post.media?.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {post.media.map((url, i) =>
                        isVideo(url) ? (
                          <div key={i} className="w-20 h-20 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Film className="size-6 text-purple-500" />
                          </div>
                        ) : (
                          <img key={i} src={url} alt=""
                            className="w-20 h-20 rounded-lg object-cover"
                            onError={(e) => { e.target.style.display = "none"; }} />
                        )
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Heart className="size-3 text-red-400" />{likesTotal} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3 text-blue-400" />{commentsTotal} comments
                    </span>
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                </div>
              )}

              {/* Inner tabs */}
              <div className="flex gap-1 border-b border-gray-200">
                {innerTabs.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setInnerTab(key)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === key
                        ? "border-[#836852] text-[#836852]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {commentErr && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{commentErr}</p>
              )}

              {/* List */}
              {activeList.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-8">No {activeTab} yet.</p>
              ) : (
                <div className="space-y-2">
                  {activeList.map((item, i) => {
                    const u = item.userId ?? item.user ?? null;
                    const text = item.text ?? item.comment ?? item.content ?? null;
                    const isComment = activeTab === "comments";
                    return (
                      <div key={item._id ?? i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        {u?.profile_picture ? (
                          <img src={u.profile_picture} alt={u.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ backgroundColor: "#836852" }}>
                            {u ? u.name?.charAt(0).toUpperCase() : "?"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">
                            {u?.name ?? <span className="italic text-gray-400">Anonymous</span>}
                          </p>
                          {u?.email && <p className="text-xs text-gray-400">{u.email}</p>}
                          {text && <p className="text-sm text-gray-700 mt-1">{text}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <p className="text-xs text-gray-400 whitespace-nowrap">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                          </p>
                          {isComment && item._id && (
                            <button
                              onClick={() => handleDeleteComment(item._id)}
                              disabled={commentBusy === item._id}
                              className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 disabled:opacity-50"
                            >
                              <Trash2 className="size-3" />
                              {commentBusy === item._id ? "Deleting…" : "Delete"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}
                    className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                  <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}
                    className="p-1.5 border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Posts tab ──────────────────────────────────────────────────────────────────

function PostsTab() {
  const [apiPage,        setApiPage       ] = useState(1);
  const [search,         setSearch        ] = useState("");
  const [local,          setLocal         ] = useState(1);
  const [selectedPost,   setSelectedPost  ] = useState(null);
  const [pendingDelete,  setPendingDelete ] = useState(null);  // post id awaiting confirm
  const [actionBusy,     setActionBusy   ] = useState(false);
  const [actionErr,      setActionErr    ] = useState(null);

  const { data, loading, error, refetch } = useFetch(
    `/admin/posts?page=${apiPage}&limit=20`
  );

  const handleDeletePost = async (id) => {
    setActionBusy(true);
    setActionErr(null);
    try {
      await api.delete(`/admin/posts/${id}`);
      setPendingDelete(null);
      await refetch();
    } catch (e) {
      setActionErr(e.response?.data?.message ?? e.message ?? "Failed to delete post.");
    } finally {
      setActionBusy(false);
    }
  };

  const posts      = data?.posts;
  const pagination = data?.pagination ?? {};

  const filtered = useMemo(() => {
    const items = posts ?? [];
    const q = search.toLowerCase();
    return !q ? items : items.filter(
      (p) =>
        p.description.toLowerCase().includes(q) ||
        (p.userId?.name  ?? "").toLowerCase().includes(q) ||
        (p.userId?.email ?? "").toLowerCase().includes(q)
    );
  }, [posts, search]);

  const totalLocal = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice  = filtered.slice((local - 1) * PAGE_SIZE, local * PAGE_SIZE);

  const handleSearch = (v) => { setSearch(v); setLocal(1); };

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts or author..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#836852]"
        />
      </div>

      {actionErr && (
        <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{actionErr}</p>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Author", "Description", "Media", "Likes", "Comments", "Date", "Actions"].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">No posts found.</td>
                </tr>
              ) : pageSlice.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3"><UserCell user={post.userId} /></td>
                  <td className="px-5 py-3 max-w-xs">
                    <p className="text-gray-700 line-clamp-2">{post.description}</p>
                  </td>
                  <td className="px-5 py-3"><MediaThumb media={post.media} /></td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Heart className="size-3 text-red-400" />{post.likesCount}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-gray-500">
                      <MessageSquare className="size-3 text-blue-400" />{post.commentsCount}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPost(post._id)}
                        className="px-3 py-1 text-xs font-medium text-[#836852] bg-orange-50 rounded-md hover:bg-orange-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setPendingDelete(post._id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                      >
                        <Trash2 className="size-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-800">
              {filtered.length === 0 ? 0 : (local - 1) * PAGE_SIZE + 1}
            </span> – <span className="font-medium text-gray-800">
              {Math.min(local * PAGE_SIZE, filtered.length)}
            </span> of <span className="font-medium text-gray-800">{filtered.length}</span> posts
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

      {/* Post detail modal */}
      {selectedPost && (
        <PostDetailModal
          postId={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* Delete confirmation modal */}
      {pendingDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delete Post</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            {actionErr && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{actionErr}</p>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setPendingDelete(null); setActionErr(null); }}
                disabled={actionBusy}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePost(pendingDelete)}
                disabled={actionBusy}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {actionBusy ? "Deleting…" : "Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Reports tab ────────────────────────────────────────────────────────────────

function ReportsTab() {
  const [search,      setSearch    ] = useState("");
  const [local,       setLocal     ] = useState(1);
  const [actionBusy,  setActionBusy] = useState(null);  // holds report id being actioned
  const [actionErr,   setActionErr ] = useState(null);

  const { data, loading, error, refetch } = useFetch("/admin/post-reports");

  const reports    = data?.reports;
  const pagination = data?.pagination ?? {};

  const handleResolve = async (reportId, action) => {
    setActionBusy(reportId);
    setActionErr(null);
    try {
      await api.patch(`/admin/post-reports/${reportId}/resolve`, { action });
      await refetch();
    } catch (e) {
      setActionErr(e.response?.data?.message ?? e.message ?? "Action failed.");
    } finally {
      setActionBusy(null);
    }
  };

  const filtered = useMemo(() => {
    const items = reports ?? [];
    const q = search.toLowerCase();
    return !q ? items : items.filter(
      (r) =>
        r.reason.toLowerCase().includes(q) ||
        (r.userId?.name ?? "").toLowerCase().includes(q) ||
        (r.postId?.description ?? "").toLowerCase().includes(q)
    );
  }, [reports, search]);

  const totalLocal = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSlice  = filtered.slice((local - 1) * PAGE_SIZE, local * PAGE_SIZE);

  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by reason, reporter or post..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setLocal(1); }}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#836852]"
        />
      </div>

      {actionErr && (
        <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{actionErr}</p>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Reporter", "Reported Post", "Media", "Reason", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pageSlice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">No reports found.</td>
                </tr>
              ) : pageSlice.map((report) => {
                const resolved = report.status === "resolved" || report.is_resolved === true;
                const busy = actionBusy === report._id;
                return (
                  <tr key={report._id} className="hover:bg-red-50">
                    <td className="px-5 py-3"><UserCell user={report.userId} fallback="Anonymous" /></td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-gray-700 line-clamp-2">{report.postId?.description ?? "—"}</p>
                    </td>
                    <td className="px-5 py-3"><MediaThumb media={report.postId?.media} /></td>
                    <td className="px-5 py-3"><ReasonBadge reason={report.reason} /></td>
                    <td className="px-5 py-3">
                      {resolved ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          <CheckCircle className="size-3" /> Resolved
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      {resolved ? (
                        <span className="text-xs text-gray-400">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResolve(report._id, "delete_post")}
                            disabled={busy}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 disabled:opacity-50 whitespace-nowrap"
                          >
                            <Trash2 className="size-3" />
                            {busy ? "…" : "Del Post"}
                          </button>
                          <button
                            onClick={() => handleResolve(report._id, "dismiss")}
                            disabled={busy}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 disabled:opacity-50"
                          >
                            <CheckCircle className="size-3" />
                            {busy ? "…" : "Dismiss"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-800">
              {filtered.length === 0 ? 0 : (local - 1) * PAGE_SIZE + 1}
            </span> – <span className="font-medium text-gray-800">
              {Math.min(local * PAGE_SIZE, filtered.length)}
            </span> of <span className="font-medium text-gray-800">{filtered.length}</span> reports
            {" "}(<span className="font-medium text-gray-800">{pagination.total}</span> total)
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

const TABS = [
  { key: "posts",   label: "All Posts",    icon: FileText },
  { key: "reports", label: "Post Reports", icon: Flag     },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("posts");

  const { data: postsData   } = useFetch("/admin/posts");
  const { data: reportsData } = useFetch("/admin/post-reports");

  const totalPosts   = postsData?.pagination?.total  ?? "—";
  const totalReports = reportsData?.pagination?.total ?? "—";
  const withMedia    = (postsData?.posts ?? []).filter((p) => p.media?.length > 0).length;

  return (
    <div>
      <Header header="Community Moderation" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard icon={FileText} iconBg="bg-blue-100"   iconColor="text-blue-600"
              label="Total Posts"      value={totalPosts} />
            <StatCard icon={Image}    iconBg="bg-purple-100" iconColor="text-purple-600"
              label="Posts with Media" value={postsData ? withMedia : "—"} sub="on current page" />
            <StatCard icon={Flag}     iconBg="bg-red-100"    iconColor="text-red-600"
              label="Post Reports"     value={totalReports} />
          </div>

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
                {key === "reports" && totalReports !== "—" && totalReports > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-red-100 text-red-600 rounded-full">
                    {totalReports}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "posts"   && <PostsTab   />}
          {activeTab === "reports" && <ReportsTab />}

        </div>
      </div>
    </div>
  );
}
