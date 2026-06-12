import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header","font","size","bold","italic","underline","strike","blockquote",
  "list","bullet","indent","align","color","background","link","image","video",
];

const DEFAULT_CONTENT = `
<h2>Information We Collect</h2>
<p>We collect information you provide directly (such as account details and feedback), and information collected automatically (such as device, usage, and analytics data).</p>
<h2>How We Use Information</h2>
<ul>
  <li>To provide, maintain, and improve our services.</li>
  <li>To personalize content and user experience.</li>
  <li>To communicate updates, security alerts, and support messages.</li>
  <li>To comply with legal obligations.</li>
</ul>
<h2>Sharing and Disclosure</h2>
<p>We do not sell personal information. We may share data with trusted providers for service delivery, compliance, or when required by law.</p>
<h2>Data Retention</h2>
<p>We retain information for as long as necessary to provide services and meet legal requirements. You may request deletion where applicable.</p>
<h2>Your Rights</h2>
<ul>
  <li>Access, update, or delete your information.</li>
  <li>Opt-out of certain processing where allowed.</li>
  <li>Request portability of your data.</li>
</ul>
<h2>Security</h2>
<p>We use reasonable safeguards to protect personal information. No method of transmission or storage is 100% secure.</p>
<h2>Contact Us</h2>
<p>If you have questions, contact us at <strong>support@unsmoke.com</strong>.</p>
`;

export default function PrivacyPolicy() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Privacy Policy");
  const [effectiveDate, setEffectiveDate] = useState("November 26, 2025");
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  return (
    <div className="rounded-xl shadow ring-1 ring-gray-200 bg-white">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-start">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-semibold text-gray-900 border-b-2 border-[#836852] outline-none w-full bg-white"
                placeholder="Enter title..."
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Effective date:</span>
                <input
                  type="text"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="text-sm text-gray-600 border-b border-[#836852] outline-none bg-white"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <p className="mt-1 text-sm text-gray-500">Effective date: {effectiveDate}</p>
            </>
          )}
        </div>
        <div className="ml-4 flex gap-2 shrink-0">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white text-sm rounded-lg hover:opacity-80"
              style={{ backgroundColor: "#836852" }}
            >
              Edit Content
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white text-sm rounded-lg hover:opacity-80"
                style={{ backgroundColor: "#836852" }}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {isEditing ? (
          <div className="min-h-[600px]">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={QUILL_MODULES}
              formats={QUILL_FORMATS}
              className="h-[550px]"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <p className="text-xs text-gray-400 border-t pt-4">Last updated: {effectiveDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
