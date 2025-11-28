import { Mail, Phone, Calendar, MapPin, ShieldCheck, User, Edit , Users, Eye, X} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../layouts/partials/header'

export default function ParentProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    milestones: 0
  })

  const [parent, setParent] = useState({
    id: '1',
    name: 'Jane Doe',
    email: 'jane@singit.com',
    phone: '+1 (555) 123-4567',
    dob: 'October 22, 1990',
    address: 'Florida, California',
    insurance: 'None',
    gender: 'Female',
    registeredOn: 'October 22, 2023',
    avatar: 'https://images.pexels.com/photos/7289120/pexels-photo-7289120.jpeg?auto=compress&cs=tinysrgb&w=600',
    children: [
      { id: 'c1', name: 'Alex Doe', age: 6, milestones: 12, gender: 'Male', avatar: 'https://images.pexels.com/photos/3662556/pexels-photo-3662556.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'c2', name: 'Mia Doe', age: 4, milestones: 9, gender: 'Female', avatar: 'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  })

  const handleOpenModal = () => {
    setFormData({ name: '', age: '', gender: '', milestones: 0 })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData({ name: '', age: '', gender: '', milestones: 0 })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newChild = {
      id: `c${Date.now()}`,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      milestones: parseInt(formData.milestones),
      avatar: formData.gender === 'Male' 
        ? 'https://images.pexels.com/photos/3662556/pexels-photo-3662556.jpeg?auto=compress&cs=tinysrgb&w=600'
        : 'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&w=600'
    }

    setParent(prev => ({
      ...prev,
      children: [...prev.children, newChild]
    }))

    handleCloseModal()
  }

  return (
    <div>
      <Header header={"Parent Profile"} link={'/TotalParents'} arrow={true} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4 space-y-4">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow ring-1 ring-gray-200">
            <div className="flex items-center gap-3">
              <h3 className="text-sm py-1.5 border-b border-gray-200 font-medium text-gray-900">Profile Overview</h3>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                to={`/parentedit`} 
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium text-white hover:opacity-80 shadow-sm"
                style={{ backgroundColor: '#836852' }}
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </Link>
              <button 
                className='px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-md font-medium hover:opacity-80 shadow-sm'
                style={{ backgroundColor: '#F7F5F3' }}
              >
                Block
              </button>
            </div>
          </div>

          {/* Header card */}
          <div className='bg-white px-5 py-5 rounded-xl shadow ring-1 ring-gray-200'>
            <div className='flex items-center gap-4'>
              <img className='w-16 h-16 rounded-full ring-2 ring-white object-cover shadow' src={parent.avatar} alt='user' />
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>{parent.name}</h2>
                <div className='mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-700'>
                  <span className='inline-flex items-center gap-1'><Mail className='w-4 h-4' /> {parent.email}</span>
                  <span className='inline-flex items-center gap-1'><Phone className='w-4 h-4' /> {parent.phone}</span>
                </div>
              </div>
            </div>
            <div className='mt-5 grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Date of Birth</p>
                <div className='mt-1 flex items-center gap-1 text-sm font-medium text-gray-900'><Calendar className='w-4 h-4' /> {parent.dob}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Address</p>
                <div className='mt-1 flex items-center gap-1 text-sm font-medium text-gray-900'><MapPin className='w-4 h-4' /> {parent.address}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Insurance</p>
                <div className='mt-1 flex items-center gap-1 text-sm font-medium text-gray-900'><ShieldCheck className='w-4 h-4' /> {parent.insurance}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Registered On</p>
                <div className='mt-1 text-sm font-medium text-gray-900'>{parent.registeredOn}</div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className='bg-white rounded-xl shadow ring-1 ring-gray-200'>
            <div className='border-b px-5 py-3 flex items-center gap-2'>
              <User className='w-5 h-5 text-gray-700' />
              <h5 className='uppercase text-sm tracking-wide font-bold text-gray-900'>Personal Information</h5>
            </div>
            <div className='px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
              <div>
                <p className='text-xs text-gray-600'>Date of Birth</p>
                <h6 className='text-sm font-medium'>{parent.dob}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Address</p>
                <h6 className='text-sm font-medium'>{parent.address}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Insurance</p>
                <h6 className='text-sm font-medium'>{parent.insurance}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Gender</p>
                <h6 className='text-sm font-medium'>{parent.gender}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Phone Number</p>
                <h6 className='text-sm font-medium'>{parent.phone}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Registered On</p>
                <h6 className='text-sm font-medium'>{parent.registeredOn}</h6>
              </div>
            </div>
          </div>

          {/* Children List */}
          <div className="bg-white rounded-xl shadow ring-1 ring-gray-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-700" />
                <h5 className="text-base font-semibold text-gray-900">Children</h5>
                <span className="ml-2 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{parent.children.length}</span>
              </div>
              <div>
                <button 
                  onClick={handleOpenModal}
                  className="px-4 py-2 text-sm rounded-md font-medium text-white hover:opacity-80 shadow-sm"
                  style={{ backgroundColor: '#836852' }}
                >
                  Add Child
                </button>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full table-fixed text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 w-1/5">Name</th>
                    <th className="px-6 py-3 w-20">Age</th>
                    <th className="px-6 py-3 w-24">Milestones</th>
                    <th className="px-6 py-3 w-24">Gender</th>
                    <th className="px-6 py-3 w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parent.children.map((child) => (
                    <tr key={child.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={child.avatar} alt={child.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow" />
                          <div>
                            <h6 className="font-medium text-gray-900">{child.name}</h6>
                            <p className="text-xs text-gray-500">Child</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-gray-700">{child.age}</span></td>
                      <td className="px-6 py-4"><span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{child.milestones}</span></td>
                      <td className="px-6 py-4"><span className="text-gray-700">{child.gender}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/childview`} className="group relative flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                            <Eye className="w-4 h-4" />
                            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">View</span>
                          </Link>
                          <Link to={`/childedit`} className="group relative flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm">
                            <Edit className="w-4 h-4" />
                            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Child Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg shadow-xl max-w-md w-full" style={{ backgroundColor: '#F7F5F3' }}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Add New Child</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Enter child's name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="0"
                    max="18"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Enter age..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    required
                  >
                    <option value="">Select gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Milestones Completed
                  </label>
                  <input
                    type="number"
                    name="milestones"
                    value={formData.milestones}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Enter milestones count..."
                  />
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
                  Add Child
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
