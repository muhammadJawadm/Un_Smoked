/* eslint-disable react/prop-types */
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Send, User, Users, Radio, CheckCircle2, AlertCircle,
  Search, X, ChevronDown,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import api from "../../services/api";
import useFetch from "../../hooks/useFetch";

// ── mode definitions ──────────────────────────────────────────────────────────

const MODES = [
  { key: "single",    label: "Single User",    icon: User,   desc: "Send to one user."              },
  { key: "multiple",  label: "Multiple Users", icon: Users,  desc: "Send to a selected group."      },
  { key: "broadcast", label: "Broadcast",      icon: Radio,  desc: "Send to every registered user." },
];

// ── small field helpers ───────────────────────────────────────────────────────

function Label({ children, optional }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {optional && <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>}
    </label>
  );
}

function TextInput({ ...props }) {
  return (
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852]"
      {...props}
    />
  );
}

function Textarea({ rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
      {...props}
    />
  );
}

// ── user picker ───────────────────────────────────────────────────────────────

function UserAvatar({ user, size = "sm" }) {
  const dim = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return user?.profile_picture ? (
    <img src={user.profile_picture} alt={user.name}
      className={`${dim} rounded-full object-cover shrink-0`} />
  ) : (
    <div
      className={`${dim} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      style={{ backgroundColor: "#836852" }}
    >
      {user?.name?.charAt(0).toUpperCase() ?? "?"}
    </div>
  );
}

function UserPicker({ selected, onChange, multiple }) {
  const [open,   setOpen  ] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const { data, loading } = useFetch("/admin/users?page=1&limit=100");

  const filtered = useMemo(() => {
    const items = data?.users ?? [];
    const q = search.toLowerCase();
    return !q ? items : items.filter(
      (u) =>
        (u.name  ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q)
    );
  }, [data?.users, search]);

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isSelected = (user) => selected.some((u) => u._id === user._id);

  const toggleUser = (user) => {
    if (multiple) {
      onChange(
        isSelected(user)
          ? selected.filter((u) => u._id !== user._id)
          : [...selected, user]
      );
    } else {
      onChange([user]);
      setOpen(false);
      setSearch("");
    }
  };

  const removeUser = (userId) => onChange(selected.filter((u) => u._id !== userId));

  return (
    <div ref={ref} className="relative">

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 bg-[#f9f6f3] border border-[#836852]/30 rounded-full"
            >
              <UserAvatar user={user} size="sm" />
              <span className="text-xs font-medium text-gray-700 max-w-[120px] truncate">
                {user.name}
              </span>
              <button
                type="button"
                onClick={() => removeUser(user._id)}
                className="text-gray-400 hover:text-red-500 ml-0.5"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-left hover:border-[#836852] focus:outline-none focus:ring-2 focus:ring-[#836852] transition-colors"
      >
        <span className={selected.length ? "text-gray-700 font-medium" : "text-gray-400"}>
          {selected.length === 0
            ? "Select user…"
            : multiple
              ? `${selected.length} user${selected.length > 1 ? "s" : ""} selected`
              : selected[0].name}
        </span>
        <ChevronDown className={`size-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#836852]"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-56 overflow-y-auto">
            {loading && (
              <p className="text-center text-xs text-gray-400 py-6">Loading users…</p>
            )}
            {!loading && filtered.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-6">No users found.</p>
            )}
            {!loading && filtered.map((user) => {
              const sel = isSelected(user);
              return (
                <button
                  key={user._id}
                  type="button"
                  onClick={() => toggleUser(user)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors ${sel ? "bg-[#f9f6f3]" : ""}`}
                >
                  <UserAvatar user={user} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  {sel && <CheckCircle2 className="size-4 text-[#836852] shrink-0" />}
                </button>
              );
            })}
          </div>

          {multiple && selected.length > 0 && (
            <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">{selected.length} selected</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-[#836852] hover:underline"
              >
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── result banner ─────────────────────────────────────────────────────────────

function ResultBanner({ result, err }) {
  if (err) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
        <AlertCircle className="size-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700">{err}</p>
      </div>
    );
  }
  if (!result) return null;
  const stats = [
    { label: "Users targeted",   value: result.usersTargeted   },
    { label: "Devices targeted", value: result.devicesTargeted },
    { label: "Sent",             value: result.successCount    },
    { label: "Failed",           value: result.failureCount    },
  ];
  return (
    <div className="p-4 rounded-xl bg-green-50 border border-green-100 space-y-3">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-5 text-green-600 shrink-0" />
        <p className="text-sm font-medium text-green-800">{result.message ?? "Notification sent."}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value }) =>
          value !== undefined ? (
            <div key={label} className="bg-white rounded-lg p-3 text-center border border-green-100">
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

export default function Notifications() {
  const [mode,          setMode         ] = useState("single");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [confirmed,     setConfirmed    ] = useState(false);
  const [title,         setTitle        ] = useState("");
  const [body,          setBody         ] = useState("");
  const [dataType,      setDataType     ] = useState("");
  const [busy,          setBusy         ] = useState(false);
  const [result,        setResult       ] = useState(null);
  const [err,           setErr          ] = useState(null);

  const resetFeedback = () => { setResult(null); setErr(null); };

  const switchMode = (key) => {
    setMode(key);
    setSelectedUsers([]);
    setConfirmed(false);
    resetFeedback();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    setErr(null);
    try {
      const payload = { title: title.trim(), body: body.trim() };
      if (dataType.trim()) payload.data = { type: dataType.trim() };

      if (mode === "single") {
        payload.userIds = selectedUsers[0]._id;
      } else if (mode === "multiple") {
        payload.userIds = selectedUsers.map((u) => u._id);
      } else {
        payload.sendToAll = true;
      }

      const res = await api.post("/admin/notifications/send", payload);
      setResult(res.data);
      setSelectedUsers([]);
      setTitle("");
      setBody("");
      setDataType("");
      setConfirmed(false);
    } catch (e) {
      setErr(e.response?.data?.message ?? e.message ?? "Failed to send notification.");
    } finally {
      setBusy(false);
    }
  };

  const canSubmit =
    title.trim() &&
    body.trim() &&
    (mode === "single"   ? selectedUsers.length === 1 :
     mode === "multiple" ? selectedUsers.length  >  0 :
     confirmed);

  return (
    <div>
      <Header header="Send Notifications" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6 max-w-3xl">

          {/* Mode selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MODES.map(({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all ${
                  mode === key
                    ? "border-[#836852] bg-[#f9f6f3]"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  mode === key ? "bg-[#836852]" : "bg-gray-100"
                }`}>
                  <Icon className={`size-4 ${mode === key ? "text-white" : "text-gray-500"}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${mode === key ? "text-[#836852]" : "text-gray-800"}`}>
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-xl shadow p-6">
            <form onSubmit={handleSend} className="space-y-5">

              {/* User picker — single or multiple */}
              {(mode === "single" || mode === "multiple") && (
                <div>
                  <Label>
                    {mode === "single" ? "Select User" : "Select Users"}
                  </Label>
                  <UserPicker
                    selected={selectedUsers}
                    onChange={setSelectedUsers}
                    multiple={mode === "multiple"}
                  />
                  {mode === "single" && selectedUsers.length === 0 && (
                    <p className="text-xs text-gray-400 mt-1">Search and click a user to select them.</p>
                  )}
                  {mode === "multiple" && (
                    <p className="text-xs text-gray-400 mt-1">
                      {selectedUsers.length === 0
                        ? "Search and click users to add them."
                        : `${selectedUsers.length} user${selectedUsers.length > 1 ? "s" : ""} selected.`}
                    </p>
                  )}
                </div>
              )}

              {/* Broadcast confirmation */}
              {mode === "broadcast" && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <input
                    id="broadcast-confirm"
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 accent-[#836852] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="broadcast-confirm" className="text-sm text-amber-800 cursor-pointer">
                    I understand this will send a notification to <strong>all users</strong> with an FCM token.
                  </label>
                </div>
              )}

              {/* Title */}
              <div>
                <Label>Title</Label>
                <TextInput
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Notification title"
                />
              </div>

              {/* Body */}
              <div>
                <Label>Body</Label>
                <Textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Notification message body"
                />
              </div>

              {/* Optional data.type */}
              <div>
                <Label optional>Data Type</Label>
                <TextInput
                  type="text"
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                  placeholder="e.g. admin_alert, challenge, broadcast"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Sent as <code className="bg-gray-100 px-1 rounded">data.type</code> — controls screen routing in the Flutter app.
                </p>
              </div>

              {/* Feedback */}
              {(result || err) && <ResultBanner result={result} err={err} />}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={busy || !canSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-lg hover:opacity-80 disabled:opacity-40 transition-opacity"
                  style={{ backgroundColor: "#836852" }}
                >
                  <Send className="size-4" />
                  {busy ? "Sending…" : "Send Notification"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
