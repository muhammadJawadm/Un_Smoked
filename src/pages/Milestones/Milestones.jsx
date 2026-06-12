/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { Search, Award, Calendar, InboxIcon, Plus, X, Trash2 } from "lucide-react";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

function BadgeImage({ src, title }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <Award className="size-8 text-amber-500" />
      </div>
    );
  }

  const url = src.startsWith("//") ? `https:${src}` : src;

  return (
    <img
      src={url}
      alt={title}
      onError={() => setBroken(true)}
      className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
    />
  );
}

export default function Milestones() {
  const [search,      setSearch     ] = useState("");
  const [showAdd,     setShowAdd    ] = useState(false);
  const [form,        setForm       ] = useState({ title: "", description: "", badge_image: "" });
  const [addBusy,     setAddBusy    ] = useState(false);
  const [addErr,      setAddErr     ] = useState(null);
  const [deleteId,    setDeleteId   ] = useState(null);
  const [deleteBusy,  setDeleteBusy ] = useState(false);
  const [deleteErr,   setDeleteErr  ] = useState(null);

  const { data, loading, error, refetch } = useFetch("/admin/milestones");

  const milestonesRaw = data?.milestones;
  const total         = data?.pagination?.total ?? 0;

  const filtered = useMemo(() => {
    const items = milestonesRaw ?? [];
    const q = search.toLowerCase();
    return !q
      ? items
      : items.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q)
        );
  }, [milestonesRaw, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setAddBusy(true);
    setAddErr(null);
    try {
      await api.post("/admin/milestones", form);
      setShowAdd(false);
      setForm({ title: "", description: "", badge_image: "" });
      await refetch();
    } catch (err) {
      setAddErr(err.response?.data?.message ?? err.message ?? "Failed to create milestone.");
    } finally {
      setAddBusy(false);
    }
  };

  const handleDelete = async () => {
    setDeleteBusy(true);
    setDeleteErr(null);
    try {
      await api.delete(`/admin/milestones/${deleteId}`);
      setDeleteId(null);
      await refetch();
    } catch (err) {
      setDeleteErr(err.response?.data?.message ?? err.message ?? "Delete failed.");
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <div>
      <Header header="Milestones" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon={Award}
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
              label="Total Milestones"
              value={loading ? "—" : total}
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl shadow px-5 py-3">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="search"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#836852]"
                placeholder="Search milestones..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => { setAddErr(null); setShowAdd(true); }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#836852" }}
            >
              <Plus className="size-4" /> Add Milestone
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <PageLoader />
          ) : error ? (
            <PageError message={error} onRetry={refetch} />
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-20 text-center">
              <InboxIcon className="size-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-1">No Milestones Found</h3>
              <p className="text-sm text-gray-400">
                {search ? "Try a different search term." : "Click 'Add Milestone' to create one."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((m) => (
                <div
                  key={m._id}
                  className="bg-white rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow relative group"
                >
                  {/* Delete button — visible on hover */}
                  <button
                    onClick={() => { setDeleteErr(null); setDeleteId(m._id); }}
                    className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete milestone"
                  >
                    <Trash2 className="size-4" />
                  </button>

                  <BadgeImage src={m.badge_image} title={m.title} />

                  <h3 className="text-base font-bold text-gray-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{m.description}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="size-3.5" />
                    {new Date(m.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Add Milestone modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Add Milestone</h2>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852]"
                  placeholder="e.g. First Week Smoke-Free"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
                  placeholder="Describe this milestone..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge Image URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.badge_image}
                  onChange={(e) => setForm((p) => ({ ...p, badge_image: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852]"
                  placeholder="https://..."
                />
              </div>

              {addErr && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{addErr}</p>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  disabled={addBusy}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addBusy}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "#836852" }}
                >
                  {addBusy ? "Creating…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delete Milestone</h3>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </div>
            </div>
            {deleteErr && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{deleteErr}</p>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteBusy}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteBusy}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleteBusy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
