/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Mail, Phone, Calendar, Award, CheckCircle,
  XCircle, User, Cigarette, Heart, Bell, Target, Zap,
  Trophy, TrendingUp, BarChart2, Flag, Star,
  ShieldOff, ShieldCheck, UserCog, Trash2, AlertTriangle, X,
} from "lucide-react";
import Header from "../../layouts/partials/header";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

// ── small helpers ──────────────────────────────────────────────────────────────

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-4 text-gray-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">
          {value || <span className="text-gray-300">—</span>}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ value, trueLabel, falseLabel }) {
  return value ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
      <CheckCircle className="size-3" /> {trueLabel}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
      <XCircle className="size-3" /> {falseLabel}
    </span>
  );
}

function MiniStat({ icon: Icon, iconColor, label, value, unit }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
      <Icon className={`size-5 ${iconColor} mx-auto mb-1`} />
      <p className="text-xl font-bold text-gray-900">
        {value ?? <span className="text-gray-300 text-base font-normal">—</span>}
      </p>
      <p className="text-xs text-gray-400">{label}</p>
      {unit && <p className="text-xs text-gray-300">{unit}</p>}
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // action state
  const [actionBusy,  setActionBusy ] = useState(false);
  const [actionErr,   setActionErr  ] = useState(null);
  const [roleModal,   setRoleModal  ] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const { data, loading, error, refetch } = useFetch(`/admin/users/${id}`);

  const user       = data?.user       ?? null;
  const progress   = data?.progress   ?? {};
  const badges     = data?.badges     ?? [];
  const milestones = data?.milestones ?? [];
  const stats      = data?.stats      ?? {};

  const runAction = async (fn) => {
    setActionBusy(true);
    setActionErr(null);
    try { await fn(); await refetch(); }
    catch (e) { setActionErr(e.response?.data?.message ?? e.message ?? "Action failed."); }
    finally   { setActionBusy(false); }
  };

  const toggleStatus = () => runAction(() => api.patch(`/admin/users/${id}/toggle-status`));

  const changeRole = (role) => runAction(async () => {
    await api.patch(`/admin/users/${id}/change-role`, { role });
    setRoleModal(false);
  });

  const deleteUser = () => runAction(async () => {
    await api.delete(`/admin/users/${id}`);
    setDeleteModal(false);
    navigate("/users");
  });

  return (
    <div>
      <Header header="User Profile" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#836852] hover:text-[#6b5442] font-medium"
          >
            <ArrowLeft className="size-4" /> Back to Users
          </button>

          {loading && <PageLoader />}
          {error   && <PageError message={error} onRetry={refetch} />}

          {!loading && !error && user && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── Left column ──────────────────────────────────────────── */}
              <div className="space-y-5">

                {/* Identity card */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    {user.profile_picture ? (
                      <img src={user.profile_picture} alt={user.name}
                        className="w-24 h-24 rounded-full object-cover mb-3" />
                    ) : (
                      <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3"
                        style={{ backgroundColor: "#836852" }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <StatusBadge value={user.is_verified} trueLabel="Verified"  falseLabel="Unverified" />
                    <StatusBadge value={user.is_active}   trueLabel="Active"    falseLabel="Inactive"   />
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
                      user.authProvider === "google" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.authProvider}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <InfoRow icon={Mail}     label="Email"   value={user.email} />
                    <InfoRow icon={Phone}    label="Phone"   value={user.phone} />
                    <InfoRow icon={Calendar} label="Joined"  value={new Date(user.createdAt).toLocaleDateString()} />
                    <InfoRow icon={Calendar} label="Updated" value={new Date(user.updatedAt).toLocaleDateString()} />
                    {user.about_me && <InfoRow icon={User} label="About" value={user.about_me} />}
                  </div>
                </div>

                {/* Notification preferences */}
                {user.notification_preferences && (
                  <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Bell className="size-4" /> Notifications
                    </h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(user.notification_preferences).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-500 capitalize">{key.replace(/_/g, " ")}</span>
                          {val
                            ? <CheckCircle className="size-4 text-green-500" />
                            : <XCircle    className="size-4 text-red-400" />
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Admin Actions card */}
                <div className="bg-white rounded-xl shadow p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Admin Actions</h3>

                  {actionErr && (
                    <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{actionErr}</p>
                  )}

                  {/* Ban / Unban */}
                  <button
                    onClick={toggleStatus}
                    disabled={actionBusy}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                      user.is_active
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {user.is_active
                      ? <><ShieldOff className="size-4" /> Ban User</>
                      : <><ShieldCheck className="size-4" /> Unban User</>}
                  </button>

                  {/* Change Role */}
                  <button
                    onClick={() => setRoleModal(true)}
                    disabled={actionBusy}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <UserCog className="size-4" />
                    {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setDeleteModal(true)}
                    disabled={actionBusy}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="size-4" /> Delete User
                  </button>
                </div>
              </div>

              {/* ── Right columns ────────────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-5">

                {/* Progress */}
                {(progress.xp != null || progress.level != null) && (
                  <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <TrendingUp className="size-4" /> Progress
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <MiniStat icon={Zap}     iconColor="text-amber-500"  label="XP"     value={progress.xp?.toLocaleString()} />
                      <MiniStat icon={Star}    iconColor="text-purple-500" label="Level"  value={progress.level} />
                      <MiniStat icon={Trophy}  iconColor="text-green-500"  label="Wins"   value={progress.wins} />
                      <MiniStat icon={Flag}    iconColor="text-red-400"    label="Losses" value={progress.losses} />
                    </div>
                  </div>
                )}

                {/* App stats */}
                {(stats.postCount != null || stats.challengeCount != null) && (
                  <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <BarChart2 className="size-4" /> Activity
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <MiniStat icon={Heart}  iconColor="text-blue-500"  label="Posts"      value={stats.postCount} />
                      <MiniStat icon={Target} iconColor="text-teal-500"  label="Challenges" value={stats.challengeCount} />
                    </div>
                  </div>
                )}

                {/* Smoking profile */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold text-gray-700 mb-5 flex items-center gap-2">
                    <Cigarette className="size-4" /> Smoking Profile
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Cigarettes/Day", value: user.cigarettes_per_day,              unit: "cigs" },
                      { label: "Pack size",       value: user.amount_of_cigarettes_per_pack,  unit: "pcs"  },
                      { label: "Cost per pack",   value: user.cost ? `${user.cost}/${user.per}` : null, unit: "" },
                      { label: "Health Goal",     value: user.health_goal,                    unit: ""     },
                    ].map(({ label, value, unit }) => (
                      <div key={label} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-xs text-gray-400 mb-1">{label}</p>
                        <p className="text-xl font-bold text-gray-900">
                          {value != null && value !== ""
                            ? <>{value} <span className="text-xs font-normal text-gray-400">{unit}</span></>
                            : <span className="text-gray-300 text-base font-normal">—</span>
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Award className="size-4" /> Badges ({badges.length})
                  </h3>
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {badges.map((badge, i) => {
                        const tpl = badge.templateId ?? badge;
                        const name = tpl?.name ?? tpl?.title ?? `Badge ${i + 1}`;
                        const desc = tpl?.description ?? "";
                        const img  = tpl?.image ?? tpl?.icon ?? null;
                        const earnedAt = badge.createdAt ?? badge.earnedAt;
                        return (
                          <div key={badge._id ?? i}
                            className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 flex items-start gap-3">
                            {img ? (
                              <img src={img} alt={name}
                                className="w-10 h-10 rounded-full object-cover shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center shrink-0">
                                <Award className="size-5 text-yellow-700" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 leading-tight">{name}</p>
                              {desc && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{desc}</p>}
                              {earnedAt && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(earnedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No badges earned yet.</p>
                  )}
                </div>

                {/* Milestones */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Trophy className="size-4" /> Milestones ({milestones.length})
                  </h3>
                  {milestones.length > 0 ? (
                    <div className="space-y-3">
                      {milestones.map((m, i) => {
                        const name   = m.title ?? m.name ?? `Milestone ${i + 1}`;
                        const desc   = m.description ?? "";
                        const doneAt = m.achievedAt ?? m.createdAt;
                        return (
                          <div key={m._id ?? i}
                            className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                            <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{name}</p>
                              {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
                              {doneAt && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Achieved {new Date(doneAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No milestones reached yet.</p>
                  )}
                </div>

                {/* FCM token (dev only) */}
                {import.meta.env.DEV && user.fcm_token && (
                  <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-4">
                    <h3 className="text-xs font-medium text-gray-400 mb-1 flex items-center gap-1">
                      <Heart className="size-3" /> FCM Token (dev only)
                    </h3>
                    <p className="text-xs text-gray-500 break-all font-mono">{user.fcm_token}</p>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Role modal */}
      {roleModal && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Change Role</h3>
              <button onClick={() => setRoleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Current role: <span className="font-semibold capitalize">{user.role}</span>
            </p>
            <div className="flex gap-3">
              <button onClick={() => changeRole("admin")} disabled={user.role === "admin" || actionBusy}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40">
                Promote to Admin
              </button>
              <button onClick={() => changeRole("user")} disabled={user.role === "user" || actionBusy}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 disabled:opacity-40">
                Demote to User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User modal */}
      {deleteModal && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle className="size-6 shrink-0" />
              <h3 className="font-semibold text-gray-800">Delete User</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              This permanently deletes <span className="font-semibold">{user.name}</span> and all
              their posts, challenges, badges, and activity. <strong>This cannot be undone.</strong>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Type <span className="font-mono font-semibold">DELETE</span> to confirm.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 outline-none focus:ring-2 focus:ring-red-300"
            />
            <div className="flex gap-3">
              <button onClick={() => { setDeleteModal(false); setDeleteInput(""); }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={deleteUser}
                disabled={deleteInput !== "DELETE" || actionBusy}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-40"
              >
                {actionBusy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
