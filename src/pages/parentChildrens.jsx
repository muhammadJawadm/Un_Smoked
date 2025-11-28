import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Mail, Phone, Calendar, MapPin, Users, Eye, Edit } from 'lucide-react'
import Header from '../layouts/partials/header'

export default function ParentChildren() {
  const { id } = useParams()

  // Mocked data for demo; replace with API call or context
  const data = useMemo(() => {
    const parents = {
      '1': {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@singit.com',
        phone: '+1 (555) 123-4567',
        dob: '1990-10-22',
        address: 'Florida, California',
        insurance: 'None',
        gender: 'Female',
        registeredOn: '2023-10-22',
        avatar: 'https://images.pexels.com/photos/7289120/pexels-photo-7289120.jpeg?auto=compress&cs=tinysrgb&w=600',
        children: [
          { id: 'c1', name: 'Alex Doe', age: 6, milestones: 12, gender: 'Male', avatar: 'https://images.pexels.com/photos/3662556/pexels-photo-3662556.jpeg?auto=compress&cs=tinysrgb&w=600' },
          { id: 'c2', name: 'Mia Doe', age: 4, milestones: 9, gender: 'Female', avatar: 'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&w=600' },
        ],
      },
    }
    return parents[id || '1']
  }, [id])

  return (
    <div>
      <Header header={"Parent Details"} link={'/TotalParents'} arrow={true} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4 space-y-4">
          {/* Parent card */}
          <div className="bg-white/90 backdrop-blur-sm px-5 py-5 rounded-xl shadow ring-1 ring-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img className="w-16 h-16 rounded-full ring-2 ring-white object-cover shadow" src={data.avatar} alt={data.name} />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{data.name}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4" /> {data.email}</span>
                    <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" /> {data.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm">Message</button>
                <button className="px-4 py-2 text-sm rounded-md font-medium border border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm">Block</button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-600">Date of Birth</p>
                <div className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900"><Calendar className="w-4 h-4" /> October 22, 1990</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-600">Address</p>
                <div className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900"><MapPin className="w-4 h-4" /> {data.address}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-600">Insurance</p>
                <div className="mt-1 text-sm font-medium text-gray-900">{data.insurance}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-600">Registered On</p>
                <div className="mt-1 text-sm font-medium text-gray-900">October 22, 2023</div>
              </div>
            </div>
          </div>

          {/* Children list */}
   
        </div>
      </div>
    </div>
  )
}
