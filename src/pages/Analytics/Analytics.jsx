/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Users, Activity, TrendingUp, Trophy, FileText,
  Heart, Cigarette, DollarSign, Clock, Flag,
  Bell, Star, BarChart3, ShieldOff, Wind,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import Header from "../../layouts/partials/header";
import StatCard from "../../components/StatCard";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";

// ── palette ───────────────────────────────────────────────────────────────────
const BRAND  = "#836852";
const GREEN  = "#22c55e";
const BLUE   = "#3b82f6";
const AMBER  = "#f59e0b";
const RED    = "#ef4444";
const PURPLE = "#a855f7";
const TEAL   = "#14b8a6";

// ── reusable UI ───────────────────────────────────────────────────────────────

function Card({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow p-6 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="size-4 text-gray-400" />}
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

function BreakdownBar({ label, value, max, color = BRAND }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 capitalize">{label}</span>
        <span className="font-semibold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function UserRow({ rank, user, sub, value, valueLabel, highlight }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className={`w-6 text-center text-xs font-bold shrink-0 ${rank === 1 ? "text-amber-500" : rank === 2 ? "text-gray-400" : rank === 3 ? "text-orange-400" : "text-gray-300"}`}>
        {rank}
      </span>
      {user?.profile_picture ? (
        <img src={user.profile_picture} alt={user.name}
          className="w-8 h-8 rounded-full object-cover shrink-0"
          onError={(e) => { e.target.style.display = "none"; }} />
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: BRAND }}>
          {user ? user.name?.charAt(0).toUpperCase() : "?"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">
          {user?.name ?? <span className="italic text-gray-400">Deleted User</span>}
        </p>
        {sub && <p className="text-xs text-gray-400 truncate">{sub}</p>}
      </div>
      {value !== undefined && (
        <div className="text-right shrink-0">
          <p className={`text-sm font-bold ${highlight ?? "text-gray-900"}`}>{value}</p>
          {valueLabel && <p className="text-xs text-gray-400">{valueLabel}</p>}
        </div>
      )}
    </div>
  );
}

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  fontSize: "12px",
};

// ── OVERVIEW ──────────────────────────────────────────────────────────────────

function OverviewTab() {
  const { data, loading, error, refetch } = useFetch("/admin/analytics/overview");
  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  const ov  = data?.overview     ?? {};
  const u   = ov.users           ?? {};
  const c   = ov.content         ?? {};
  const ch  = ov.challenges      ?? {};
  const hi  = ov.healthImpact    ?? {};
  const mod = ov.moderation      ?? {};
  const ntf = ov.notifications   ?? {};
  const fb  = ov.feedback        ?? {};
  const top = ov.topUsersByXp    ?? [];

  return (
    <div className="space-y-6">

      {/* Users */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Users</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={Users}     iconBg="bg-blue-100"   iconColor="text-blue-600"   label="Total"      value={u.total      ?? 0} />
          <StatCard icon={Activity}  iconBg="bg-green-100"  iconColor="text-green-600"  label="Active"     value={u.active     ?? 0} />
          <StatCard icon={ShieldOff} iconBg="bg-red-100"    iconColor="text-red-600"    label="Banned"     value={u.banned     ?? 0} />
          <StatCard icon={Users}     iconBg="bg-sky-100"    iconColor="text-sky-600"    label="New Today"  value={u.newToday   ?? 0} />
          <StatCard icon={Users}     iconBg="bg-indigo-100" iconColor="text-indigo-600" label="This Week"  value={u.newThisWeek  ?? 0} />
          <StatCard icon={Users}     iconBg="bg-purple-100" iconColor="text-purple-600" label="This Month" value={u.newThisMonth ?? 0} />
        </div>
      </div>

      {/* Content + Challenges + Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Content" icon={FileText}>
          <div className="space-y-3">
            {[
              ["Total Posts",      c.totalPosts    ?? 0, "text-gray-900"],
              ["Posts This Week",  c.postsThisWeek ?? 0, "text-green-600"],
              ["Total Blogs",      c.totalBlogs    ?? 0, "text-gray-900"],
            ].map(([label, val, cls]) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-semibold ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Challenges" icon={Trophy}>
          <div className="space-y-3">
            {[
              ["Total",           ch.total           ?? 0, "text-gray-900"],
              ["Active",          ch.active          ?? 0, "text-green-600"],
              ["Completed",       ch.completed       ?? 0, "text-gray-900"],
              ["This Week",       ch.thisWeek        ?? 0, "text-blue-600"],
              ["Completion Rate", ch.completionRate  ?? "0%", "text-[#836852]"],
            ].map(([label, val, cls]) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-semibold ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Stats" icon={Flag}>
          <div className="space-y-3">
            {[
              ["Pending Reports",    mod.pendingReports ?? 0,            "text-red-600"  ],
              ["Avg Feedback",       `${fb.averageRating ?? "—"} ★`,     "text-amber-600"],
              ["Notifs Sent",        ntf.sent           ?? 0,            "text-green-600"],
              ["Notifs Failed",      ntf.failed         ?? 0,            "text-red-500"  ],
              ["Total Notifs",       ntf.total          ?? 0,            "text-gray-900" ],
            ].map(([label, val, cls]) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{label}</span>
                <span className={`font-semibold ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Health impact */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Platform Health Impact</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={Cigarette}  iconBg="bg-green-100" iconColor="text-green-600" label="Cigarettes Avoided"  value={(hi.totalCigarettesAvoided    ?? 0).toLocaleString()} />
          <StatCard icon={Clock}      iconBg="bg-blue-100"  iconColor="text-blue-600"  label="Life Regained (min)" value={(hi.totalLifeRegainedMinutes   ?? 0).toLocaleString()} />
          <StatCard icon={DollarSign} iconBg="bg-amber-100" iconColor="text-amber-600" label="Money Saved"         value={`$${(hi.totalMoneySaved ?? 0).toFixed(2)}`} />
        </div>
      </div>

      {/* Top users by XP */}
      <Card title="Top 5 Users by XP" icon={Trophy}>
        {top.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No XP data yet.</p>
        ) : (
          top.map((item, i) => (
            <UserRow
              key={i}
              rank={i + 1}
              user={item.user}
              sub={item.user?.email}
              value={`${item.xp} XP`}
              valueLabel={`Lv ${item.level} · ${item.challengesCompleted} challenges`}
              highlight="text-[#836852]"
            />
          ))
        )}
      </Card>

    </div>
  );
}

// ── USER GROWTH ───────────────────────────────────────────────────────────────

function UserGrowthTab() {
  const [period, setPeriod] = useState("week");
  const { data, loading, error, refetch } = useFetch(
    `/admin/analytics/user-growth?period=${period}`
  );

  const registrations = data?.registrations          ?? [];
  const byRole        = data?.breakdown?.byRole       ?? [];
  const byProvider    = data?.breakdown?.byAuthProvider ?? [];
  const byVerified    = data?.breakdown?.byVerified   ?? [];

  const maxRole     = Math.max(...byRole.map((r) => r.count), 1);
  const maxProvider = Math.max(...byProvider.map((r) => r.count), 1);
  const maxVerified = Math.max(...byVerified.map((r) => r.count), 1);

  const providerLabel = (id) =>
    id === null || id === undefined ? "Unknown" : id === "google" ? "Google" : "Local";

  return (
    <div className="space-y-6">

      {/* Period selector */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl shadow px-5 py-3">
        <p className="text-sm text-gray-500 mr-1">Period:</p>
        {[
          { key: "week",  label: "Last 7 Days"  },
          { key: "month", label: "Last 30 Days" },
          { key: "year",  label: "This Year"    },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              period === key ? "text-white" : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
            style={period === key ? { backgroundColor: BRAND } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <PageLoader />}
      {error   && <PageError message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          {/* Registration trend chart */}
          <Card title={data?.label ?? "Registration Trend"} icon={TrendingUp}>
            {registrations.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-12">No registrations in this period.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={registrations} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="count" fill={BRAND} radius={[4, 4, 0, 0]} name="Registrations" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card title="By Role" icon={Users}>
              <div className="space-y-4">
                {byRole.map((r) => (
                  <BreakdownBar key={r._id} label={r._id} value={r.count} max={maxRole} />
                ))}
              </div>
            </Card>

            <Card title="By Auth Provider" icon={Activity}>
              <div className="space-y-4">
                {byProvider.map((r, i) => (
                  <BreakdownBar
                    key={i}
                    label={providerLabel(r._id)}
                    value={r.count}
                    max={maxProvider}
                    color={r._id === "google" ? BLUE : r._id === "local" ? GREEN : "#9ca3af"}
                  />
                ))}
              </div>
            </Card>

            <Card title="By Verification" icon={Activity}>
              <div className="space-y-4">
                {byVerified.map((r, i) => (
                  <BreakdownBar
                    key={i}
                    label={r._id === true ? "Verified" : "Unverified"}
                    value={r.count}
                    max={maxVerified}
                    color={r._id === true ? GREEN : RED}
                  />
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// ── HEALTH IMPACT ─────────────────────────────────────────────────────────────

function HealthImpactTab() {
  const { data, loading, error, refetch } = useFetch("/admin/analytics/health-impact");
  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  const hi     = data?.healthImpact ?? {};
  const totals = hi.totals                    ?? {};
  const avgs   = hi.averages                  ?? {};
  const health = hi.overallHealthDistribution ?? [];
  const lungs  = hi.lungsHealthDistribution   ?? [];
  const savers = hi.topSavers                 ?? [];
  const daily  = hi.dailyTrend                ?? [];

  const maxHealth = Math.max(...health.map((h) => h.count), 1);
  const maxLungs  = Math.max(...lungs.map((l)  => l.count), 1);

  return (
    <div className="space-y-6">

      {/* Totals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Cigarette}  iconBg="bg-green-100"  iconColor="text-green-600"  label="Cigs Avoided"    value={(totals.cigarettesAvoided   ?? 0).toLocaleString()} />
        <StatCard icon={Clock}      iconBg="bg-blue-100"   iconColor="text-blue-600"   label="Life Regained"   value={`${totals.lifeRegainedHours ?? 0}h`} sub={`${totals.lifeRegainedMinutes ?? 0} min total`} />
        <StatCard icon={DollarSign} iconBg="bg-amber-100"  iconColor="text-amber-600"  label="Money Saved"     value={`$${(totals.moneySaved ?? 0).toFixed(2)}`} />
        <StatCard icon={Users}      iconBg="bg-purple-100" iconColor="text-purple-600" label="Users Tracking"  value={totals.usersTracking ?? 0} />
      </div>

      {/* Averages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <p className="text-xs text-gray-400 uppercase font-medium mb-2">Avg Cigarettes Avoided / User</p>
          <p className="text-4xl font-bold text-green-600">{avgs.cigarettesAvoidedPerUser ?? 0}</p>
          <p className="text-xs text-gray-400 mt-1">cigarettes per tracked user</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 uppercase font-medium mb-2">Avg Money Saved / User</p>
          <p className="text-4xl font-bold text-amber-500">${avgs.moneySavedPerUser ?? 0}</p>
          <p className="text-xs text-gray-400 mt-1">per tracked user</p>
        </Card>
      </div>

      {/* Daily trend */}
      {daily.length > 0 && (
        <Card title="Daily Cigarettes — Last 30 Days" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={daily} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gAvoided" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={GREEN} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={GREEN} stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="gSmoked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={RED} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={RED} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="_id" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              <Area type="monotone" dataKey="totalAvoided" stroke={GREEN} fill="url(#gAvoided)" strokeWidth={2} name="Avoided" />
              <Area type="monotone" dataKey="totalSmoked"  stroke={RED}   fill="url(#gSmoked)"  strokeWidth={2} name="Smoked"  />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Health distributions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Overall Health Distribution" icon={Heart}>
          <div className="space-y-4">
            {health.length === 0
              ? <p className="text-sm text-gray-400 text-center py-4">No data.</p>
              : health.map((h) => (
                  <BreakdownBar key={h._id} label={h._id} value={h.count} max={maxHealth} color={TEAL} />
                ))
            }
          </div>
        </Card>
        <Card title="Lungs Health Distribution" icon={Wind}>
          <div className="space-y-4">
            {lungs.length === 0
              ? <p className="text-sm text-gray-400 text-center py-4">No data.</p>
              : lungs.map((l) => (
                  <BreakdownBar key={l._id} label={l._id} value={l.count} max={maxLungs} color={BLUE} />
                ))
            }
          </div>
        </Card>
      </div>

      {/* Top savers */}
      {savers.length > 0 && (
        <Card title="Top Money Savers" icon={DollarSign}>
          {savers.map((s, i) => (
            <UserRow
              key={i}
              rank={i + 1}
              user={s.user}
              sub={s.user?.email}
              value={`$${s.totalMoneySaved.toFixed(2)}`}
              valueLabel={`${s.totalCigarettesAvoided} avoided · ${s.totalLifeRegainedHours}h regained`}
              highlight="text-amber-500"
            />
          ))}
        </Card>
      )}
    </div>
  );
}

// ── CHALLENGES ────────────────────────────────────────────────────────────────

function ChallengesTab() {
  const { data, loading, error, refetch } = useFetch("/admin/analytics/challenges");
  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  const ch      = data?.challenges            ?? {};
  const status  = ch.statusBreakdown          ?? [];
  const mode    = ch.modeBreakdown            ?? [];
  const invite  = ch.inviteStatusBreakdown    ?? [];
  const trend   = ch.creationTrendLast30Days  ?? [];
  const winners = ch.topWinners               ?? [];

  const maxStatus = Math.max(...status.map((s) => s.count), 1);
  const maxMode   = Math.max(...mode.map((m)   => m.count), 1);
  const maxInvite = Math.max(...invite.map((i) => i.count), 1);

  const STATUS_COLORS = {
    active: GREEN, completed: BRAND, complete: GREEN,
    waiting: BLUE, pending: AMBER, cancelled: RED,
  };
  const MODE_COLORS   = { "1v1": PURPLE, "4-player": BLUE, open: TEAL };
  const INVITE_COLORS = { accepted: GREEN, pending: AMBER, declined: RED };

  return (
    <div className="space-y-6">

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Trophy}     iconBg="bg-purple-100" iconColor="text-purple-600" label="Total"             value={ch.total              ?? 0} />
        <StatCard icon={TrendingUp} iconBg="bg-green-100"  iconColor="text-green-600"  label="Completion Rate"   value={`${ch.completionRate  ?? 0}%`} />
        <StatCard icon={Flag}       iconBg="bg-red-100"    iconColor="text-red-600"    label="Cancellation Rate" value={`${ch.cancellationRate ?? 0}%`} />
        <StatCard icon={Clock}      iconBg="bg-blue-100"   iconColor="text-blue-600"   label="Avg Duration"      value={`${ch.averageDurationDays ?? 0}d`} />
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Status Breakdown" icon={BarChart3}>
          <div className="space-y-4">
            {status.map((s) => (
              <BreakdownBar key={s._id} label={s._id} value={s.count} max={maxStatus}
                color={STATUS_COLORS[s._id] ?? BRAND} />
            ))}
          </div>
        </Card>

        <Card title="Mode Breakdown" icon={BarChart3}>
          <div className="space-y-4">
            {mode.map((m) => (
              <BreakdownBar key={m._id} label={m._id} value={m.count} max={maxMode}
                color={MODE_COLORS[m._id] ?? BRAND} />
            ))}
          </div>
        </Card>

        <Card title="Invite Status" icon={BarChart3}>
          <div className="space-y-4">
            {invite.map((inv) => (
              <BreakdownBar key={inv._id} label={inv._id} value={inv.count} max={maxInvite}
                color={INVITE_COLORS[inv._id] ?? BRAND} />
            ))}
          </div>
        </Card>
      </div>

      {/* Creation trend */}
      <Card title="Challenge Creation — Last 30 Days" icon={TrendingUp}>
        {trend.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No challenges created in this period.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" fill={PURPLE} radius={[4, 4, 0, 0]} name="Created" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Top winners */}
      <Card title="Top Winners" icon={Trophy}>
        {winners.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No winners recorded yet.</p>
        ) : (
          winners.map((w, i) => (
            <UserRow
              key={i}
              rank={i + 1}
              user={w.user}
              sub={w.user?.email}
              value={w.wins}
              valueLabel="wins"
              highlight="text-purple-600"
            />
          ))
        )}
      </Card>
    </div>
  );
}

// ── CONTENT ───────────────────────────────────────────────────────────────────

function ContentTab() {
  const { data, loading, error, refetch } = useFetch("/admin/analytics/content");
  if (loading) return <PageLoader />;
  if (error)   return <PageError message={error} onRetry={refetch} />;

  const ct      = data?.content             ?? {};
  const summary = ct.summary                ?? {};
  const trends  = ct.trends                 ?? {};
  const topPost = ct.topPosters             ?? [];
  const fb      = ct.feedback               ?? {};
  const notif   = ct.notifications          ?? {};
  const badges  = ct.mostEarnedBadges       ?? [];

  const ratingBreak = fb.ratingBreakdown       ?? [];
  const notifBreak  = notif.statusBreakdown    ?? [];
  const maxRating   = Math.max(...ratingBreak.map((r) => r.count), 1);
  const maxNotif    = Math.max(...notifBreak.map((n)  => n.count), 1);

  // Merge post/blog/comment trends into one dataset
  const trendMap = {};
  const addTrend = (arr, key) => (arr ?? []).forEach(({ _id, count }) => {
    trendMap[_id] = { ...(trendMap[_id] ?? { date: _id }), [key]: count };
  });
  addTrend(trends.posts,    "posts");
  addTrend(trends.blogs,    "blogs");
  addTrend(trends.comments, "comments");
  const trendData = Object.values(trendMap).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={FileText}   iconBg="bg-blue-100"   iconColor="text-blue-600"   label="Total Posts"    value={summary.totalPosts    ?? 0} />
        <StatCard icon={FileText}   iconBg="bg-indigo-100" iconColor="text-indigo-600" label="Total Blogs"    value={summary.totalBlogs    ?? 0} />
        <StatCard icon={FileText}   iconBg="bg-teal-100"   iconColor="text-teal-600"   label="Comments"       value={summary.totalComments ?? 0} />
        <StatCard icon={TrendingUp} iconBg="bg-green-100"  iconColor="text-green-600"  label="Posts This Wk"  value={summary.postsThisWeek ?? 0} />
        <StatCard icon={TrendingUp} iconBg="bg-amber-100"  iconColor="text-amber-600"  label="Blogs This Wk"  value={summary.blogsThisWeek ?? 0} />
      </div>

      {/* Content trends */}
      <Card title="Content Creation — Last 30 Days" icon={TrendingUp}>
        {trendData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No content created in this period.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {[["gPost", BLUE], ["gBlog", PURPLE], ["gComment", TEAL]].map(([id, color]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={color} stopOpacity={0}    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend />
              <Area type="monotone" dataKey="posts"    stroke={BLUE}   fill="url(#gPost)"    strokeWidth={2} name="Posts"    />
              <Area type="monotone" dataKey="blogs"    stroke={PURPLE} fill="url(#gBlog)"    strokeWidth={2} name="Blogs"    />
              <Area type="monotone" dataKey="comments" stroke={TEAL}   fill="url(#gComment)" strokeWidth={2} name="Comments" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Top posters */}
        <Card title="Top Posters" icon={Users}>
          {topPost.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No post data yet.</p>
          ) : (
            topPost.map((p, i) => (
              <UserRow
                key={i}
                rank={i + 1}
                user={p.user}
                sub={p.user?.email}
                value={p.postCount}
                valueLabel="posts"
                highlight="text-blue-600"
              />
            ))
          )}
        </Card>

        {/* Feedback ratings */}
        <Card title="Feedback Ratings" icon={Star}>
          <div className="mb-5">
            <p className="text-xs text-gray-400 uppercase font-medium mb-1">Average Rating</p>
            <p className="text-4xl font-bold text-amber-500">{fb.averageRating ?? "—"} <span className="text-2xl">★</span></p>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const found = ratingBreak.find((r) => r._id === star);
              return (
                <BreakdownBar
                  key={star}
                  label={`${star} ${"★".repeat(star)}`}
                  value={found?.count ?? 0}
                  max={maxRating}
                  color={AMBER}
                />
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Notification status */}
        <Card title="Notification Status" icon={Bell}>
          <div className="space-y-4">
            {notifBreak.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No notification data.</p>
            ) : notifBreak.map((n) => (
              <BreakdownBar key={n._id} label={n._id} value={n.count} max={maxNotif}
                color={n._id === "sent" ? GREEN : n._id === "failed" ? RED : AMBER} />
            ))}
          </div>
        </Card>

        {/* Most earned badges */}
        <Card title="Most Earned Badges" icon={Trophy}>
          {badges.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No badge data yet.</p>
          ) : (
            <div className="space-y-3">
              {badges.slice(0, 8).map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-6 text-center text-xs font-bold ${i === 0 ? "text-amber-500" : "text-gray-300"}`}>{i + 1}</span>
                  <p className="flex-1 text-sm text-gray-800 truncate">{b.title ?? b._id}</p>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{b.count}×</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

const TABS = [
  { key: "overview",    label: "Overview"      },
  { key: "user-growth", label: "User Growth"   },
  { key: "health",      label: "Health Impact" },
  { key: "challenges",  label: "Challenges"    },
  { key: "content",     label: "Content"       },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <Header header="Analytics" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5 space-y-5">

          <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow px-5 py-3">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2 text-sm rounded-lg font-medium transition-colors ${
                  activeTab === key
                    ? "text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                style={activeTab === key ? { backgroundColor: BRAND } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "overview"    && <OverviewTab      />}
          {activeTab === "user-growth" && <UserGrowthTab    />}
          {activeTab === "health"      && <HealthImpactTab  />}
          {activeTab === "challenges"  && <ChallengesTab    />}
          {activeTab === "content"     && <ContentTab       />}

        </div>
      </div>
    </div>
  );
}
