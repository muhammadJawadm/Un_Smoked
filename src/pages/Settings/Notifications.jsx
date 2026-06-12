/* eslint-disable react/prop-types */
import { useState } from "react";
import { Send, Users, User } from "lucide-react";
import api from "../../services/api";

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#ede9e5] flex items-center justify-center">
          <Icon className="size-4 text-[#836852]" />
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function NotifForm({ fields, onSubmit, busy, err, success }) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {fields}
      {err && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{err}</p>}
      {success && <p className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">{success}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: "#836852" }}
        >
          <Send className="size-3.5" />
          {busy ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

export default function Notifications() {
  // ── Single user ──
  const [singleUser,    setSingleUser   ] = useState({ userId: "", message: "" });
  const [singleBusy,    setSingleBusy   ] = useState(false);
  const [singleErr,     setSingleErr    ] = useState(null);
  const [singleSuccess, setSingleSuccess] = useState(null);

  // ── Broadcast ──
  const [broadMsg,      setBroadMsg     ] = useState("");
  const [broadBusy,     setBroadBusy    ] = useState(false);
  const [broadErr,      setBroadErr     ] = useState(null);
  const [broadSuccess,  setBroadSuccess ] = useState(null);

  const sendNotif = async (payload, setBusy, setErr, setSuccess) => {
    setBusy(true);
    setErr(null);
    setSuccess(null);
    try {
      await api.post("/admin/notifications/send", payload);
      setSuccess("Notification sent successfully.");
    } catch (e) {
      setErr(e.response?.data?.message ?? e.message ?? "Failed to send notification.");
    } finally {
      setBusy(false);
    }
  };

  const handleSingle = (e) => {
    e.preventDefault();
    sendNotif(
      { userId: singleUser.userId.trim(), message: singleUser.message.trim() },
      setSingleBusy, setSingleErr, setSingleSuccess
    );
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    sendNotif(
      { sendToAll: true, message: broadMsg.trim() },
      setBroadBusy, setBroadErr, setBroadSuccess
    );
  };

  return (
    <div className="space-y-5">
      {/* Single user */}
      <Section icon={User} title="Send to a User">
        <NotifForm
          busy={singleBusy}
          err={singleErr}
          success={singleSuccess}
          onSubmit={handleSingle}
          fields={
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  required
                  value={singleUser.userId}
                  onChange={(e) => setSingleUser((p) => ({ ...p, userId: e.target.value }))}
                  placeholder="Paste the user's _id..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  value={singleUser.message}
                  onChange={(e) => setSingleUser((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Notification message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
                />
              </div>
            </>
          }
        />
      </Section>

      {/* Broadcast */}
      <Section icon={Users} title="Broadcast to All Users">
        <p className="text-sm text-gray-500">
          This will send a push notification to every registered user.
        </p>
        <NotifForm
          busy={broadBusy}
          err={broadErr}
          success={broadSuccess}
          onSubmit={handleBroadcast}
          fields={
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                rows={3}
                value={broadMsg}
                onChange={(e) => setBroadMsg(e.target.value)}
                placeholder="Broadcast message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#836852] resize-none"
              />
            </div>
          }
        />
      </Section>
    </div>
  );
}
