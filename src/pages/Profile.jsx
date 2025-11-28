import Header from "../layouts/partials/header";
import { useState } from "react";
import { X, User, Mail, Phone, Camera } from "lucide-react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'Jane@larmwar.com',
    phone: '+92337465889',
    avatar: 'https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile...', formData);
    setIsOpen(false);
    alert('Profile updated successfully!');
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Header header={'Admin Information'} />
      <div className='max-w-screen-lg mx-auto p-4 xl:px-8 space-y-4 mb-8'>
        <div className='bg-white w-full pb-4 px-6'>
          <div className='flex items-center justify-between border-b py-3'>
            <h4 className='text-2xl font-semibold capitalize'>Admin Profile</h4>
            <button 
              onClick={() => setIsOpen(true)} 
              className='capitalize px-6 py-2 text-white rounded-md text-sm hover:opacity-80' 
              style={{ backgroundColor: '#836852' }}
            >
              Edit profile
            </button>
          </div>
          <div className='bg-white py-3.5 space-y-5'>
            <div className='flex items-center gap-4'>
              <div>
                <img className='w-24 h-24 rounded-2xl object-cover' src={formData.avatar} alt="Admin" />
              </div>
              <div className='w-full space-y-1'>
                <div className='flex justify-between w-full items-start'>
                  <div>
                    <h5 className='text-3xl font-semibold'>{formData.name}</h5>
                    <p className='text-sm text-gray-600'>{formData.email}</p>
                  </div>
                  <p className='px-5 py-1.5  bg-opacity-5  rounded-md' style={{color: '', backgroundColor:'#F7F5F3'}}>Approved</p>
                </div>
                <div className='flex items-center justify-between w-full text-sm text-[#434343]'>
                  <p>{formData.phone}</p>
                  <p>Member Since 12/12/12-10:34</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg shadow-xl max-w-md w-full" style={{ backgroundColor: '#F7F5F3' }}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                {/* Avatar Preview */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={formData.avatar} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg hover:opacity-80"
                      style={{ backgroundColor: '#836852' }}
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2" style={{ backgroundColor: '#FFFFFF' }}>
                    <User className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full outline-none text-sm"
                      style={{ backgroundColor: 'transparent' }}
                      placeholder="Enter your name..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2" style={{ backgroundColor: '#FFFFFF' }}>
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full outline-none text-sm"
                      style={{ backgroundColor: 'transparent' }}
                      placeholder="Enter your email..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2" style={{ backgroundColor: '#FFFFFF' }}>
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full outline-none text-sm"
                      style={{ backgroundColor: 'transparent' }}
                      placeholder="Enter your phone..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#F7F5F3' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#836852' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
