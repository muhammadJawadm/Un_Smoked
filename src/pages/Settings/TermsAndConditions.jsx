import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../services/api";
import useFetch from "../../hooks/useFetch";
import { useToast } from "../../context/ToastContext";
import PageLoader from "../../components/PageLoader";
import PageError from "../../components/PageError";

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

export default function TermsAndConditions() {
  const toast = useToast();
  const { data, loading, error, refetch } = useFetch("/terms");

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [formErr, setFormErr] = useState("");

  const terms = data?.terms;

  useEffect(() => {
    if (terms && !isEditing) {
      setContent(terms.content || "");
    }
  }, [terms, isEditing]);

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error} onRetry={refetch} />;

  const handleEdit = () => {
    setContent(terms?.content || "");
    setFormErr("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setContent(terms?.content || "");
    setFormErr("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    setBusy(true);
    setFormErr("");
    try {
      await api.put("/terms", { content });
      toast.success("Terms & Conditions updated successfully.");
      await refetch();
      setIsEditing(false);
    } catch (err) {
      const message = err.response?.data?.message ?? err.message ?? "Failed to update Terms & Conditions.";
      setFormErr(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const updatedAt = terms?.updatedAt
    ? new Date(terms.updatedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="rounded-xl shadow ring-1 ring-gray-200 bg-white">
      <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Terms & Conditions</h1>
          <p className="mt-1 text-sm text-gray-500">
            {updatedAt ? `Last updated: ${updatedAt}` : "Not published yet"}
          </p>
        </div>
        <div className="ml-4 flex gap-2 shrink-0">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-white text-sm rounded-lg hover:opacity-80"
              style={{ backgroundColor: "#836852" }}
            >
              Edit Content
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={busy}
                className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={busy}
                className="px-4 py-2 text-white text-sm rounded-lg hover:opacity-80 disabled:opacity-60"
                style={{ backgroundColor: "#836852" }}
              >
                {busy ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {formErr && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{formErr}</div>
        )}
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
        ) : content ? (
          <div className="space-y-4">
            <div
              className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">No terms & conditions content has been added yet.</p>
        )}
      </div>
    </div>
  );
}
