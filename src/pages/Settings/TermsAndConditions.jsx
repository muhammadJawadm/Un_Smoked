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
<h2>Acceptance of Terms</h2>
<p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree, please do not use the services.</p>
<h2>Eligibility & Accounts</h2>
<p>You must provide accurate information and maintain the security of your account. You are responsible for activity under your credentials.</p>
<h2>Acceptable Use</h2>
<ul>
  <li>Do not misuse the services or engage in illegal activity.</li>
  <li>Do not attempt to disrupt, interfere, or access restricted areas.</li>
  <li>Respect privacy and intellectual property rights.</li>
</ul>
<h2>Content & Ownership</h2>
<p>All content, trademarks, and materials are owned by us or our licensors. You receive a limited, non-exclusive right to use the services.</p>
<h2>Termination</h2>
<p>We may suspend or terminate access for violation of these Terms or for risk/security reasons. You may cease use at any time.</p>
<h2>Disclaimers & Limitation</h2>
<p>Services are provided "as is". To the extent permitted by law, we disclaim warranties and limit liability for indirect or consequential damages.</p>
<h2>Changes to Terms</h2>
<p>We may update these Terms periodically. Continued use constitutes acceptance of changes.</p>
<h2>Contact Us</h2>
<p>For questions about these Terms, reach us at <strong>support@unsmoke.com</strong>.</p>
`;

export default function TermsAndConditions() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Terms & Conditions");
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
