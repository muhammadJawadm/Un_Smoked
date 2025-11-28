import { useState } from 'react'
import { Calendar, Users, ShieldCheck, Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../layouts/partials/header'

export default function ChildEdit() {
  const [form, setForm] = useState({
    name: 'Alex Doe',
    parentName: 'Jane Doe',
    age: 6,
    gender: 'Male',
    dob: '2019-05-12',
    milestones: 12,
    address: 'Florida, California',
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: Replace with API call
    console.log('Saving child profile', form)
    alert('Child profile saved (demo). Hook up API next!')
  }

  return (
    <div>
      <Header header={'Edit Child'} link={'/TotalChildren'} arrow={true} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4">
          <div className="bg-white/90 backdrop-blur-sm px-5 py-5 rounded-xl shadow ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Child Information</h2>
              </div>
              <Link 
                to={-1} 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium border border-gray-300 text-gray-700 hover:opacity-80 shadow-sm"
                style={{ backgroundColor: '#F7F5F3' }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Child Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={onChange} 
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
                  style={{ backgroundColor: '#F7F5F3' }}
                  placeholder="Child name" 
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Parent Name</label>
                <input 
                  name="parentName" 
                  value={form.parentName} 
                  onChange={onChange} 
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
                  style={{ backgroundColor: '#F7F5F3' }}
                  placeholder="Parent name" 
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={form.age} 
                  onChange={onChange} 
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
                  style={{ backgroundColor: '#F7F5F3' }}
                  placeholder="Age" 
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Gender</label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={onChange} 
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                  style={{ backgroundColor: '#F7F5F3' }}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600">Date of Birth</label>
                <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2" style={{ backgroundColor: '#F7F5F3' }}>
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <input 
                    type="date" 
                    name="dob" 
                    value={form.dob} 
                    onChange={onChange} 
                    className="w-full outline-none text-sm" 
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">Total Milestones</label>
                <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2" style={{ backgroundColor: '#F7F5F3' }}>
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                  <input 
                    type="number" 
                    name="milestones" 
                    value={form.milestones} 
                    onChange={onChange} 
                    className="w-full outline-none text-sm" 
                    style={{ backgroundColor: 'transparent' }}
                    placeholder="Milestones" 
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Address</label>
                <input 
                  name="address" 
                  value={form.address} 
                  onChange={onChange} 
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm" 
                  style={{ backgroundColor: '#F7F5F3' }}
                  placeholder="Address" 
                />
              </div>

              <div className="md:col-span-2 mt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  className="px-4 py-2 text-sm rounded-md font-medium border border-gray-300 text-gray-700 hover:opacity-80 shadow-sm"
                  style={{ backgroundColor: '#F7F5F3' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md font-medium text-white hover:opacity-80 shadow-sm"
                  style={{ backgroundColor: '#836852' }}
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
