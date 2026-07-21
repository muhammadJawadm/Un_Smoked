/* eslint-disable react/prop-types */
import { useState, useMemo, useRef } from "react";
import {
  Award, Plus, X, CheckCircle, AlertCircle, ImageIcon,
  Search, InboxIcon, Calendar, Flame, Trophy, Shield, Zap,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import StatCard from "../../components/StatCard";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_TYPES = ["all", "streak", "completion", "milestone", "competition"];

const TYPE_META = {
  streak:      { label: "Streak",      style: "bg-amber-100 text-amber-700",   icon: Flame,    autoAssign: false },
  completion:  { label: "Completion",  style: "bg-green-100 text-green-700",   icon: CheckCircle, autoAssign: true  },
  milestone:   { label: "Milestone",   style: "bg-blue-100 text-blue-700",     icon: Shield,   autoAssign: true  },
  competition: { label: "Competition", style: "bg-purple-100 text-purple-700", icon: Trophy,   autoAssign: false },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function normSrc(src) {
  if (!src) return null;
  return src.startsWith("//") ? `https:${src}` : src;
}

// ── Badge image ───────────────────────────────────────────────────────────────

function BadgeImg({ src, title, className = "w-16 h-16" }) {
  const [broken, setBroken] = useState(false);
  const url = normSrc(src);

  if (!url || broken) {
    return (
      <div className={`${className} rounded-full bg-amber-100 flex items-center justify-center shrink-0`}>
        <Award className="size-7 text-amber-500" />
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={title}
      onError={() => setBroken(true)}
      className={`${className} rounded-full object-cover shrink-0`}
    />
  );
}

// ── Type chip ─────────────────────────────────────────────────────────────────

function TypeChip({ type }) {
  const meta = TYPE_META[type] ?? { label: type, style: "bg-gray-100 text-gray-600", icon: Zap };
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize ${meta.style}`}>
      <Icon className="size-3" />
      {meta.label}
    </span>
  );
}

// ── Add Badge Modal ───────────────────────────────────────────────────────────

function AddBadgeModal({ onClose, onCreated }) {
  const fileRef = useRef(null);

  // Step 1 — image upload
  const [previewUrl,  setPreviewUrl ] = useState(null);
  const [imageUrl,    setImageUrl   ] = useState("");
  const [uploadBusy,  setUploadBusy ] = useState(false);
  const [uploadOk,    setUploadOk   ] = useState(false);
  const [uploadErr,   setUploadErr  ] = useState(null);

  // Step 2 — badge details
  const [title,           setTitle          ] = useState("");
  const [description,     setDescription    ] = useState("");
  const [type,            setType           ] = useState("streak");
  const [conditionValue,  setConditionValue ] = useState("");
  const [isActive,        setIsActive       ] = useState(true);

  // Submit state
  const [busy, setBusy] = useState(false);
  const [err,  setErr ] = useState(null);

  // ── Step 1: upload on file select ───────────────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setUploadOk(false);
    setUploadErr(null);
    setUploadBusy(true);

    try {
      const fd = new FormData();
      fd.append("image", file);
      // Override the api instance's default "application/json" so the browser
      // can set the correct "multipart/form-data; boundary=..." automatically.
      const { data } = await api.post("/badges/upload-image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(data.imageUrl ?? data.url ?? "");
      setUploadOk(true);
    } catch (e) {
      setUploadErr(e.response?.data?.message ?? e.message ?? "Image upload failed.");
      setPreviewUrl(null);
      setImageUrl("");
    } finally {
      setUploadBusy(false);
      e.target.value = "";
    }
  };

  // ── Step 2: create template ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) return;
    setBusy(true);
    setErr(null);
    try {
      await api.post("/badges/templates", {
        title:          title.trim(),
        description:    description.trim() || undefined,
        imageUrl,
        type,
        conditionValue: conditionValue !== "" ? Number(conditionValue) : undefined,
        isActive,
      });
      onCreated();
      onClose();
    } catch (e) {
      setErr(e.response?.data?.message ?? e.message ?? "Failed to create badge.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[94vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Award className="size-5 text-[#836852]" />
            Add Badge Template
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
          <div className="px-6 py-5 space-y-6">

            {/* ── Step 1: Image Upload ── */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#836852] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                <h3 className="text-sm font-semibold text-gray-700">Upload Badge Image</h3>
                {uploadOk && <CheckCircle className="size-4 text-green-500 ml-auto" />}
              </div>

              {/* Drop zone */}
              <div
                onClick={() => !uploadBusy && fileRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                  uploadOk
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 hover:border-[#836852] hover:bg-[#f9f6f3]"
                }`}
              >
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="preview"
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow" />
                    <p className="text-xs text-gray-400">
                      {uploadBusy ? "Uploading to Cloudinary…" : "Click to change image"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="size-7 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">Click to upload badge image</p>
                      <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP · max 5 MB</p>
                    </div>
                  </>
                )}

                {/* Uploading overlay */}
                {uploadBusy && (
                  <div className="absolute inset-0 bg-white/75 rounded-xl flex flex-col items-center justify-center gap-2">
                    <div className="w-7 h-7 border-4 border-[#836852] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500">Uploading…</p>
                  </div>
                )}
              </div>

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

              {uploadOk && (
                <div className="flex items-start gap-2 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">
                  <CheckCircle className="size-3.5 shrink-0 mt-0.5" />
                  <span>Uploaded successfully. Cloudinary URL saved.</span>
                </div>
              )}
              {uploadErr && (
                <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                  {uploadErr}
                </div>
              )}
            </div>

            {/* ── Step 2: Badge Details ── */}
            <div className={`space-y-4 transition-opacity ${!uploadOk ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${uploadOk ? "bg-[#836852] text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
                <h3 className="text-sm font-semibold text-gray-700">Badge Details</h3>
                {!uploadOk && <span className="text-xs text-gray-400 ml-1">(upload image first)</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={!uploadOk}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] disabled:bg-gray-50"
                  placeholder="e.g. 7-Day Streak"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  disabled={!uploadOk}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none disabled:bg-gray-50"
                  placeholder="Awarded for staying smoke-free for 7 consecutive days"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    disabled={!uploadOk}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] bg-white disabled:bg-gray-50"
                  >
                    <option value="streak">Streak</option>
                    <option value="completion">Completion</option>
                    <option value="milestone">Milestone</option>
                    <option value="competition">Competition</option>
                  </select>
                  {type && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      {TYPE_META[type]?.autoAssign ? "Auto-assigned by system" : "Manual assignment only"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition Value <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={conditionValue}
                    onChange={(e) => setConditionValue(e.target.value)}
                    required
                    disabled={!uploadOk}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] disabled:bg-gray-50"
                    placeholder="e.g. 7"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">e.g. 7 for a 7-day streak</p>
                </div>
              </div>

              {/* isActive toggle */}
              <div className="flex items-center justify-between py-2 border border-gray-100 rounded-lg px-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Active</p>
                  <p className="text-xs text-gray-400">Badge is available to be awarded</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive((v) => !v)}
                  disabled={!uploadOk}
                  className={`relative w-10 h-5 rounded-full transition-colors shrink-0 disabled:opacity-40 ${isActive ? "bg-[#836852]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              {/* Live preview */}
              {uploadOk && title && (
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <p className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wide">Preview</p>
                  <div className="flex items-center gap-4">
                    <BadgeImg src={previewUrl} title={title} className="w-14 h-14" />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{title}</p>
                      {description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{description}</p>}
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <TypeChip type={type} />
                        {conditionValue && (
                          <span className="text-[11px] text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                            Condition: {conditionValue}
                          </span>
                        )}
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit error */}
            {err && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                {err}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={busy || uploadBusy}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy || uploadBusy || !uploadOk || !title.trim() || conditionValue === ""}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 disabled:opacity-40"
              style={{ backgroundColor: "#836852" }}
            >
              {busy
                ? <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating…</>
                : <><Award className="size-4" /> Create Badge</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Badge Card ────────────────────────────────────────────────────────────────

function BadgeCard({ badge }) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <BadgeImg src={badge.imageUrl} title={badge.title} className="w-16 h-16 mb-3" />

      <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">{badge.title}</h3>

      {badge.description && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{badge.description}</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
        <TypeChip type={badge.type} />
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {badge.isActive ? "Active" : "Inactive"}
        </span>
        {TYPE_META[badge.type] && (
          <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {TYPE_META[badge.type].autoAssign ? "Auto" : "Manual"}
          </span>
        )}
      </div>

      {badge.conditionValue !== undefined && (
        <div className="w-full bg-gray-50 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-gray-400">Condition</p>
          <p className="text-sm font-bold text-gray-800">{badge.conditionValue}</p>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
        <Calendar className="size-3.5 shrink-0" />
        {badge.createdAt ? new Date(badge.createdAt).toLocaleDateString() : "—"}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Badges() {
  const [showAdd,     setShowAdd    ] = useState(false);
  const [search,      setSearch     ] = useState("");
  const [typeFilter,  setTypeFilter ] = useState("all");
  const [activeFilter,setActiveFilter] = useState("all"); // "all" | "active" | "inactive"

  const { data, loading, error, refetch } = useFetch("/badges/templates");

  const templatesRaw = data?.templates;

  const templates = useMemo(() => {
    const items = templatesRaw ?? [];
    const q = search.toLowerCase();

    return items.filter((b) => {
      if (typeFilter !== "all" && b.type !== typeFilter) return false;
      if (activeFilter === "active"   && !b.isActive) return false;
      if (activeFilter === "inactive" &&  b.isActive) return false;
      if (q && !b.title?.toLowerCase().includes(q) && !b.description?.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [templatesRaw, search, typeFilter, activeFilter]);

  const allItems   = templatesRaw ?? [];
  const totalCount  = allItems.length;
  const activeCount = allItems.filter((b) => b.isActive).length;

  return (
    <div>
      <Header header="Badge Templates" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={Award}       iconBg="bg-amber-100"  iconColor="text-amber-600"  label="Total Badges"    value={loading ? "—" : totalCount} />
            <StatCard icon={CheckCircle} iconBg="bg-green-100"  iconColor="text-green-600"  label="Active"          value={loading ? "—" : activeCount} />
            <StatCard icon={Flame}       iconBg="bg-orange-100" iconColor="text-orange-600" label="Streak Badges"   value={loading ? "—" : allItems.filter(b => b.type === "streak").length} />
            <StatCard icon={Trophy}      iconBg="bg-purple-100" iconColor="text-purple-600" label="Competition"     value={loading ? "—" : allItems.filter(b => b.type === "competition").length} />
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow px-5 py-3 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Search */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="search"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-[#836852]"
                  placeholder="Search badges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#836852" }}
              >
                <Plus className="size-4" /> Add Badge
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type filter */}
              <div className="flex items-center gap-1 flex-wrap">
                {ALL_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors capitalize ${
                      typeFilter === t
                        ? "text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={typeFilter === t ? { backgroundColor: "#836852" } : {}}
                  >
                    {t === "all" ? "All Types" : t}
                  </button>
                ))}
              </div>

              <div className="w-px h-5 bg-gray-200 hidden sm:block" />

              {/* Active filter */}
              <div className="flex items-center gap-1">
                {[
                  { val: "all",      label: "All Status" },
                  { val: "active",   label: "Active"     },
                  { val: "inactive", label: "Inactive"   },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() => setActiveFilter(val)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      activeFilter === val
                        ? "text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={activeFilter === val ? { backgroundColor: "#836852" } : {}}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <PageLoader />
          ) : error ? (
            <PageError message={error} onRetry={refetch} />
          ) : templates.length === 0 ? (
            <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-20 text-center">
              <InboxIcon className="size-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-1">No Badges Found</h3>
              <p className="text-sm text-gray-400">
                {search || typeFilter !== "all" || activeFilter !== "all"
                  ? "Try clearing filters."
                  : "Click 'Add Badge' to create your first badge template."}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Showing <span className="font-medium text-gray-700">{templates.length}</span> of{" "}
                <span className="font-medium text-gray-700">{totalCount}</span> badge templates
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {templates.map((b) => (
                  <BadgeCard key={b._id} badge={b} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {showAdd && (
        <AddBadgeModal
          onClose={() => setShowAdd(false)}
          onCreated={refetch}
        />
      )}
    </div>
  );
}
