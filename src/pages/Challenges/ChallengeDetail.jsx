/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Target, Clock, Zap, Grid, Tag,
  CheckCircle, Crown, User, Calendar,
  Cigarette, TrendingUp, Award, ClipboardList, ShieldCheck, ShieldOff,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

// ── helpers ────────────────────────────────────────────────────────────────────

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

const SOURCE_STYLES = {
  custom:   "bg-orange-100 text-orange-700",
  template: "bg-indigo-100 text-indigo-700",
};

const MODERATION_STYLES = {
  ok:      "bg-green-100 text-green-700",
  flagged: "bg-red-100 text-red-700",
};

const INVITE_STYLES = {
  accepted: "bg-green-100 text-green-700",
  pending:  "bg-amber-100 text-amber-700",
  declined: "bg-red-100 text-red-700",
};

function Badge({ label, style }) {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${style}`}>
      {label}
    </span>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-gray-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <div className="text-sm font-medium text-gray-800">{children}</div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, iconColor, label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
      <Icon className={`size-5 ${iconColor} mx-auto mb-1`} />
      <p className="text-lg font-bold text-gray-900">{value ?? 0}</p>
      <p className="text-xs text-gray-400 leading-tight">{label}</p>
    </div>
  );
}

function ParticipantCard({ p }) {
  const u = p.userId;
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4">
      {/* User row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {u?.profile_picture ? (
            <img src={u.profile_picture} alt={u?.name}
              className="w-10 h-10 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: "#836852" }}>
              {u ? u.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {u?.name ?? <span className="italic text-gray-400">Deleted User</span>}
            </p>
            {u?.email && <p className="text-xs text-gray-400">{u.email}</p>}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {p.role === "creator" ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
              <Crown className="size-3" /> Creator
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
              <User className="size-3" /> Participant
            </span>
          )}
          <Badge
            label={p.inviteStatus}
            style={INVITE_STYLES[p.inviteStatus] ?? "bg-gray-100 text-gray-600"}
          />
        </div>
      </div>

      {/* Progress row */}
      <div className="grid grid-cols-2 gap-2">
        <StatBox icon={TrendingUp}  iconColor="text-blue-500"   label="Progress"          value={p.progressValue} />
        <StatBox icon={Zap}         iconColor="text-amber-500"  label="XP Earned"         value={p.xpEarned} />
      </div>

      {/* Board stats */}
      <div className="grid grid-cols-3 gap-2">
        <StatBox icon={Cigarette}   iconColor="text-red-400"    label="Cigarettes Smoked"  value={p.challengeBoardStats?.totalCigarettesSmoked} />
        <StatBox icon={CheckCircle} iconColor="text-green-500"  label="Cigs Avoided"       value={p.challengeBoardStats?.totalCigarettesAvoided} />
        <StatBox icon={Calendar}    iconColor="text-teal-500"   label="Days Filled"        value={p.challengeBoardStats?.totalDaysFilled} />
      </div>

      {p.respondedAt && (
        <p className="text-xs text-gray-400">
          Responded: {new Date(p.respondedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [modBusy, setModBusy] = useState(false);
  const [modErr,  setModErr ] = useState(null);

  const { data, loading, error, refetch } = useFetch(`/admin/challenges/${id}`);

  const c            = data?.challenge      ?? null;
  const participants = data?.participants   ?? [];
  const tasks        = data?.taskAssignments ?? [];

  const handleModerate = async (moderationStatus) => {
    setModBusy(true);
    setModErr(null);
    try {
      await api.patch(`/admin/challenges/${id}/moderate`, { moderationStatus });
      await refetch();
    } catch (e) {
      setModErr(e.response?.data?.message ?? e.message ?? "Action failed.");
    } finally {
      setModBusy(false);
    }
  };

  return (
    <div>
      <Header header="Challenge Detail" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#836852] hover:text-[#6b5442] font-medium"
          >
            <ArrowLeft className="size-4" /> Back to Challenges
          </button>

          {loading && <PageLoader />}
          {error   && <PageError message={error} onRetry={refetch} />}

          {!loading && !error && c && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── Left: challenge info ──────────────────────────────── */}
              <div className="space-y-5">

                {/* Main info card */}
                <div className="bg-white rounded-xl shadow p-6 space-y-5">
                  {/* Title + badges */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge label={c.status}           style={STATUS_STYLES[c.status]       ?? "bg-gray-100 text-gray-600"} />
                      <Badge label={c.mode}             style={MODE_STYLES[c.mode]           ?? "bg-gray-100 text-gray-600"} />
                      <Badge label={c.sourceType}       style={SOURCE_STYLES[c.sourceType]   ?? "bg-gray-100 text-gray-600"} />
                      <Badge label={c.moderationStatus} style={MODERATION_STYLES[c.moderationStatus] ?? "bg-gray-100 text-gray-600"} />
                    </div>
                  </div>

                  {/* Description */}
                  {c.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
                  )}

                  {/* Rules */}
                  {c.rules && (
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase mb-1">Rules</p>
                      <p className="text-sm text-gray-600">{c.rules}</p>
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <InfoRow icon={Tag}      label="Category">
                      <span className="px-2 py-0.5 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">
                        {c.category?.name ?? "—"}
                      </span>
                    </InfoRow>
                    <InfoRow icon={Clock}    label="Duration">
                      {c.durationDays} {c.durationDays === 1 ? "day" : "days"}
                    </InfoRow>
                    <InfoRow icon={Grid}     label="Board Size">{c.boardSize} squares</InfoRow>
                    <InfoRow icon={Zap}      label="XP Reward">
                      <span className="text-amber-600 font-semibold">{c.xpReward} XP</span>
                    </InfoRow>
                    <InfoRow icon={Calendar} label="Created">
                      {new Date(c.createdAt).toLocaleString()}
                    </InfoRow>
                    {c.startAt && (
                      <InfoRow icon={Calendar} label="Starts">
                        {new Date(c.startAt).toLocaleString()}
                      </InfoRow>
                    )}
                    {c.endsAt && (
                      <InfoRow icon={Calendar} label="Ends">
                        {new Date(c.endsAt).toLocaleString()}
                      </InfoRow>
                    )}
                    {c.winner && (
                      <InfoRow icon={Award} label="Winner">
                        <span className="text-yellow-600 font-semibold">{c.winner}</span>
                      </InfoRow>
                    )}
                  </div>
                </div>

                {/* Creator card */}
                {c.createdBy && (
                  <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Created By</h3>
                    <div className="flex items-center gap-3">
                      {c.createdBy.profile_picture ? (
                        <img src={c.createdBy.profile_picture} alt={c.createdBy.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                          style={{ backgroundColor: "#836852" }}>
                          {c.createdBy.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{c.createdBy.name}</p>
                        <p className="text-xs text-gray-400">{c.createdBy.email}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Moderation card */}
                <div className="bg-white rounded-xl shadow p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Moderation</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      label={c.moderationStatus}
                      style={MODERATION_STYLES[c.moderationStatus] ?? "bg-gray-100 text-gray-600"}
                    />
                  </div>
                  {modErr && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{modErr}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleModerate("ok")}
                      disabled={modBusy || c.moderationStatus === "ok"}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 disabled:opacity-40"
                    >
                      <ShieldCheck className="size-3.5" />
                      {modBusy ? "…" : "Mark OK"}
                    </button>
                    <button
                      onClick={() => handleModerate("removed")}
                      disabled={modBusy || c.moderationStatus === "removed"}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-40"
                    >
                      <ShieldOff className="size-3.5" />
                      {modBusy ? "…" : "Remove"}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Right: participants + tasks ───────────────────────── */}
              <div className="lg:col-span-2 space-y-5">

                {/* Participants */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Target className="size-4" />
                    Participants
                    <span className="ml-auto text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {participants.length}
                    </span>
                  </h3>

                  {participants.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No participants yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {participants.map((p) => (
                        <ParticipantCard key={p._id} p={p} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Task Assignments */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <ClipboardList className="size-4" />
                    Task Assignments
                    <span className="ml-auto text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {tasks.length}
                    </span>
                  </h3>

                  {tasks.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No task assignments for this challenge.</p>
                  ) : (
                    <div className="space-y-3">
                      {tasks.map((t, i) => (
                        <div key={t._id ?? i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                          <ClipboardList className="size-4 text-gray-400 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{t.title ?? t.task ?? JSON.stringify(t)}</p>
                            {t.description && <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
