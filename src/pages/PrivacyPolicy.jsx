import { useState } from "react";
import Header from "../layouts/partials/header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PrivacyPolicy() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Privacy Policy");
  const [effectiveDate, setEffectiveDate] = useState("November 26, 2025");
  const [fullContent, setFullContent] = useState(`
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
    <p>If you have questions, contact us at <strong>support@example.com</strong>.</p>
  `);

  const handleSave = () => {
    console.log("Saving changes...", { title, effectiveDate, fullContent });
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align',
    'color', 'background',
    'link', 'image', 'video'
  ];

  return (
    <div>
      {/* <Header header={"Privacy Policy"} /> */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          <div className="rounded-xl shadow ring-1 ring-gray-200 bg-white" >
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-start">
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-2xl font-semibold text-gray-900 border-b-2 border-blue-500 outline-none w-full"
                      style={{ backgroundColor: '#FFFFFF' }}
                      placeholder="Enter title..."
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Effective date:</span>
                      <input
                        type="text"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="text-sm text-gray-600 border-b border-blue-500 outline-none"
                        style={{ backgroundColor: '#FFFFFF' }}
                        placeholder="Enter date..."
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                    <p className="mt-1 text-sm text-gray-600">Effective date: {effectiveDate}</p>
                  </>
                )}
              </div>
              <div className="ml-4 flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                    style={{ backgroundColor: '#836852' }}
                  >
                    Edit Content
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-sm rounded-md font-medium hover:opacity-80"
                      style={{ backgroundColor: '#F7F5F3' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                      style={{ backgroundColor: '#836852' }}
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
                    value={fullContent}
                    onChange={setFullContent}
                    modules={modules}
                    formats={formats}
                    className="h-[550px]"
                    placeholder="Start writing your privacy policy here... Add headings, paragraphs, lists, and more!"
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2 prose-p:mt-2 prose-ul:mt-2"
                    dangerouslySetInnerHTML={{ __html: fullContent }}
                  />
                  <p className="text-xs text-gray-500 border-t pt-4 mt-8">Last updated: {effectiveDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
