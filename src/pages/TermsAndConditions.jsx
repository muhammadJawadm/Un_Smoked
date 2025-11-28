import { useState } from "react";
import Header from "../layouts/partials/header";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TermsAndConditions() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Terms & Conditions");
  const [effectiveDate, setEffectiveDate] = useState("November 26, 2025");
  const [fullContent, setFullContent] = useState(`
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
    <p>For questions about these Terms, reach us at <strong>support@example.com</strong>.</p>
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
      {/* <Header header={"Terms & Conditions"} /> */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          <div className="rounded-xl shadow ring-1 ring-gray-200 bg-white">
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
                    placeholder="Start writing your terms and conditions here... Add headings, paragraphs, lists, and more!"
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
