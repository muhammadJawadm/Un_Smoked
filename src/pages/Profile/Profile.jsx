/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Shield, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../../layouts/partials/header";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";
import useFetch from "../../hooks/useFetch";
import api from "../../services/api";

function Avatar({ src, name, size = "lg" }) {
  const [broken, setBroken] = useState(false);
  const dim = size === "lg" ? "w-20 h-20 text-2xl" : "w-24 h-24 text-3xl";

  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-xl object-cover shrink-0 ring-4 ring-white shadow`}
        onError={() => setBroken(true)}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-xl flex items-center justify-center text-white font-bold shrink-0 ring-4 ring-white shadow`}
      style={{ backgroundColor: "#836852" }}
    >
      {name?.charAt(0).toUpperCase() ?? "A"}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#f5f0eb] flex items-center justify-center shrink-0">
        <Icon className="size-4 text-[#836852]" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [isOpen,  setIsOpen ] = useState(false);
  const [form,    setForm   ] = useState({ name: "", email: "", phone: "" });
  const [busy,    setBusy   ] = useState(false);
  const [saveErr, setSaveErr] = useState(null);
  const [saveOk,  setSaveOk ] = useState(false);

  const { data, loading, error, refetch } = useFetch("/auth/profile");

  // Accept any common response shape
  const profile = data?.user ?? data?.admin ?? data?.data ?? null;

  // Sync form whenever the profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name:  profile.name  ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
      });
    }
  }, [profile]);

  const openEdit = () => {
    setSaveErr(null);
    setSaveOk(false);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setSaveErr(null);
    setSaveOk(false);
    try {
      await api.put(`/auth/${profile._id}`, { name: form.name, phone: form.phone });
      setSaveOk(true);
      await refetch();
      setTimeout(() => { setIsOpen(false); setSaveOk(false); }, 900);
    } catch (err) {
      setSaveErr(err.response?.data?.message ?? err.message ?? "Failed to update profile.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <Header header="Admin Profile" />
      <div className="max-w-screen-md mx-auto px-4 xl:px-8 my-6">

        {loading && <PageLoader />}
        {error   && <PageError message={error} onRetry={refetch} />}

        {!loading && !error && profile && (
          <div className="bg-white rounded-xl shadow overflow-hidden">

            {/* Cover strip */}
            <div className="h-24 w-full" style={{ background: "linear-gradient(135deg, #836852 0%, #b59a82 100%)" }} />

            {/* Profile header */}
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-5">
                <Avatar
                  src={profile.profile_picture}
                  name={profile.name}
                  size="lg"
                />
                <button
                  onClick={openEdit}
                  className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#836852" }}
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{profile.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                    profile.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {profile.is_active ? "Active" : "Inactive"}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#ede9e5] text-[#836852] capitalize">
                    {profile.role ?? "admin"}
                  </span>
                </div>
              </div>

              {/* Info rows */}
              <div className="bg-gray-50 rounded-xl px-4 py-1">
                <InfoRow icon={Mail}     label="Email Address"  value={profile.email} />
                <InfoRow icon={Phone}    label="Phone Number"   value={profile.phone} />
                <InfoRow icon={Shield}   label="Role"           value={profile.role} />
                <InfoRow icon={Calendar} label="Member Since"   value={
                  profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : "—"
                } />
                {profile.last_login && (
                  <InfoRow icon={User} label="Last Login" value={
                    new Date(profile.last_login).toLocaleString()
                  } />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

              {/* Editable fields */}
              {[
                { label: "Full Name",    name: "name",  type: "text", Icon: User,  placeholder: "Your full name"       },
                { label: "Phone Number", name: "phone", type: "tel",  Icon: Phone, placeholder: "e.g. +92 300 1234567" },
              ].map(({ label, name, type, Icon, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#836852] bg-white">
                    <Icon className="size-4 text-gray-400 shrink-0" />
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full outline-none text-sm bg-transparent"
                    />
                  </div>
                </div>
              ))}

              {/* Email — read-only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-gray-400 font-normal text-xs">(cannot be changed)</span>
                </label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <Mail className="size-4 text-gray-300 shrink-0" />
                  <span className="text-sm text-gray-400">{form.email}</span>
                </div>
              </div>

              {saveErr && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  <AlertCircle className="size-4 shrink-0" />
                  {saveErr}
                </div>
              )}
              {saveOk && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                  <CheckCircle className="size-4 shrink-0" />
                  Profile updated successfully.
                </div>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={busy}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="px-5 py-2 text-white text-sm rounded-lg hover:opacity-80 disabled:opacity-50"
                  style={{ backgroundColor: "#836852" }}
                >
                  {busy ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
