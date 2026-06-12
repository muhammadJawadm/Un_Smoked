import { useState } from "react";
import Header from "../../layouts/partials/header";
import { X, User, Mail, Phone, Camera } from "lucide-react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@unsmoke.com",
    phone: "+92 337 465 889",
    avatar: "https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <Header header="Admin Information" />
      <div className="max-w-screen-lg mx-auto p-4 xl:px-8 mb-8">
        <div className="bg-white rounded-xl shadow">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h4 className="text-xl font-semibold text-gray-800">Admin Profile</h4>
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2 text-white text-sm rounded-lg hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#836852" }}
            >
              Edit Profile
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-center gap-5">
              <img
                className="w-20 h-20 rounded-xl object-cover shrink-0"
                src={formData.avatar}
                alt="Admin"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-2xl font-semibold text-gray-900">{formData.name}</h5>
                    <p className="text-sm text-gray-500 mt-0.5">{formData.email}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 shrink-0">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>{formData.phone}</span>
                  <span>Member since 12/12/2012</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-1.5 rounded-full text-white"
                    style={{ backgroundColor: "#836852" }}
                  >
                    <Camera className="size-4" />
                  </button>
                </div>
              </div>

              {[
                { label: "Full Name", name: "name", type: "text", Icon: User, placeholder: "Enter your name" },
                { label: "Email", name: "email", type: "email", Icon: Mail, placeholder: "Enter your email" },
                { label: "Phone Number", name: "phone", type: "tel", Icon: Phone, placeholder: "Enter your phone" },
              ].map(({ label, name, type, Icon, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                    <Icon className="size-4 text-gray-400 shrink-0" />
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className="w-full outline-none text-sm bg-transparent"
                      placeholder={placeholder}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white text-sm rounded-lg hover:opacity-80"
                  style={{ backgroundColor: "#836852" }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
