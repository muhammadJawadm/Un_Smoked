/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import { Search, Plus, X, HelpCircle, CheckCircle, XCircle, Trash2 } from "lucide-react";

// ── helpers ────────────────────────────────────────────────────────────────────

function ActiveBadge({ value }) {
  return value ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
      <CheckCircle className="size-3" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
      <XCircle className="size-3" /> Inactive
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Faqs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modal,       setModal      ] = useState({ open: false, mode: "view", faq: null });
  const [formData,    setForm       ] = useState({ question: "", answer: "" });
  const [busy,        setBusy       ] = useState(false);
  const [formErr,     setFormErr    ] = useState(null);
  const [deleteId,    setDeleteId   ] = useState(null);
  const [deleteBusy,  setDeleteBusy ] = useState(false);
  const [deleteErr,   setDeleteErr  ] = useState(null);

  const { data, loading, error, refetch } = useFetch("/admin/faqs");

  const faqsRaw  = data?.faqs;
  const total    = data?.pagination?.total ?? 0;

  const filtered = useMemo(() => {
    const items = faqsRaw ?? [];
    const q = searchQuery.toLowerCase();
    return !q ? items : items.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        (f.categoryId?.name ?? "").toLowerCase().includes(q)
    );
  }, [faqsRaw, searchQuery]);

  const faqs    = faqsRaw ?? [];
  const active  = faqs.filter((f) => f.is_active).length;
  const inactive = faqs.filter((f) => !f.is_active).length;

  const openView = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setModal({ open: true, mode: "view", faq });
  };

  const openEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setFormErr(null);
    setModal({ open: true, mode: "edit", faq });
  };

  const openAdd = () => {
    setForm({ question: "", answer: "" });
    setFormErr(null);
    setModal({ open: true, mode: "add", faq: null });
  };

  const closeModal = () => setModal({ open: false, mode: "view", faq: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setFormErr(null);
    try {
      if (modal.mode === "add") {
        await api.post("/admin/faqs", formData);
      } else {
        await api.put(`/admin/faqs/${modal.faq._id}`, formData);
      }
      await refetch();
      closeModal();
    } catch (err) {
      setFormErr(err.response?.data?.message ?? err.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setDeleteBusy(true);
    setDeleteErr(null);
    try {
      await api.delete(`/admin/faqs/${deleteId}`);
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
      <Header header="Manage FAQs" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-5">

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={HelpCircle}    iconBg="bg-blue-100"   iconColor="text-blue-600"
              label="Total FAQs" value={loading ? "—" : total} />
            <StatCard icon={CheckCircle}   iconBg="bg-green-100"  iconColor="text-green-600"
              label="Active"     value={loading ? "—" : active}   sub="on this page" />
            <StatCard icon={XCircle}       iconBg="bg-red-100"    iconColor="text-red-600"
              label="Inactive"   value={loading ? "—" : inactive} sub="on this page" />
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl shadow px-5 py-3">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="search"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#836852]"
                placeholder="Search by question, answer or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#836852" }}
            >
              <Plus className="size-4" />
              Add FAQ
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <PageLoader />
          ) : error ? (
            <PageError message={error} onRetry={refetch} />
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b">
                    <tr>
                      <th className="px-6 py-3">Question</th>
                      <th className="px-6 py-3">Answer</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.length > 0 ? (
                      filtered.map((faq) => (
                        <tr key={faq._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                            <p className="line-clamp-2">{faq.question}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-600 max-w-sm">
                            <p className="line-clamp-2">{faq.answer}</p>
                          </td>
                          <td className="px-6 py-4">
                            {faq.categoryId ? (
                              <span className="px-2 py-0.5 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">
                                {faq.categoryId.name}
                              </span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <ActiveBadge value={faq.is_active} />
                          </td>
                          <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                            {new Date(faq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <button
                              onClick={() => openView(faq)}
                              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => openEdit(faq)}
                              className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => { setDeleteErr(null); setDeleteId(faq._id); }}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                            >
                              <Trash2 className="size-3" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                          No FAQs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {modal.mode === "view" ? "View FAQ"
                  : modal.mode === "edit" ? "Edit FAQ"
                  : "Add New FAQ"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {/* Category (view only) */}
              {modal.mode === "view" && modal.faq?.categoryId && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">Category</p>
                  <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full">
                    {modal.faq.categoryId.name}
                  </span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                {modal.mode === "view" ? (
                  <p className="text-gray-800 font-medium">{formData.question}</p>
                ) : (
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852]"
                    placeholder="Enter FAQ question..."
                    required
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                {modal.mode === "view" ? (
                  <p className="text-gray-700 text-sm leading-relaxed">{formData.answer}</p>
                ) : (
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
                    placeholder="Enter FAQ answer..."
                    required
                  />
                )}
              </div>

              {/* Status (view only) */}
              {modal.mode === "view" && modal.faq && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase mb-1">Status</p>
                  <ActiveBadge value={modal.faq.is_active} />
                </div>
              )}

              {formErr && (
                <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{formErr}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={busy}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  {modal.mode === "view" ? "Close" : "Cancel"}
                </button>
                {modal.mode !== "view" && (
                  <button
                    type="submit"
                    disabled={busy}
                    className="px-5 py-2 text-white text-sm rounded-lg hover:opacity-80 disabled:opacity-50"
                    style={{ backgroundColor: "#836852" }}
                  >
                    {busy ? "Saving…" : modal.mode === "edit" ? "Update FAQ" : "Add FAQ"}
                  </button>
                )}
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
                <h3 className="font-semibold text-gray-900">Delete FAQ</h3>
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
