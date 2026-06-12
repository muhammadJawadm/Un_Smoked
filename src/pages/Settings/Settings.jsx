import { useState } from "react";
import Header from "../../layouts/partials/header";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import UserFeedback from "./UserFeedback";
import Contacts from "./Contacts";
import Notifications from "./Notifications";

const TABS = [
  { key: "privacy",       label: "Privacy Policy"     },
  { key: "terms",         label: "Terms & Conditions" },
  { key: "feedback",      label: "Feedback"           },
  { key: "contacts",      label: "Contacts"           },
  { key: "notifications", label: "Notifications"      },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div>
      <Header header="Manage Settings" />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-3 space-y-4">

          <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow px-5 py-3">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 text-sm rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                style={activeTab === tab.key ? { backgroundColor: "#836852" } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "privacy"       && <PrivacyPolicy />}
          {activeTab === "terms"         && <TermsAndConditions />}
          {activeTab === "feedback"      && <UserFeedback />}
          {activeTab === "contacts"      && <Contacts />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
}
